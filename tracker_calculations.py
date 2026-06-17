#!/usr/bin/env python3
from __future__ import annotations

from calendar import monthrange
from dataclasses import dataclass
from datetime import date, timedelta
import json
from typing import Literal

from tracker_schedule import (
    CountrySchedule,
    ScheduleDose,
    ScheduleMilestone,
    build_country_schedule,
)


DoseStatusValue = Literal[
    "completed",
    "upcoming",
    "due_soon",
    "due_today",
    "overdue",
    "optional_recommended",
    "not_applicable",
]


@dataclass(frozen=True)
class ChildProfile:
    id: str
    birth_date: date
    nickname: str | None = None
    sex: str | None = None
    incomplete_history: bool = False


@dataclass(frozen=True)
class AdministrationEvent:
    id: str
    given_on: date
    covered_antigen_ids: tuple[str, ...] = ()
    product_id: str | None = None
    scheduled_dose_ids: tuple[str, ...] = ()
    notes: str | None = None


@dataclass(frozen=True)
class StatusConfig:
    due_soon_days: int = 14
    late_confirmation_days: int = 30


@dataclass(frozen=True)
class DoseStatus:
    dose: ScheduleDose
    due_date: date | None
    status: DoseStatusValue
    administration_event_id: str | None = None
    administered_on: date | None = None
    needs_doctor_confirmation: bool = False
    not_applicable_reason: str | None = None


@dataclass(frozen=True)
class VisitGroup:
    id: str
    due_date: date
    milestone_ids: tuple[str, ...]
    mandatory_dose_ids: tuple[str, ...]
    recommended_dose_ids: tuple[str, ...]
    status: DoseStatusValue


@dataclass(frozen=True)
class CompletionSummary:
    mandatory_total: int
    mandatory_completed: int
    recommended_total: int
    recommended_completed: int


def parse_date(value: date | str) -> date:
    if isinstance(value, date):
        return value
    return date.fromisoformat(value)


def add_calendar_months(start: date, months: int) -> date:
    month_index = start.month - 1 + months
    year = start.year + month_index // 12
    month = month_index % 12 + 1
    day = min(start.day, monthrange(year, month)[1])
    return date(year, month, day)


def add_calendar_years(start: date, years: int) -> date:
    return add_calendar_months(start, years * 12)


def milestone_due_date(profile: ChildProfile, milestone: ScheduleMilestone) -> date | None:
    if milestone.kind == "pregnancy":
        return None

    if milestone.id.endswith("d") and milestone.id[:-1].isdigit():
        return profile.birth_date + timedelta(days=int(milestone.id[:-1]))
    if milestone.id.endswith("w") and milestone.id[:-1].isdigit():
        return profile.birth_date + timedelta(weeks=int(milestone.id[:-1]))

    months = milestone.age_months
    if months.is_integer():
        return add_calendar_months(profile.birth_date, int(months))

    # Future imported schedules may use fractional month anchors. Keep this
    # deterministic and date-only until those anchors become structured rules.
    return profile.birth_date + timedelta(days=round(months * 365.2425 / 12.0))


def is_child_mvp_applicable(milestone: ScheduleMilestone) -> bool:
    if milestone.kind == "pregnancy":
        return False
    return milestone.age_months <= 216


def product_antigen_ids(
    event: AdministrationEvent,
    country_schedule: CountrySchedule,
) -> tuple[str, ...]:
    antigen_ids = list(event.covered_antigen_ids)
    if event.product_id:
        products = {product.id: product for product in country_schedule.products}
        product = products.get(event.product_id)
        if product is not None:
            antigen_ids.extend(product.covered_antigen_ids)
    return tuple(dict.fromkeys(antigen_ids))


def event_matches(
    profile: ChildProfile,
    country_schedule: CountrySchedule,
    events: tuple[AdministrationEvent, ...],
) -> dict[str, AdministrationEvent]:
    doses_by_id = {dose.id: dose for dose in country_schedule.doses}
    milestones = {milestone.id: milestone for milestone in country_schedule.milestones}
    matched: dict[str, AdministrationEvent] = {}

    for event in sorted(events, key=lambda item: (item.given_on, item.id)):
        for dose_id in event.scheduled_dose_ids:
            if dose_id in doses_by_id and dose_id not in matched:
                matched[dose_id] = event

    event_antigens = [
        (event, antigen_id)
        for event in sorted(events, key=lambda item: (item.given_on, item.id))
        if not event.scheduled_dose_ids
        for antigen_id in product_antigen_ids(event, country_schedule)
    ]

    for event, antigen_id in event_antigens:
        candidate_doses = [
            dose
            for dose in country_schedule.doses
            if dose.id not in matched and dose.antigen_id == antigen_id
        ]
        candidate_doses.sort(
            key=lambda dose: (
                milestones[dose.milestone_id].age_months,
                dose.status_category != "mandatory",
                dose.id,
            )
        )

        past_or_due = [
            dose
            for dose in candidate_doses
            if (due_date := milestone_due_date(profile, milestones[dose.milestone_id]))
            is not None
            and is_child_mvp_applicable(milestones[dose.milestone_id])
            and due_date <= event.given_on
        ]
        # Match the earliest not-yet-recorded dose for that antigen. This keeps
        # catch-up behavior conservative: late records do not silently complete
        # every later dose.
        if past_or_due:
            matched[past_or_due[0].id] = event
        elif candidate_doses:
            matched[candidate_doses[0].id] = event

    return matched


def event_needs_doctor_confirmation(
    event: AdministrationEvent,
    due_date: date,
    config: StatusConfig,
) -> bool:
    if event.given_on < due_date:
        return True
    return event.given_on > due_date + timedelta(days=config.late_confirmation_days)


def dose_status_for_dates(
    due_date: date,
    as_of: date,
    config: StatusConfig,
) -> DoseStatusValue:
    if due_date < as_of:
        return "overdue"
    if due_date == as_of:
        return "due_today"
    if due_date <= as_of + timedelta(days=config.due_soon_days):
        return "due_soon"
    return "upcoming"


def calculate_dose_statuses(
    profile: ChildProfile,
    as_of: date | str,
    events: tuple[AdministrationEvent, ...] = (),
    country_schedule: CountrySchedule | None = None,
    config: StatusConfig = StatusConfig(),
) -> tuple[DoseStatus, ...]:
    country_schedule = country_schedule or build_country_schedule()
    as_of_date = parse_date(as_of)
    milestones = {milestone.id: milestone for milestone in country_schedule.milestones}
    matched = event_matches(profile, country_schedule, events)

    statuses = []
    for dose in country_schedule.doses:
        milestone = milestones[dose.milestone_id]
        due_date = milestone_due_date(profile, milestone)
        if due_date is None or not is_child_mvp_applicable(milestone):
            statuses.append(
                DoseStatus(
                    dose=dose,
                    due_date=due_date,
                    status="not_applicable",
                    not_applicable_reason="outside_child_mvp_scope",
                )
            )
            continue

        event = matched.get(dose.id)
        if event is not None:
            statuses.append(
                DoseStatus(
                    dose=dose,
                    due_date=due_date,
                    status="completed",
                    administration_event_id=event.id,
                    administered_on=event.given_on,
                    needs_doctor_confirmation=event_needs_doctor_confirmation(
                        event,
                        due_date,
                        config,
                    ),
                )
            )
            continue

        if dose.status_category == "recommended":
            status = "optional_recommended"
        else:
            status = dose_status_for_dates(due_date, as_of_date, config)

        statuses.append(DoseStatus(dose=dose, due_date=due_date, status=status))

    return tuple(statuses)


def visit_group_status(statuses: list[DoseStatus]) -> DoseStatusValue:
    priority = {
        "overdue": 0,
        "due_today": 1,
        "due_soon": 2,
        "upcoming": 3,
        "optional_recommended": 4,
    }
    return min(statuses, key=lambda item: priority.get(item.status, 99)).status


def build_visit_groups(statuses: tuple[DoseStatus, ...]) -> tuple[VisitGroup, ...]:
    applicable = [
        status
        for status in statuses
        if status.due_date is not None
        and status.status
        in {"upcoming", "due_soon", "due_today", "overdue", "optional_recommended"}
    ]
    due_dates_with_mandatory = {
        status.due_date
        for status in applicable
        if status.dose.status_category == "mandatory"
        and status.status != "optional_recommended"
    }

    groups = []
    for due_date in sorted(due_dates_with_mandatory):
        group_statuses = [status for status in applicable if status.due_date == due_date]
        mandatory = [
            status.dose.id
            for status in group_statuses
            if status.dose.status_category == "mandatory"
        ]
        recommended = [
            status.dose.id
            for status in group_statuses
            if status.dose.status_category == "recommended"
        ]
        milestone_ids = tuple(
            dict.fromkeys(status.dose.milestone_id for status in group_statuses)
        )
        groups.append(
            VisitGroup(
                id=f"visit:{due_date.isoformat()}",
                due_date=due_date,
                milestone_ids=milestone_ids,
                mandatory_dose_ids=tuple(mandatory),
                recommended_dose_ids=tuple(recommended),
                status=visit_group_status(
                    [
                        status
                        for status in group_statuses
                        if status.dose.status_category == "mandatory"
                    ]
                ),
            )
        )
    return tuple(groups)


def next_visit_group(statuses: tuple[DoseStatus, ...]) -> VisitGroup | None:
    groups = build_visit_groups(statuses)
    if not groups:
        return None
    priority = {"overdue": 0, "due_today": 1, "due_soon": 2, "upcoming": 3}
    return min(groups, key=lambda group: (priority.get(group.status, 99), group.due_date))


def completion_summary(statuses: tuple[DoseStatus, ...]) -> CompletionSummary:
    applicable = [status for status in statuses if status.status != "not_applicable"]
    mandatory = [status for status in applicable if status.dose.status_category == "mandatory"]
    recommended = [
        status for status in applicable if status.dose.status_category == "recommended"
    ]
    return CompletionSummary(
        mandatory_total=len(mandatory),
        mandatory_completed=sum(1 for status in mandatory if status.status == "completed"),
        recommended_total=len(recommended),
        recommended_completed=sum(
            1 for status in recommended if status.status == "completed"
        ),
    )


def child_profile_from_dict(value: dict[str, object]) -> ChildProfile:
    return ChildProfile(
        id=str(value["id"]),
        nickname=str(value["nickname"]) if value.get("nickname") else None,
        birth_date=parse_date(str(value["birthDate"])),
        sex=str(value["sex"]) if value.get("sex") else None,
    )


def main() -> int:
    country_schedule = build_country_schedule()
    profile = ChildProfile(id="example", birth_date=date.today())
    statuses = calculate_dose_statuses(profile, date.today(), country_schedule=country_schedule)
    groups = build_visit_groups(statuses)
    print(
        json.dumps(
            {
                "profileId": profile.id,
                "asOf": date.today().isoformat(),
                "nextVisit": groups[0].__dict__ if groups else None,
                "completion": completion_summary(statuses).__dict__,
            },
            ensure_ascii=False,
            indent=2,
            default=str,
        )
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
