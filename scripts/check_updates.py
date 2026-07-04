#!/usr/bin/env python3
from __future__ import annotations

import argparse
import html
import re
import sys
import urllib.request
import zipfile
from dataclasses import dataclass
from pathlib import Path
from typing import Any
from urllib.parse import unquote, urljoin, urlparse
from xml.etree import ElementTree

import yaml

from split_change_notes import split_change_notes


ROOT = Path(__file__).resolve().parents[1]
DEFAULT_MANIFEST = ROOT / "data/his/vaccine-specifications.yaml"
DEFAULT_CHANGE_NOTES_DIR = ROOT / "data/his/change-notes"
XLSX_NS = "{http://schemas.openxmlformats.org/spreadsheetml/2006/main}"
USER_AGENT = "vaccine-schedule-update-check/1.0"


@dataclass(frozen=True)
class HisRelease:
    source_url: str
    version: str
    date: str


def read_manifest(path: Path) -> dict[str, Any]:
    with path.open(encoding="utf-8") as handle:
        manifest = yaml.safe_load(handle) or {}
    if not isinstance(manifest, dict):
        raise ValueError(f"{path}: expected mapping")
    return manifest


def write_manifest(path: Path, manifest: dict[str, Any]) -> None:
    path.write_text(
        yaml.safe_dump(manifest, allow_unicode=True, sort_keys=False),
        encoding="utf-8",
    )


def fetch_bytes(url: str) -> bytes:
    request = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
    with urllib.request.urlopen(request, timeout=60) as response:
        return response.read()


def fetch_text(url: str) -> str:
    request = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
    with urllib.request.urlopen(request, timeout=30) as response:
        charset = response.headers.get_content_charset() or "utf-8"
        return response.read().decode(charset, errors="replace")


def normalized_page_text(text: str) -> str:
    return html.unescape(unquote(text))


def absolute_url(base_url: str, href: str) -> str:
    return urljoin(base_url, html.unescape(href))


def source_path(source_url: str) -> str:
    return unquote(urlparse(source_url).path)


def artifact_name(nomenclatures_date: str) -> str:
    day, month, year = nomenclatures_date.split(".")
    return f"HIS-nomenclatures-{year}.{month}.{day}.xlsx"


def xlsx_sheet_names(path: Path) -> set[str]:
    with zipfile.ZipFile(path) as archive:
        workbook = archive.read("xl/workbook.xml")
    root = ElementTree.fromstring(workbook)
    return {
        sheet.attrib["name"]
        for sheet in root.iter(f"{XLSX_NS}sheet")
        if "name" in sheet.attrib
    }


def require_contains(haystack: str, needle: str, label: str) -> None:
    if needle not in haystack:
        raise ValueError(f"missing {label}: {needle}")


def find_specs_release(page: str, page_url: str) -> HisRelease:
    section = page.find("Номенклатури - Информативна Спецификация")
    if section < 0:
        raise ValueError("HIS specifications page: missing nomenclature section")
    snippet = page[section : section + 2000]
    match = re.search(
        r'Продукционна среда:.*?<a href="([^"]+)">v?([^<]+)</a>\s*от\s*(\d{2}\.\d{2}\.\d{4})',
        snippet,
        flags=re.DOTALL,
    )
    if not match:
        raise ValueError("HIS specifications page: missing production nomenclature release")
    return HisRelease(
        source_url=absolute_url(page_url, match.group(1)),
        version=match.group(2).strip(),
        date=match.group(3).strip(),
    )


def find_nomenclatures_release(page: str, page_url: str) -> HisRelease:
    match = re.search(
        r'<a href="([^"]+)" class="card-download__link">\s*Всички номенклатури\s*</a>',
        page,
    )
    if not match:
        raise ValueError("HIS nomenclatures page: missing workbook download link")

    metadata = re.findall(
        r'card-download__meta-data">\s*([^<]+)\s*</span>',
        page[match.end() : match.end() + 1200],
    )
    if len(metadata) < 2:
        raise ValueError("HIS nomenclatures page: missing workbook version/date")

    return HisRelease(
        source_url=absolute_url(page_url, match.group(1)),
        version=metadata[0].strip(),
        date=metadata[1].strip(),
    )


def check_pages(
    specs_page: str,
    specs_release: HisRelease,
    nomenclatures_page: str,
    nomenclatures_release: HisRelease,
    required_sheets: list[str],
) -> None:
    if specs_release.version != nomenclatures_release.version:
        raise ValueError(
            "HIS specifications and nomenclatures pages disagree on version: "
            f"{specs_release.version} != {nomenclatures_release.version}"
        )
    if source_path(specs_release.source_url) != source_path(nomenclatures_release.source_url):
        raise ValueError("HIS specifications and nomenclatures pages point to different workbooks")

    normalized_specs = normalized_page_text(specs_page)
    normalized_nomenclatures = normalized_page_text(nomenclatures_page)
    require_contains(
        normalized_specs,
        "Номенклатури - Информативна Спецификация",
        "HIS nomenclature specification section",
    )
    for sheet in required_sheets:
        require_contains(normalized_nomenclatures, sheet, f"HIS nomenclature sheet {sheet}")


def check_artifact(path: Path, required_sheets: list[str]) -> None:
    if not path.is_file():
        raise FileNotFoundError(f"missing HIS artifact: {path}")
    missing = sorted(set(required_sheets) - xlsx_sheet_names(path))
    if missing:
        raise ValueError(f"{path.name}: missing XLSX sheets: {', '.join(missing)}")


def manifest_is_current(
    manifest: dict[str, Any],
    specs_release: HisRelease,
    nomenclatures_release: HisRelease,
) -> bool:
    return (
        str(manifest.get("source_url")) == nomenclatures_release.source_url
        and str(manifest.get("his_version")) == nomenclatures_release.version
        and str(manifest.get("nomenclatures_date")) == nomenclatures_release.date
        and str(manifest.get("specifications_date")) == specs_release.date
        and str(manifest.get("artifact")) == artifact_name(nomenclatures_release.date)
    )


def download_current_artifact(
    manifest_path: Path,
    manifest: dict[str, Any],
    specs_release: HisRelease,
    nomenclatures_release: HisRelease,
) -> Path:
    artifact = manifest_path.parent / artifact_name(nomenclatures_release.date)
    tmp = artifact.with_suffix(".xlsx.tmp")
    tmp.write_bytes(fetch_bytes(nomenclatures_release.source_url))
    tmp.replace(artifact)

    previous_artifact = manifest_path.parent / str(manifest.get("artifact", ""))
    if previous_artifact != artifact and previous_artifact.is_file():
        previous_artifact.unlink()

    updated = dict(manifest)
    updated["artifact"] = artifact.name
    updated["source_url"] = nomenclatures_release.source_url
    updated["his_version"] = nomenclatures_release.version
    updated["nomenclatures_date"] = nomenclatures_release.date
    updated["specifications_date"] = specs_release.date
    write_manifest(manifest_path, updated)
    return artifact


def check_his_vaccine_nomenclatures(manifest_path: Path) -> bool:
    manifest = read_manifest(manifest_path)
    pages = manifest["pages"]
    specs_url = str(pages["specifications"])
    nomenclatures_url = str(pages["nomenclatures"])
    required_sheets = [str(sheet) for sheet in manifest["required_sheets"]]

    specs_page = fetch_text(specs_url)
    nomenclatures_page = fetch_text(nomenclatures_url)
    specs_release = find_specs_release(specs_page, specs_url)
    nomenclatures_release = find_nomenclatures_release(nomenclatures_page, nomenclatures_url)
    check_pages(
        specs_page,
        specs_release,
        nomenclatures_page,
        nomenclatures_release,
        required_sheets,
    )

    current_artifact = manifest_path.parent / str(manifest.get("artifact", ""))
    needs_update = not manifest_is_current(manifest, specs_release, nomenclatures_release)
    if not current_artifact.is_file():
        needs_update = True

    if needs_update:
        artifact = download_current_artifact(manifest_path, manifest, specs_release, nomenclatures_release)
        check_artifact(artifact, required_sheets)
        split_change_notes(manifest_path, DEFAULT_CHANGE_NOTES_DIR)
        print(f"Updated HIS vaccine nomenclature artifact: {artifact}")
        return True

    check_artifact(current_artifact, required_sheets)
    return False


def main() -> int:
    parser = argparse.ArgumentParser(description="Check committed external reference data for updates")
    parser.add_argument("--manifest", type=Path, default=DEFAULT_MANIFEST)
    args = parser.parse_args()

    updated = check_his_vaccine_nomenclatures(args.manifest)
    if updated:
        print("External reference data was updated. Review and commit the changes.")
        return 1

    print("External reference data is current")
    return 0


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except Exception as error:
        print(f"error: {error}", file=sys.stderr)
        raise SystemExit(1)
