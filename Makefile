SITE_HOST ?= 127.0.0.1
SITE_PORT ?= 8000

.PHONY: validate site serve site-serve check-updates clean-site

validate:
	python3 validate.py

site: validate
	python3 scripts/build_static_site.py

serve site-serve: site
	SITE_HOST=$(SITE_HOST) SITE_PORT=$(SITE_PORT) python3 scripts/serve_static_site.py

check-updates:
	python3 scripts/check_updates.py

clean-site:
	rm -rf generated-site
