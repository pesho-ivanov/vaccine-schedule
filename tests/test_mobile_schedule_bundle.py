from __future__ import annotations

import json
from pathlib import Path
import unittest

from tracker_schedule import SCHEDULE_VERSION, to_app_dict, build_country_schedule


ROOT = Path(__file__).resolve().parents[1]
BUNDLE_PATH = ROOT / "mobile/src/data/bg-schedule.json"


class MobileScheduleBundleTests(unittest.TestCase):
    def test_mobile_schedule_bundle_matches_tracker_projection(self) -> None:
        with BUNDLE_PATH.open(encoding="utf-8") as handle:
            bundled = json.load(handle)

        projected = json.loads(
            json.dumps(to_app_dict(build_country_schedule()), ensure_ascii=False)
        )
        self.assertEqual(bundled, projected)
        self.assertEqual(bundled["schedule_version"], SCHEDULE_VERSION)


if __name__ == "__main__":
    unittest.main()
