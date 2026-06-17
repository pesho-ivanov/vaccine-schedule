# Agent Instructions

This repository is consumed by other repositories. Preserve reverse compatibility
for the YAML data contracts.

- Do not rename, remove, or repurpose existing YAML keys, IDs, enum values, or
  field meanings in `data/**/*.yaml`.
- Do not make breaking changes to the schema files in `schema/*.schema.json`.
- New YAML fields must be optional by default, documented in the relevant schema,
  and handled without breaking older consumers.
- If a breaking schema change is explicitly requested, provide a versioned
  migration path and update validation/docs in the same change.

