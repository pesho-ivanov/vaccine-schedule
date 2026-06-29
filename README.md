# Vaccine Schedule for Bulgaria

Reusable Bulgaria vaccine schedule data and rendering helpers.

- `vaccine_schedule.py` loads and renders the schedule.
- `data/sources.yaml` contains source links.
- `data/columns.yaml` defines stable age-column IDs and optional display column groups.
- `data/diseases.yaml` defines disease row IDs, labels, and ECDC links.
- `data/schedule.yaml` defines doses by disease ID and column ID.
- `data/dose_texts.yaml` defines visible dose labels by disease ID and column ID.
- `data/notes.yaml` defines dose notes by disease ID and column ID.
- `data/metadata.yaml` contains UI text and display settings.
- `data/bg/*.yaml` contains Bulgarian translation overlays for the matching base files.
- `schema/*.schema.json` documents the YAML file contracts.
- `validate.py` checks required fields and cross-file references.
- `site-src/` contains the static site source.
- `generated-site/` is ignored generated output with the browser-ready vaccine table.
- `scripts/build_static_site.py` builds the static site and exports browser-friendly table data.

The module reads data relative to this directory, so it can be moved into a separate repository.

`data/columns.yaml` keeps `columns` as the stable schedule axis. The optional
`column_groups` field clusters those existing IDs for display, without replacing
or renaming any column IDs.

Run validation from the parent repository:

```sh
python3 vaccine-schedule/validate.py
```

Build the static site:

```sh
make site
```

Then open `generated-site/index.html` in a browser. The site copies static assets from
`site-src/`, generates schedule data from `data/*.yaml` plus `data/bg/*.yaml` overlays,
and contains no user profile data.

Serve it locally:

```sh
make serve
```

Then open `http://127.0.0.1:8000/`. To use a different port, run
`make serve SITE_PORT=8093`.
