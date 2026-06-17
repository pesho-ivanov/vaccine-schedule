# Vaccine Schedule for Bulgaria

Reusable Bulgaria vaccine schedule data and rendering helpers.

- `vaccine_schedule.py` loads and renders the schedule.
- `data/bg/sources.yaml` contains source links.
- `data/bg/columns.yaml` defines stable age-column IDs.
- `data/bg/vaccines.yaml` defines vaccine row IDs, labels, short names, and aliases.
- `data/bg/schedule.yaml` defines doses by vaccine ID and column ID.
- `data/bg/metadata.yaml` contains UI text and display settings.
- `schema/*.schema.json` documents the YAML file contracts.
- `validate.py` checks required fields and cross-file references.

The module reads data relative to this directory, so it can be moved into a separate repository.

Run validation from the parent repository:

```sh
python3 vaccine-schedule/validate.py
```
