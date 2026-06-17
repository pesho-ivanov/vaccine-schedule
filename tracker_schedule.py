#!/usr/bin/env python3
from __future__ import annotations

from dataclasses import asdict, dataclass
import json
from pathlib import Path
from typing import Any, Literal

import yaml


ROOT = Path(__file__).resolve().parent
DATA_DIR = ROOT / "data/bg"

SCHEDULE_VERSION = "BG-N15-2026-07-01"
SCHEDULE_EFFECTIVE_DATE = "2026-07-01"
SCHEDULE_IMPORTED_DATE = "2026-06-18"
MVP_AGE_COVERAGE = {
    "from": "birth",
    "throughAgeYears": 18,
    "defaultHiddenMilestoneKinds": ["pregnancy", "adult"],
}

ScheduleGroup = Literal["mandatory", "recommended"]
MilestoneKind = Literal["pregnancy", "birth", "month", "year", "adult"]


@dataclass(frozen=True)
class LocalizedText:
    en: str
    bg: str


@dataclass(frozen=True)
class SourceReference:
    id: str
    title: str
    url: str
    role: str
    accessed_on: str
    effective_date: str | None = None


@dataclass(frozen=True)
class ScheduleMilestone:
    id: str
    label: LocalizedText
    kind: MilestoneKind
    age_months: float
    open_ended: bool = False


@dataclass(frozen=True)
class VaccineAntigen:
    id: str
    label: LocalizedText
    short: LocalizedText | None = None
    record_aliases: tuple[str, ...] = ()


@dataclass(frozen=True)
class ScheduleDose:
    id: str
    antigen_id: str
    milestone_id: str
    status_category: ScheduleGroup
    display_text: str
    dose_number: int
    source_ids: tuple[str, ...]
    through_milestone_id: str | None = None
    note: str | None = None
    flags: tuple[str, ...] = ()


@dataclass(frozen=True)
class VaccineProduct:
    id: str
    name: str
    covered_antigen_ids: tuple[str, ...]
    source_ids: tuple[str, ...]
    notes: str | None = None


@dataclass(frozen=True)
class CountrySchedule:
    country_code: str
    jurisdiction_name: LocalizedText
    schedule_version: str
    effective_date: str
    imported_date: str
    mvp_age_coverage: dict[str, Any]
    source_references: tuple[SourceReference, ...]
    milestones: tuple[ScheduleMilestone, ...]
    antigens: tuple[VaccineAntigen, ...]
    doses: tuple[ScheduleDose, ...]
    products: tuple[VaccineProduct, ...]


SOURCE_METADATA = {
    "lex_calendar": {
        "title": "Наредба № 15 от 12 май 2005 г. за имунизациите в Република България",
        "role": (
            "Primary legal source for mandatory, targeted, and recommended "
            "immunization categories; Appendix 1 is the Bulgarian immunization calendar."
        ),
        "accessed_on": "2026-06-18",
        "effective_date": SCHEDULE_EFFECTIVE_DATE,
    },
    "ecdc_calendar": {
        "title": "ECDC Vaccine Scheduler, Bulgaria",
        "role": (
            "Cross-check source and future import-model reference for EU schedules; "
            "not the authority when it conflicts with Ordinance No. 15."
        ),
        "accessed_on": "2026-06-18",
        "effective_date": None,
    },
    "pregnancy_vaccine": {
        "title": "Плюс мен: Препоръки за имунизация на бременни жени",
        "role": (
            "Supplementary public-health source for pregnancy recommendation copy "
            "and product examples."
        ),
        "accessed_on": "2026-06-18",
        "effective_date": None,
    },
}

PRODUCT_MAPPINGS = (
    VaccineProduct(
        id="bcg",
        name="BCG",
        covered_antigen_ids=("tuberculosis",),
        source_ids=("lex_calendar",),
    ),
    VaccineProduct(
        id="engerix_b",
        name="Engerix B",
        covered_antigen_ids=("hepatitis_b",),
        source_ids=("lex_calendar",),
        notes="Example monovalent hepatitis B product name; keep editable in the app.",
    ),
    VaccineProduct(
        id="infanrix_hexa",
        name="Infanrix hexa",
        covered_antigen_ids=(
            "diphtheria",
            "tetanus",
            "pertussis",
            "poliomyelitis",
            "haemophilus_influenzae_type_b",
            "hepatitis_b",
        ),
        source_ids=("lex_calendar",),
        notes="Example six-component product mapping for DTPa-IPV-Hib-HepB coverage.",
    ),
    VaccineProduct(
        id="vaxneuvance",
        name="Vaxneuvance",
        covered_antigen_ids=("pneumococcal_disease",),
        source_ids=("lex_calendar",),
        notes="Example pneumococcal conjugate product name; keep editable in the app.",
    ),
    VaccineProduct(
        id="abrysvo",
        name="Abrysvo",
        covered_antigen_ids=("rsv",),
        source_ids=("pregnancy_vaccine",),
        notes="Example RSV product name from pregnancy recommendation context.",
    ),
    VaccineProduct(
        id="boostrix",
        name="Boostrix",
        covered_antigen_ids=("diphtheria", "tetanus", "pertussis"),
        source_ids=("pregnancy_vaccine",),
        notes="Example reduced-antigen Tdap product mapping.",
    ),
    VaccineProduct(
        id="influvac_tetra",
        name="Influvac tetra",
        covered_antigen_ids=("influenza",),
        source_ids=("pregnancy_vaccine", "ecdc_calendar"),
        notes="Example influenza product name; seasonal eligibility remains clinician-confirmed.",
    ),
)


def read_yaml(name: str) -> dict[str, Any]:
    with (DATA_DIR / name).open(encoding="utf-8") as handle:
        data = yaml.safe_load(handle) or {}
    if not isinstance(data, dict):
        raise ValueError(f"{name}: expected mapping at document root")
    return data


def localized_text(value: dict[str, Any], context: str) -> LocalizedText:
    try:
        en = value["en"]
        bg = value["bg"]
    except KeyError as exc:
        raise ValueError(f"{context}: missing localized value {exc.args[0]}") from exc
    if not isinstance(en, str) or not en:
        raise ValueError(f"{context}: label.en must be a non-empty string")
    if not isinstance(bg, str) or not bg:
        raise ValueError(f"{context}: label.bg must be a non-empty string")
    return LocalizedText(en=en, bg=bg)


def milestone_kind(column_id: str, age_months: float) -> MilestoneKind:
    if column_id.startswith("pregnancy"):
        return "pregnancy"
    if column_id == "birth":
        return "birth"
    if age_months >= 216:
        return "adult"
    if column_id.endswith("y") or column_id == "gte65y":
        return "year"
    return "month"


def source_references(source_links: dict[str, str]) -> tuple[SourceReference, ...]:
    references = []
    for source_id, url in source_links.items():
        metadata = SOURCE_METADATA.get(source_id)
        if metadata is None:
            metadata = {
                "title": source_id,
                "role": "Source link carried through from data/bg/sources.yaml.",
                "accessed_on": SCHEDULE_IMPORTED_DATE,
                "effective_date": None,
            }
        references.append(
            SourceReference(
                id=source_id,
                title=metadata["title"],
                url=url,
                role=metadata["role"],
                accessed_on=metadata["accessed_on"],
                effective_date=metadata["effective_date"],
            )
        )
    return tuple(references)


def source_ids_for_dose(group: ScheduleGroup, vaccine_id: str, column_id: str) -> tuple[str, ...]:
    source_ids = ["lex_calendar"] if group == "mandatory" else ["ecdc_calendar"]
    if column_id.startswith("pregnancy"):
        source_ids.append("pregnancy_vaccine")
    return tuple(dict.fromkeys(source_ids))


def flags_for_dose(dose: dict[str, Any]) -> tuple[str, ...]:
    flags = []
    for key in ("mandatory", "muted", "struck", "note_style"):
        if dose.get(key):
            flags.append(key)
    return tuple(flags)


def build_country_schedule() -> CountrySchedule:
    sources = read_yaml("sources.yaml")
    columns = read_yaml("columns.yaml")
    vaccines = read_yaml("vaccines.yaml")
    schedule = read_yaml("schedule.yaml")

    milestones = tuple(
        ScheduleMilestone(
            id=row["id"],
            label=localized_text(row["label"], f"columns.yaml:{row['id']}"),
            kind=milestone_kind(row["id"], float(row["age_months"])),
            age_months=float(row["age_months"]),
            open_ended=row["id"].startswith("gte"),
        )
        for row in columns["columns"]
    )

    antigens = tuple(
        VaccineAntigen(
            id=row["id"],
            label=localized_text(row["label"], f"vaccines.yaml:{row['id']}"),
            short=localized_text(row["short"], f"vaccines.yaml:{row['id']}:short")
            if "short" in row
            else None,
            record_aliases=tuple(row.get("record_aliases", ())),
        )
        for row in vaccines["vaccines"]
    )

    doses = []
    for schedule_row in schedule["rows"]:
        vaccine_id = schedule_row["vaccine"]
        group = schedule_row["group"]
        for index, dose in enumerate(schedule_row["doses"], start=1):
            column_id = dose["column"]
            doses.append(
                ScheduleDose(
                    id=f"{vaccine_id}:{column_id}:{index}",
                    antigen_id=vaccine_id,
                    milestone_id=column_id,
                    status_category=group,
                    display_text=dose["text"],
                    dose_number=index,
                    source_ids=source_ids_for_dose(group, vaccine_id, column_id),
                    through_milestone_id=dose.get("through"),
                    note=dose.get("note"),
                    flags=flags_for_dose(dose),
                )
            )

    return CountrySchedule(
        country_code="BG",
        jurisdiction_name=LocalizedText(en="Bulgaria", bg="България"),
        schedule_version=SCHEDULE_VERSION,
        effective_date=SCHEDULE_EFFECTIVE_DATE,
        imported_date=SCHEDULE_IMPORTED_DATE,
        mvp_age_coverage=MVP_AGE_COVERAGE,
        source_references=source_references(sources["source_links"]),
        milestones=milestones,
        antigens=antigens,
        doses=tuple(doses),
        products=PRODUCT_MAPPINGS,
    )


def validate_country_schedule(country_schedule: CountrySchedule | None = None) -> None:
    country_schedule = country_schedule or build_country_schedule()

    source_ids = {source.id for source in country_schedule.source_references}
    milestone_ids = {milestone.id for milestone in country_schedule.milestones}
    antigen_ids = {antigen.id for antigen in country_schedule.antigens}
    milestone_order = {
        milestone.id: index for index, milestone in enumerate(country_schedule.milestones)
    }

    if not source_ids:
        raise ValueError("tracker schedule: source references must not be empty")

    for dose in country_schedule.doses:
        if dose.antigen_id not in antigen_ids:
            raise ValueError(f"tracker schedule: {dose.id} unknown antigen {dose.antigen_id}")
        if dose.milestone_id not in milestone_ids:
            raise ValueError(
                f"tracker schedule: {dose.id} unknown milestone {dose.milestone_id}"
            )
        if dose.status_category not in {"mandatory", "recommended"}:
            raise ValueError(
                f"tracker schedule: {dose.id} invalid status {dose.status_category}"
            )
        if not dose.source_ids:
            raise ValueError(f"tracker schedule: {dose.id} has no source references")
        for source_id in dose.source_ids:
            if source_id not in source_ids:
                raise ValueError(
                    f"tracker schedule: {dose.id} references unknown source {source_id}"
                )
        if dose.through_milestone_id is not None:
            if dose.through_milestone_id not in milestone_ids:
                raise ValueError(
                    f"tracker schedule: {dose.id} unknown through milestone "
                    f"{dose.through_milestone_id}"
                )
            if milestone_order[dose.through_milestone_id] < milestone_order[dose.milestone_id]:
                raise ValueError(
                    f"tracker schedule: {dose.id} through milestone precedes start milestone"
                )

    for product in country_schedule.products:
        if not product.covered_antigen_ids:
            raise ValueError(f"tracker schedule: {product.id} maps no antigens")
        for antigen_id in product.covered_antigen_ids:
            if antigen_id not in antigen_ids:
                raise ValueError(
                    f"tracker schedule: {product.id} maps unknown antigen {antigen_id}"
                )
        for source_id in product.source_ids:
            if source_id not in source_ids:
                raise ValueError(
                    f"tracker schedule: {product.id} references unknown source {source_id}"
                )


def to_app_dict(country_schedule: CountrySchedule | None = None) -> dict[str, Any]:
    country_schedule = country_schedule or build_country_schedule()
    return asdict(country_schedule)


def main() -> int:
    country_schedule = build_country_schedule()
    validate_country_schedule(country_schedule)
    print(json.dumps(to_app_dict(country_schedule), ensure_ascii=False, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
