# Vaccine Schedule for Bulgaria

Reusable Bulgaria vaccine schedule data and rendering helpers.

- `vaccine_schedule.py` loads and renders the schedule.
- `tracker_schedule.py` projects the stable YAML data into an app-facing schedule model.
- `tracker_calculations.py` computes milestone due dates, dose statuses, visit groups, and completion summaries.
- `data/bg/sources.yaml` contains source links.
- `data/bg/columns.yaml` defines stable age-column IDs.
- `data/bg/vaccines.yaml` defines vaccine row IDs, labels, short names, and aliases.
- `data/bg/schedule.yaml` defines doses by vaccine ID and column ID.
- `data/bg/metadata.yaml` contains UI text and display settings.
- `fixtures/tracker_child_profiles.json` contains deterministic child-profile fixtures for tracker tests.
- `schema/*.schema.json` documents the YAML file contracts.
- `validate.py` checks required fields, cross-file references, and the app-facing tracker projection.

The module reads data relative to this directory, so it can be moved into a separate repository.

Run validation from the parent repository:

```sh
python3 vaccine-schedule/validate.py
```

Run unit tests from this repository:

```sh
python3 -m unittest discover
```

Export the app-facing schedule projection as JSON:

```sh
python3 tracker_schedule.py
```

Preview the calculation engine with a generated example profile:

```sh
python3 tracker_calculations.py
```
