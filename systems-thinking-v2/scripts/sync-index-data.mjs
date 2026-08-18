import fs from "node:fs";

const contractPath = new URL("../data/system-map.json", import.meta.url);
const indexPath = new URL("../index.html", import.meta.url);
const contract = JSON.parse(fs.readFileSync(contractPath, "utf8"));

const titleCase = value => value.replace(/(^|[-\s])([a-z])/g, (_, prefix, letter) => prefix + letter.toUpperCase());
const basisLabel = value => ({
  evidence: "Evidence",
  "legacy-evidence-synthesis": "Evidence trace pending",
  "analytical-inference": "Analytical inference",
  "group-convergence": "Group convergence",
  "model-definition": "Model definition"
}[value] || titleCase(value));
const decisionLabel = value => ({
  "active-direction": "Active direction",
  hypothesis: "Hypothesis",
  "intended-outcome": "Intended outcome",
  unresolved: "Unresolved"
}[value] || titleCase(value));

const overlays = Object.fromEntries(contract.overlays.map(item => [item.id, item]));
const transitions = Object.fromEntries(contract.valueTransitions.map(item => [item.id, item]));

const nodes = {};
for (const node of contract.nodes) {
  nodes[node.id] = {
    label: node.displayLabel,
    sub: node.subtitle || "",
    kind: node.kind === "value-process" ? "value" : node.kind,
    phase: node.phase || node.applicableTabs.map(titleCase).join(" • "),
    status: node.epistemicStatus,
    basis: basisLabel(node.claimBasis),
    decision: decisionLabel(node.decisionStatus),
    category: node.category,
    definition: node.definition,
    role: node.roleInSystem,
    why: node.whyItMatters,
    known: node.known,
    provisional: node.provisional,
    opportunity: node.opportunityImplication,
    chain: node.chain || [],
    dimensions: node.dimensions || [],
    systemLinks: node.systemLinks || []
  };
}

for (const state of contract.valueStates) {
  const outgoing = contract.valueTransitions.find(item => item.fromState === state.id);
  const jtbd = outgoing ? overlays[outgoing.jtbdRefs[0]] : null;
  const dvo = outgoing ? overlays[outgoing.dvoRefs[0]] : null;
  nodes[state.id] = {
    label: state.label,
    sub: outgoing ? `${outgoing.id} begins here` : "Canonical value-state outcome",
    kind: "state",
    phase: "Main Variable Transition",
    status: state.epistemicStatus,
    basis: basisLabel(state.claimBasis),
    decision: decisionLabel(state.decisionStatus),
    category: "Controlled value state",
    definition: state.definition,
    role: `Entry condition: ${state.entryCondition} Exit condition: ${state.exitCondition}`,
    why: "This state is analytically distinct so qualification, posting, access, use and perceived worth are not collapsed into generic value.",
    known: "The state definition is an approved group-converged modeling decision. Current volumes, conversion rates and delays are not yet established.",
    provisional: outgoing ? outgoing.openQuestions.join(" ") : "The effect of Realized Value on subsequent behaviour remains unvalidated.",
    opportunity: dvo ? dvo.statement : "Evaluate the realized outcome and its relationship to future participation without assuming causality.",
    chain: outgoing ? [state.label, outgoing.id, nodes[outgoing.toState]?.label || titleCase(outgoing.toState)] : [state.label, "Outcome evaluation"],
    dimensions: outgoing ? outgoing.possibleIndicators : [],
    systemLinks: outgoing ? [
      {phase: outgoing.id, targets:[`${titleCase(outgoing.fromState)} → ${titleCase(outgoing.toState)}`], explanation:outgoing.definition},
      {phase:"Member progress / JTBD", targets:[jtbd.statement], explanation:"Analytical overlay • not an operating system component."},
      {phase:"Digital Value Opportunity", targets:[dvo.statement], explanation:"Group-converged opportunity space • not a proven leverage point."}
    ] : []
  };
}

const layouts = {
  current: {
    "member-only":"mo", "member-client":"mc", "client-only":"co", partner:"partner",
    "member-value":"value", engagement:"engagement", products:"products", data:"data",
    channels:"channels", service:"service", friction:"friction"
  },
  transition: {
    opportunity:"opportunity", "potential-value":"potential", "earned-value":"earned",
    "available-value":"available", "realized-value":"realized", partner:"partner",
    products:"products", data:"data", service:"service", channels:"channels",
    friction:"friction", engagement:"engagement"
  },
  future: {
    identity:"identity", orchestration:"orchestration", delivery:"delivery", partner:"partner",
    "member-value":"value", engagement:"futureengagement", intersection:"intersection", "net-value":"net"
  },
  external: {
    regulation:"regulation", "technology-landscape":"technology", expectations:"expectations",
    competitors:"competitors", neither:"neither"
  }
};

const relationshipById = Object.fromEntries(contract.relationships.map(item => [item.id, item]));
const relationshipMeta = {};
const edgeMeanings = {};
const views = {};

for (const view of contract.views) {
  const edges = view.relationshipIds.map(id => {
    const relationship = relationshipById[id];
    const visualPhase = view.id === "future" && relationship.epistemicStatus === "Assumed"
      ? "future"
      : relationship.epistemicStatus === "Inferred"
        ? "inferred"
        : "current";
    relationshipMeta[id] = {
      epistemicStatus: relationship.epistemicStatus,
      claimBasis: basisLabel(relationship.claimBasis),
      decisionStatus: decisionLabel(relationship.decisionStatus),
      transitionIds: relationship.valueTransitionIds || [],
      evidenceRefs: relationship.evidenceRefs || []
    };
    edgeMeanings[relationship.displayLabel] = relationship.relationshipDefinition;
    return [relationship.sourceId, relationship.targetId, relationship.displayLabel, visualPhase, null, id];
  });
  views[view.id] = {
    label: view.heading,
    description: view.contextParagraph,
    areas: layouts[view.id],
    edges
  };
}

const serialized = value => JSON.stringify(value, null, 2).replace(/^/gm, "  ");
const generatedMarker = "  /* GENERATED FROM data/system-map.json. Run scripts/sync-index-data.mjs after contract changes. */";
const generatedBlock = generatedMarker + `\n` +
  `  var nodes = ${serialized(nodes).trimStart()};\n\n` +
  `  var views = ${serialized(views).trimStart()};\n\n` +
  `  var edgeMeanings = ${serialized(edgeMeanings).trimStart()};\n\n` +
  `  var relationshipMeta = ${serialized(relationshipMeta).trimStart()};\n\n`;

const html = fs.readFileSync(indexPath, "utf8");
const markedStart = html.indexOf(generatedMarker);
const start = markedStart >= 0 ? markedStart : html.indexOf("  var nodes = {");
const end = html.indexOf("  var currentView = ");
if (start < 0 || end < 0 || end <= start) throw new Error("Could not locate embedded map-data block");
fs.writeFileSync(indexPath, html.slice(0, start) + generatedBlock + html.slice(end));
console.log(`Synchronized ${Object.keys(nodes).length} renderable entities and ${contract.relationships.length} relationships.`);
