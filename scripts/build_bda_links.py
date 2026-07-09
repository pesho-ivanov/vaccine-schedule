#!/usr/bin/env python3
from __future__ import annotations

import argparse
import csv
import re
import xml.etree.ElementTree as ET
import zipfile
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urljoin
from urllib.request import Request, urlopen


ROOT = Path(__file__).resolve().parents[1]
DEFAULT_INPUT = ROOT / "data/bda/IAL_Register_05_2026_J07.xlsx"
DEFAULT_OUTPUT = ROOT / "data/bda/links.csv"
DEFAULT_CACHE_DIR = ROOT / ".cache/bda-bdias"
BDA_BASE_URL = "https://www.bda.bg/images/stories/documents/bdias/"
PAGE_NAMES = ("5", *"ABCDEFGHIJKLMNOPQRSTUVWXYZ")
XLSX_NS = "{http://schemas.openxmlformats.org/spreadsheetml/2006/main}"
USER_AGENT = "Mozilla/5.0"


class TableParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.rows: list[list[dict[str, list[str]]]] = []
        self._row: list[dict[str, list[str]]] | None = None
        self._cell: dict[str, list[str]] | None = None

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        if tag.lower() == "tr":
            self._row = []
        elif tag.lower() == "td" and self._row is not None:
            self._cell = {"text": [], "hrefs": []}
        elif tag.lower() == "a" and self._cell is not None:
            href = dict(attrs).get("href")
            if href:
                self._cell["hrefs"].append(href)

    def handle_data(self, data: str) -> None:
        if self._cell is not None:
            self._cell["text"].append(data)

    def handle_endtag(self, tag: str) -> None:
        if tag.lower() == "td" and self._row is not None and self._cell is not None:
            self._row.append(self._cell)
            self._cell = None
        elif tag.lower() == "tr" and self._row is not None:
            self.rows.append(self._row)
            self._row = None
            self._cell = None


def column_index(cell_ref: str) -> int:
    number = 0
    for char in "".join(ch for ch in cell_ref if ch.isalpha()):
        number = number * 26 + ord(char.upper()) - ord("A") + 1
    return number


def shared_strings(archive: zipfile.ZipFile) -> list[str]:
    if "xl/sharedStrings.xml" not in archive.namelist():
        return []

    root = ET.fromstring(archive.read("xl/sharedStrings.xml"))
    strings = []
    for item in root.findall(f"{XLSX_NS}si"):
        strings.append("".join(text.text or "" for text in item.iter(f"{XLSX_NS}t")))
    return strings


def cell_text(cell: ET.Element, strings: list[str]) -> str:
    if cell.attrib.get("t") == "inlineStr":
        return "".join(text.text or "" for text in cell.iter(f"{XLSX_NS}t")).strip()

    value = cell.find(f"{XLSX_NS}v")
    if value is None:
        return ""

    text = value.text or ""
    if cell.attrib.get("t") == "s":
        return strings[int(text)].strip()
    return text.strip()


def workbook_rows(path: Path) -> list[dict[int, str]]:
    with zipfile.ZipFile(path) as archive:
        strings = shared_strings(archive)
        sheet_path = next(
            name
            for name in archive.namelist()
            if name.startswith("xl/worksheets/sheet") and name.endswith(".xml")
        )
        root = ET.fromstring(archive.read(sheet_path))

    rows = []
    for row in root.find(f"{XLSX_NS}sheetData").findall(f"{XLSX_NS}row"):
        cells = {}
        for cell in row.findall(f"{XLSX_NS}c"):
            text = cell_text(cell, strings)
            if text:
                cells[column_index(cell.attrib["r"])] = text
        rows.append(cells)
    return rows


def registration_numbers(path: Path) -> list[str]:
    rows = workbook_rows(path)
    header_row = next(row for row in rows if "Рег. №" in row.values())
    reg_column = next(index for index, value in header_row.items() if value == "Рег. №")
    body_rows = rows[rows.index(header_row) + 1 :]

    registrations = []
    seen = set()
    for row in body_rows:
        registration = row.get(reg_column, "").strip()
        if registration and registration not in seen:
            seen.add(registration)
            registrations.append(registration)
    return registrations


def read_or_download(cache_dir: Path, page_name: str, suffix: str, download: bool) -> str:
    cache_dir.mkdir(parents=True, exist_ok=True)
    path = cache_dir / f"{page_name}-{suffix}.htm"
    if download or not path.is_file():
        url = f"{BDA_BASE_URL}{page_name}-{suffix}.htm"
        request = Request(url, headers={"User-Agent": USER_AGENT})
        path.write_bytes(urlopen(request, timeout=30).read())
    return path.read_bytes().decode("windows-1251", errors="replace")


def clean_text(parts: list[str]) -> str:
    return re.sub(r"\s+", " ", "".join(parts).replace("\xa0", " ")).strip()


def canonical_url(url: str) -> str:
    return (
        url.replace("http://www.bda.bg/", "https://www.bda.bg/")
        .replace("http://bda.bg/", "https://www.bda.bg/")
        .replace("https://bda.bg/", "https://www.bda.bg/")
    )


def pdf_links(cache_dir: Path, suffix: str, download: bool) -> dict[str, list[str]]:
    links: dict[str, set[str]] = {}
    for page_name in PAGE_NAMES:
        parser = TableParser()
        parser.feed(read_or_download(cache_dir, page_name, suffix, download))
        for row in parser.rows:
            if len(row) < 4:
                continue

            registration = clean_text(row[2]["text"])
            if not re.fullmatch(r"\d{6,}", registration):
                continue

            href = next((item for item in row[3]["hrefs"] if item.lower().endswith(".pdf")), "")
            if not href:
                continue

            links.setdefault(registration, set()).add(canonical_url(urljoin(BDA_BASE_URL, href)))
    return {registration: sorted(urls) for registration, urls in links.items()}


def pdf_date_key(url: str) -> tuple[str, str]:
    match = re.search(r"/(\d{4}-\d{2}-\d{2})-\d+q?\.pdf$", url)
    return (match.group(1) if match else "", url)


def newest_pdf(urls: list[str]) -> str:
    if not urls:
        return ""
    return max(urls, key=pdf_date_key)


def build_links(input_path: Path, output_path: Path, cache_dir: Path, download: bool) -> None:
    registrations = registration_numbers(input_path)
    listovki_links = pdf_links(cache_dir, "2", download)
    khp_links = pdf_links(cache_dir, "1", download)

    output_path.parent.mkdir(parents=True, exist_ok=True)
    with output_path.open("w", encoding="utf-8", newline="") as output_file:
        writer = csv.DictWriter(
            output_file,
            fieldnames=["Reg. No.", "listovki", "khp"],
            lineterminator="\n",
        )
        writer.writeheader()
        for registration in registrations:
            writer.writerow(
                {
                    "Reg. No.": registration,
                    "listovki": newest_pdf(listovki_links.get(registration, [])),
                    "khp": newest_pdf(khp_links.get(registration, [])),
                }
            )

    missing_listovki = [registration for registration in registrations if registration not in listovki_links]
    missing_khp = [registration for registration in registrations if registration not in khp_links]
    print(f"wrote {output_path.relative_to(ROOT)}")
    print(f"registrations: {len(registrations)}")
    print(f"missing listovki: {', '.join(missing_listovki) if missing_listovki else 'none'}")
    print(f"missing khp: {', '.join(missing_khp) if missing_khp else 'none'}")


def main() -> None:
    parser = argparse.ArgumentParser(description="Build BDA patient leaflet and KHP links for J07 registrations.")
    parser.add_argument("--input", type=Path, default=DEFAULT_INPUT)
    parser.add_argument("--output", type=Path, default=DEFAULT_OUTPUT)
    parser.add_argument("--cache-dir", type=Path, default=DEFAULT_CACHE_DIR)
    parser.add_argument(
        "--no-download",
        action="store_true",
        help="Use already cached BDA letter pages instead of downloading them.",
    )
    args = parser.parse_args()

    input_path = args.input if args.input.is_absolute() else ROOT / args.input
    output_path = args.output if args.output.is_absolute() else ROOT / args.output
    cache_dir = args.cache_dir if args.cache_dir.is_absolute() else ROOT / args.cache_dir
    build_links(input_path, output_path, cache_dir, not args.no_download)


if __name__ == "__main__":
    main()
