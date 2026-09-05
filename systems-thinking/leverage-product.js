(function () {
  "use strict";

  var leverageRoot=document.querySelector("#leverage-analysis-view");
  var productRoot=document.querySelector("#product-definition-view");
  var cheatRoot=document.querySelector("#product-cheat-view");
  if (!leverageRoot || !productRoot || !cheatRoot) return;

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
          <div class="lp-selector-heading"><span class="lp-kicker">Strategic sequence</span><h3>Identified Leverage Points</h3><p class="text-small">Select a leverage point to see its potential impact on the Linked Loops.</p><p class="text-small text-muted">Ordered by systemic role and relevance to the product wedge—not a validated impact score.</p></div>\
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
        <div><div class="lp-hero-meta"><span class="viz-badge">Working definition</span><span class="lp-kicker">North-star product</span></div><h2 id="lp-product-title">A transparent rewards experience with visible tracking and recovery</h2></div>\
        <p class="text-small">The complete product direction; the first bounded release is Proactive Value Assurance and Recovery.</p>\
      </header>\
      <section class="lp-card">\
        <div class="lp-section-heading"><div><span class="lp-kicker">Product vision and strategic thesis</span><h3>Build loyalty through repeated, reliable value realization</h3></div></div>\
        <blockquote class="lp-quote">Enable every member to reliably turn worthwhile reward opportunities into value they can see, trust, and use.</blockquote>\
        <p class="lp-plain-language"><strong>In plain language:</strong> value realization means the member ultimately receives and can use the worthwhile reward value they were promised.</p>\
        <div class="lp-definition-grid">\
          <div class="lp-definition-item"><span>For members</span><p>A digital rewards experience that helps members discover worthwhile opportunities, see where promised value stands, and initiate or approve recovery when it is delayed, missing, or at risk.</p></div>\
          <div class="lp-definition-item"><span>Behind the experience</span><p>It connects reward-state information, outcome-based decisioning, and service workflows so the program can learn from successfully realized value—not merely points issued or offers activated—and continuously reduce preventable value loss.</p></div>\
          <div class="lp-definition-item lp-definition-wide"><span>Primary user for the first wedge</span><p>Loyalty-program members with worthwhile, eligible reward value already in motion and a detectable risk that some of it may be delayed, missed, or lost because of a qualification, posting, redemption, fulfilment, partner, or service breakdown. The initial cohort and reward journey still need validation.</p></div>\
        </div>\
      </section>\
      <section class="lp-card">\
        <div class="lp-section-heading"><div><span class="lp-kicker">North-star product architecture</span><h3>Four connected mechanisms—not four separate products</h3></div><p class="text-small">Three mechanisms shape the member experience; the fourth helps the system learn from outcomes.</p></div>\
        <div class="lp-mechanism-grid lp-product-path">\
          <article class="lp-mechanism"><div class="lp-mechanism-head"><span>1 · PM01</span><strong>Discover</strong></div><p>Surface worthwhile, attainable reward opportunities that a member can understand and act upon.</p><span class="lp-loop-effect">Member-facing</span></article>\
          <article class="lp-mechanism"><div class="lp-mechanism-head"><span>2 · PM02</span><strong>Track</strong></div><p>Make qualification, earning, posting, redemption, fulfilment, and unresolved states visible.</p><span class="lp-loop-effect">Member-facing</span></article>\
          <article class="lp-mechanism is-wedge"><div class="lp-mechanism-head"><span>3 · PM04</span><strong>Assure and recover</strong></div><p>Detect at-risk value, intervene or route it, and verify that promised value was realized.</p><span class="lp-loop-effect">First product wedge</span></article>\
          <article class="lp-mechanism"><div class="lp-mechanism-head"><span>4 · PM03</span><strong>Learn</strong></div><p>Use realized, failed, and recovered outcomes to improve future decisions and system performance.</p><span class="lp-loop-effect">Behind the experience</span></article>\
        </div>\
      </section>\
      <section class="lp-card lp-wedge">\
        <div class="lp-wedge-heading"><div><span class="lp-kicker">First product wedge</span><h3>Proactive Value Assurance and Recovery</h3></div><span class="viz-badge">First bounded release</span></div>\
        <p class="lp-wedge-definition">Monitor worthwhile reward opportunities as they progress from qualification through earning, redemption, and fulfilment; identify when promised value is delayed, missing, or at risk; and either resolve the issue automatically or route it to the responsible service pathway with the necessary context. Members remain informed and retain approval over consequential actions, while recovery outcomes help identify and prevent recurring sources of value loss.</p>\
        <h4>Why this is where the product starts</h4>\
        <ul class="lp-rationale"><li>It directly addresses preventable loss after worthwhile value enters the chain.</li><li>It creates an observable member outcome—not only an internal analytical capability.</li><li>It can start with one bounded reward journey or failure type and expand over time.</li></ul>\
        <div class="lp-impact-grid">\
          <div class="lp-impact"><strong>Strengthens R1</strong><p>Increases realized value, trust, repeat participation, and usable outcome information.</p></div>\
          <div class="lp-impact"><strong>Weakens B1</strong><p>Reduces delays, unresolved exceptions, avoidable support demand, and preventable value loss.</p></div>\
        </div>\
      </section>\
      <section class="lp-card">\
        <div class="lp-section-heading"><div><span class="lp-kicker">What must be true</span><h3>A coherent operating capability behind the experience</h3></div><p class="text-small">The wedge works only when information, authority, workflows, ownership, and learning operate together.</p></div>\
        <div class="lp-operating-grid">\
          <article class="lp-operating-step"><span>1</span><div><strong>Observe</strong><p>Detect when worthwhile value enters the chain, establish its expected next state, and monitor progress.</p></div></article>\
          <article class="lp-operating-step"><span>2</span><div><strong>Diagnose and decide</strong><p>Identify delays or failures, locate the likely source, and determine the responsible action and owner.</p></div></article>\
          <article class="lp-operating-step"><span>3</span><div><strong>Resolve and verify</strong><p>Correct safely or route with context, keep the member informed, and confirm that value was received and usable.</p></div></article>\
          <article class="lp-operating-step"><span>4</span><div><strong>Learn and prevent</strong><p>Capture outcomes and root-cause patterns so future rules, decisions, processes, and capacity can improve.</p></div></article>\
        </div>\
        <div class="lp-sequence" aria-label="Closed-loop operating sequence"><span>Sense</span><span>Diagnose</span><span>Decide</span><span>Act</span><span>Verify</span><span>Learn</span></div>\
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
      <p class="lp-fine-print text-small text-muted">Working product definition developed from Team Zig’s research and analysis for discussion and refinement.</p>\
    </div>';

  cheatRoot.innerHTML='\
    <div class="lp-stack lp-cheat-stack">\
      <header class="lp-card lp-hero">\
        <div><div class="lp-hero-meta"><span class="viz-badge">Working definition</span><span class="lp-kicker">At-a-glance reference</span></div><h2 id="lp-cheat-title">Product Definition Cheat Sheet</h2></div>\
        <p class="text-small">The shortest version of the current product thinking—organized around the six questions needed to describe the product clearly.</p>\
      </header>\
      <section class="lp-cheat-grid">\
        <article class="lp-card lp-cheat-card lp-cheat-anchor">\
          <span class="lp-cheat-number">01</span><div><span class="lp-kicker">Product in one sentence</span><h3>What is the digital product?</h3><p class="lp-cheat-answer">A digital rewards experience that helps loyalty-program members discover worthwhile opportunities, see where promised value stands, and initiate or approve recovery when it is delayed, missing, or at risk.</p></div>\
        </article>\
        <article class="lp-card lp-cheat-card">\
          <span class="lp-cheat-number">02</span><div><span class="lp-kicker">Primary user for the first wedge</span><h3>Who is it primarily designed for?</h3><p class="lp-cheat-answer">Loyalty-program members with worthwhile, eligible reward value already in motion and a detectable risk that some of it may be delayed, missed, or lost because of a system or service breakdown.</p><span class="lp-cheat-trace">Risk-state segment—not an attitude-based persona. Initial cohort and reward journey still to be validated.</span></div>\
        </article>\
        <article class="lp-card lp-cheat-card">\
          <span class="lp-cheat-number">03</span><div><span class="lp-kicker">Core job / outcome</span><h3>What is the user trying to accomplish?</h3><p class="lp-cheat-answer">“Help me receive and use the worthwhile reward value I was promised—and recover it without diagnosing the system or repeatedly chasing support when something breaks.”</p><span class="lp-cheat-trace">Grounded in the system goal of realized value and the R1/B1 leverage analysis.</span></div>\
        </article>\
        <article class="lp-card lp-cheat-card lp-cheat-wide">\
          <span class="lp-cheat-number">04</span><div><span class="lp-kicker">What the product enables</span><h3>What would the member see, use, or do?</h3><div class="lp-cheat-capabilities">\
            <div><strong>Discover</strong><p>See worthwhile, attainable reward opportunities.</p></div>\
            <div><strong>Track</strong><p>Follow qualification, earning, posting, redemption, and fulfilment status.</p></div>\
            <div><strong>Assure and recover</strong><p>Detect at-risk value, notify the member, resolve it safely or route it with context, and verify the outcome.</p></div>\
            <div><strong>Learn</strong><p>Use recovery outcomes behind the experience to reduce repeat failures and improve future decisions.</p></div>\
          </div></div>\
        </article>\
        <article class="lp-card lp-cheat-card lp-cheat-wide">\
          <span class="lp-cheat-number">05</span><div><span class="lp-kicker">Product boundary</span><h3>What will—and will not—the product support?</h3><div class="lp-cheat-boundary">\
            <div><strong>In scope</strong><p>Opportunity discovery; value-status visibility; at-risk value detection; member communication and approval; recovery or accountable routing; and outcome verification.</p></div>\
            <div><strong>Outside the boundary</strong><p>Replacing loyalty, banking, partner, or service systems; maximizing redemption at any cost; treating intentional saving or informed rejection as value loss; forcing banking conversion; or masking structural failures through repeated case-by-case recovery.</p></div>\
          </div></div>\
        </article>\
        <article class="lp-card lp-cheat-card lp-cheat-wide lp-cheat-assumption">\
          <span class="lp-cheat-number">06</span><div><span class="lp-kicker">Basic experience / technology assumption</span><h3>Where does the product live?</h3><p class="lp-cheat-answer">Working channel assumption: it is embedded within existing authenticated BMO and Blue Rewards digital touchpoints and connects to current loyalty, banking, partner, and service systems rather than replacing them. The initial channel and role of mobile still need validation.</p></div>\
        </article>\
      </section>\
      <p class="lp-fine-print text-small text-muted">Concise working definition derived from Team Zig’s current systems analysis and product direction. The experience and technology assumption remains subject to validation.</p>\
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
  window.renderProductCheatSheet=function () {};
}());
