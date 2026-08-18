# Team Zig Systems Map — Version 2

This directory is the isolated Version 2 workspace. The published Version 1 site remains in `/systems-thinking/` and must not be modified as part of V2 work.

## Safety contract

- Work only inside `/systems-thinking-v2/` unless the user explicitly expands scope.
- Preserve the four-view interaction model and existing accessibility behavior until a reviewed requirement changes them.
- Treat `index.html` as the verified V1 behavioral baseline.
- Record research-driven changes in `CHANGELOG.md`.
- Separate evidence, interpretation, hypothesis, and future intent.
- Validate nodes, relationships, view membership, contextual copy, and direct connections together before publishing a structural change.

## Planned workflow

1. Confirm the copied site behaves like V1.
2. Extract embedded research data into a versioned systems-map contract.
3. Audit boundaries, abstraction levels, relationship meanings, evidence, and uncertainty.
4. Reconcile refreshed research with the baseline contract.
5. Review proposed additions, removals, merges, and directional changes.
6. Render the approved contract and regression-test every view.

Raw research is welcome; it does not need to be converted into JSON. Use `data/research-input-template.md` as an optional guide.
