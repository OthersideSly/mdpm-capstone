import assert from "node:assert/strict";
import fs from "node:fs";

const contract = JSON.parse(fs.readFileSync(new URL("../data/system-map.json", import.meta.url), "utf8"));
const index = fs.readFileSync(new URL("../index.html", import.meta.url), "utf8");

const uniqueIds = (items, label) => {
  const ids = new Set(items.map(item => item.id));
  assert.equal(ids.size, items.length, `Duplicate ${label} IDs`);
  return ids;
};

const nodeIds = uniqueIds(contract.nodes, "node");
const valueStateIds = uniqueIds(contract.valueStates, "value-state");
const transitionIds = uniqueIds(contract.valueTransitions, "transition");
const relationshipIds = uniqueIds(contract.relationships, "relationship");
const overlayIds = uniqueIds(contract.overlays, "overlay");
const endpointIds = new Set([...nodeIds, ...valueStateIds]);

assert(nodeIds.has(contract.mainVariableId), "Main variable ID does not resolve to a system node");
assert.equal(
  contract.valueStates.map(state => state.label).join(" → "),
  "Opportunity → Potential Value → Earned Value → Available Value → Realized Value",
  "Controlled value-state chain is incorrect"
);

for (const relationship of contract.relationships) {
  assert(endpointIds.has(relationship.sourceId), `Unknown source on ${relationship.id}`);
  assert(endpointIds.has(relationship.targetId), `Unknown target on ${relationship.id}`);
  assert((relationship.valueTransitionIds || []).every(id => transitionIds.has(id)), `Unknown transition on ${relationship.id}`);
}

for (const transition of contract.valueTransitions) {
  assert(endpointIds.has(transition.fromState), `Unknown fromState on ${transition.id}`);
  assert(endpointIds.has(transition.toState), `Unknown toState on ${transition.id}`);
  assert(transition.jtbdRefs.every(id => overlayIds.has(id)), `Unknown JTBD on ${transition.id}`);
  assert(transition.dvoRefs.every(id => overlayIds.has(id)), `Unknown DVO on ${transition.id}`);
}

for (const view of contract.views) {
  assert(view.nodeIds.every(id => nodeIds.has(id)), `Unknown node in ${view.id}`);
  assert((view.valueStateIds || []).every(id => valueStateIds.has(id)), `Unknown state in ${view.id}`);
  assert(view.relationshipIds.every(id => relationshipIds.has(id)), `Unknown relationship in ${view.id}`);
  assert(view.transitionIds.every(id => transitionIds.has(id)), `Unknown transition in ${view.id}`);
}

for (const entity of [
  ...contract.nodes,
  ...contract.valueStates,
  ...contract.valueTransitions,
  ...contract.relationships,
  ...contract.overlays
]) {
  assert(entity.epistemicStatus, `Missing epistemicStatus on ${entity.id}`);
  assert(entity.claimBasis, `Missing claimBasis on ${entity.id}`);
  assert(entity.decisionStatus, `Missing decisionStatus on ${entity.id}`);
  if (entity.claimBasis === "group-convergence") {
    assert.notEqual(entity.epistemicStatus, "Supported", `Group convergence mislabeled as Supported on ${entity.id}`);
  }
}

let parsedScripts = 0;
for (const match of index.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)) {
  if (!match[1].trim()) continue;
  new Function(match[1]);
  parsedScripts += 1;
}

assert(index.includes('data-map-view="current" aria-pressed="true"'), "Current System is not the default tab");
assert(index.includes('var currentView = "current"'), "Current System is not the default view state");
assert(!index.includes("future-engagement"), "Duplicate future engagement entity remains in the renderer");
assert(!index.includes("Transition Overview"), "Superseded transition label remains in the renderer");

console.log(
  `Validated ${contract.nodes.length} system nodes, ${contract.valueStates.length} value states, ` +
  `${contract.valueTransitions.length} transitions, ${contract.relationships.length} relationships, ` +
  `${contract.overlays.length} overlays, ${contract.views.length} views, and ${parsedScripts} inline scripts.`
);
