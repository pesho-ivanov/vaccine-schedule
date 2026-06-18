SITE_HOST ?= 127.0.0.1
SITE_PORT ?= 8000

.PHONY: validate site serve site-serve

validate:
	python3 validate.py

site: validate
	python3 scripts/build_static_site.py

serve site-serve: site
	@echo "Serving generated-site at http://$(SITE_HOST):$(SITE_PORT)/"
	python3 -m http.server $(SITE_PORT) --bind $(SITE_HOST) --directory generated-site
