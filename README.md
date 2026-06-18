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
- `generated-site/index.html` shows a static table of vaccines as rows and time points as columns.
- `scripts/build_static_site.py` exports the browser-friendly table data used by the site.

The module reads data relative to this directory, so it can be moved into a separate repository.

Run validation from the parent repository:

```sh
python3 vaccine-schedule/validate.py
```

Build the static site:

```sh
make site
```

Then open `generated-site/index.html` in a browser. The site is generated only from `data/bg/*.yaml`
and contains no user profile data.

Serve it locally:

```sh
make serve
```

Then open `http://127.0.0.1:8000/`. To use a different port, run
`make serve SITE_PORT=8093`.
