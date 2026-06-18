#!/usr/bin/env python3
from __future__ import annotations

import json
from pathlib import Path
import sys


ROOT = Path(__file__).resolve().parents[1]
OUTPUT_PATH = ROOT / "mobile/src/data/bg-schedule.json"

sys.path.insert(0, str(ROOT))

from tracker_schedule import build_country_schedule, to_app_dict, validate_country_schedule


def export_mobile_schedule(output_path: Path = OUTPUT_PATH) -> None:
    schedule = build_country_schedule()
    validate_country_schedule(schedule)
    output_path.parent.mkdir(parents=True, exist_ok=True)
    output_path.write_text(
        json.dumps(to_app_dict(schedule), ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )


def main() -> int:
    export_mobile_schedule()
    print(f"Wrote {OUTPUT_PATH.relative_to(ROOT)}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
