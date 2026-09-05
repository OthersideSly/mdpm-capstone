(function () {
  "use strict";

  var root=document.querySelector("#loyalty-map-v2");
  var section=document.querySelector("#system-loops-view");
  if (!root || !section) return;

  var chain=[
    "Worthwhile opportunity identified",
    "Eligible opportunity surfaced",
    "Member chooses to act",
    "Qualification completed",
    "Points earned and confirmed",
    "Redemption chosen",
    "Benefit fulfilled",
    "Value realized"
  ];

  var variables={
    V01:{label:"Relevant, visible opportunities",definition:"Worthwhile opportunities that an eligible member can discover and understand."},
    V02:{label:"Opportunity capture",definition:"The rate at which members act on worthwhile, eligible opportunities."},
    V03:{label:"Member value-realization rate",definition:"The proportion of worthwhile, eligible value entering the chain that becomes a fulfilled benefit the member can actually use.",shared:true},
    V04:{label:"Program trust",definition:"Confidence that the program will reliably convert its promises into usable value.",shared:true},
    V05:{label:"Repeat participation",definition:"The continuation of relevant earning, redemption, and benefit-use behaviours over time.",shared:true},
    V06:{label:"Outcome information",definition:"Usable information about what value members pursued, received, and ultimately realized."},
    V07:{label:"Decisioning quality",definition:"The system’s ability to select more relevant opportunities using observed outcomes."},
    V08:{label:"Reward-processing demand",definition:"The volume and complexity of earning, posting, redemption, fulfilment, and support activity."},
    V09:{label:"Operational load",definition:"The workload placed on the capabilities and teams responsible for delivering program value."},
    V10:{label:"Value friction",definition:"Delays, errors, effort, and breakdowns that obstruct progress from available value to realized value."}
  };

  var layouts={
    r1:{
      badge:"R1 · Reinforcing",title:"The value-realization flywheel",
      summary:"Reliable realization can build trust and participation, producing the outcome information required to improve future decisions.",
      narrative:[
        "As decision relevance and opportunity visibility improve, members capture more worthwhile opportunities. Greater capture increases successful value realization. Repeated realization builds trust, which supports continued participation. Participation generates richer evidence about what members pursue, earn, redeem, realize, ignore, or struggle with. When that outcome information improves decisioning, future opportunities become more relevant and visible.",
        "The loop can also move downward: poor relevance can reduce opportunity capture and realization, weakening trust, participation, outcome information, and future decisioning. This is a learning loop organized around realized outcomes—not simply offer personalization."
      ],
      nodes:{V01:[600,80],V02:[930,190],V03:[1010,430],V04:[760,580],V05:[440,580],V06:[190,430],V07:[270,190]},
      edges:[
        ["V01","V02","+",false,"Relevant, understandable opportunities are more likely to be pursued and successfully earned.","CL01"],
        ["V02","V03","+",false,"More worthwhile value captured creates more value capable of being fulfilled and realized.","CL02"],
        ["V03","V04","+",true,"Repeated successful delivery gradually builds confidence in the program.","CL03"],
        ["V04","V05","+",true,"Higher trust increases members’ willingness to participate again.","CL04"],
        ["V05","V06","+",false,"Participation creates outcome signals about what members pursue, receive, ignore, or struggle with.","CL05"],
        ["V06","V07","+",true,"Usable outcomes improve learning after analysis, decision updates, and organizational action.","CL06"],
        ["V07","V01","+",false,"Better decisions improve opportunity selection, timing, eligibility, and delivery context.","CL07"]
      ]
    },
    b1:{
      badge:"B1 · Balancing",title:"The operational constraint",
      summary:"Participation can increase processing demand and operational load, creating friction that reduces realized value and eventually constrains participation.",
      narrative:[
        "As repeat participation increases, more reward events must be qualified, posted, redeemed, fulfilled, explained, and supported. If this demand grows faster than effective operational capacity, delays, errors, and unresolved exceptions increase. These failures reduce successful value realization, weaken trust, and eventually constrain participation.",
        "Balancing does not mean beneficial. This loop can impose a ceiling on participation and value realization."
      ],
      nodes:{V05:[600,80],V08:[930,190],V09:[1010,430],V10:[760,580],V03:[440,580],V04:[190,430]},
      edges:[
        ["V05","V08","+",false,"More participation produces more transactions, qualifications, fulfilments, and possible exceptions.","CL08"],
        ["V08","V09","+",false,"Demand increases operational load when capacity and coordination do not scale proportionately.","CL09"],
        ["V09","V10","+",true,"Capacity pressure and weak coordination tend to increase backlogs, delays, errors, and unresolved cases.","CL10"],
        ["V10","V03","−",false,"Failures prevent worthwhile value from becoming a successfully fulfilled benefit.","CL11"],
        ["V03","V04","+",true,"Repeated successful delivery gradually builds confidence in the program.","CL12 · same relationship as CL03"],
        ["V04","V05","+",true,"Higher trust increases members’ willingness to participate again.","CL13 · same relationship as CL04"]
      ]
    },
    coupled:{
      badge:"R1 + B1 · Linked Loops",title:"Growth and constraint in one system",
      summary:"The desired flywheel and its operational constraint share value realization, trust, and repeat participation.",
      narrative:[
        "Repeat participation creates two effects at the same time: richer outcome information can strengthen relevance and learning through R1, while additional qualification, fulfilment, exception, and support demand can increase operational pressure through B1.",
        "The central tension is whether learning, coordination, and recovery improve quickly enough for the reinforcing value-realization loop to remain stronger than the operational constraint created by growing participation."
      ],
      nodes:{V01:[180,100],V02:[470,100],V03:[740,220],V04:[740,445],V05:[470,565],V06:[180,565],V07:[130,330],V08:[1010,565],V09:[1070,330],V10:[1010,100]},
      edges:[
        ["V01","V02","+",false,"Relevant, understandable opportunities are more likely to be pursued and successfully earned.","CL01"],
        ["V02","V03","+",false,"More worthwhile value captured creates more value capable of being fulfilled and realized.","CL02"],
        ["V03","V04","+",true,"Repeated successful delivery gradually builds confidence in the program.","CL03 / CL12"],
        ["V04","V05","+",true,"Higher trust increases members’ willingness to participate again.","CL04 / CL13"],
        ["V05","V06","+",false,"Participation creates outcome signals about what members pursue, receive, ignore, or struggle with.","CL05"],
        ["V06","V07","+",true,"Usable outcomes improve learning after analysis, decision updates, and organizational action.","CL06"],
        ["V07","V01","+",false,"Better decisions improve opportunity selection, timing, eligibility, and delivery context.","CL07"],
        ["V05","V08","+",false,"More participation produces more transactions, qualifications, fulfilments, and possible exceptions.","CL08"],
        ["V08","V09","+",false,"Demand increases operational load when capacity and coordination do not scale proportionately.","CL09"],
        ["V09","V10","+",true,"Capacity pressure and weak coordination tend to increase backlogs, delays, errors, and unresolved cases.","CL10"],
        ["V10","V03","−",false,"Failures prevent worthwhile value from becoming a successfully fulfilled benefit.","CL11"]
      ]
    }
  };

  var activeView="r1";
  var selected="V03";
  var ns="http://www.w3.org/2000/svg";
  var chainRoot=section.querySelector("#sl-chain-steps");
  var nodesLayer=section.querySelector("#sl-nodes");
  var edgesLayer=section.querySelector("#sl-edges");

  chain.forEach(function (label,index) {
    var item=document.createElement("li");
    item.innerHTML='<span class="sl-chain-index">S'+(index+1)+'</span>'+label;
    chainRoot.appendChild(item);
  });

  function svgEl(tag,attrs) {
    var el=document.createElementNS(ns,tag);
    Object.keys(attrs||{}).forEach(function (key) { el.setAttribute(key,String(attrs[key])); });
    return el;
  }

  function edgePath(a,b) {
    var dx=b[0]-a[0],dy=b[1]-a[1];
    var length=Math.sqrt(dx*dx+dy*dy) || 1;
    var boundary=Math.min(Math.abs(dx)>0?112/Math.abs(dx):Infinity,Math.abs(dy)>0?45/Math.abs(dy):Infinity);
    var gap=14/length;
    var sx=a[0]+dx*(boundary+gap),sy=a[1]+dy*(boundary+gap);
    var ex=b[0]-dx*(boundary+gap),ey=b[1]-dy*(boundary+gap);
    var bend=Math.min(72,length*0.16);
    var nx=-dy/length*bend,ny=dx/length*bend;
    return "M "+sx+" "+sy+" Q "+((sx+ex)/2+nx)+" "+((sy+ey)/2+ny)+" "+ex+" "+ey;
  }

  function linkText(edge) {
    var note=edge[3] ? " · delay" : "";
    return edge[2]+note;
  }

  function updateDetail() {
    var layout=layouts[activeView];
    var variable=variables[selected];
    section.querySelector("#sl-detail-id").textContent=selected;
    section.querySelector("#sl-detail-role").textContent=variable.shared ? "Shared variable" : (activeView==="coupled" ? "System variable" : layout.badge);
    section.querySelector("#sl-detail-title").textContent=variable.label;
    section.querySelector("#sl-detail-definition").textContent=variable.definition;
    var links=layout.edges.filter(function (edge) { return edge[0]===selected || edge[1]===selected; });
    section.querySelector("#sl-detail-links").innerHTML=links.map(function (edge) {
      var outgoing=edge[0]===selected;
      var other=variables[outgoing?edge[1]:edge[0]];
      return '<div class="sl-link-card"><strong>'+(outgoing?'Outgoing → ':'← Incoming ')+other.label+'</strong><span>'+edge[5]+' · '+linkText(edge)+'</span><span class="sl-link-mechanism">'+edge[4]+'</span></div>';
    }).join("");
  }

  function applySelection() {
    nodesLayer.querySelectorAll(".sl-node").forEach(function (node) {
      var id=node.getAttribute("data-id");
      node.classList.toggle("is-selected",id===selected);
    });
    edgesLayer.querySelectorAll(".sl-edge-group").forEach(function (group) {
      group.querySelector(".sl-edge").classList.add("is-active");
      group.querySelectorAll("text").forEach(function (label) { label.style.opacity="1"; });
    });
    updateDetail();
  }

  function render() {
    var layout=layouts[activeView];
    if (!layout.nodes[selected]) selected=layout.nodes.V03?"V03":Object.keys(layout.nodes)[0];
    section.querySelector("#sl-loop-badge").textContent=layout.badge;
    section.querySelector("#sl-loop-title").textContent=layout.title;
    section.querySelector("#sl-loop-summary").textContent=layout.summary;
    section.querySelector("#sl-loop-narrative").innerHTML=layout.narrative.map(function (paragraph) { return "<p>"+paragraph+"</p>"; }).join("");
    nodesLayer.textContent="";
    edgesLayer.textContent="";

    layout.edges.forEach(function (edge) {
      var a=layout.nodes[edge[0]],b=layout.nodes[edge[1]];
      var group=svgEl("g",{class:"sl-edge-group","data-from":edge[0],"data-to":edge[1]});
      var path=svgEl("path",{d:edgePath(a,b),class:"sl-edge is-active"+(edge[3]?" is-delay":"")});
      group.appendChild(path);
      var mx=(a[0]+b[0])/2,my=(a[1]+b[1])/2;
      var polarity=svgEl("text",{x:mx,y:my-7,class:"sl-edge-label"}); polarity.textContent=edge[2];
      group.appendChild(polarity);
      if (edge[3]) { var note=svgEl("text",{x:mx,y:my+12,class:"sl-edge-note"}); note.textContent="delay"; group.appendChild(note); }
      edgesLayer.appendChild(group);
    });

    Object.keys(layout.nodes).forEach(function (id) {
      var pos=layout.nodes[id],variable=variables[id];
      var group=svgEl("g",{class:"sl-node"+(variable.shared?" is-shared":""),"data-id":id,role:"button",tabindex:"0","aria-label":id+" "+variable.label});
      group.appendChild(svgEl("rect",{x:pos[0]-112,y:pos[1]-45,width:224,height:90,rx:18}));
      var code=svgEl("text",{x:pos[0],y:pos[1]-13,class:"sl-node-id"}); code.textContent=id; group.appendChild(code);
      var words=variable.label.split(" "),lines=[""];
      words.forEach(function (word) { var last=lines.length-1; if ((lines[last]+" "+word).trim().length>25) lines.push(word); else lines[last]=(lines[last]+" "+word).trim(); });
      lines.slice(0,2).forEach(function (line,index) { var label=svgEl("text",{x:pos[0],y:pos[1]+10+index*20,class:"sl-node-label"}); label.textContent=line; group.appendChild(label); });
      function choose() { selected=id; applySelection(); }
      group.addEventListener("click",choose);
      group.addEventListener("keydown",function (event) { if (event.key==="Enter" || event.key===" ") { event.preventDefault(); choose(); } });
      nodesLayer.appendChild(group);
    });
    applySelection();
  }

  section.querySelectorAll("[data-loop-view]").forEach(function (button) {
    button.addEventListener("click",function () {
      activeView=button.getAttribute("data-loop-view");
      section.querySelectorAll("[data-loop-view]").forEach(function (item) {
        var active=item===button;
        item.classList.toggle("btn-primary",active);
        item.setAttribute("aria-pressed",String(active));
      });
      render();
    });
  });

  window.renderSystemLoops=render;
  render();
}());
