# Vaccination Tracker MVP Plan

## Product Goal

Build a cross-platform mobile app for parents in Bulgaria to track a child's vaccination progress against the Bulgarian immunization schedule. The MVP should turn a dense schedule table into a practical timeline: what has already been given, what is due next, what is overdue, and what optional/recommended vaccines may be relevant.

The current reference is the vaccination table at `https://pesho-ivanov.github.io/zoya/#vaccines`, reviewed on 2026-06-16. That table combines an age-based Bulgarian schedule with personal vaccine records, highlights completed columns, marks the latest vaccine, and shows the next expected date. It also separates mandatory and recommended vaccines and covers pregnancy, birth, early childhood, later childhood, and adult ranges. For the MVP, the app should focus on children from birth through 18 years, while keeping the data model ready for pregnancy/adult schedules and other EU countries later.

This app must be positioned as a tracking and reminder tool, not a medical decision system. Every screen that interprets schedules should make clear that parents should confirm timing, contraindications, catch-up cases, and optional vaccines with their pediatrician or GP.

## Reference Schedule Shape

The table's structure suggests the core schedule model:

- Age ranges: pregnancy, birth, months 1, 2, 3, 4, 6, 7, 12, 13, 15, 16, then years 4, 6, 7, 10, 12, 14, 15, 17, 18, and adult ranges.
- Mandatory rows: TB/BCG, diphtheria, tetanus, pertussis, polio, Hib, hepatitis B, pneumococcal, MMR, varicella.
- Recommended rows: pertussis in pregnancy, RSV, rotavirus, meningococcal, hepatitis A, COVID, influenza, HPV.
- Personal tracking overlay: recorded products and dates appear above schedule columns, with the last completed column and next due column visually emphasized.
- Source links: ECDC, Bulgarian immunization regulation, Plus Men, and State Gazette materials.

The MVP should not copy the table UI directly. A grid is useful for validation and expert review, but parents need a mobile-first timeline and task list. The dense grid can be a secondary "schedule view" for transparency.

## MVP Scope

### In Scope

- One or more child profiles with name or nickname, date of birth, sex, and country schedule selection.
- Bulgarian child schedule from birth through 18 years, split into mandatory and recommended groups.
- Recording administered vaccines with date, product name, dose/site notes, optional batch number, and optional clinic/doctor note.
- Automatic due-date calculation from birth date and schedule rules.
- Status labels: completed, due soon, due today, overdue, scheduled for later, optional/recommended, not applicable, and needs doctor confirmation.
- Next-actions screen showing the next expected visit/dose group.
- Local notifications for upcoming and overdue doses.
- Local-first storage so the app works offline and does not require an account.
- Export/share of the child's vaccination record as PDF or structured text for pediatrician visits.
- Bulgarian and English UI copy for MVP, because the existing reference is bilingual and EU expansion is likely.
- Source/version display for the active schedule data.

### Out of Scope for MVP

- Doctor, clinic, or government system integration.
- Cloud accounts and multi-device sync.
- OCR/import from paper immunization passports.
- Automated medical catch-up recommendations for missed/late vaccines.
- Medication safety, contraindication, or allergy decision support.
- Full EU schedule support beyond a data model and import path.
- Growth chart tracking, unless this MVP later merges with the existing Zoya medical site.

## Primary User Workflows

### 1. First Launch and Child Setup

The parent opens the app and creates a child profile. Required fields are date of birth and schedule country. Name can be a nickname to reduce privacy concerns. Sex is optional in the general workflow but needed for HPV schedule details later, so it should be captured with a "prefer not to say / set later" option.

After setup, the app immediately computes a timeline. If the child is older than birth, the app asks whether the parent wants to backfill known vaccines now or skip and mark the profile as incomplete. The app should avoid making assumptions that missing records mean missed vaccines.

### 2. Dashboard

The home screen shows the child's current age, the next vaccine group, the expected date window, and the current completion state. For example, a child born on a known date should see a "next due around" visit group rather than individual antigen rows only. Combination vaccines need to be understandable as a single visit/product that covers multiple schedule antigens.

Dashboard sections:

- Next visit: date, age milestone, mandatory antigens, likely product group if known, and optional/recommended items for discussion.
- Due soon and overdue: sorted by urgency.
- Recently completed: last recorded vaccine event.
- Schedule source: current country and data version.

### 3. Record a Vaccine

The parent taps a due item or a plus button. The form should default to the currently expected vaccine group and date, but allow manual edits. Fields:

- Administration date.
- Vaccine product name, with common Bulgarian-market examples where available but still editable.
- Covered antigens, derived from selected schedule item or product mapping.
- Dose number when applicable.
- Notes, batch number, clinic/doctor, and optional attachment placeholder for future use.

After saving, the app recalculates completion. If the date is outside the expected schedule window, the app should record it without judging it as wrong and show "confirm future timing with doctor" where needed.

### 4. Schedule View

Parents can open a "Schedule" tab with a simplified age timeline. Each milestone shows:

- Age: birth, 2 months, 3 months, 4 months, 12/13 months, 16 months, school-age milestones, etc.
- Mandatory vaccines due at that age.
- Recommended vaccines relevant at that age.
- Child-specific state: done, upcoming, overdue, or not recorded.

An advanced grid view can be included only if it stays readable on mobile. It is useful for matching the reference table and debugging schedule data, but it should not be the main experience.

### 5. Reminders

The app asks for notification permission only after the first due item exists. Default reminders:

- 14 days before a due date.
- 3 days before.
- On the due date.
- Weekly while overdue, capped to avoid nagging.

Notifications should be local and generated from local schedule data. Time zone changes should be handled by using calendar dates rather than exact instants.

### 6. Export

The export produces a parent-friendly record with child nickname/name, date of birth, country schedule, schedule version, completed vaccine events, upcoming items, and a disclaimer. It should be shareable as PDF and plain text in the MVP. Export is important because the app is not an official medical record.

## Data Model

Use a schedule-driven model rather than hardcoded UI rules.

Core entities:

- `CountrySchedule`: country code, jurisdiction name, language, source URLs, version, effective date, imported date.
- `ScheduleMilestone`: age anchor such as birth, weeks from birth, months from birth, years from birth, or pregnancy-relative rule.
- `VaccineAntigen`: TB, Hep B, DTP components, polio, Hib, pneumococcal, MMR, varicella, rotavirus, etc.
- `ScheduleDose`: antigen or antigen group, milestone, dose number, mandatory/recommended status, notes, eligibility rules, minimum intervals, source reference.
- `VaccineProduct`: product name, covered antigens, manufacturer/EMA link where useful, country availability metadata.
- `ChildProfile`: local profile fields, schedule country, birth date, sex, optional risk flags.
- `AdministrationEvent`: date, selected product, covered schedule doses, notes, batch, provider, created/updated timestamps.
- `Reminder`: schedule dose or visit group, notification dates, dismissed/snoozed state.

The first implementation can keep schedules in versioned JSON bundled with the app. Avoid server dependency for MVP. The JSON should be validated by tests and should support future imports from ECDC or country-specific source transforms.

## Schedule Logic

The app should compute planned due dates from the child's birth date and schedule milestones. The logic should support:

- Exact age milestones, such as birth, 2 months, 3 months, 4 months, 12 months, 13 months, 16 months, and school-age milestones.
- Minimum interval notes, such as "not earlier than X months after previous dose."
- Date windows where official guidance uses ranges rather than single dates.
- Product-to-antigen mapping for combination vaccines.
- Recommended vaccine rows that are shown separately and do not block mandatory completion.
- Eligibility rules for sex, age, risk group, pregnancy, and season.

For MVP, complex catch-up logic should be conservative. If a child is overdue or has non-standard dates, the app should show the factual record and prompt the parent to confirm timing with a clinician. It should not automatically generate clinical catch-up schedules unless those rules are formally encoded and reviewed.

## Technical Approach

Recommended stack: React Native with Expo and TypeScript.

Reasons:

- Single codebase for iOS and Android.
- Fast MVP iteration, OTA updates for non-native changes, and mature local notification support.
- Good ecosystem for local SQLite storage, PDF/share flows, localization, and form handling.
- Easier later transition to a backend or shared web code if the existing Zoya project grows into a family health app.

Local storage:

- SQLite for child profiles, administration events, reminders, and schedule metadata.
- Bundled JSON schedule files imported into SQLite on first launch or app update.
- Optional encrypted storage for small privacy-sensitive settings; evaluate full database encryption before handling highly sensitive notes or attachments.

Testing:

- Unit tests for schedule date calculations and status transitions.
- Fixture tests using a sample child date of birth to confirm expected due dates.
- Data validation tests for schedule JSON.
- Basic end-to-end tests for onboarding, record vaccine, dashboard update, and reminder scheduling.

## UX and Screens

MVP tabs:

- Today: next visit, due/overdue items, latest completed event.
- Timeline: child-specific vaccine milestones from birth to 18 years.
- Record: quick add/edit vaccine events.
- Profile: child details, schedule country, language, export, data/source version.

Design principles:

- Parent-first language: "Due around 2 months" rather than only abbreviations like D, TT, IPV.
- Keep medical abbreviations visible but secondary, with tap-to-expand definitions.
- Separate mandatory and recommended vaccines visually.
- Treat combination products as first-class entries, because parents usually remember "Infanrix hexa" or another product rather than six separate antigens.
- Use clear status colors, but do not use alarming language for overdue items.
- Make source and disclaimer easy to find without interrupting core use.

## Privacy, Safety, and Compliance

The MVP should be local-first and account-free. Parents should be able to use the app without sending child health data to any server. Analytics should be disabled initially or limited to privacy-preserving, opt-in app diagnostics with no health data.

Safety requirements:

- Prominent disclaimer in onboarding and export: the app is not medical advice or an official medical record.
- Each schedule version should list sources and import date.
- Schedule changes must be visible to users after app updates.
- Non-standard timing should be recorded neutrally and flagged for doctor confirmation.
- Optional/recommended vaccines should be clearly distinguished from mandatory ones.

## Execution and Tracking

This plan should be treated as a living build document. During implementation, each phase should be updated in place:

- Mark checklist items as complete only after implementation is merged or otherwise accepted.
- Add a short log entry after every meaningful work session.
- Record unresolved decisions as explicit next steps rather than leaving them implicit.
- Keep UAT scenarios current when scope changes.
- Do not advance a phase to complete until its exit criteria and UAT checks pass.

Status convention:

- `[ ]` not started.
- `[x]` complete.
- Use a short note such as `(in progress)` beside an item when it is actively being worked on.

## Working Log

| Date | Phase | Implemented | Verification / UAT | Next Steps |
| --- | --- | --- | --- | --- |
| 2026-06-16 | Planning | Expanded MVP plan with detailed phases, checklists, UAT, and log structure. | Markdown reviewed manually. | Start Phase 0 and validate schedule sources before app scaffolding. |
| 2026-06-18 | Phase 0 | Added source inventory, schedule-version decision, safety disclaimer copy, privacy/analytics policy, product vocabulary, and risk register. | Reviewed Lex.bg Ordinance No. 15, ECDC Bulgaria scheduler link, and Plus Men pregnancy recommendations; `python3 validate.py` passed; UAT scenarios prepared but not user-tested. | Start Phase 1 with a compatibility-preserving adapter. |
| 2026-06-18 | Phase 1 | Added compatibility-preserving app-facing schedule adapter, product mappings, source metadata, child fixtures, and projection validation. | `python3 validate.py` passed; `python3 -m unittest discover` passed. | Structure week/seasonal/minimum-interval rules before Phase 2 calculations depend on them. |

## Detailed Implementation Phases

### Phase 0: Product, Source, and Safety Baseline

Goal: lock down the MVP boundaries, schedule sources, safety posture, and acceptance criteria before app code starts. This phase prevents schedule logic, medical wording, and privacy assumptions from drifting later.

Deliverables:

- Final MVP scope and out-of-scope list.
- Source inventory for the Bulgarian schedule.
- Safety/disclaimer copy in Bulgarian and English.
- Product vocabulary for mandatory, recommended, optional, due, overdue, completed, and needs doctor confirmation.
- Initial acceptance criteria for all future phases.

Phase 0 baseline decisions:

#### MVP Schedule Version

The first encoded schedule version should be `BG-N15-2026-07-01`: the Bulgarian child schedule in Ordinance No. 15, Appendix 1, as amended through State Gazette No. 3/2026 with changes in force from 2026-07-01. This matches the current repository shape, including mandatory varicella entries.

If an app build is tested or released before 2026-07-01, the schedule must be labelled as an upcoming schedule version, not as the currently effective Bulgarian schedule. Before any beta release, re-check the official source and update the schedule version/import date if the regulation changes.

#### Source Inventory

| Source ID | Title | URL | Role | Effective / Version Notes | Accessed |
| --- | --- | --- | --- | --- | --- |
| `lex_calendar` | Наредба № 15 от 12 май 2005 г. за имунизациите в Република България | https://lex.bg/laws/ldoc/2135504228 | Normative source for mandatory, targeted, and recommended immunization categories; Appendix 1 is the Bulgarian immunization calendar. | Appendix 1 is amended through State Gazette No. 3/2026, in force from 2026-07-01. Use this as the primary source for child schedule encoding. | 2026-06-18 |
| `ecdc_calendar` | ECDC Vaccine Scheduler, Bulgaria | https://vaccine-schedule.ecdc.europa.eu/Scheduler/ByCountry?SelectedCountryId=35&IncludeChildAgeGroup=true&IncludeAdultAgeGroup=false | Cross-check source and future import-model reference for EU schedules. | Not a Bulgarian legal source. Use for comparison and country-schedule modelling, not as the authority when it conflicts with Ordinance No. 15. | 2026-06-18 |
| `pregnancy_vaccine` | Плюс мен: Препоръки за имунизация на бременни жени | https://plusmen.bg/bg/suggestions/pregnancy | Supplementary public-health source for pregnancy pertussis, influenza, COVID-19, and RSV recommendation copy/product examples. | Treat as contextual recommendation content, not as the child schedule authority. | 2026-06-18 |

Before beta release, add or verify Ministry of Health links for approved vaccine-product procurement/specification pages if product names are surfaced as more than examples.

#### Scope Decisions

- MVP age coverage is birth through 18 years.
- Pregnancy and adult columns remain in this repository for compatibility and source continuity, but the mobile MVP child timeline should hide pregnancy and adult milestones by default.
- Pregnancy recommendations are deferred from the main child-profile workflow. They may appear only as non-blocking educational/source context after the child timeline is stable.
- Mandatory and recommended items must be visually and semantically separate. Recommended vaccines must not reduce mandatory completion.
- Catch-up timing, contraindications, premature-infant rules, chronic-disease cases, and non-standard administration dates must be recorded neutrally and routed to "confirm with doctor" copy, not algorithmic medical advice.

#### Safety Disclaimer Copy

English:

> This app helps you track vaccination records and reminders using published schedule data. It is not medical advice, not a diagnosis tool, and not an official medical record. Always confirm vaccine timing, contraindications, catch-up vaccination, optional vaccines, and non-standard situations with your child's pediatrician or GP.

Bulgarian:

> Това приложение помага да проследявате имунизационни записи и напомняния според публикувани календарни данни. То не е медицински съвет, не е инструмент за диагноза и не е официален медицински документ. Винаги потвърждавайте срокове, противопоказания, наваксващи имунизации, препоръчителни ваксини и нестандартни случаи с педиатъра или личния лекар на детето.

Use the disclaimer in onboarding, export, source/version screens, and any screen that labels overdue or non-standard timing.

#### Privacy and Analytics Policy

- MVP privacy promise: local-first, no account, no server, and no network connection required for normal use.
- Child profiles, vaccine records, notes, reminder settings, and export data stay on the device unless the user explicitly shares an export.
- Do not collect analytics in the MVP.
- If diagnostics are later added, they must be opt-in, must exclude child health data, and must be documented before implementation.
- Attachments and free-text medical notes are privacy-sensitive; keep them deferred unless local encryption and deletion/export behavior are explicitly reviewed.

#### Product Vocabulary

| Concept | English UI Term | Bulgarian UI Term | Product Rule |
| --- | --- | --- | --- |
| Mandatory schedule item | Mandatory | Задължителна | Counts toward mandatory completion. |
| Recommended/optional item | Recommended | Препоръчителна | Shown separately; does not reduce mandatory completion when absent. |
| Completed item | Completed | Изпълнена | Requires a saved administration event or confirmed imported record. |
| Future item | Upcoming | Предстояща | Due date is outside the due-soon window. |
| Near-future item | Due soon | Скоро предстояща | Default threshold: within 14 calendar days unless Phase 2 changes it. |
| Due item | Due today | Днес е срокът | Due date equals the local calendar date. |
| Past-due item | Overdue | Просрочена | Use neutral copy; do not imply fault or medical harm. |
| Unknown history | Not recorded | Няма запис | Missing record is not the same as missed vaccination. |
| Older child setup state | Incomplete history | Непълна история | Shown after older-child onboarding when records are not backfilled. |
| Non-standard timing | Confirm with doctor | Потвърдете с лекар | Used for late/early records, catch-up questions, contraindications, and eligibility uncertainty. |

#### Risk Register

| Risk | Impact | Phase 0 Mitigation | Follow-up Phase |
| --- | --- | --- | --- |
| Schedule source drift before release | App may show stale or future-effective data as current. | Version is explicitly `BG-N15-2026-07-01`; re-verify before beta. | Phase 1, Phase 10 |
| Incorrect schedule encoding | Parent may receive misleading due/overdue status. | Use Ordinance No. 15 as primary authority and require source references for encoded rows. | Phase 1, Phase 2 |
| Missed or duplicated reminders | Parent may miss a visit or receive noisy notifications. | Define reminders as supportive only; disclaimer keeps clinician confirmation primary. | Phase 7 |
| Product-to-antigen mapping error | Combination products may mark wrong antigens complete. | Treat product mappings as examples until validated; allow manual correction. | Phase 1, Phase 6 |
| Privacy leakage through exports or diagnostics | Child health data may leave the device unintentionally. | No analytics; sharing only through explicit export/share actions. | Phase 3, Phase 8 |
| Overconfident medical wording | App may look like a medical decision system. | Standard disclaimer and "confirm with doctor" terminology are required. | Phase 4, Phase 5, Phase 9 |
| Date math and timezone errors | Due dates may shift around DST or month ends. | Phase 2 must use calendar dates, not exact instants. | Phase 2 |
| Breaking YAML contracts used by other repos | Downstream consumers may fail. | Additive-only policy is documented in `AGENTS.md`; Phase 1 should prefer adapters over schema rewrites. | Phase 1 |

Implementation checklist:

- [x] Review the existing Zoya vaccine table and identify schedule shape.
- [x] Capture official source URLs, source titles, effective dates, and access dates.
- [x] Confirm which Bulgarian schedule version the MVP will encode first.
- [x] Decide whether pregnancy recommendations are visible in MVP or deferred.
- [x] Define exact MVP age coverage: birth through 18 years.
- [x] Define the legal/medical disclaimer text in English.
- [x] Define the legal/medical disclaimer text in Bulgarian.
- [x] Define privacy promise: local-first, no account, no server by default.
- [x] Define analytics policy for MVP.
- [x] Create a risk register for schedule accuracy, missed reminders, incorrect product mapping, and privacy leakage.

UAT scenarios:

- UAT-0.1: A parent can read the product description and understand that the app tracks vaccination progress but does not replace a pediatrician.
- UAT-0.2: A reviewer can open the source inventory and see which official sources support the Bulgarian schedule data.
- UAT-0.3: A Bulgarian-speaking parent can read the core safety disclaimer without confusing it for medical advice.
- UAT-0.4: A product reviewer can clearly distinguish what is in the MVP from future roadmap items.

Exit criteria:

- All source and disclaimer decisions are recorded.
- No schedule data is encoded without a listed source.
- Open medical-safety questions are documented as blockers or deferred items.

Phase log:

| Date | Implemented | Verification / UAT | Next Steps |
| --- | --- | --- | --- |
| 2026-06-16 | Created initial MVP plan and expanded it with phase tracking. | Reviewed against the live Zoya vaccines table. | Add official source inventory and final disclaimer text. |
| 2026-06-18 | Recorded Phase 0 source inventory, schedule-version decision, scope decisions, disclaimer copy, privacy/analytics policy, vocabulary, and risk register. | Reviewed Lex.bg Ordinance No. 15, ECDC scheduler link, and Plus Men pregnancy recommendation page; `python3 validate.py` passed; UAT scenarios prepared but not user-tested. | Start Phase 1 with an adapter over the existing YAML contracts. |

### Phase 1: Schedule Data Model and Bulgarian Schedule Encoding

Goal: create a versioned, testable schedule data layer that can represent Bulgaria now and other EU country schedules later. The schedule should be independent from UI screens.

Deliverables:

- TypeScript domain types for schedules, milestones, antigens, products, dose rules, and source references.
- Versioned Bulgarian schedule JSON fixture.
- Data validation script or schema.
- Product-to-antigen mapping for common combination vaccines used in the reference table.
- Initial country/schedule metadata structure for future EU expansion.

Phase 1 implementation notes:

- Keep the existing YAML files and JSON schemas as the stable source contract for this repository.
- Use `tracker_schedule.py` as an additive adapter that projects the YAML into app-facing `CountrySchedule`, `ScheduleMilestone`, `VaccineAntigen`, `ScheduleDose`, `VaccineProduct`, and `SourceReference` dataclasses.
- The current adapter emits JSON through `python3 tracker_schedule.py`; the future React Native app can consume the same shape or port it to TypeScript types without changing YAML contracts.
- Product mappings are example mappings, not a closed product database. The app must keep product entry editable.
- Week-specific anchors and seasonal eligibility are not yet structured beyond labels/notes; Phase 2 should decide whether to encode them as typed rules before schedule calculations depend on them.

Implementation checklist:

- [x] Define `CountrySchedule`, `ScheduleMilestone`, `VaccineAntigen`, `ScheduleDose`, `VaccineProduct`, and `SourceReference` types.
- [ ] Represent age anchors for birth, weeks, months, years, ranges, and seasonal recommendations. (in progress: adapter projects birth, pregnancy, month, year, adult, and `through` ranges; week-specific and seasonal rules remain notes)
- [x] Encode mandatory child rows: TB/BCG, diphtheria, tetanus, pertussis, polio, Hib, hepatitis B, pneumococcal, MMR, and varicella.
- [x] Encode recommended child rows: rotavirus, meningococcal, hepatitis A, COVID, influenza, HPV, and RSV where relevant.
- [x] Decide how pregnancy pertussis and pregnancy RSV records relate to a child profile.
- [ ] Add notes for conditions such as BCG after negative Mantoux test and dose minimum intervals. (in progress: source notes are carried through; structured interval rules are still pending)
- [x] Add source references at schedule, row, and dose-rule level where practical.
- [x] Add schedule version, effective date, imported date, and source access date.
- [x] Add product mappings for examples from the reference table, such as BCG, Engerix B, Infanrix hexa, Vaxneuvance, Abrysvo, Boostrix, and Influvac tetra.
- [x] Validate that every schedule dose has an antigen, age anchor, status category, and source.
- [x] Add fixture child profiles for newborn, 2-month, 4-month, 13-month, 16-month, school-age, and overdue cases.

UAT scenarios:

- UAT-1.1: Given a newborn child profile, the system can show birth vaccines without needing UI-specific hardcoding.
- UAT-1.2: Given a child at 2 months, the system can list the expected mandatory vaccine group and relevant recommended vaccines.
- UAT-1.3: Given a product such as Infanrix hexa, the system can map it to the covered antigens rather than storing it as an unrelated free-text note only.
- UAT-1.4: Given a schedule item, a reviewer can trace it back to at least one source reference.
- UAT-1.5: Given a future country schedule file, the schema can represent it without Bulgaria-specific field names.

Exit criteria:

- The Bulgarian schedule fixture passes schema validation.
- All MVP schedule rows from the reference table are represented or explicitly deferred.
- At least seven fixture profiles produce expected schedule milestones.
- The schedule file can be updated independently from UI components.

Phase log:

| Date | Implemented | Verification / UAT | Next Steps |
| --- | --- | --- | --- |
| 2026-06-18 | Added `tracker_schedule.py` app-facing adapter, product mappings, source metadata, tracker child fixtures, and projection validation. | `python3 validate.py` passed; `python3 -m unittest discover` passed. | Structure week/seasonal/minimum-interval rules before Phase 2 calculations depend on them. |

### Phase 2: Schedule Calculation Engine

Goal: turn the schedule data and a child's birth date into actionable due dates, visit groups, statuses, and warnings.

Deliverables:

- Date calculation library.
- Status engine for completed, upcoming, due soon, due today, overdue, optional/recommended, not applicable, and needs doctor confirmation.
- Visit grouping logic so combination vaccines and same-day milestones are shown together.
- Conservative handling for late or non-standard administration dates.
- Unit and fixture tests.

Implementation checklist:

- [ ] Implement date math using calendar dates rather than exact timestamps.
- [ ] Calculate exact milestone dates from birth date for days, weeks, months, and years.
- [ ] Define configurable due-soon and overdue thresholds.
- [ ] Group same-date mandatory doses into a visit group.
- [ ] Keep recommended vaccines separate from mandatory completion.
- [ ] Mark non-standard or late entries as recorded while prompting doctor confirmation for future timing.
- [ ] Support minimum interval notes without pretending to generate full clinical catch-up plans.
- [ ] Recompute all statuses after an administration event changes.
- [ ] Add tests for leap years, month-end birth dates, daylight saving changes, and Europe/Sofia timezone behavior.
- [ ] Add tests for the reference example pattern: birth dose, 2-month dose, next 3-month dose.

UAT scenarios:

- UAT-2.1: Given a child born on 2026-03-21, the app computes the 2-month milestone around 2026-05-21 and the following monthly milestones consistently.
- UAT-2.2: Given a completed 2-month administration event, the next-action list advances to the next expected milestone.
- UAT-2.3: Given a missing past milestone, the app shows overdue without saying the parent made a medical error.
- UAT-2.4: Given a recommended vaccine, the mandatory completion percentage does not decrease when it is not recorded.
- UAT-2.5: Given an administration date outside the expected window, the event is saved and future timing is flagged for clinician confirmation.

Exit criteria:

- Unit tests cover normal, due, overdue, recommended, and non-standard timing cases.
- Date behavior is deterministic across iOS and Android.
- Calculation functions do not depend on React Native screens.

Phase log:

| Date | Implemented | Verification / UAT | Next Steps |
| --- | --- | --- | --- |
| TBD | Not started. | Not run. | Build calculation module after Phase 1 schema is stable. |

### Phase 3: App Foundation and Local Storage

Goal: scaffold the cross-platform mobile app and establish the local-first data architecture.

Deliverables:

- Expo React Native TypeScript app.
- Navigation structure for Today, Timeline, Record, and Profile tabs.
- SQLite schema and migrations.
- Schedule import from bundled JSON into local storage.
- Local settings for language, notification preferences, and active child.

Implementation checklist:

- [ ] Create Expo app with TypeScript.
- [ ] Add linting, formatting, unit test runner, and basic CI command.
- [ ] Add app navigation with placeholder screens.
- [ ] Add local database library and migration system.
- [ ] Create tables for child profiles, schedule metadata, schedule doses, products, administration events, reminders, and settings.
- [ ] Import bundled schedule JSON on first launch.
- [ ] Detect app schedule-data upgrades and preserve existing child records.
- [ ] Add local-only privacy defaults.
- [ ] Add Bulgarian and English localization framework.
- [ ] Add error boundary and basic app health logging without health data.

UAT scenarios:

- UAT-3.1: A tester can install and launch the app on iOS and Android without signing in.
- UAT-3.2: The app opens offline after first install and still has schedule data.
- UAT-3.3: Switching language changes app labels without changing recorded medical data.
- UAT-3.4: Updating the bundled schedule data does not delete child profiles or vaccine records.

Exit criteria:

- App launches on at least one iOS simulator/device and one Android emulator/device.
- Local database migrations run cleanly from a fresh install.
- Schedule data exists locally after first launch.

Phase log:

| Date | Implemented | Verification / UAT | Next Steps |
| --- | --- | --- | --- |
| TBD | Not started. | Not run. | Scaffold Expo app after calculation engine tests pass. |

### Phase 4: Child Profile and Onboarding

Goal: let a parent create and manage a child profile with enough data to calculate the schedule safely.

Deliverables:

- First-launch onboarding.
- Child profile create/edit screens.
- Country schedule selection, initially Bulgaria only.
- Profile completeness state for older children with missing historical records.
- Safety disclaimer acceptance.

Implementation checklist:

- [ ] Build first-launch flow with brief value proposition and disclaimer.
- [ ] Capture child nickname/name, date of birth, sex, and country schedule.
- [ ] Make name optional or nickname-friendly.
- [ ] Validate date of birth and prevent impossible future/very old child dates.
- [ ] Add Bulgaria as the default schedule while keeping the country selector extensible.
- [ ] Ask older-child users whether they want to backfill records now or continue with incomplete history.
- [ ] Store disclaimer acceptance version and timestamp.
- [ ] Add edit profile flow.
- [ ] Add delete profile flow with confirmation and export reminder.
- [ ] Support multiple child profiles if kept in MVP; otherwise explicitly defer and explain why.

UAT scenarios:

- UAT-4.1: A parent can create a newborn profile in under one minute.
- UAT-4.2: A parent can create a 13-month-old child profile and sees a prompt that historical vaccines may need backfilling.
- UAT-4.3: A parent can use a nickname instead of a legal name.
- UAT-4.4: A parent cannot continue with an invalid date of birth.
- UAT-4.5: A parent can edit the child's profile and the schedule recalculates.

Exit criteria:

- Onboarding creates a persisted child profile.
- Disclaimer acceptance is recorded.
- The app can compute schedule status immediately after profile creation.

Phase log:

| Date | Implemented | Verification / UAT | Next Steps |
| --- | --- | --- | --- |
| TBD | Not started. | Not run. | Build after app foundation and local storage are available. |

### Phase 5: Today Dashboard and Timeline

Goal: present the schedule as a parent-friendly action list and timeline, not as a dense desktop table.

Deliverables:

- Today screen with current age, next visit, overdue/due soon items, and latest completed event.
- Timeline screen from birth through 18 years.
- Status chips and visual distinction for mandatory vs recommended.
- Detail view for antigen definitions, product examples, notes, and source references.
- Empty, loading, error, and incomplete-history states.

Implementation checklist:

- [ ] Build Today screen layout.
- [ ] Show current child age in weeks/months/years as appropriate.
- [ ] Show next due milestone with expected date or date window.
- [ ] Show overdue items separately from upcoming items.
- [ ] Show recommended vaccines without mixing them into mandatory completion.
- [ ] Build Timeline screen grouped by age milestone.
- [ ] Add vaccine detail drawer/page with plain-language description and abbreviations.
- [ ] Link each schedule item to source metadata.
- [ ] Add incomplete-history banner for older children without backfilled records.
- [ ] Add accessible labels, dynamic text sizing, and high-contrast status states.

UAT scenarios:

- UAT-5.1: A parent can open the app and immediately understand the next expected vaccine visit.
- UAT-5.2: A parent can distinguish mandatory vaccines from recommended vaccines.
- UAT-5.3: A parent can tap an abbreviation such as Hib, MMR, or IPV and see a plain-language explanation.
- UAT-5.4: A parent can see why an item is due or overdue based on the child's age.
- UAT-5.5: A reviewer can trace a schedule item from the UI to source/version information.

Exit criteria:

- Dashboard and timeline are usable on small Android and iPhone screens.
- All schedule statuses have visible and accessible states.
- Parent-facing copy avoids clinical overclaiming.

Phase log:

| Date | Implemented | Verification / UAT | Next Steps |
| --- | --- | --- | --- |
| TBD | Not started. | Not run. | Build after onboarding and calculation engine are connected. |

### Phase 6: Vaccine Recording and Editing

Goal: allow parents to record real vaccine events and have the app update progress accurately.

Deliverables:

- Add vaccine event flow.
- Edit/delete vaccine event flow.
- Product picker with editable free-text fallback.
- Antigen coverage selection and dose matching.
- Audit-friendly event details.

Implementation checklist:

- [ ] Add quick record action from Today and Timeline screens.
- [ ] Default the form from the selected due milestone.
- [ ] Allow manual date, product, covered antigens, notes, batch number, clinic/doctor, and dose number.
- [ ] Support combination products that satisfy multiple antigen rows.
- [ ] Allow free-text product entry when the product is not in the database.
- [ ] Show a warning when the selected product/antigens do not match the expected milestone.
- [ ] Save administration events locally.
- [ ] Recompute schedule status after create, edit, and delete.
- [ ] Keep a change timestamp for each event.
- [ ] Add confirmation before deleting a recorded vaccine.

UAT scenarios:

- UAT-6.1: A parent records a 2-month vaccine visit and the Today screen advances to the next expected milestone.
- UAT-6.2: A parent records a combination product and sees all covered antigens marked as completed.
- UAT-6.3: A parent can record a vaccine product that is not in the product picker.
- UAT-6.4: A parent can correct a wrong date and see the timeline update.
- UAT-6.5: A parent can delete an accidental event only after confirming the destructive action.

Exit criteria:

- Create, edit, and delete flows work offline.
- Status recalculation is correct after each mutation.
- No event is lost after app restart.

Phase log:

| Date | Implemented | Verification / UAT | Next Steps |
| --- | --- | --- | --- |
| TBD | Not started. | Not run. | Build after Today and Timeline can display calculated status. |

### Phase 7: Reminders and Notifications

Goal: help parents remember upcoming and overdue milestones without creating excessive or misleading alerts.

Deliverables:

- Notification permission flow.
- Local notification scheduler.
- Reminder settings.
- Reminder rescheduling after profile or event changes.
- Overdue reminder throttling.

Implementation checklist:

- [ ] Ask for notification permission contextually, after the app has a real upcoming due date.
- [ ] Schedule reminders 14 days before, 3 days before, and on the due date by default.
- [ ] Add weekly overdue reminder with a reasonable cap.
- [ ] Let parents disable reminders globally.
- [ ] Let parents disable reminders per child if multiple profiles are supported.
- [ ] Reschedule reminders after birth date, schedule, or vaccine event changes.
- [ ] Cancel reminders for completed vaccine groups.
- [ ] Use calendar-date semantics to avoid timezone drift.
- [ ] Add notification copy in English and Bulgarian.
- [ ] Add fallback UI when notifications are denied.

UAT scenarios:

- UAT-7.1: A parent sees the notification permission prompt only after a meaningful reminder exists.
- UAT-7.2: A due vaccine group schedules the expected reminder dates.
- UAT-7.3: Recording the vaccine cancels future reminders for that completed group.
- UAT-7.4: Denying notification permission does not block app usage.
- UAT-7.5: Changing the child's date of birth reschedules future reminders.

Exit criteria:

- Local notifications work on iOS and Android.
- Reminder state is visible and controllable by the user.
- No completed item continues to generate due reminders.

Phase log:

| Date | Implemented | Verification / UAT | Next Steps |
| --- | --- | --- | --- |
| TBD | Not started. | Not run. | Build after vaccine recording is stable. |

### Phase 8: Export, Backup, and Source Transparency

Goal: make the app useful during pediatrician visits and transparent about its data sources.

Deliverables:

- PDF export.
- Plain-text or share-sheet export.
- Source/version screen.
- Optional local backup/export of app data.
- Schedule update notes for bundled data changes.

Implementation checklist:

- [ ] Generate a vaccination record with child profile, schedule country, schedule version, completed events, upcoming items, and disclaimer.
- [ ] Add PDF export through the platform share sheet.
- [ ] Add plain-text export for simple sharing.
- [ ] Include product names, administration dates, batch/provider notes when entered, and covered antigens.
- [ ] Include source version and app disclaimer in exports.
- [ ] Add source/version screen listing official references and imported/accessed dates.
- [ ] Add local data export for backup, if feasible within MVP.
- [ ] Add import/restore only if it can be done safely; otherwise defer.
- [ ] Ensure exported files do not leave the device unless the user explicitly shares them.

UAT scenarios:

- UAT-8.1: A parent can export a readable vaccine record and share it with a doctor.
- UAT-8.2: The export includes schedule version and disclaimer.
- UAT-8.3: The export includes completed vaccines and upcoming due items.
- UAT-8.4: A parent can find the Bulgarian schedule sources from the app settings/profile area.
- UAT-8.5: A parent understands that sharing an export sends health information outside the app.

Exit criteria:

- Export works offline.
- Exported content matches locally stored events.
- Source/version information is available both in-app and in exported records.

Phase log:

| Date | Implemented | Verification / UAT | Next Steps |
| --- | --- | --- | --- |
| TBD | Not started. | Not run. | Build after record storage and schedule source metadata are stable. |

### Phase 9: Localization, Accessibility, and Content Review

Goal: make the MVP usable for Bulgarian and English-speaking parents and robust across common mobile accessibility settings.

Deliverables:

- Bulgarian and English UI strings.
- Bulgarian and English vaccine labels and descriptions.
- Accessibility pass for core flows.
- Content review pass for medical wording.
- Small-screen layout pass.

Implementation checklist:

- [ ] Move all user-facing strings into localization files.
- [ ] Translate onboarding, dashboard, timeline, record form, reminder, export, and disclaimer copy.
- [ ] Review vaccine abbreviations and plain-language names in both languages.
- [ ] Test dynamic font sizes.
- [ ] Test screen reader labels for status chips, buttons, and vaccine rows.
- [ ] Verify color is not the only status indicator.
- [ ] Test small Android viewport and small iPhone viewport.
- [ ] Review all overdue/due wording for non-judgmental tone.
- [ ] Ask a Bulgarian-speaking reviewer to check clarity.

UAT scenarios:

- UAT-9.1: A Bulgarian-speaking parent can complete onboarding and record a vaccine without switching to English.
- UAT-9.2: An English-speaking parent can understand the Bulgarian schedule context and warnings.
- UAT-9.3: A user with larger text enabled can complete the main flows without clipped labels.
- UAT-9.4: A screen reader user can identify whether an item is completed, due, overdue, or recommended.
- UAT-9.5: Colorblind users can distinguish statuses through text or icons.

Exit criteria:

- Core flows are localized.
- Core flows pass manual accessibility checks.
- No critical layout breaks on small screens or large text.

Phase log:

| Date | Implemented | Verification / UAT | Next Steps |
| --- | --- | --- | --- |
| TBD | Not started. | Not run. | Run after core screens exist, then repeat before beta. |

### Phase 10: Beta Hardening and Release Preparation

Goal: prepare a reliable internal beta that can be tested by real parents without data loss or misleading schedule behavior.

Deliverables:

- TestFlight build.
- Android internal testing build.
- Regression test checklist.
- Known issues list.
- Beta feedback form.
- Release notes and privacy/safety summary.

Implementation checklist:

- [ ] Run full unit test suite.
- [ ] Run data validation against the Bulgarian schedule fixture.
- [ ] Run end-to-end tests for onboarding, record vaccine, reminder scheduling, export, and profile edit.
- [ ] Test fresh install, app restart, app update, and offline use.
- [ ] Test at least one iOS device/simulator and one Android device/emulator.
- [ ] Validate schedule output against the reference table and official sources.
- [ ] Run UAT with 3-5 parents.
- [ ] Record feedback by severity: blocker, important, nice-to-have.
- [ ] Fix blocker issues before beta release.
- [ ] Prepare release notes that state the app is a tracker, not official medical advice.
- [ ] Prepare privacy summary for app store/test distribution.

UAT scenarios:

- UAT-10.1: A beta parent can create a profile, understand the next due milestone, record a vaccine, and export a record without help.
- UAT-10.2: A beta parent understands mandatory vs recommended items.
- UAT-10.3: A beta parent understands that non-standard or overdue cases should be discussed with a clinician.
- UAT-10.4: A beta parent can use the app offline.
- UAT-10.5: A beta parent can delete local data or remove a child profile.

Exit criteria:

- No known blocker bugs remain.
- UAT feedback does not reveal confusing medical or safety wording.
- Builds are installable through TestFlight and Android internal testing.
- The release notes, disclaimer, source version, and privacy summary are ready.

Phase log:

| Date | Implemented | Verification / UAT | Next Steps |
| --- | --- | --- | --- |
| TBD | Not started. | Not run. | Begin after all MVP features are implemented and localized. |

## MVP Success Criteria

- A parent can create a child profile in under one minute.
- The app shows the next due Bulgarian schedule milestone from the child's birth date.
- A parent can record a completed vaccine event and see the dashboard update immediately.
- The app can distinguish completed, upcoming, due, and overdue items.
- Local notifications work on both iOS and Android.
- The user can export a readable vaccination record.
- The schedule data is versioned, sourced, and covered by tests.
- No account or network connection is required for normal use.

## Post-MVP Roadmap

- Add official schedule update pipeline and in-app update notes.
- Add other EU country schedules using the same schedule schema.
- Add optional secure cloud sync and family sharing.
- Add pediatrician visit planning and custom reminders.
- Add OCR/import from paper records or PDFs.
- Add richer product database with EMA links and country availability.
- Add catch-up schedule support only after clinical rule review.
