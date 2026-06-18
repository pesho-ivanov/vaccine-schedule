SHELL := /bin/sh

.DEFAULT_GOAL := help

PYTHON ?= python3
NPM ?= npm
MOBILE_DIR := mobile
EXPO_PORT ?= 8081
ANDROID_HOME ?= $(firstword $(wildcard $(HOME)/Android/Sdk $(HOME)/Android/sdk /usr/lib/android-sdk))
ANDROID_SDK_ROOT ?= $(ANDROID_HOME)

export ANDROID_HOME
export ANDROID_SDK_ROOT
ifneq ($(ANDROID_HOME),)
export PATH := $(ANDROID_HOME)/platform-tools:$(ANDROID_HOME)/emulator:$(PATH)
endif

.PHONY: help validate test ci export-mobile-schedule \
	mobile-install mobile-ci mobile-typecheck mobile-lint mobile-format-check mobile-test \
	mobile-start mobile-start-clean mobile-start-lan mobile-android mobile-android-clean \
	mobile-ios adb-reverse android-env

help:
	@printf '%s\n' 'Common targets:'
	@printf '  %-24s %s\n' 'make validate' 'Validate YAML data and tracker projection'
	@printf '  %-24s %s\n' 'make test' 'Run Python unit tests'
	@printf '  %-24s %s\n' 'make ci' 'Run Python validation/tests and mobile CI'
	@printf '  %-24s %s\n' 'make export-mobile-schedule' 'Regenerate mobile/src/data/bg-schedule.json'
	@printf '%s\n' ''
	@printf '%s\n' 'Mobile targets:'
	@printf '  %-24s %s\n' 'make mobile-install' 'Install mobile dependencies, including dev tools'
	@printf '  %-24s %s\n' 'make mobile-ci' 'Run mobile typecheck, lint, format check, and Jest'
	@printf '  %-24s %s\n' 'make mobile-start' 'Start Expo on localhost for emulator use'
	@printf '  %-24s %s\n' 'make mobile-start-clean' 'Start Expo on localhost with Metro cache cleared'
	@printf '  %-24s %s\n' 'make mobile-start-lan' 'Start Expo on LAN for physical phone use'
	@printf '  %-24s %s\n' 'make mobile-android' 'Start Expo and open Android emulator/device'
	@printf '  %-24s %s\n' 'make mobile-android-clean' 'Clear Metro cache and open Android emulator/device'
	@printf '  %-24s %s\n' 'make adb-reverse' 'Forward emulator port to localhost Metro'
	@printf '  %-24s %s\n' 'make android-env' 'Print detected Android SDK settings'

validate:
	$(PYTHON) validate.py

test:
	$(PYTHON) -m unittest discover

ci: validate test mobile-ci

export-mobile-schedule:
	$(PYTHON) scripts/export_mobile_schedule.py

mobile-install:
	cd $(MOBILE_DIR) && $(NPM) install --include=dev

mobile-ci:
	cd $(MOBILE_DIR) && $(NPM) run ci

mobile-typecheck:
	cd $(MOBILE_DIR) && $(NPM) run typecheck

mobile-lint:
	cd $(MOBILE_DIR) && $(NPM) run lint

mobile-format-check:
	cd $(MOBILE_DIR) && $(NPM) run format:check

mobile-test:
	cd $(MOBILE_DIR) && $(NPM) test

mobile-start:
	cd $(MOBILE_DIR) && npx expo start --localhost --port $(EXPO_PORT)

mobile-start-clean:
	cd $(MOBILE_DIR) && npx expo start --clear --localhost --port $(EXPO_PORT)

mobile-start-lan:
	cd $(MOBILE_DIR) && npx expo start --lan --port $(EXPO_PORT)

mobile-android:
	cd $(MOBILE_DIR) && npx expo start --localhost --port $(EXPO_PORT) --android

mobile-android-clean:
	cd $(MOBILE_DIR) && npx expo start --clear --localhost --port $(EXPO_PORT) --android

mobile-ios:
	cd $(MOBILE_DIR) && npx expo start --localhost --port $(EXPO_PORT) --ios

adb-reverse:
	adb reverse tcp:$(EXPO_PORT) tcp:$(EXPO_PORT)

android-env:
	@printf 'ANDROID_HOME=%s\n' '$(ANDROID_HOME)'
	@printf 'ANDROID_SDK_ROOT=%s\n' '$(ANDROID_SDK_ROOT)'
	@printf 'adb=%s\n' "$$(command -v adb || true)"
	@printf 'emulator=%s\n' "$$(command -v emulator || true)"
