from __future__ import annotations

from datetime import date
import json
from pathlib import Path
import unittest

from tracker_calculations import (
    AdministrationEvent,
    ChildProfile,
    add_calendar_months,
    calculate_dose_statuses,
    child_profile_from_dict,
    completion_summary,
    milestone_due_date,
    next_visit_group,
)
from tracker_schedule import LocalizedText, ScheduleMilestone, build_country_schedule


ROOT = Path(__file__).resolve().parents[1]


class TrackerCalculationTests(unittest.TestCase):
    def setUp(self) -> None:
        self.schedule = build_country_schedule()
        self.milestones = {milestone.id: milestone for milestone in self.schedule.milestones}

    def statuses_by_id(self, statuses):
        return {status.dose.id: status for status in statuses}

    def test_calendar_month_math_is_date_only(self) -> None:
        self.assertEqual(
            add_calendar_months(date(2026, 3, 21), 2),
            date(2026, 5, 21),
        )
        self.assertEqual(
            add_calendar_months(date(2024, 1, 31), 1),
            date(2024, 2, 29),
        )
        self.assertEqual(
            add_calendar_months(date(2025, 1, 31), 1),
            date(2025, 2, 28),
        )

    def test_milestone_dates_from_birth_date(self) -> None:
        profile = ChildProfile(id="uat-2-1", birth_date=date(2026, 3, 21))

        self.assertEqual(
            milestone_due_date(profile, self.milestones["2m"]),
            date(2026, 5, 21),
        )
        self.assertEqual(
            milestone_due_date(profile, self.milestones["3m"]),
            date(2026, 6, 21),
        )
        self.assertEqual(
            milestone_due_date(
                profile,
                ScheduleMilestone(
                    id="2d",
                    label=LocalizedText(en="2 days", bg="2 дни"),
                    kind="birth",
                    age_months=0.0,
                ),
            ),
            date(2026, 3, 23),
        )
        self.assertEqual(
            milestone_due_date(
                profile,
                ScheduleMilestone(
                    id="6w",
                    label=LocalizedText(en="6 weeks", bg="6 седмици"),
                    kind="month",
                    age_months=1.5,
                ),
            ),
            date(2026, 5, 2),
        )

    def test_newborn_birth_doses_are_due_today(self) -> None:
        profile = ChildProfile(id="newborn", birth_date=date(2026, 6, 18))
        statuses = self.statuses_by_id(
            calculate_dose_statuses(
                profile,
                date(2026, 6, 18),
                country_schedule=self.schedule,
            )
        )

        self.assertEqual(statuses["tuberculosis:birth:1"].status, "due_today")
        self.assertEqual(statuses["hepatitis_b:birth:1"].status, "due_today")

    def test_missing_past_milestones_are_overdue_neutrally(self) -> None:
        profile = ChildProfile(id="overdue", birth_date=date(2026, 3, 1))
        statuses = self.statuses_by_id(
            calculate_dose_statuses(
                profile,
                date(2026, 6, 18),
                country_schedule=self.schedule,
            )
        )

        self.assertEqual(statuses["diphtheria:2m:1"].status, "overdue")
        self.assertEqual(statuses["diphtheria:3m:2"].status, "overdue")
        self.assertFalse(statuses["diphtheria:2m:1"].needs_doctor_confirmation)

    def test_completed_two_month_visit_advances_next_visit(self) -> None:
        profile = ChildProfile(id="sequence", birth_date=date(2026, 3, 21))
        events = (
            AdministrationEvent(
                id="birth",
                given_on=date(2026, 3, 21),
                scheduled_dose_ids=("tuberculosis:birth:1", "hepatitis_b:birth:1"),
            ),
            AdministrationEvent(
                id="one-month",
                given_on=date(2026, 4, 21),
                scheduled_dose_ids=("hepatitis_b:1m:2",),
            ),
            AdministrationEvent(
                id="two-month-hexa",
                given_on=date(2026, 5, 21),
                product_id="infanrix_hexa",
            ),
            AdministrationEvent(
                id="two-month-pcv",
                given_on=date(2026, 5, 21),
                covered_antigen_ids=("pneumococcal_disease",),
            ),
        )

        statuses = calculate_dose_statuses(
            profile,
            date(2026, 5, 22),
            events=events,
            country_schedule=self.schedule,
        )
        next_group = next_visit_group(statuses)

        self.assertIsNotNone(next_group)
        assert next_group is not None
        self.assertEqual(next_group.due_date, date(2026, 6, 21))
        self.assertEqual(next_group.milestone_ids, ("3m",))

    def test_recommended_items_do_not_reduce_mandatory_completion(self) -> None:
        profile = ChildProfile(id="summary", birth_date=date(2026, 6, 18))
        statuses = calculate_dose_statuses(
            profile,
            date(2026, 6, 18),
            country_schedule=self.schedule,
        )
        summary = completion_summary(statuses)

        self.assertGreater(summary.recommended_total, 0)
        self.assertLess(summary.mandatory_total, len(statuses))
        self.assertEqual(summary.recommended_completed, 0)

    def test_early_explicit_record_is_completed_with_doctor_confirmation(self) -> None:
        profile = ChildProfile(id="early", birth_date=date(2026, 3, 21))
        statuses = self.statuses_by_id(
            calculate_dose_statuses(
                profile,
                date(2026, 5, 2),
                events=(
                    AdministrationEvent(
                        id="early-dose",
                        given_on=date(2026, 5, 1),
                        scheduled_dose_ids=("diphtheria:2m:1",),
                    ),
                ),
                country_schedule=self.schedule,
            )
        )

        status = statuses["diphtheria:2m:1"]
        self.assertEqual(status.status, "completed")
        self.assertTrue(status.needs_doctor_confirmation)

    def test_fixture_expected_milestones_have_due_dates(self) -> None:
        fixture_path = ROOT / "fixtures/tracker_child_profiles.json"
        with fixture_path.open(encoding="utf-8") as handle:
            fixtures = json.load(handle)

        as_of = date.fromisoformat(fixtures["asOf"])
        for profile_data in fixtures["profiles"]:
            profile = child_profile_from_dict(profile_data)
            for milestone_id in profile_data["expectedMilestoneIds"]:
                due_date = milestone_due_date(profile, self.milestones[milestone_id])
                self.assertIsNotNone(due_date, profile.id)
                assert due_date is not None
                self.assertLessEqual(due_date, as_of, profile.id)


if __name__ == "__main__":
    unittest.main()
