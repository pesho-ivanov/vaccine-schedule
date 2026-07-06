#!/usr/bin/env python3
from __future__ import annotations

import argparse
import csv
import re
import sys
import tempfile
import zipfile
from dataclasses import dataclass
from pathlib import Path
from xml.etree import ElementTree


ROOT = Path(__file__).resolve().parents[1]
SCRIPTS_DIR = Path(__file__).resolve().parent
sys.path.insert(0, str(SCRIPTS_DIR))

from build_static_site import (  # noqa: E402
    XLSX_NS,
    column_number,
    ncpr_header_row_position,
    red_fill_style_indexes,
    red_style_indexes,
    shared_strings,
    sheet_rows,
    workbook_sheet_paths,
)


DEFAULT_INPUT = ROOT / "data/ncpr/orig/Predelna-Export-202607051833.xlsx"
DEFAULT_OUTPUT = ROOT / "data/ncpr/vacc/Predelna-Export-202607051833.xlsx"
CLASSIFICATION_COLUMNS = (1, 3, 4, 5)
CELL_REF_RE = re.compile(r"^([A-Z]+)([0-9]+)$")


VACCINE_PATTERNS = [
    r"\bvaccine\b",
    r"\bvaccines\b",
    r"\btoxoid\b",
    r"\btoxoids\b",
    r"\bpertussis\b",
    r"\bdiphtheria\b",
    r"\btetanus\b",
    r"\bpneumococ",
    r"\bmeningococ",
    r"\bpapillomavirus\b",
    r"\binfluenza\b.*\b(inactivated|split virus|surface antigen|vaccine)\b",
    r"\bhepatitis a\b.*\b(inactivated|whole virus|vaccine)\b",
    r"\bhepatitis b\b.*\b(purified antigen|vaccine|rdna)\b",
    r"\brespiratory syncytial virus vaccine\b",
    r"\bvaricella\b",
    r"\bmeasles\b",
    r"\bmumps\b",
    r"\brubella\b",
    r"\brotavirus\b",
    r"\brota virus\b",
    r"\brabies\b",
    r"\byellow fever\b",
    r"\btuberculosis\b.*\b(live attenuated|bcg|vaccine)\b",
    r"\bbcg vaccine\b",
    r"\bha?emophilus\b.*\b(conjugate|vaccine)\b",
    r"\bcrimean\b.*\bha?emorrhagic\b.*\bvaccine\b",
    r"\banti-chf vaccine\b",
    r"\bother viral vaccines\b",
]


KNOWN_VACCINE_PRODUCTS = [
    "abrysvo",
    "adacel",
    "anti-chf vaccine",
    "bcg vaccine",
    "bexsero",
    "boostrix",
    "boostrix polio",
    "cervarix",
    "efluelda",
    "engerix b",
    "fluenz",
    "gardasil",
    "havrix",
    "hexyon",
    "infanrix",
    "influvac",
    "menquadfi",
    "menveo",
    "m-m-rvaxpro",
    "nimenrix",
    "pentaxim",
    "prevenar",
    "priorix",
    "rotarix",
    "rotateq",
    "stamaril",
    "synflorix",
    "tetadif",
    "tetatox",
    "tetraxim",
    "trumenba",
    "twinrix",
    "varivax",
    "vaxigrip",
    "vaxneuvance",
    "verorab",
]


NON_VACCINE_PATTERNS = [
    r"\bimmunoglobulin\b",
    r"\bimmunoglobuline\b",
    r"\banti-d\b.*\bimmunoglobulin",
    r"\bserum\b",
    r"\bsera\b",
    r"\bcutaquig\b",
    r"\brhesonativ\b",
]


@dataclass(frozen=True)
class RowDecision:
    row_index: int
    include: bool
    reason: str
    values: dict[int, str]


def normalized_text(value: str) -> str:
    return re.sub(r"\s+", " ", value.replace("\xa0", " ")).strip()


def row_values(row: dict, columns: tuple[int, ...] = CLASSIFICATION_COLUMNS) -> dict[int, str]:
    cells = row.get("cells", {})
    return {column: normalized_text(str(cells.get(column, ""))) for column in columns}


def row_classification_text(values: dict[int, str]) -> str:
    return " | ".join(values[column] for column in CLASSIFICATION_COLUMNS if values[column])


def vaccine_reason(text: str) -> str:
    lowered = text.casefold()
    for pattern in NON_VACCINE_PATTERNS:
        if re.search(pattern, lowered, re.IGNORECASE):
            return ""

    product = text.split("|", 2)[1].casefold() if "|" in text else lowered
    for name in KNOWN_VACCINE_PRODUCTS:
        if re.search(rf"(^|[^a-z0-9]){re.escape(name)}([^a-z0-9]|$)", product, re.IGNORECASE):
            return f"known vaccine product: {name}"

    for pattern in VACCINE_PATTERNS:
        if re.search(pattern, lowered, re.IGNORECASE):
            return f"vaccine signal: {pattern}"

    return ""


def classify_row(row: dict) -> RowDecision:
    values = row_values(row)
    text = row_classification_text(values)
    reason = vaccine_reason(text)
    return RowDecision(
        row_index=int(row["index"]),
        include=bool(reason),
        reason=reason or "no vaccine signal",
        values=values,
    )


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


def row_elements_by_index(root: ElementTree.Element) -> dict[int, ElementTree.Element]:
    sheet_data = root.find(f"{XLSX_NS}sheetData")
    if sheet_data is None:
        raise ValueError("worksheet is missing sheetData")
    rows = {}
    for row in sheet_data.findall(f"{XLSX_NS}row"):
        row_ref = row.attrib.get("r")
        if row_ref:
            rows[int(row_ref)] = row
    return rows


def renumber_row(row: ElementTree.Element, new_row_index: int) -> None:
    row.attrib["r"] = str(new_row_index)
    for cell in row.findall(f"{XLSX_NS}c"):
        reference = cell.attrib.get("r")
        if reference:
            cell.attrib["r"] = update_cell_reference(reference, new_row_index)


def rewrite_sheet(
    workbook: Path,
    sheet_path: str,
    header_end_index: int,
    body_start_index: int,
    selected_body_indexes: list[int],
    max_column: int,
) -> bytes:
    ElementTree.register_namespace("", XLSX_NS.strip("{}"))
    with zipfile.ZipFile(workbook) as archive:
        root = ElementTree.fromstring(archive.read(sheet_path))

    sheet_data = root.find(f"{XLSX_NS}sheetData")
    if sheet_data is None:
        raise ValueError("worksheet is missing sheetData")

    selected = set(selected_body_indexes)
    next_body_index = body_start_index
    for row in list(sheet_data.findall(f"{XLSX_NS}row")):
        original_index = int(row.attrib.get("r", "0"))
        if original_index <= header_end_index:
            continue
        if original_index not in selected:
            sheet_data.remove(row)
            continue
        renumber_row(row, next_body_index)
        next_body_index += 1

    dimension = root.find(f"{XLSX_NS}dimension")
    if dimension is not None:
        last_row = max(header_end_index, next_body_index - 1)
        dimension.attrib["ref"] = f"A1:{column_letters(max_column)}{last_row}"

    return ElementTree.tostring(root, encoding="utf-8", xml_declaration=True)


def copy_xlsx_with_rewritten_sheet(source: Path, destination: Path, sheet_path: str, sheet_xml: bytes) -> None:
    destination.parent.mkdir(parents=True, exist_ok=True)
    with tempfile.NamedTemporaryFile(
        dir=destination.parent,
        prefix=f".{destination.stem}.",
        suffix=".xlsx",
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


def load_workbook_rows(path: Path) -> tuple[str, str, list[dict], int]:
    with zipfile.ZipFile(path) as archive:
        strings = shared_strings(archive)
        red_styles = red_style_indexes(archive)
        red_fill_styles = red_fill_style_indexes(archive)
        paths = workbook_sheet_paths(archive)
        if not paths:
            raise ValueError(f"{path}: no worksheets found")
        sheet_name, sheet_path = next(iter(paths.items()))
        rows, max_column = sheet_rows(archive, sheet_path, strings, red_styles, red_fill_styles)
    return sheet_name, sheet_path, rows, max_column


def write_audit_csv(path: Path, decisions: list[RowDecision]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open("w", newline="", encoding="utf-8") as handle:
        writer = csv.writer(handle)
        writer.writerow(["row", "include", "reason", "A", "C", "D", "E"])
        for decision in decisions:
            writer.writerow([
                decision.row_index,
                "true" if decision.include else "false",
                decision.reason,
                decision.values[1],
                decision.values[3],
                decision.values[4],
                decision.values[5],
            ])


def filter_workbook(source: Path, destination: Path, audit_csv: Path | None, dry_run: bool) -> None:
    sheet_name, sheet_path, rows, max_column = load_workbook_rows(source)
    header_position = ncpr_header_row_position(rows)
    header_rows = rows[header_position:header_position + 2]
    body_rows = rows[header_position + 2:]
    if len(header_rows) != 2:
        raise ValueError(f"{source}: expected two NCPR header rows")
    if not body_rows:
        raise ValueError(f"{source}: no body rows found")

    decisions = [classify_row(row) for row in body_rows]
    selected_indexes = [decision.row_index for decision in decisions if decision.include]
    if not selected_indexes:
        raise ValueError(f"{source}: no vaccine rows selected")

    if audit_csv:
        write_audit_csv(audit_csv, decisions)

    print(f"{source.relative_to(ROOT)}")
    print(f"  sheet: {sheet_name}")
    print(f"  body rows: {len(body_rows)}")
    print(f"  selected vaccine rows: {len(selected_indexes)}")
    for decision in decisions:
        if decision.include:
            product = decision.values[3].split(",", 1)[0]
            print(f"    row {decision.row_index}: {product} ({decision.reason})")

    if dry_run:
        return

    sheet_xml = rewrite_sheet(
        workbook=source,
        sheet_path=sheet_path,
        header_end_index=header_rows[-1]["index"],
        body_start_index=body_rows[0]["index"],
        selected_body_indexes=selected_indexes,
        max_column=max_column,
    )
    copy_xlsx_with_rewritten_sheet(source, destination, sheet_path, sheet_xml)
    print(f"  wrote: {destination.relative_to(ROOT)}")


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Filter an NCPR workbook to vaccine rows.")
    parser.add_argument("--input", type=Path, default=DEFAULT_INPUT, help="source NCPR .xlsx workbook")
    parser.add_argument("--output", type=Path, default=DEFAULT_OUTPUT, help="filtered .xlsx workbook")
    parser.add_argument("--audit-csv", type=Path, help="optional CSV with per-row decisions")
    parser.add_argument("--dry-run", action="store_true", help="print selected rows without writing output")
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    source = args.input if args.input.is_absolute() else ROOT / args.input
    destination = args.output if args.output.is_absolute() else ROOT / args.output
    audit_csv = None
    if args.audit_csv:
        audit_csv = args.audit_csv if args.audit_csv.is_absolute() else ROOT / args.audit_csv
    filter_workbook(source, destination, audit_csv, args.dry_run)


if __name__ == "__main__":
    main()
