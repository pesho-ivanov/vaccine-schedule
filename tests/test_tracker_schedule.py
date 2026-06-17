from __future__ import annotations

import json
from pathlib import Path
import unittest

from tracker_schedule import (
    SCHEDULE_VERSION,
    build_country_schedule,
    to_app_dict,
    validate_country_schedule,
)


ROOT = Path(__file__).resolve().parents[1]


class TrackerScheduleTests(unittest.TestCase):
    def setUp(self) -> None:
        self.schedule = build_country_schedule()

    def test_projection_validates(self) -> None:
        validate_country_schedule(self.schedule)

    def test_projection_has_versioned_bulgarian_schedule(self) -> None:
        self.assertEqual(self.schedule.country_code, "BG")
        self.assertEqual(self.schedule.schedule_version, SCHEDULE_VERSION)
        self.assertEqual(self.schedule.effective_date, "2026-07-01")
        self.assertEqual(self.schedule.mvp_age_coverage["throughAgeYears"], 18)

    def test_mandatory_child_antigens_are_projected(self) -> None:
        mandatory_antigen_ids = {
            dose.antigen_id
            for dose in self.schedule.doses
            if dose.status_category == "mandatory"
        }
        self.assertGreaterEqual(
            mandatory_antigen_ids,
            {
                "tuberculosis",
                "diphtheria",
                "tetanus",
                "pertussis",
                "poliomyelitis",
                "haemophilus_influenzae_type_b",
                "hepatitis_b",
                "pneumococcal_disease",
                "measles_mumps_rubella",
                "varicella",
            },
        )

    def test_every_dose_has_app_level_source_and_anchor(self) -> None:
        source_ids = {source.id for source in self.schedule.source_references}
        milestone_ids = {milestone.id for milestone in self.schedule.milestones}
        antigen_ids = {antigen.id for antigen in self.schedule.antigens}

        for dose in self.schedule.doses:
            self.assertIn(dose.antigen_id, antigen_ids, dose.id)
            self.assertIn(dose.milestone_id, milestone_ids, dose.id)
            self.assertTrue(dose.source_ids, dose.id)
            self.assertLessEqual(set(dose.source_ids), source_ids, dose.id)

    def test_product_mapping_covers_combination_vaccine(self) -> None:
        products = {product.id: product for product in self.schedule.products}
        self.assertEqual(
            set(products["infanrix_hexa"].covered_antigen_ids),
            {
                "diphtheria",
                "tetanus",
                "pertussis",
                "poliomyelitis",
                "haemophilus_influenzae_type_b",
                "hepatitis_b",
            },
        )

    def test_app_dict_is_json_serializable(self) -> None:
        json.dumps(to_app_dict(self.schedule), ensure_ascii=False)

    def test_fixture_profiles_reference_known_milestones(self) -> None:
        fixture_path = ROOT / "fixtures/tracker_child_profiles.json"
        with fixture_path.open(encoding="utf-8") as handle:
            fixtures = json.load(handle)

        self.assertEqual(fixtures["scheduleVersion"], SCHEDULE_VERSION)
        self.assertEqual(len(fixtures["profiles"]), 7)

        milestone_ids = {milestone.id for milestone in self.schedule.milestones}
        for profile in fixtures["profiles"]:
            self.assertTrue(profile["birthDate"], profile["id"])
            self.assertLessEqual(
                set(profile["expectedMilestoneIds"]),
                milestone_ids,
                profile["id"],
            )


if __name__ == "__main__":
    unittest.main()
