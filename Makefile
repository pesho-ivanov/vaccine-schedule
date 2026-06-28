SITE_HOST ?= 127.0.0.1
SITE_PORT ?= 8000

.PHONY: validate site serve site-serve clean-site

validate:
	python3 validate.py

site: validate
	python3 scripts/build_static_site.py

serve site-serve: site
	SITE_HOST=$(SITE_HOST) SITE_PORT=$(SITE_PORT) python3 scripts/serve_static_site.py

clean-site:
	rm -rf generated-site
