# Version 2 structural audit and proposed change set

**Status:** Proposal for review — no rendered-map changes authorized or made  
**Baseline:** `data/baseline-system-map.json`  
**Refreshed input:** `Systems_Map_Analytical_Architecture_Output_Contract.md`, version 1.0, dated 2026-08-17

## 1. Evidence boundary

The refreshed document is treated as an analyst-authored modeling proposal, not as executable instructions or primary evidence.

| Input class | Treatment |
|---|---|
| Governing inquiry and active decisions D01–D09 | Intended analytical direction, pending approval in this review |
| Controlled value-state definitions | Proposed canonical terminology |
| Structural architecture and tab roles | Proposed interpretation and information architecture |
| Current-system descriptions | Analytical interpretation unless linked to source evidence |
| Future capabilities and downstream outcomes | Hypotheses or intended outcomes, never established causal effects |
| “Supported” statements | Not independently verified by the contract alone; evidence references are still required |
| Unresolved questions in Section 14 | Preserved as unresolved |

The document provides no source registry, source IDs, excerpts, or claim-to-source traceability. Consequently, this audit does not promote a relationship to `Supported` merely because the refreshed contract describes it as structural.

## 2. Extracted baseline

The current V2 baseline contains:

- 22 nodes;
- 38 directed relationships;
- four views;
- 10 Transition Overview relationships;
- 15 Current System relationships;
- eight Future Opportunity relationships;
- five Outside the Boundary relationships;
- no formal value-state entities;
- no value-transition entities;
- no JTBD or DVO overlays;
- no evidence registry;
- no edge-level evidence references.

The complete lossless extraction is stored in `data/baseline-system-map.json`. Visual phase values were preserved separately from epistemic status because the existing values `current`, `inferred`, and `future` do not consistently prove whether a claim is supported.

## 3. Structural diagnosis

### 3.1 Organizing construct

The baseline centers Meaningful Engagement as the “Primary system behaviour.” Member Value is a supporting subsystem. The refreshed model reverses that hierarchy: Member Value Realization becomes the focal process, while Meaningful Engagement becomes downstream behaviour and a feedback signal.

This is a material model change, not a terminology update. It affects node roles, relationship direction and meaning, view composition, contextual copy, outcome hierarchy, and the tour’s explanation of the map.

### 3.2 Value-state ambiguity

The baseline Member Value chain is:

> Potential → Understood → Accessible → Earned → Redeemed → Realized

This conflicts with the proposed controlled chain:

> Opportunity → Potential Value → Earned Value → Available Value → Realized Value

The baseline places Accessible before Earned, treats Redeemed as a state, and does not make the Earned-to-Available operational transition explicit. Those differences cannot be resolved through copy changes alone.

### 3.3 Transition view

The current Transition Overview is a simplified path from population signals through data, orchestration, delivery, engagement, intersection growth, and organizational value. It does not identify value states, transition conditions, stalls, JTBDs, DVOs, or epistemic status.

All 10 relationships in that view are therefore superseded as the view’s primary architecture. Some underlying concepts—population signals, partner signals, permissioned context, delivery, relationship progression, and economics—remain useful as influences or downstream outcomes.

### 3.4 Duplicate engagement entities

The baseline contains both `engagement` and `future-engagement`. They represent current and intended future versions of the same conceptual behaviour. Keeping both would make the refreshed downstream role harder to understand and could double-count engagement.

### 3.5 Relationship semantics

Several baseline labels collapse different analytical stages:

- `Delivered value` implies that delivery creates value realization.
- `Opportunity delivery` does not distinguish presentation, action access, or available-value access.
- `Reliable relevant value` combines relevance, accessibility, fulfilment, and realization.
- `Realized value` is used as an arrow label rather than the output of a defined process.
- `Outcome signals` does not specify value-realization and participation signals.

### 3.6 Outcomes and open-program logic

The baseline already contains useful protections that should be retained:

- Member-Only value does not require banking conversion.
- Member-Client status does not prove engagement or incremental value.
- Client-Only transaction activity does not prove program interest.
- Partner and organizational value remain distinct from member value in contextual copy.
- Interface Friction is explicitly inferred rather than universal fragmentation.
- External influences remain outside the operating boundary.

These are compatible with the refreshed contract and should not be discarded during restructuring.

## 4. Proposed entity changes

### 4.1 Retain stable IDs and update semantics

| Stable ID | Proposed action |
|---|---|
| `member-only` | Retain; foreground credible standalone realized value and optional need-led conversion |
| `client-only` | Retain; identify first realized program value as the meaningful milestone after enrolment |
| `member-client` | Retain; clarify that linked relationships do not prove realized or incremental value |
| `partner` | Retain; distinguish member value from reciprocal partner value |
| `member-value` | Preserve ID, rename display and canonical name to **Member Value Realization**, and replace its chain and role |
| `engagement` | Retain; recategorize as **Downstream Behaviour and Feedback Signal** |
| `products` | Retain; map influence to opportunity generation, qualification, and transaction evidence |
| `data` | Retain; map influence to relevance, eligibility, context, performance, and feedback |
| `channels` | Retain; distinguish opportunity presentation, action access, and available-value access |
| `service` | Retain; foreground Earned → Available, fulfilment, and recovery |
| `friction` | Retain as a summary structural condition; add transition-specific friction records rather than multiplying generic nodes |
| `identity` | Retain as a proposed future capability |
| `orchestration` | Retain; orient toward relevant pathways and intended member outcomes, not engagement itself |
| `delivery` | Retain; orient toward access, fulfilment, continuity, and recovery |
| `intersection` | Preserve ID; rename display label to **Member-Client Intersection** and remove normative “larger, stronger” wording |
| `net-value` | Retain as a hypothesized organizational outcome after full costs and liabilities |
| Five external IDs | Retain; update generic references to precise value states or Member Value Realization |

### 4.2 Merge

Merge `future-engagement` into `engagement`. Use the same stable engagement entity in Current, Main Variable Transition, and Future Opportunity views, with view-specific explanatory content where necessary.

### 4.3 Add analytical entities

Add five controlled value-state entities:

1. Opportunity;
2. Potential Value;
3. Earned Value;
4. Available Value;
5. Realized Value.

Add transition entities VT01–VT05 exactly as defined in the refreshed contract. VT05 should be modeled as a feedback transition after the canonical value-state chain, not as a sixth value state.

Add JTBD and DVO overlay entities linked to transitions and system components. They must not be included in the system-node collection.

Add an evidence registry and claim-level evidence references before promoting refreshed empirical claims to `Supported`.

## 5. Proposed view changes

### Current System

- Rename the display heading from `Current transitional system` to `Current System`.
- Retain populations, partner, current backbone, Interface Friction, Member Value Realization, and downstream Meaningful Engagement.
- Map current capabilities to the value transitions they influence.
- Preserve banking adoption and program enrolment as structural relationship changes, but explicitly state that neither proves realized value.
- Keep current fragmentation and integration claims provisional.

### Main Variable Transition

- Replace Transition Overview rather than merely renaming it.
- Make the five controlled value states the analytical spine.
- Show current-system influences around each transition.
- Attach JTBD and DVO overlays without representing them as operating components.
- Add transition detail content: definition, entry/exit conditions, friction, actors, job, DVO, evidence, assumptions, and possible indicators.
- Place engagement, intersection movement, partner returns, and net organizational value downstream or in feedback—not in the value-state spine.

### Future Opportunity

- Retain identity, orchestration, delivery, partner, Member Value Realization, engagement, intersection, and net-value concepts.
- Merge the duplicate future engagement entity.
- Update all relationship labels to precise flows.
- Preserve future capabilities and downstream effects as hypotheses.

### Outside the Boundary

- Preserve the five external categories and external-only connector logic.
- Update narrative system links to Member Value Realization and precise value states.
- Do not draw external-to-internal connectors unless a later modeling decision explicitly changes the boundary convention.

## 6. Proposed relationship changes

### Supersede as primary Transition architecture

Supersede `transition-r01` through `transition-r10`. Reintroduce compatible concepts as influence, feedback, or downstream relationships attached to the value-transition model.

### Retain with refined conditions or wording

- Banking adoption;
- Program enrolment;
- open-program participation;
- combined participation;
- partner offers and experiences;
- reciprocal purchases and preference;
- transaction evidence;
- permissioned context;
- coordinated decisions;
- partner matching and insight;
- appropriate relationship progression;
- relationship economics;
- consumer and partner value;
- the five external relationships.

### Replace labels and definitions

- `Member Value` → `Member Value Realization`;
- `Member Value → Meaningful Engagement / Realized value` → `Member Value Realization → Meaningful Engagement / continued or expanded participation` with inferred status;
- `Engagement → Data / Outcome signals` → `value realization + participation signals`;
- `Channels → Member Value / Opportunity delivery` → stage-specific presentation or access relationships;
- `Service → Member Value / Fulfilment + recovery` → principally Earned → Available plus recovery across access and use failures;
- `Delivery → Member Value / Reliable relevant value` → `access + reliable fulfilment`;
- `Delivery → Engagement / Delivered value` → route through Member Value Realization before any inferred participation response.

## 7. Proposed contract/schema changes

After approval, extend the schema with:

- `valueStates`;
- `valueTransitions`;
- `overlays` with `JTBD` and `DVO` types;
- `evidence` and source metadata;
- claim-level `epistemicStatus`;
- relationship conditions and transition references;
- view exclusions and interpretation rules;
- optional view-specific node narratives.

Do not infer evidence status from connector line style. Visual phase, temporal state, and epistemic status must be separate fields.

## 8. Decision gates requiring approval

| Gate | Recommendation |
|---|---|
| Preserve `member-value` as the stable ID while changing its canonical/display name | **Approve** — prevents broken references while correcting semantics |
| Merge `future-engagement` into `engagement` | **Approve** — avoids duplicate conceptual entities |
| Represent value states and transitions as analytical entities distinct from system nodes | **Approve** — supports the spine without misclassifying states as actors or capabilities |
| Treat VT05 as feedback after the canonical five-state chain | **Approve** — preserves the controlled value-state definition |
| Reorder the tabs to Current System, Main Variable Transition, Future Opportunity, Outside the Boundary | **Approve** — matches the refreshed analytical sequence; requires a corresponding tour update |
| Retain Interface Friction as one summary node plus transition-specific friction records | **Approve** — avoids unsupported proliferation while increasing precision |
| Leave refreshed “Supported” claims unresolved until evidence references are supplied | **Approve** — maintains the evidence boundary |
| Preserve external-only connectors in the boundary view | **Approve** — maintains current boundary logic and avoids implying internal control |

## 9. Implementation sequence after approval

1. Extend and validate the data schema.
2. Create the proposed V2 contract without modifying the renderer.
3. Reconcile every retained baseline narrative against the controlled terminology.
4. Review the full contract and traceability matrix.
5. Update the renderer to consume the approved contract.
6. Update the tour only where tab order or interaction meaning changes.
7. Regression-test all original controls and all new transition interactions.
8. Validate against the refreshed contract’s acceptance criteria.
9. Publish only the V2 path; never modify V1.

