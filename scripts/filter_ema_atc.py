#!/usr/bin/env python3
from __future__ import annotations

import argparse
import re
import sys
import tempfile
import zipfile
from pathlib import Path
from xml.etree import ElementTree


ROOT = Path(__file__).resolve().parents[1]
SCRIPTS_DIR = Path(__file__).resolve().parent
sys.path.insert(0, str(SCRIPTS_DIR))

from build_static_site import (  # noqa: E402
    XLSX_NS,
    red_fill_style_indexes,
    red_style_indexes,
    shared_strings,
    sheet_rows,
    workbook_sheet_paths,
)


DEFAULT_INPUT = ROOT / "data/ema/medicines-output-medicines-report_en.xlsx"
DEFAULT_ATC_COLUMN = "ATC code (human)"
DEFAULT_PREFIX = "J07"
CELL_REF_RE = re.compile(r"^([A-Z]+)([0-9]+)$")


def default_output_path(source: Path, prefix: str) -> Path:
    return source.with_name(f"{source.stem}_{prefix}{source.suffix}")


def column_letters(number: int) -> str:
    if number < 1:
        raise ValueError("column number must be positive")
    letters = ""
    while number:
        number, remainder = divmod(number - 1, 26)
        letters = chr(ord("A") + remainder) + letters
    return letters


def update_cell_reference(reference: str, row_number: int) -> str:
    match = CELL_REF_RE.match(reference)
    if not match:
        return reference
    return f"{match.group(1)}{row_number}"


def renumber_row(row: ElementTree.Element, new_row_index: int) -> None:
    row.attrib["r"] = str(new_row_index)
    for cell in row.findall(f"{XLSX_NS}c"):
        reference = cell.attrib.get("r")
        if reference:
            cell.attrib["r"] = update_cell_reference(reference, new_row_index)


def dimension_last_column(root: ElementTree.Element, fallback_column_count: int) -> str:
    dimension = root.find(f"{XLSX_NS}dimension")
    if dimension is not None:
        reference = dimension.attrib.get("ref", "")
        last_reference = reference.split(":")[-1]
        match = CELL_REF_RE.match(last_reference)
        if match:
            return match.group(1)
    return column_letters(fallback_column_count)


def load_rows(source: Path) -> tuple[str, str, list[dict], int]:
    with zipfile.ZipFile(source) as archive:
        strings = shared_strings(archive)
        red_styles = red_style_indexes(archive)
        red_fill_styles = red_fill_style_indexes(archive)
        paths = workbook_sheet_paths(archive)
        if not paths:
            raise ValueError(f"{source}: no worksheets found")
        sheet_name, sheet_path = next(iter(paths.items()))
        rows, max_column = sheet_rows(archive, sheet_path, strings, red_styles, red_fill_styles)
    return sheet_name, sheet_path, rows, max_column


def find_header(rows: list[dict], header_label: str) -> tuple[int, int]:
    for row in rows:
        for column, value in row.get("cells", {}).items():
            if value == header_label:
                return int(row["index"]), int(column)
    raise ValueError(f'missing header column "{header_label}"')


def selected_row_indexes(
    rows: list[dict],
    header_row_index: int,
    atc_column: int,
    prefix: str,
) -> list[int]:
    return [
        int(row["index"])
        for row in rows
        if int(row["index"]) > header_row_index
        and str(row.get("cells", {}).get(atc_column, "")).strip().startswith(prefix)
    ]


def rewrite_sheet(
    source: Path,
    sheet_path: str,
    header_row_index: int,
    selected_indexes: list[int],
    fallback_column_count: int,
) -> bytes:
    ElementTree.register_namespace("", XLSX_NS.strip("{}"))
    with zipfile.ZipFile(source) as archive:
        root = ElementTree.fromstring(archive.read(sheet_path))

    sheet_data = root.find(f"{XLSX_NS}sheetData")
    if sheet_data is None:
        raise ValueError("worksheet is missing sheetData")

    selected = set(selected_indexes)
    next_row_index = header_row_index + 1
    for row in list(sheet_data.findall(f"{XLSX_NS}row")):
        original_index = int(row.attrib.get("r", "0"))
        if original_index <= header_row_index:
            continue
        if original_index not in selected:
            sheet_data.remove(row)
            continue
        renumber_row(row, next_row_index)
        next_row_index += 1

    dimension = root.find(f"{XLSX_NS}dimension")
    if dimension is not None:
        last_row = max(header_row_index, next_row_index - 1)
        dimension.attrib["ref"] = f"A1:{dimension_last_column(root, fallback_column_count)}{last_row}"

    return ElementTree.tostring(root, encoding="utf-8", xml_declaration=True)


def copy_xlsx_with_rewritten_sheet(source: Path, destination: Path, sheet_path: str, sheet_xml: bytes) -> None:
    destination.parent.mkdir(parents=True, exist_ok=True)
    with tempfile.NamedTemporaryFile(
        dir=destination.parent,
        prefix=f".{destination.stem}.",
        suffix=destination.suffix,
        delete=False,
    ) as handle:
        temp_path = Path(handle.name)

    try:
        with zipfile.ZipFile(source) as zin, zipfile.ZipFile(temp_path, "w", zipfile.ZIP_DEFLATED) as zout:
            for item in zin.infolist():
                data = sheet_xml if item.filename == sheet_path else zin.read(item.filename)
                zout.writestr(item, data)
        temp_path.replace(destination)
        destination.chmod(source.stat().st_mode & 0o777)
    finally:
        if temp_path.exists():
            temp_path.unlink()


def filter_workbook(source: Path, destination: Path, header_label: str, prefix: str, dry_run: bool) -> None:
    sheet_name, sheet_path, rows, max_column = load_rows(source)
    header_row_index, atc_column = find_header(rows, header_label)
    selected_indexes = selected_row_indexes(rows, header_row_index, atc_column, prefix)
    if not selected_indexes:
        raise ValueError(f"{source}: no rows found with {header_label} starting with {prefix}")

    print(f"{source.relative_to(ROOT)}")
    print(f"  sheet: {sheet_name}")
    print(f"  header row: {header_row_index}")
    print(f"  filter column: {column_letters(atc_column)} ({header_label})")
    print(f"  selected rows: {len(selected_indexes)}")

    if dry_run:
        return

    sheet_xml = rewrite_sheet(source, sheet_path, header_row_index, selected_indexes, max_column)
    copy_xlsx_with_rewritten_sheet(source, destination, sheet_path, sheet_xml)
    print(f"  wrote: {destination.relative_to(ROOT)}")


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Filter the EMA medicines report by ATC code prefix while preserving XLSX formatting."
    )
    parser.add_argument("--input", type=Path, default=DEFAULT_INPUT, help="source EMA .xlsx workbook")
    parser.add_argument("--output", type=Path, help="filtered .xlsx workbook")
    parser.add_argument("--column", default=DEFAULT_ATC_COLUMN, help="header name of the ATC column")
    parser.add_argument("--prefix", default=DEFAULT_PREFIX, help="ATC code prefix to keep")
    parser.add_argument("--dry-run", action="store_true", help="print selection count without writing output")
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    source = args.input if args.input.is_absolute() else ROOT / args.input
    output = args.output if args.output else default_output_path(source, args.prefix)
    destination = output if output.is_absolute() else ROOT / output
    filter_workbook(source, destination, args.column, args.prefix, args.dry_run)


if __name__ == "__main__":
    main()
