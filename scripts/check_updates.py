#!/usr/bin/env python3
from __future__ import annotations

import argparse
import html
import sys
import urllib.request
import zipfile
from pathlib import Path
from typing import Any
from urllib.parse import unquote, urlparse
from xml.etree import ElementTree

import yaml


ROOT = Path(__file__).resolve().parents[1]
DEFAULT_MANIFEST = ROOT / "data/his/vaccine-specifications.yaml"
TABLE_NS = "{urn:oasis:names:tc:opendocument:xmlns:table:1.0}"


def read_manifest(path: Path) -> dict[str, Any]:
    with path.open(encoding="utf-8") as handle:
        manifest = yaml.safe_load(handle) or {}
    if not isinstance(manifest, dict):
        raise ValueError(f"{path}: expected mapping")
    return manifest


def fetch_text(url: str) -> str:
    request = urllib.request.Request(
        url,
        headers={"User-Agent": "vaccine-schedule-his-check/1.0"},
    )
    with urllib.request.urlopen(request, timeout=30) as response:
        charset = response.headers.get_content_charset() or "utf-8"
        return response.read().decode(charset, errors="replace")


def ods_sheet_names(path: Path) -> set[str]:
    with zipfile.ZipFile(path) as archive:
        content = archive.read("content.xml")
    root = ElementTree.fromstring(content)
    return {
        table.attrib[f"{TABLE_NS}name"]
        for table in root.iter(f"{TABLE_NS}table")
        if f"{TABLE_NS}name" in table.attrib
    }


def normalized_page_text(text: str) -> str:
    return html.unescape(unquote(text))


def source_path_variants(source_url: str) -> set[str]:
    parsed = urlparse(source_url)
    path = parsed.path
    return {path, unquote(path)}


def require_contains(haystack: str, needles: set[str] | list[str], label: str) -> None:
    for needle in needles:
        if needle in haystack:
            return
    raise ValueError(f"missing {label}: {' or '.join(needles)}")


def check_specs_page(page: str, manifest: dict[str, Any]) -> None:
    source_url = str(manifest["source_url"])
    version = str(manifest["his_version"])
    date = str(manifest["specifications_date"])
    normalized = normalized_page_text(page)

    require_contains(page, source_path_variants(source_url), "HIS production nomenclature workbook link")
    require_contains(normalized, [f"v{version}", version], "HIS nomenclature version")
    require_contains(normalized, [date], "HIS specifications page date")
    require_contains(normalized, ["Номенклатури - Информативна Спецификация"], "HIS nomenclature specification section")


def check_nomenclatures_page(page: str, manifest: dict[str, Any]) -> None:
    source_url = str(manifest["source_url"])
    version = str(manifest["his_version"])
    date = str(manifest["nomenclatures_date"])
    required_sheets = [str(sheet) for sheet in manifest["required_sheets"]]
    normalized = normalized_page_text(page)

    require_contains(page, {source_url, *source_path_variants(source_url)}, "HIS nomenclature workbook link")
    require_contains(normalized, [version], "HIS nomenclature version")
    require_contains(normalized, [date], "HIS nomenclature date")
    for sheet in required_sheets:
        require_contains(normalized, [sheet], f"HIS nomenclature sheet {sheet}")


def check_artifact(manifest_path: Path, manifest: dict[str, Any]) -> None:
    artifact = manifest_path.parent / str(manifest["artifact"])
    if not artifact.is_file():
        raise FileNotFoundError(f"missing HIS artifact: {artifact}")

    day, month, year = str(manifest["nomenclatures_date"]).split(".")
    expected_stem = f"HIS-vaccines-{year}.{month}.{day}"
    if artifact.stem != expected_stem:
        raise ValueError(f"{artifact.name}: expected stem {expected_stem}")

    sheet_names = ods_sheet_names(artifact)
    missing = sorted(set(manifest["required_sheets"]) - sheet_names)
    if missing:
        raise ValueError(f"{artifact.name}: missing ODS sheets: {', '.join(missing)}")


def main() -> int:
    parser = argparse.ArgumentParser(description="Check committed external reference data for updates")
    parser.add_argument("--manifest", type=Path, default=DEFAULT_MANIFEST)
    args = parser.parse_args()

    manifest = read_manifest(args.manifest)
    check_artifact(args.manifest, manifest)

    pages = manifest["pages"]
    check_specs_page(fetch_text(str(pages["specifications"])), manifest)
    check_nomenclatures_page(fetch_text(str(pages["nomenclatures"])), manifest)

    print("External reference data is current")
    return 0


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except Exception as error:
        print(f"error: {error}", file=sys.stderr)
        raise SystemExit(1)
