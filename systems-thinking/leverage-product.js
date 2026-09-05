(function () {
  "use strict";

  var leverageRoot=document.querySelector("#leverage-analysis-view");
  var productRoot=document.querySelector("#product-definition-view");
  if (!leverageRoot || !productRoot) return;

  var leveragePoints={
    L01:{
      title:"Shared value-state information",effect:"Strengthens R1 and weakens B1",nodes:["V02","V03","V06","V08","V09","V10"],
      mechanism:"Create a reliable view of what is identified, eligible, pursued, qualified, earned, pending, posted, redeemed, fulfilled, or unresolved.",
      signal:"The system cannot improve value realization when members and operators cannot see where value currently sits or where it became interrupted.",
      result:"Acting here can improve member transparency, supply better outcome information, expose at-risk value earlier, and reduce avoidable handoffs and delays.",
      classification:"Abson: Design · Meadows: #6 information flows; #9 delays",
      dependency:"Requires event connectivity, common definitions, and permissioned identity resolution."
    },
    L02:{
      title:"Decisioning based on realized outcomes",effect:"Strengthens R1",nodes:["V01","V03","V06","V07"],
      mechanism:"Feed realization, failure, and recovery outcomes—not only impressions or activations—back into future decisions.",
      signal:"Offer and opportunity decisions remain incomplete if the system learns only that something was shown or activated, rather than whether value was actually realized.",
      result:"Acting here can improve future relevance, timing, eligibility, and delivery decisions using evidence from completed member outcomes.",
      classification:"Abson: Feedbacks + Design · Meadows: #7 reinforcing feedback; #6 information flows",
      dependency:"Requires outcome attribution and an operating process that acts on learning."
    },
    L03:{
      title:"Exception detection and recovery",effect:"Weakens B1 and supports R1",nodes:["V03","V04","V06","V09","V10"],
      mechanism:"Identify at-risk value, diagnose the interruption, resolve or route it, verify realization, and capture the result.",
      signal:"Failures currently reduce value realization and trust, but each detected and resolved failure can also become information for future improvement.",
      result:"Acting here can restore individual value, reduce unresolved exceptions, strengthen trust, and generate evidence about recurring breakdowns.",
      classification:"Abson: Feedbacks + Design · Meadows: #8 balancing feedback; #6 information flows; #5 rules; #9 delays",
      dependency:"Requires resolution authority, ownership, partner and service integration, and safeguards against false intervention."
    },
    L04:{
      title:"Realized value as the system goal",effect:"Governs both loops",nodes:["V01","V02","V03","V04","V05","V06","V07","V08","V09","V10"],
      mechanism:"Align measures and decision rules around appropriate member value realization rather than value issued, activity alone, or breakage.",
      signal:"Local teams can optimize offers, points issuance, redemption, or service metrics while worthwhile value continues to disappear across the total journey.",
      result:"Acting here can align discovery, fulfilment, recovery, decisioning, and measurement around the same member outcome.",
      classification:"Abson: Intent · Meadows: #3 system goals",
      dependency:"Requires executive alignment and economic validation; a product cannot impose this system goal alone."
    }
  };

  var loopNodes={V01:[180,100],V02:[470,100],V03:[740,220],V04:[740,445],V05:[470,565],V06:[180,565],V07:[130,330],V08:[1010,565],V09:[1090,330],V10:[1010,100]};
  var nodeLabels={V01:"Relevant, visible opportunities",V02:"Opportunity capture",V03:"Value realization",V04:"Program trust",V05:"Repeat participation",V06:"Outcome information",V07:"Decisioning quality",V08:"Reward-processing demand",V09:"Operational load",V10:"Value friction"};
  var shared={V03:true,V04:true,V05:true};
  var loopEdges=[
    ["V01","V02","+",false,"CL01"],["V02","V03","+",false,"CL02"],["V03","V04","+",true,"CL03 / CL12"],["V04","V05","+",true,"CL04 / CL13"],
    ["V05","V06","+",false,"CL05"],["V06","V07","+",true,"CL06"],["V07","V01","+",false,"CL07"],
    ["V05","V08","+",false,"CL08"],["V08","V09","+",false,"CL09"],["V09","V10","+",true,"CL10"],["V10","V03","−",false,"CL11"]
  ];

  leverageRoot.innerHTML='\
    <div class="lp-stack">\
      <header class="lp-card lp-hero">\
        <div><span class="lp-kicker">From system behaviour to intervention</span><h2 id="lp-leverage-title">Leverage Points Analysis</h2></div>\
        <p class="text-small">Explore where an intervention could strengthen the value-realization flywheel, weaken its operational constraint, or reshape the goal governing both loops.</p>\
      </header>\
      <div class="lp-leverage-layout">\
        <aside class="lp-card" aria-label="Identified leverage points">\
          <div class="lp-selector-heading"><span class="lp-kicker">Strategic sequence</span><h3>Identified Leverage Points</h3><p class="text-small">Select a leverage point to see its potential impact on the Linked Loops.</p></div>\
          <div id="lp-leverage-buttons" class="lp-leverage-list"></div>\
        </aside>\
        <section class="lp-card lp-diagram-card" aria-labelledby="lp-linked-title">\
          <div class="lp-section-heading"><div><span class="lp-kicker">R1 + B1</span><h3 id="lp-linked-title">Leverage within the Linked Loops</h3></div><p class="text-small">Select a leverage point to see which variables it reaches.</p></div>\
          <div class="lp-canvas-wrap"><svg id="lp-loop-canvas" class="lp-canvas" viewBox="0 0 1200 670" role="img" aria-label="Linked causal loops with highlighted leverage points"><defs><marker id="lp-arrow" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 1 1 L 9 5 L 1 9 z"></path></marker></defs><g id="lp-loop-edges"></g><g id="lp-loop-nodes"></g></svg></div>\
        </section>\
      </div>\
      <section id="lp-leverage-detail" class="lp-card lp-leverage-detail" aria-live="polite"></section>\
      <p class="lp-fine-print text-small text-muted">These leverage points indicate where change may matter; they are not an automatic ranking of feasibility or priority. Working analysis developed from Team Zig’s research.</p>\
    </div>';

  productRoot.innerHTML='\
    <div class="lp-stack">\
      <header class="lp-card lp-hero">\
        <div><span class="lp-kicker">Product direction</span><h2 id="lp-product-title">From realized value to reliable loyalty</h2></div>\
        <p class="text-small">The product direction translates the leverage analysis into a member experience, an operating capability, and a measurable system outcome.</p>\
      </header>\
      <section class="lp-card">\
        <div class="lp-section-heading"><div><span class="lp-kicker">Vision and strategic thesis</span><h3>Build loyalty through repeated, reliable value realization</h3></div></div>\
        <blockquote class="lp-quote">Enable every member to reliably turn worthwhile reward opportunities into value they can see, trust, and use.</blockquote>\
        <div class="lp-definition-grid">\
          <div class="lp-definition-item"><span>Member experience</span><p>Help members discover worthwhile rewards, understand how to earn and use them, track progress from qualification through fulfilment, and resolve interruptions when promised value does not arrive.</p></div>\
          <div class="lp-definition-item"><span>System capability</span><p>Connect reward-state information, outcome-based decisioning, and service workflows so the program learns from realized value—not merely points issued or offers activated—and reduces preventable value loss.</p></div>\
        </div>\
      </section>\
      <section class="lp-card">\
        <div class="lp-section-heading"><div><span class="lp-kicker">Mechanisms considered</span><h3>Four ways the product could act on the leverage points</h3></div><p class="text-small">The mechanisms build on one another; the highlighted wedge is the smallest coherent starting proposition.</p></div>\
        <div class="lp-mechanism-grid">\
          <article class="lp-mechanism"><div class="lp-mechanism-head"><span>PM01</span><strong>Worthwhile opportunity discovery</strong></div><p>Make relevant, attainable opportunities easier to find and act upon. This is necessary table stakes and an upstream contributor to R1, but increasing discovery before strengthening fulfilment may worsen B1.</p><span class="lp-loop-effect">Supports R1 · may intensify B1 if fulfilment is weak</span></article>\
          <article class="lp-mechanism"><div class="lp-mechanism-head"><span>PM02</span><strong>Transparent value progression</strong></div><p>Show what is available, in progress, earned, pending, posted, redeemed, fulfilled, or unresolved. This is a necessary information layer, but visibility without resolution may expose failures while leaving members powerless.</p><span class="lp-loop-effect">Activates L01 · visibility alone cannot resolve failure</span></article>\
          <article class="lp-mechanism"><div class="lp-mechanism-head"><span>PM03</span><strong>Outcome-based learning</strong></div><p>Use realized, failed, and recovered outcomes to improve future decisions and system performance. This has high long-term leverage, but it is not a complete first member proposition by itself.</p><span class="lp-loop-effect">Activates L02 · long-term intelligence layer</span></article>\
          <article class="lp-mechanism is-wedge"><div class="lp-mechanism-head"><span>PM04</span><strong>Proactive Value Assurance and Recovery</strong></div><p>Detect at-risk value, intervene, verify realization, and create learning signals. This is the strongest preliminary wedge because it directly reduces preventable loss while acting on both R1 and B1.</p><span class="lp-loop-effect">Activates L01–L03 · aligns to L04</span></article>\
        </div>\
      </section>\
      <section class="lp-card lp-wedge">\
        <div class="lp-wedge-heading"><div><span class="lp-kicker">Converged product wedge</span><h3>Proactive Value Assurance and Recovery</h3></div><span class="viz-badge">First bounded proposition</span></div>\
        <p class="lp-wedge-definition">Monitor worthwhile reward opportunities as they progress from qualification through earning, redemption, and fulfilment; identify when promised value is delayed, missing, or at risk; and either resolve the issue automatically or route it to the responsible service pathway with the necessary context. Members remain informed and retain approval over consequential actions, while recovery outcomes help identify and prevent recurring sources of value loss.</p>\
        <h4>Why this wedge emerged from the analysis</h4>\
        <ul class="lp-rationale"><li>It intervenes directly on preventable loss after worthwhile value enters the chain.</li><li>It produces an observable member outcome rather than only an internal analytical capability.</li><li>It reduces delays, unresolved exceptions, and avoidable support demand in B1.</li><li>It increases realized value, trust, participation, and outcome information in R1.</li><li>It forces clarity across information, decision rules, service ownership, and fulfilment.</li><li>It can begin with one bounded reward journey or failure type and expand over time.</li></ul>\
        <div class="lp-impact-grid">\
          <div class="lp-impact"><strong>Strengthens R1</strong><p>Increases realized value, trust, repeat participation, and usable outcome information.</p></div>\
          <div class="lp-impact"><strong>Weakens B1</strong><p>Reduces delays, unresolved exceptions, avoidable support demand, and preventable value loss.</p></div>\
        </div>\
        <div class="lp-sequence" aria-label="Closed-loop operating sequence"><span>Sense</span><span>Diagnose</span><span>Decide</span><span>Act</span><span>Verify</span><span>Learn</span></div>\
        <div class="lp-impact-grid"><div class="lp-impact"><strong>Self-correcting</strong><p>At the individual-event level, safely restore worthwhile value that is delayed, missing, or at risk.</p></div><div class="lp-impact"><strong>Self-improving</strong><p>At the system level, use recovery outcomes to change future rules, decisions, capacity, and process design.</p></div></div>\
        <p class="text-small text-muted">Data alone does not create a self-healing system. The capability also requires authority, rules, workflows, ownership, and organizational follow-through.</p>\
      </section>\
      <section class="lp-card">\
        <div class="lp-section-heading"><div><span class="lp-kicker">Minimum coherent capabilities</span><h3>What must work for the wedge to be real</h3></div></div>\
        <ol class="lp-capability-list">\
          <li>Detect that worthwhile, eligible value has entered the chain.</li><li>Establish the expected next state and fulfilment condition.</li>\
          <li>Monitor qualification, posting, redemption, and fulfilment.</li><li>Detect delays, discrepancies, failures, and unresolved exceptions.</li>\
          <li>Diagnose the likely source and accountable owner.</li><li>Resolve automatically where authority and confidence permit.</li>\
          <li>Route unresolved cases with context to an accountable owner.</li><li>Inform the member and obtain approval for consequential actions.</li>\
          <li>Verify that the promised value was received and usable.</li><li>Capture the failure, intervention, outcome, and root-cause pattern.</li>\
        </ol>\
      </section>\
      <section class="lp-card">\
        <div class="lp-section-heading"><div><span class="lp-kicker">Product boundaries</span><h3>What success means—and what the product is not</h3></div></div>\
        <div class="lp-two-column">\
          <div><h4>Intended outcomes</h4><ul><li>Higher opportunity capture</li><li>Higher earned-value and end-to-end realization</li><li>Lower preventable value loss</li><li>Greater trust and repeat participation</li><li>Deeper engagement and appropriate relationship progression downstream</li></ul></div>\
          <div><h4>Non-goals</h4><ul><li>Maximize redemption regardless of member or business value</li><li>Force every member toward a banking relationship</li><li>Surface attractive but unattainable opportunities</li><li>Treat intentional saving or informed rejection as lost value</li><li>Replace every underlying loyalty and banking system</li><li>Make AI the product rather than a possible enabling capability</li><li>Conceal recurring structural failures through repeated case-by-case recovery</li></ul></div>\
        </div>\
      </section>\
      <section class="lp-card" aria-labelledby="lp-metrics-title">\
        <div class="lp-section-heading"><div><span class="lp-kicker">Potential measurement framework</span><h3 id="lp-metrics-title">Measure where worthwhile value is being lost</h3></div><p class="text-small">Distinguish upstream opportunity loss, unrealized earned value, and total loss across the complete journey.</p></div>\
        <div class="lp-metrics-table-wrap"><table class="lp-metrics-table"><thead><tr><th>Metric</th><th>Conceptual calculation</th><th>What it reveals</th><th>Diagnostic problem prevented</th></tr></thead><tbody>\
          <tr><th>Opportunity capture rate</th><td>Points successfully earned ÷ points available through worthwhile, eligible opportunities entering the chain</td><td>How effectively worthwhile earning potential progresses into confirmed earned value</td><td>Prevents missed surfacing, comprehension, action, or qualification failures from being misclassified as redemption problems</td></tr>\
          <tr><th>Earned-value realization rate</th><td>Earned points successfully converted into fulfilled benefits ÷ earned points available for intended use</td><td>How effectively earned value progresses through visibility, redemption, and fulfilment</td><td>Prevents issued points or balances from being treated as realized member value</td></tr>\
          <tr><th>End-to-end realization rate</th><td>Points-derived value successfully realized ÷ worthwhile, eligible points-value entering the chain</td><td>The conversion efficiency of the complete pathway from worthwhile opportunity to fulfilled benefit</td><td>Prevents local optimization of earning or redemption while total value loss persists elsewhere</td></tr>\
        </tbody></table></div>\
        <p class="text-small text-muted">Operational definitions still need cohort logic, points-to-benefit valuation, treatment of deliberate saving, and reward-specific expected fulfilment periods.</p>\
      </section>\
      <section class="lp-card">\
        <div class="lp-section-heading"><div><span class="lp-kicker">New feedback structures</span><h3>How the wedge could change the system</h3></div></div>\
        <div class="lp-new-loops">\
          <article class="lp-new-loop"><strong>R2 · Recovery Learning Loop</strong><div class="lp-mini-flow"><span>V11 Successful value recoveries</span> +→ <span>V12 Recovery-outcome information</span> + delay→ <span>V13 Detection and root-cause intelligence</span> +→ <span>V14 Recovery effectiveness</span> +→ <span>V11</span></div><p class="text-small">Successful recoveries improve future detection and diagnosis. R2 strengthens R1 through better outcome information, decisioning, realization, and trust.</p></article>\
          <article class="lp-new-loop"><strong>B2 · Recurring Failure Prevention Loop</strong><div class="lp-mini-flow"><span>V15 Recurring failure incidence</span> +→ <span>V16 Detected failure patterns</span> + delay→ <span>V17 Preventive system changes</span> − delay→ <span>V15</span></div><p class="text-small">Patterns can prompt changes to rules, integrations, processes, partners, or capacity. B2 weakens the harmful constraint in B1 by reducing future recurrence.</p></article>\
        </div>\
        <p class="text-small text-muted">Recovery must feed both loops. If it only closes individual cases, the system remains reactive and may continue reproducing the same failures.</p>\
      </section>\
      <section class="lp-card">\
        <div class="lp-section-heading"><div><span class="lp-kicker">Assumptions and validation needs</span><h3>What the next conversation must test</h3></div><p class="text-small">The model is coherent enough for continued product discovery, but its causal and operating assumptions remain provisional.</p></div>\
        <div class="lp-validation-grid"><div><h4>Working foundations</h4><ul><li>Value realization is the main variable.</li><li>The target is preventable loss between worthwhile value and realization.</li><li>Loyalty is built through repeated, reliable value realization.</li><li>Informed declines and intentional saving are not value loss.</li><li>Proactive Value Assurance and Recovery is the preferred preliminary wedge.</li></ul><h4>Provisional causal claims</h4><ul><li>Realization increases trust and repeat participation.</li><li>Participation creates information that improves decisioning.</li><li>Participation growth creates enough operational pressure to constrain realization.</li><li>Recovery information can produce effective preventive change.</li></ul></div><div><h4>Key validation questions</h4><ol><li>Which reward events and states can be observed reliably?</li><li>Where do qualification, posting, redemption, and fulfilment failures occur most often?</li><li>What reward-specific fulfilment expectations or service levels exist?</li><li>Which teams or partners own resolution at each failure point?</li><li>What authority exists for automated correction, compensation, or routing?</li><li>Can recovery outcomes feed future decisioning and root-cause remediation?</li><li>Which member segment and reward journey offer the best first test?</li><li>What are the net economic effects of greater realization and reduced failure?</li></ol><h4>Current assessment</h4><ul><li>Problem and target variable: strong enough for continued discovery</li><li>R1 and B1: provisional but coherent</li><li>Leverage landscape: useful for an initial intervention area; requires organizational validation</li><li>Product definition: preliminary and traceable to the system analysis</li><li>Wedge: strong provisional candidate; feasibility remains untested</li></ul></div></div>\
      </section>\
      <p class="lp-fine-print text-small text-muted">Working product definition developed from Team Zig’s research and analysis for discussion and refinement.</p>\
    </div>';

  var ns="http://www.w3.org/2000/svg";
  var edgesLayer=leverageRoot.querySelector("#lp-loop-edges");
  var nodesLayer=leverageRoot.querySelector("#lp-loop-nodes");
  function svgEl(tag,attrs) { var el=document.createElementNS(ns,tag); Object.keys(attrs||{}).forEach(function (key) { el.setAttribute(key,String(attrs[key])); }); return el; }
  function edgePath(a,b) {
    var dx=b[0]-a[0],dy=b[1]-a[1],length=Math.sqrt(dx*dx+dy*dy)||1;
    var boundary=Math.min(Math.abs(dx)>0?102/Math.abs(dx):Infinity,Math.abs(dy)>0?40/Math.abs(dy):Infinity),gap=14/length;
    var sx=a[0]+dx*(boundary+gap),sy=a[1]+dy*(boundary+gap),ex=b[0]-dx*(boundary+gap),ey=b[1]-dy*(boundary+gap);
    var bend=Math.min(68,length*0.15),nx=-dy/length*bend,ny=dx/length*bend;
    return "M "+sx+" "+sy+" Q "+((sx+ex)/2+nx)+" "+((sy+ey)/2+ny)+" "+ex+" "+ey;
  }
  loopEdges.forEach(function (edge) {
    var a=loopNodes[edge[0]],b=loopNodes[edge[1]];
    edgesLayer.appendChild(svgEl("path",{d:edgePath(a,b),class:"lp-loop-edge"+(edge[3]?" is-delay":""),"data-from":edge[0],"data-to":edge[1],"data-link-id":edge[4]}));
    var label=svgEl("text",{x:(a[0]+b[0])/2,y:(a[1]+b[1])/2-7,class:"lp-loop-polarity"}); label.textContent=edge[2]; edgesLayer.appendChild(label);
  });
  Object.keys(loopNodes).forEach(function (id) {
    var pos=loopNodes[id],group=svgEl("g",{class:"lp-loop-node"+(shared[id]?" is-shared":""),"data-id":id});
    group.appendChild(svgEl("rect",{x:pos[0]-102,y:pos[1]-40,width:204,height:80,rx:16}));
    var code=svgEl("text",{x:pos[0],y:pos[1]-10,class:"lp-node-id"}); code.textContent=id; group.appendChild(code);
    var words=nodeLabels[id].split(" "),lines=[""];
    words.forEach(function (word) { var i=lines.length-1; if ((lines[i]+" "+word).trim().length>22) lines.push(word); else lines[i]=(lines[i]+" "+word).trim(); });
    lines.slice(0,2).forEach(function (line,index) { var text=svgEl("text",{x:pos[0],y:pos[1]+10+index*18,class:"lp-node-label"}); text.textContent=line; group.appendChild(text); });
    nodesLayer.appendChild(group);
  });

  [
    {code:"R1",name:"Value Realization and Learning Flywheel",lines:["Value Realization and","Learning Flywheel"],x:380,y:330,width:250},
    {code:"B1",name:"Operational Friction and Capacity Constraint",lines:["Operational Friction","and Capacity Constraint"],x:900,y:330,width:150}
  ].forEach(function (loop) {
    var group=svgEl("g",{class:"lp-loop-identity","aria-label":loop.code+" "+loop.name});
    var lines=loop.lines||[loop.name],height=70+(lines.length-1)*15;
    group.appendChild(svgEl("rect",{x:loop.x-loop.width/2,y:loop.y-height/2,width:loop.width,height:height,rx:17}));
    var code=svgEl("text",{x:loop.x,y:loop.y-10,class:"lp-loop-code"}); code.textContent=loop.code; group.appendChild(code);
    lines.forEach(function (line,index) { var name=svgEl("text",{x:loop.x,y:loop.y+13+index*15,class:"lp-loop-name"}); name.textContent=line; group.appendChild(name); });
    nodesLayer.insertBefore(group,nodesLayer.firstChild);
  });

  var buttonsRoot=leverageRoot.querySelector("#lp-leverage-buttons");
  var leverageOrder=["L04","L03","L01","L02"];
  leverageOrder.forEach(function (id,index) {
    var point=leveragePoints[id],button=document.createElement("button");
    button.type="button"; button.className="lp-leverage-button"; button.setAttribute("data-leverage",id); button.setAttribute("aria-pressed",String(index===0));
    button.innerHTML="<span>"+(index+1)+" · "+id+" · "+point.effect+"</span><strong>"+point.title+"</strong>";
    button.addEventListener("click",function () { selectLeverage(id); }); buttonsRoot.appendChild(button);
  });
  function selectLeverage(id) {
    var point=leveragePoints[id];
    buttonsRoot.querySelectorAll("button").forEach(function (button) { button.setAttribute("aria-pressed",String(button.getAttribute("data-leverage")===id)); });
    nodesLayer.querySelectorAll(".lp-loop-node").forEach(function (node) { node.classList.toggle("is-leverage",point.nodes.indexOf(node.getAttribute("data-id"))>=0); });
    edgesLayer.querySelectorAll(".lp-loop-edge").forEach(function (edge) { edge.classList.toggle("is-leverage",point.nodes.indexOf(edge.getAttribute("data-from"))>=0 && point.nodes.indexOf(edge.getAttribute("data-to"))>=0); });
    leverageRoot.querySelector("#lp-leverage-detail").innerHTML='<span class="viz-badge">'+id+'</span><strong> '+point.title+'</strong><p>'+point.mechanism+'</p><div class="lp-detail-grid"><div class="lp-detail-item"><span>What it signals</span><p>'+point.signal+'</p></div><div class="lp-detail-item"><span>If acted upon</span><p>'+point.result+'</p></div><div class="lp-detail-item"><span>Leverage classification</span><p>'+point.classification+'</p></div><div class="lp-detail-item"><span>Dependency or risk</span><p>'+point.dependency+'</p></div></div>';
  }
  selectLeverage("L04");

  window.renderLeverageAnalysis=function () {};
  window.renderProductDefinition=function () {};
}());
