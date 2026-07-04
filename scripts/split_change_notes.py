#!/usr/bin/env python3
from __future__ import annotations

import argparse
import csv
import re
import shutil
import zipfile
from pathlib import Path
from typing import Any
from xml.etree import ElementTree

import yaml


ROOT = Path(__file__).resolve().parents[1]
DEFAULT_MANIFEST = ROOT / "data/his/vaccine-specifications.yaml"
DEFAULT_OUTPUT_DIR = ROOT / "data/his/change-notes"
XLSX_NS = "{http://schemas.openxmlformats.org/spreadsheetml/2006/main}"
XLSX_REL_NS = "{http://schemas.openxmlformats.org/officeDocument/2006/relationships}"
PACKAGE_REL_NS = "{http://schemas.openxmlformats.org/package/2006/relationships}"
VACCINE_NOMENCLATURE_CODES = ("CL037", "CL038", "CL082")
VACCINE_NOMENCLATURE_RE = re.compile(
    r"\b(?:" + "|".join(re.escape(code) for code in VACCINE_NOMENCLATURE_CODES) + r")\b",
    re.IGNORECASE,
)
VACCINE_KEYWORDS = ("ваксин", "имуниз", "vaccin", "immuni")


def read_manifest(path: Path) -> dict[str, Any]:
    with path.open(encoding="utf-8") as handle:
        manifest = yaml.safe_load(handle) or {}
    if not isinstance(manifest, dict):
        raise ValueError(f"{path}: expected mapping")
    return manifest


def column_number(cell_reference: str) -> int:
    match = re.match(r"([A-Z]+)", cell_reference)
    if not match:
        raise ValueError(f"invalid XLSX cell reference: {cell_reference}")

    number = 0
    for char in match.group(1):
        number = number * 26 + ord(char) - ord("A") + 1
    return number


def shared_strings(archive: zipfile.ZipFile) -> list[str]:
    if "xl/sharedStrings.xml" not in archive.namelist():
        return []

    root = ElementTree.fromstring(archive.read("xl/sharedStrings.xml"))
    strings = []
    for item in root.iter(f"{XLSX_NS}si"):
        strings.append("".join(text.text or "" for text in item.iter(f"{XLSX_NS}t")))
    return strings


def workbook_sheet_paths(archive: zipfile.ZipFile) -> dict[str, str]:
    workbook = ElementTree.fromstring(archive.read("xl/workbook.xml"))
    relationships = ElementTree.fromstring(archive.read("xl/_rels/workbook.xml.rels"))
    targets_by_id = {
        relationship.attrib["Id"]: relationship.attrib["Target"]
        for relationship in relationships.iter(f"{PACKAGE_REL_NS}Relationship")
    }

    paths = {}
    for sheet in workbook.iter(f"{XLSX_NS}sheet"):
        name = sheet.attrib.get("name")
        relationship_id = sheet.attrib.get(f"{XLSX_REL_NS}id")
        if not name or not relationship_id:
            continue
        target = targets_by_id[relationship_id].lstrip("/")
        paths[name] = target if target.startswith("xl/") else f"xl/{target}"
    return paths


def normalized_cell_text(value: str) -> str:
    return value.replace("\xa0", " ").strip()


def cell_text(cell: ElementTree.Element, strings: list[str]) -> str:
    cell_type = cell.attrib.get("t")
    if cell_type == "inlineStr":
        return normalized_cell_text("".join(text.text or "" for text in cell.iter(f"{XLSX_NS}t")))

    value = cell.find(f"{XLSX_NS}v")
    if value is None or value.text is None:
        return ""

    if cell_type == "s":
        return normalized_cell_text(strings[int(value.text)])
    if cell_type == "b":
        return "TRUE" if value.text == "1" else "FALSE"
    return normalized_cell_text(value.text)


def sheet_rows(
    archive: zipfile.ZipFile,
    sheet_path: str,
    strings: list[str],
) -> list[dict[int, str]]:
    root = ElementTree.fromstring(archive.read(sheet_path))
    rows: list[dict[int, str]] = []

    for row in root.iter(f"{XLSX_NS}row"):
        cells: dict[int, str] = {}
        for cell in row.iter(f"{XLSX_NS}c"):
            reference = cell.attrib.get("r")
            if not reference:
                continue
            value = cell_text(cell, strings)
            if value:
                cells[column_number(reference)] = value
        if cells:
            rows.append(cells)

    return rows


def version_slug(version: str) -> str:
    match = re.search(r"(\d+(?:\.\d+)+)", version)
    if not match:
        return re.sub(r"[^A-Za-z0-9._-]+", "-", version).strip("-").lower()
    return f"v{match.group(1)}"


def version_value(version: str) -> str:
    return re.sub(r"^Версия\s+", "", version).strip()


def regards_vaccines(text: str) -> bool:
    if VACCINE_NOMENCLATURE_RE.search(text):
        return True

    normalized = text.casefold()
    return any(keyword in normalized for keyword in VACCINE_KEYWORDS)


def codex_translate_change(text: str) -> str:
    translated = text.replace("номенклaтура", "номенклатура").replace("CL011на", "CL011 на")
    phrase_replacements = [
        (
            "Коригирани имената на таблиците за всяка номенклатура с цел по-ясно заначение на всяка колона.",
            "Corrected the table names for each nomenclature to make each column meaning clearer.",
        ),
        (
            "Коригирани имената на таблиците за всяка номенклатура с цел по-ясно значение на всяка колона.",
            "Corrected the table names for each nomenclature to make each column meaning clearer.",
        ),
        ("Изцяло преработена номенклатура", "Completely reworked nomenclature"),
        ("Изцяло преработена номенкалтура", "Completely reworked nomenclature"),
        ("Променена изцяло номенклатура", "Completely changed nomenclature"),
        ("Реконструирана номенклатура", "Reconstructed nomenclature"),
        ("Актуализирана номенклатура", "Updated nomenclature"),
        ("Актуализирани данни в", "Updated data in"),
        ("Актуализирани данните в", "Updated the data in"),
        ("Добавени нови мапинги към", "Added new mappings to"),
        ("Коригирани мапинги между", "Corrected mappings between"),
        ("Коригирани номера на разрешителни за всички ваксини в", "Corrected permit numbers for all vaccines in"),
        ("Всички лекарствени продукти в", "All medicinal products in"),
        ("маркирани като активни", "marked as active"),
        ("след проверка в", "after verification in"),
        ("Добавен нов ред", "Added new row"),
        ("Добавени нови редове", "Added new rows"),
        ("Добавени нови редове в", "Added new rows in"),
        ("Добавени нови редове", "Added new rows"),
        ("Добавена нова колона", "Added new column"),
        ("Добавени нови Meta data колони", "Added new Meta data columns"),
        ("Добавяне на колона към Meta data", "Added a column to Meta data"),
        ("Добавяне на нови заболявания", "Added new diseases"),
        ("Добавяне на код", "Added code"),
        ("Добавен нов код", "Added new code"),
        ("Добавен код", "Added code"),
        ("Добавени кодове", "Added codes"),
        ("Добавени записи", "Added records"),
        ("Добавен запис", "Added record"),
        ("Добавен ред", "Added row"),
        ("Добавени преводи на", "Added translations for"),
        ("Добавено съобщение", "Added message"),
        ("Добавенo задължително поле", "Added mandatory field"),
        ("Добавена номенклатура", "Added nomenclature"),
        ("Добавена номенклатура", "Added nomenclature"),
        ("Добавена номенклaтура", "Added nomenclature"),
        ("Добавенa номенклатура", "Added nomenclature"),
        ("Създадена номенклатура", "Created nomenclature"),
        ("Създадена нова номенклатура", "Created new nomenclature"),
        ("Премахната номенклатура", "Removed nomenclature"),
        ("Премахната FHIR референция", "Removed FHIR reference"),
        ("Премахнат код", "Removed code"),
        ("Премахнати стойности", "Removed values"),
        ("Премахната стойност", "Removed value"),
        ("Прекратен запис", "Terminated record"),
        ("Прекратени записи", "Terminated records"),
        ("Възстановен запис", "Restored record"),
        ("Коригирани всички", "Corrected all"),
        ("Коригирано наименование на поле", "Corrected field name"),
        ("Коригирано наименование на ред", "Corrected row name"),
        ("Коригирано заглавие", "Corrected title"),
        ("Коригирани имената на таблиците", "Corrected the table names"),
        ("Коригирани едноцифрени мапинги", "Corrected single-digit mappings"),
        ("Коригирани няколко стойности", "Corrected several values"),
        ("Коригирани описания", "Corrected descriptions"),
        ("Коригирана стойност", "Corrected value"),
        ("Коригирана колона", "Corrected column"),
        ("Коригирани данните", "Corrected the data"),
        ("Коригиран мапинг", "Corrected mapping"),
        ("Коригирани редове", "Corrected rows"),
        ("Променена номенклатура", "Changed nomenclature"),
        ("Променено името на номенклатура", "Changed the name of nomenclature"),
        ("Промяна в наименованието", "Change in the name"),
        ("Променени са стойностите", "Changed the values"),
        ("Променени стойности", "Changed values"),
        ("Променен Description", "Changed Description"),
        ("Променен статуса", "Changed status"),
        ("Сменен статуса", "Changed status"),
        ("Сменено името", "Changed the name"),
        ("Сменено име", "Changed name"),
        ("Финализирана номенклатура", "Finalized nomenclature"),
        ("Попълнена номенклатура", "Populated nomenclature"),
        ("Попълнена колона", "Populated column"),
        ("Допълнена номенклатура", "Supplemented nomenclature"),
        ("Допълнена колона", "Supplemented column"),
        ("Премахнати FHIR референции", "Removed FHIR references"),
        ("Добавена референция", "Added reference"),
        ("Премахната референция", "Removed reference"),
        ("Номенклатура", "Nomenclature"),
        ("номенклатурата", "the nomenclature"),
        ("номенклатура", "nomenclature"),
    ]
    for source, replacement in phrase_replacements:
        translated = translated.replace(source, replacement)

    word_replacements = [
        (r"\bпо-ясно заначение\b", "clearer meaning"),
        (r"\bпо-ясно значение\b", "clearer meaning"),
        (r"\bНаправени промени\b", "Made changes"),
        (r"\bДеактивиране\b", "Deactivation"),
        (r"\bАктуализиране\b", "Updating"),
        (r"\bВъзстановяване\b", "Restoration"),
        (r"\bКорекция\b", "Correction"),
        (r"\bКоригирано описание\b", "Corrected description"),
        (r"\bПроменено описанието\b", "Changed the description"),
        (r"\bПроменено името\b", "Changed the name"),
        (r"\bПроменено име\b", "Changed name"),
        (r"\bПремахнато\b", "Removed"),
        (r"\bПромемен\b", "Changed"),
        (r"\bПредефинирана\b", "Redefined"),
        (r"\bКомбинирани номенклатури\b", "Combined nomenclatures"),
        (r"\bКомбинирани\b", "Combined"),
        (r"\bТабове\b", "Tabs"),
        (r"\bСъобщения\b", "Messages"),
        (r"\bса преместени\b", "were moved"),
        (r"\bса добавени\b", "were added"),
        (r"\bса преобразувани\b", "were converted"),
        (r"\bса маркирани\b", "are marked"),
        (r"\bса в червено\b", "are in red"),
        (r"\bе добавена\b", "is added"),
        (r"\bе добавен\b", "is added"),
        (r"\bе преместен\b", "is moved"),
        (r"\bе преименуван\b", "is renamed"),
        (r"\bе променен\b", "is changed"),
        (r"\bе променена\b", "is changed"),
        (r"\bе премахната\b", "is removed"),
        (r"\bе премахнат\b", "is removed"),
        (r"\bе изтрита\b", "is deleted"),
        (r"\bдобавяне\b", "addition"),
        (r"\bпромяна\b", "change"),
        (r"\bпромени\b", "changes"),
        (r"\bкорекция\b", "correction"),
        (r"\bпремахване\b", "removal"),
        (r"\bспиране\b", "discontinuation"),
        (r"\bспиране на кодове\b", "discontinuation of codes"),
        (r"\bпромяна в стойността на\b", "change in the value of"),
        (r"\bстойността на връзката с МКБ код по\b", "the value of the relation with ICD code under"),
        (r"\bвръзката с МКБ код по\b", "the relation with ICD code under"),
        (r"\bМКБ код\b", "ICD code"),
        (r"\bМКБ\b", "ICD"),
        (r"\bНЗОК\b", "NHIF"),
        (r"\bМЗ\b", "Ministry of Health"),
        (r"\bНСИ\b", "NSI"),
        (r"\bНСЦРЛП\b", "NCPRMP"),
        (r"\bНЕЛК\b", "NELC"),
        (r"\bТЕЛК\b", "TELC"),
        (r"\bМОН\b", "Ministry of Education and Science"),
        (r"\bИАМН\b", "Medical Supervision Executive Agency"),
        (r"\bНЗИС\b", "NHIS"),
        (r"\bОбщи Медицински Услуги\b", "General Medical Services"),
        (r"\bМедицински\b", "Medical"),
        (r"\bСпецификация\b", "Specification"),
        (r"\bНоменклатира\b", "Nomenclature"),
        (r"\bНоменкалтура\b", "Nomenclature"),
        (r"\bноменклатурa\b", "nomenclature"),
        (r"\bноменклатури\b", "nomenclatures"),
        (r"\bноменклатурни таблици\b", "nomenclature tables"),
        (r"\bноменлатура\b", "nomenclature"),
        (r"\bноменклатуа\b", "nomenclature"),
        (r"\bспрямо последните данни от\b", "according to the latest data from"),
        (r"\bспрямо новите\b", "compared with the new"),
        (r"\bспрямо\b", "compared with"),
        (r"\bобновена с данни от\b", "updated with data from"),
        (r"\bс информацията предоставена от\b", "with the information provided by"),
        (r"\bкъм последните данни от\b", "to the latest data from"),
        (r"\bпоради допусната техническа грешка\b", "due to a technical error"),
        (r"\bпоради смяна\b", "due to a change"),
        (r"\bпоради\b", "due to"),
        (r"\bпо отношение на\b", "regarding"),
        (r"\bотношение\b", "regarding"),
        (r"\bпри които\b", "for which"),
        (r"\bкоито бяха\b", "that were"),
        (r"\bкоито са\b", "that are"),
        (r"\bкоито\b", "that"),
        (r"\bтака че\b", "so that"),
        (r"\bтъй като\b", "because"),
        (r"\bкато\b", "as"),
        (r"\bче\b", "that"),
        (r"\bтова\b", "this"),
        (r"\bт.е.\b", "i.e."),
        (r"\bкъм\b", "to"),
        (r"\bмежду\b", "between"),
        (r"\bвъв връзка с\b", "in relation to"),
        (r"\bвръзка\b", "relation"),
        (r"\bвръзката\b", "the relation"),
        (r"\bсъгласно\b", "according to"),
        (r"\bв съответствие с\b", "in accordance with"),
        (r"\bс цел\b", "to"),
        (r"\bза да няма\b", "so there is no"),
        (r"\bза всяка\b", "for each"),
        (r"\bвсяка\b", "each"),
        (r"\bвсички\b", "all"),
        (r"\bна всички\b", "of all"),
        (r"\bна ФИНАЛИЗИРАНА\b", "to FINALIZED"),
        (r"\bза всички\b", "for all"),
        (r"\bпо\b", "by"),
        (r"\bот\b", "from"),
        (r"\bдо\b", "until"),
        (r"\bстава\b", "becomes"),
        (r"\bследните\b", "the following"),
        (r"\bслед\b", "after"),
        (r"\bсчитано\b", "effective"),
        (r"\bпреди беше представена\b", "was previously presented"),
        (r"\bбеше представена\b", "was presented"),
        (r"\bлипсваше\b", "was missing"),
        (r"\bостават\b", "remain"),
        (r"\bостава\b", "remains"),
        (r"\bне\b", "not"),
        (r"\bсамо\b", "only"),
        (r"\bредове\b", "rows"),
        (r"\bреда\b", "rows"),
        (r"\bред\b", "row"),
        (r"\bколони\b", "columns"),
        (r"\bколоната\b", "the column"),
        (r"\bколона\b", "column"),
        (r"\bфайл\b", "file"),
        (r"\bфайла\b", "file"),
        (r"\bполе\b", "field"),
        (r"\bполета\b", "fields"),
        (r"\bстойностите\b", "values"),
        (r"\bстойности\b", "values"),
        (r"\bстойността\b", "the value"),
        (r"\bстойност\b", "value"),
        (r"\bзаписи\b", "records"),
        (r"\bзапис\b", "record"),
        (r"\bключове\b", "keys"),
        (r"\bключа\b", "key"),
        (r"\bключът\b", "the key"),
        (r"\bключ\b", "key"),
        (r"\bкодове\b", "codes"),
        (r"\bкод\b", "code"),
        (r"\bмапинги\b", "mappings"),
        (r"\bмапинг\b", "mapping"),
        (r"\bнаправление\b", "referral"),
        (r"\bе-направление\b", "e-referral"),
        (r"\bе-рецепта\b", "e-prescription"),
        (r"\bсъобщения\b", "messages"),
        (r"\bсъобщение\b", "message"),
        (r"\bстатус\b", "status"),
        (r"\bстатуса\b", "status"),
        (r"\bтаблиците\b", "tables"),
        (r"\bимена\b", "names"),
        (r"\bимената\b", "names"),
        (r"\bимето\b", "the name"),
        (r"\bиме\b", "name"),
        (r"\bнаименованието\b", "the name"),
        (r"\bнаименование\b", "name"),
        (r"\bразлични\b", "different"),
        (r"\bотделни\b", "separate"),
        (r"\bотделните\b", "individual"),
        (r"\bнови\b", "new"),
        (r"\bновите\b", "new"),
        (r"\bнова\b", "new"),
        (r"\bновата\b", "new"),
        (r"\bнов\b", "new"),
        (r"\bстарите\b", "old"),
        (r"\bотменените\b", "canceled"),
        (r"\bвалидни\b", "valid"),
        (r"\bвалидност\b", "validity"),
        (r"\bфинализирана\b", "finalized"),
        (r"\bФИНАЛИЗИРАНА\b", "FINALIZED"),
        (r"\bлекарствени продукти\b", "medicinal products"),
        (r"\bпродуктите\b", "products"),
        (r"\bваксини\b", "vaccines"),
        (r"\bваксина\b", "vaccine"),
        (r"\bваксината\b", "the vaccine"),
        (r"\bпротивогрипни\b", "influenza"),
        (r"\bпневмококови\b", "pneumococcal"),
        (r"\bварицела\b", "varicella"),
        (r"\bкоклюш\b", "pertussis"),
        (r"\bРСВ\b", "RSV"),
        (r"\bбременни\b", "pregnant women"),
        (r"\bимунизации\b", "immunizations"),
        (r"\bимунизационните\b", "immunization"),
        (r"\bимунизация\b", "immunization"),
        (r"\bпрограми\b", "programs"),
        (r"\bпрограма\b", "program"),
        (r"\bзаболявания\b", "diseases"),
        (r"\bЗаразните болести\b", "Infectious Diseases"),
        (r"\bзаразни заболявания\b", "infectious diseases"),
        (r"\bзаразни\b", "infectious"),
        (r"\bзаразно заболяване\b", "infectious disease"),
        (r"\bредки заболявания\b", "rare diseases"),
        (r"\bредки\b", "rare"),
        (r"\bрегистър\b", "registry"),
        (r"\bслучаите\b", "cases"),
        (r"\bслучаи\b", "cases"),
        (r"\bкатегоризация\b", "categorization"),
        (r"\bданните\b", "data"),
        (r"\bданни\b", "data"),
        (r"\bописания\b", "descriptions"),
        (r"\bописанието\b", "the description"),
        (r"\bописание\b", "description"),
        (r"\bпояснение\b", "clarification"),
        (r"\bдобавено пояснение, че е\b", "added clarification that it is"),
        (r"\bСкрийнинг по национална програма\b", "Screening under a national program"),
        (r"\bнационална програма\b", "national program"),
        (r"\bнаредба\b", "regulation"),
        (r"\bзъболекарските дейности\b", "dental activities"),
        (r"\bдейностите\b", "activities"),
        (r"\bдейности\b", "activities"),
        (r"\bдългосрочната грижа\b", "long-term care"),
        (r"\bстойности за\b", "values for"),
        (r"\bинформация за\b", "information about"),
        (r"\bдали конкретния\b", "whether the specific"),
        (r"\bе за\b", "is for"),
        (r"\bе бил\b", "was"),
        (r"\bе\b", "is"),
        (r"\bса\b", "are"),
        (r"\bсе\b", ""),
        (r"\bда\b", "to"),
        (r"\bте\b", ""),
        (r"\bпри мигрирани данни\b", "for migrated data"),
        (r"\bпри\b", "for"),
        (r"\bмигрирани\b", "migrated"),
        (r"\bпоказват в червено\b", "shown in red"),
        (r"\bпоказват правилно\b", "correctly show"),
        (r"\bса с валидност\b", "have validity"),
        (r"\bс валидност\b", "with validity"),
        (r"\bтази дата\b", "this date"),
        (r"\bзастъпване\b", "overlap"),
        (r"\bсъответно\b", "respectively"),
        (r"\bпредоставена\b", "provided"),
        (r"\bрелация\b", "relation"),
        (r"\bгрупата\b", "group"),
        (r"\bгрупа\b", "group"),
        (r"\bмета-данните\b", "metadata"),
        (r"\bмета данните\b", "metadata"),
        (r"\bмета\b", "meta"),
        (r"\bРазделение\b", "Division"),
        (r"\bпроменя\b", "changes"),
        (r"\bверсия\b", "version"),
        (r"\bимаше\b", "had"),
        (r"\bвъзрастови групи\b", "age groups"),
        (r"\bвъзрасти\b", "ages"),
        (r"\bвъзрастта\b", "age"),
        (r"\bвъзраст\b", "age"),
        (r"\bнавършване\b", "turning"),
        (r"\bнавършва\b", "turns"),
        (r"\bгодината\b", "year"),
        (r"\bгодина\b", "year"),
        (r"\bдни\b", "days"),
        (r"\bседмици\b", "weeks"),
        (r"\bпреобразувани\b", "converted"),
        (r"\bвключва\b", "includes"),
        (r"\bздравен експерт\b", "health expert"),
        (r"\bинспектор\b", "inspector"),
        (r"\bстандарт\b", "standard"),
        (r"\bпакети\b", "packages"),
        (r"\bпакет\b", "package"),
        (r"\bтестове\b", "tests"),
        (r"\bизлседванията\b", "tests"),
        (r"\bизследванията\b", "tests"),
        (r"\bналични\b", "available"),
        (r"\bБългария\b", "Bulgaria"),
        (r"\bБългарски\b", "Bulgarian"),
        (r"\bАнглийски\b", "English"),
        (r"\bпреводи\b", "translations"),
        (r"\bезик\b", "language"),
        (r"\bзначението\b", "meaning"),
        (r"\bвъзможността\b", "the possibility"),
        (r"\bприлагане\b", "administration"),
        (r"\bправило\b", "rule"),
        (r"\bправила\b", "rules"),
        (r"\bминимален\b", "minimum"),
        (r"\bинтервал\b", "interval"),
        (r"\bрегистиране\b", "registration"),
        (r"\bмедицински проучвания\b", "medical studies"),
        (r"\bмедицински\b", "medical"),
        (r"\bпроучвания\b", "studies"),
        (r"\bприложение\b", "appendix"),
        (r"\bИзисквания\b", "Requirements"),
        (r"\bсключване\b", "concluding"),
        (r"\bдоговор\b", "contract"),
        (r"\bлечебни заведения\b", "medical institutions"),
        (r"\bоказване\b", "provision"),
        (r"\bдефаулт\b", "default"),
        (r"\bсведена\b", "reduced"),
        (r"\bняколко\b", "several"),
        (r"\bпримерни\b", "sample"),
        (r"\bсинхронизират\b", "synchronize"),
        (r"\bавтоматично\b", "automatically"),
        (r"\bСкрийнинг\b", "Screening"),
        (r"\bпоследна\b", "latest"),
        (r"\bинформация\b", "information"),
        (r"\bинформацията\b", "information"),
        (r"\bРоля\b", "Role"),
        (r"\bотразяваща\b", "reflecting"),
        (r"\bтекущата ситуация\b", "current situation"),
        (r"\bопционална група\b", "optional group"),
        (r"\bопционална\b", "optional"),
        (r"\bопционално\b", "optional"),
        (r"\bхедъра\b", "header"),
        (r"\bразликите\b", "differences"),
        (r"\bмаркирани\b", "marked"),
        (r"\bжълто\b", "yellow"),
        (r"\bНационални програми\b", "National programs"),
        (r"\bНационални\b", "National"),
        (r"\bпреименуван\b", "renamed"),
        (r"\bпреименувана\b", "renamed"),
        (r"\bброй\b", "number"),
        (r"\bброят\b", "number"),
        (r"\bприем\b", "dose"),
        (r"\b1-ви dose\b", "first dose"),
        (r"\b2-ри dose\b", "second dose"),
        (r"\bтрета доза\b", "third dose"),
        (r"\bразширена\b", "expanded"),
        (r"\bъпдейта\b", "update"),
        (r"\bправилно\b", "correctly"),
        (r"\bчервено\b", "red"),
        (r"\bреструктприрана\b", "restructured"),
        (r"\bсъдържа\b", "contains"),
        (r"\bт.е.\b", "i.e."),
        (r"\bбез\b", "without"),
        (r"\bпреминава\b", "moves"),
        (r"\bвъзстановен\b", "restored"),
        (r"\bСИМП\b", "SIMP"),
        (r"\bмедицинска експертиза\b", "medical expertise"),
        (r"\bформата\b", "format"),
        (r"\bотговарят\b", "match"),
        (r"\bструктура\b", "structure"),
        (r"\bнаправено\b", "made"),
        (r"\bнаправен\b", "made"),
        (r"\bзадължително\b", "mandatory"),
        (r"\bусловие\b", "condition"),
        (r"\bпървите два\b", "the first two"),
        (r"\bЛиван\b", "Lebanon"),
        (r"\bинструменти\b", "instruments"),
        (r"\bредовете\b", "rows"),
        (r"\bЕК\b", "EC"),
        (r"\bАктуализация\b", "Update"),
        (r"\bИзравняване\b", "Alignment"),
        (r"\bзаписите\b", "records"),
        (r"\bрамките\b", "within"),
        (r"\bкалендарната\b", "calendar"),
        (r"\bизбягване\b", "avoidance"),
        (r"\bследващ\b", "next"),
        (r"\bвъзможни отговори\b", "possible answers"),
        (r"\bбитово-санитарни\b", "household sanitary"),
        (r"\bлипсваща партида\b", "missing batch"),
        (r"\bнедостатъчно количество\b", "insufficient quantity"),
        (r"\bрядко заболяване\b", "rare disease"),
        (r"\bкодът\b", "the code"),
        (r"\bмапинга\b", "mapping"),
        (r"\bпоследно изпратена\b", "last sent"),
        (r"\bРоля in Здравеопазването\b", "Role in Healthcare"),
        (r"\bЗдравеопазването\b", "Healthcare"),
        (r"\bмного\b", "many"),
        (r"\bкодовете имат сходни\b", "the codes have similar"),
        (r"\bзначително увеличава размера\b", "significantly increases the size"),
        (r"\bдуплицирана\b", "duplicate"),
        (r"\bЗаличени\b", "Deleted"),
        (r"\bброя\b", "number of"),
        (r"\bмаркирана\b", "marked"),
        (r"\bдаваща опция да се добавят\b", "giving an option to add"),
        (r"\bизвън посочената\b", "outside the specified"),
        (r"\bподлежат\b", "are subject"),
        (r"\bразширяване\b", "expansion"),
        (r"\bконкретизиране\b", "specification"),
        (r"\bсменят се\b", "are changed"),
        (r"\bзаменя се\b", "is replaced"),
        (r"\bзаменя\b", "replaces"),
        (r"\bеквивалент\b", "equivalent"),
        (r"\bлатиница\b", "Latin"),
        (r"\bкирилица\b", "Cyrillic"),
        (r"\bизписан\b", "written"),
        (r"\bизписването\b", "spelling"),
        (r"\bпоредност\b", "sequence"),
        (r"\bдозите\b", "doses"),
        (r"\bдози\b", "doses"),
        (r"\bзаявка\b", "request"),
        (r"\bотговор\b", "response"),
        (r"\bпредупреждение\b", "warning"),
        (r"\bлипсващи\b", "missing"),
        (r"\bневалидни\b", "invalid"),
        (r"\bневалиден\b", "invalid"),
        (r"\bнерелевантно\b", "irrelevant"),
        (r"\bнеактивен\b", "inactive"),
        (r"\bлица\b", "persons"),
        (r"\bусловия\b", "conditions"),
        (r"\bбаза\b", "base"),
        (r"\bизползва\b", "uses"),
        (r"\bпрегледи\b", "examinations"),
        (r"\bпреглед\b", "examination"),
        (r"\bрезултата\b", "result"),
        (r"\bрезултат\b", "result"),
        (r"\bкрая\b", "end"),
        (r"\bедна\b", "one"),
        (r"\bчисло\b", "number"),
        (r"\bналичните\b", "available"),
        (r"\bкоято\b", "which"),
        (r"\bтези\b", "these"),
        (r"\bтази\b", "this"),
        (r"\bтака\b", "so"),
        (r"\bдеактивирани\b", "deactivated"),
        (r"\bнационална\b", "national"),
        (r"\bМДД\b", "MDD"),
        (r"\bсменят\b", "change"),
        (r"\bбълг.?рски\b", "Bulgarian"),
        (r"\bдаваща\b", "giving"),
        (r"\bопция\b", "option"),
        (r"\bдобавят\b", "add"),
        (r"\bстартиране\b", "launch"),
        (r"\bвъвеждането\b", "introduction"),
        (r"\bизтичане\b", "expiration"),
        (r"\bсрок\b", "term"),
        (r"\bгодност\b", "validity"),
        (r"\bпоследни\b", "last"),
        (r"\bзакупени\b", "purchased"),
        (r"\bпартиди\b", "batches"),
        (r"\bправилата\b", "rules"),
        (r"\bВъзстановена\b", "Restored"),
        (r"\bспецификацията\b", "specification"),
        (r"\bтекстове\b", "texts"),
        (r"\bключовете\b", "keys"),
        (r"\bКлючовете\b", "Keys"),
        (r"\bПромените\b", "Changes"),
        (r"\bанекс\b", "annex"),
        (r"\bБЛС\b", "BMA"),
        (r"\bпредставляват\b", "represent"),
        (r"\bмерни единици\b", "units of measure"),
        (r"\bсвоето естество\b", "their nature"),
        (r"\bуникални\b", "unique"),
        (r"\bизползвайте\b", "use"),
        (r"\bпрецизираните\b", "refined"),
        (r"\bвместо\b", "instead of"),
        (r"\bизмерване\b", "measurement"),
        (r"\bнезавършена\b", "unfinished"),
        (r"\bняма\b", "no"),
        (r"\bсъбития\b", "events"),
        (r"\bпреходни\b", "transitional"),
        (r"\bвързрасти\b", "ages"),
        (r"\bзаписани\b", "written"),
        (r"\bможе\b", "may"),
        (r"\bсчитат\b", "count"),
        (r"\bвключително\b", "inclusive"),
        (r"\bпримерно\b", "e.g."),
        (r"\b(\d+)-тата седмица\b", r"\1th week"),
        (r"\bЕКАТТЕ\b", "EKATTE"),
        (r"\bпубличната\b", "public"),
        (r"\bВключени\b", "Included"),
        (r"\bселищни образувания\b", "settlement formations"),
        (r"\bгрешно дублирани\b", "incorrectly duplicated"),
        (r"\bдублирани\b", "duplicated"),
        (r"\bтип\b", "type"),
        (r"\bпосочва\b", "indicates"),
        (r"\bдали\b", "whether"),
        (r"\bдаден\b", "given"),
        (r"\bвъпрос\b", "question"),
        (r"\bзадава повторно\b", "asked again"),
        (r"\bведнъж вече\b", "once already"),
        (r"\bполучил\b", "received"),
        (r"\bразличен\b", "different"),
        (r"\bотрицателен\b", "negative"),
        (r"\bако\b", "if"),
        (r"\bили\b", "or"),
        (r"\bлекарствен продукт\b", "medicinal product"),
        (r"\bкойто\b", "which"),
        (r"\bслучай\b", "case"),
        (r"\bбитово-санитарните\b", "household sanitary"),
        (r"\bдобри\b", "good"),
        (r"\bфелдшери\b", "physician assistants"),
        (r"\bотделянето им\b", "their separation"),
        (r"\bБАПЗГ\b", "BAPH"),
        (r"\bстават\b", "become"),
        (r"\bнамаляват\b", "decrease"),
        (r"\bгорната възрастова граница\b", "upper age limit"),
        (r"\bудължават събитията\b", "extend the events"),
        (r"\bще влезе\b", "will enter"),
        (r"\bсила\b", "force"),
        (r"\bфинализиране\b", "finalization"),
        (r"\bинтеграцията\b", "integration"),
        (r"\bрегистъра\b", "registry"),
        (r"\bсъсловната организация\b", "professional organization"),
        (r"\bнапълно\b", "fully"),
        (r"\bразлика\b", "difference"),
        (r"\bрегулярните\b", "regular"),
        (r"\bмоля\b", "please"),
        (r"\bсинхронизирайте я\b", "synchronize it"),
        (r"\bвашите софтуери\b", "your software"),
        (r"\bвид vaccine\b", "type of vaccine"),
        (r"\bдостъп\b", "access"),
        (r"\bпациентско досие\b", "patient record"),
        (r"\bпрез\b", "through"),
        (r"\bдублиран\b", "duplicate"),
        (r"\bПроцедури\b", "Procedures"),
        (r"\bизследване\b", "examination"),
        (r"\bфаринкс\b", "pharynx"),
        (r"\bдублира\b", "duplicates"),
        (r"\bетикетите\b", "labels"),
        (r"\bмомента излиза\b", "currently appears"),
        (r"\bприложими както\b", "applicable both"),
        (r"\bследващата\b", "next"),
        (r"\bгодини\b", "years"),
        (r"\bмамография\b", "mammography"),
        (r"\bпети знак\b", "fifth character"),
        (r"\bноменклатра\b", "nomenclature"),
        (r"\bсвръхбройните зъби\b", "supernumerary teeth"),
        (r"\bнад\b", "over"),
        (r"\b(\d+)г\b", r"\1 years"),
        (r"\bминималната\b", "minimum"),
        (r"\bпациентът\b", "the patient"),
        (r"\bУвеличен\b", "Increased"),
        (r"\bпериодът\b", "period"),
        (r"\bсработват контроли\b", "controls trigger"),
        (r"\bгранично родени\b", "born near the boundary"),
        (r"\bначалото\b", "beginning"),
        (r"\bкалендарна\b", "calendar"),
        (r"\bуказващи\b", "indicating"),
        (r"\bмаксимален\b", "maximum"),
        (r"\bсъща\b", "same"),
        (r"\bхваща\b", "captures"),
        (r"\bнаименования\b", "names"),
        (r"\bизползват\b", "are used"),
        (r"\bвизуализация\b", "visualization"),
        (r"\bпоствени\b", "administered"),
        (r"\bпоставени\b", "administered"),
        (r"\bсъответната\b", "corresponding"),
        (r"\bдобаве\b", "added"),
        (r"\bвключващ\b", "including"),
        (r"\bурина\b", "urine"),
        (r"\bпрофилактични\b", "preventive"),
        (r"\bобратно\b", "back"),
        (r"\bзаплащани\b", "paid"),
        (r"\bПопълнени\b", "Populated"),
        (r"\bинструкции\b", "instructions"),
        (r"\bупотреба\b", "use"),
        (r"\bсекунда\b", "second"),
        (r"\bмнинута\b", "minute"),
        (r"\bАктуализиран\b", "Updated"),
        (r"\bдържави\b", "countries"),
        (r"\bОтключени съобщенията\b", "Unlocked messages"),
        (r"\bизвличане\b", "retrieval"),
        (r"\bиндексите\b", "indexes"),
        (r"\bпредходната\b", "previous"),
        (r"\bреактивен протеин\b", "reactive protein"),
        (r"\bдобавено\b", "added"),
        (r"\bдобавени\b", "added"),
        (r"\bдобавен\b", "added"),
        (r"\bдобавена\b", "added"),
        (r"\bпроменени\b", "changed"),
        (r"\bпроменен\b", "changed"),
        (r"\bпроменена\b", "changed"),
        (r"\bкоригирани\b", "corrected"),
        (r"\bкоригирана\b", "corrected"),
        (r"\bкоригиран\b", "corrected"),
        (r"\bпремахнати\b", "removed"),
        (r"\bпремахнат\b", "removed"),
        (r"\bпремахната\b", "removed"),
        (r"\bобновена\b", "updated"),
        (r"\bактуализирани\b", "updated"),
        (r"\bактуализирана\b", "updated"),
        (r"\bпопълнена\b", "populated"),
        (r"\bдопълнена\b", "supplemented"),
        (r"\bпреработена\b", "reworked"),
        (r"\bизцяло\b", "completely"),
        (r"\bсъздадена\b", "created"),
        (r"\bКоригирано\b", "Corrected"),
        (r"\bКоригиран\b", "Corrected"),
        (r"\bКоригиранo\b", "Corrected"),
        (r"\bДобавенa\b", "Added"),
        (r"\bДобавен\b", "Added"),
        (r"\bна\b", "of"),
        (r"\bв\b", "in"),
        (r"\bвъв\b", "in"),
        (r"\bза\b", "for"),
        (r"\bс\b", "with"),
        (r"\bсъс\b", "with"),
        (r"\bи\b", "and"),
        (r"\bа\b", "and"),
    ]
    for pattern, replacement in word_replacements:
        translated = re.sub(pattern, replacement, translated, flags=re.IGNORECASE)

    translated = re.sub(r"\s+([,.:;])", r"\1", translated)
    translated = re.sub(r"\s{2,}", " ", translated).strip()
    translated = re.sub(r"\bС(?=\d)", "C", translated)
    translated = re.sub(r"\bЕ(?=\d)", "E", translated)
    translated = re.sub(r"\bТ(?=\d)", "T", translated)
    translated = re.sub(r"\bЕ\b", "E", translated)
    translated = re.sub(r"\bО\b", "O", translated)
    translated = re.sub(r"\bК\b", "K", translated)
    translated = re.sub(r"\bТ\b", "T", translated)
    translated = translated.replace("т.is.", "i.e.")
    translated = translated.replace("descriptionsта", "descriptions")
    translated = translated.replace(" - ", " - ")
    return translated[:1].upper() + translated[1:] if translated else translated


def split_versions(rows: list[dict[int, str]]) -> list[tuple[str, list[str]]]:
    versions: list[tuple[str, list[str]]] = []
    current_version = ""
    current_notes: list[str] = []

    for row in rows:
        text = row.get(1, "").strip()
        if not text or text == "Версия / промени":
            continue

        if re.match(r"^Версия\b", text):
            if current_version:
                versions.append((current_version, current_notes))
            current_version = text
            current_notes = []
            continue

        if current_version:
            current_notes.append(text)

    if current_version:
        versions.append((current_version, current_notes))

    return versions


def write_version_csvs(versions: list[tuple[str, list[str]]], output_dir: Path) -> None:
    if output_dir.exists():
        shutil.rmtree(output_dir)
    output_dir.mkdir(parents=True)

    for version, notes in versions:
        path = output_dir / f"{version_slug(version)}.csv"
        normalized_version = version_value(version)
        with path.open("w", encoding="utf-8", newline="") as handle:
            writer = csv.writer(handle, lineterminator="\n")
            writer.writerow(["version", "change", "change EN", "regarding vaccines"])
            for note in notes:
                writer.writerow([
                    normalized_version,
                    note,
                    codex_translate_change(note),
                    "true" if regards_vaccines(note) else "false",
                ])


def split_change_notes(manifest_path: Path, output_dir: Path) -> int:
    manifest = read_manifest(manifest_path)
    workbook_path = manifest_path.parent / str(manifest["artifact"])
    if not workbook_path.is_file():
        raise FileNotFoundError(f"missing HIS workbook: {workbook_path}")

    with zipfile.ZipFile(workbook_path) as archive:
        paths = workbook_sheet_paths(archive)
        if "Change Notes" not in paths:
            raise ValueError(f"{workbook_path.name}: missing XLSX sheet Change Notes")
        rows = sheet_rows(archive, paths["Change Notes"], shared_strings(archive))

    versions = split_versions(rows)
    write_version_csvs(versions, output_dir)
    print(f"wrote {len(versions)} CSV files to {output_dir}")
    return 0


def main() -> int:
    parser = argparse.ArgumentParser(
        description="Split the HIS Change Notes sheet into one CSV file per version."
    )
    parser.add_argument("--manifest", type=Path, default=DEFAULT_MANIFEST)
    parser.add_argument("--output-dir", type=Path, default=DEFAULT_OUTPUT_DIR)
    args = parser.parse_args()

    return split_change_notes(args.manifest, args.output_dir)


if __name__ == "__main__":
    raise SystemExit(main())
