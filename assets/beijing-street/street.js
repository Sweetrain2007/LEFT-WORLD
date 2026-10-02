(() => {
  "use strict";
  const layer = document.getElementById("windows"), art = document.querySelector(".street-art");
  const bindings = new Map(beijingStages.map(stage => [stage.windowId,stage]));
  let entering = false;
  const ns = "http://www.w3.org/2000/svg";
  for (const window of beijingWindows) {
    const node = document.createElement("div"); node.className = "window"; node.dataset.windowId = window.id; node.dataset.houseId = window.houseId;
    Object.assign(node.style,{left:window.x+"%",top:window.y+"%",width:window.width+"%",height:window.height+"%"});
    const stage = bindings.get(window.id);
    if (stage) {
      node.classList.add("is-lit");
      const svg = document.createElementNS(ns,"svg"); svg.setAttribute("viewBox","0 0 100 100"); svg.setAttribute("preserveAspectRatio","none"); svg.setAttribute("class","window-light"); svg.setAttribute("aria-hidden","true");
      // Separate panes leave the original white mullions visible. Arched glazing
      // follows the measured upper window silhouette, not its surrounding frame.
      if (window.arched) svg.style.clipPath = "polygon(0 100%,0 32%,5% 18%,18% 7%,34% 1%,50% 0,66% 1%,82% 7%,95% 18%,100% 32%,100% 100%)";
      for (let row=0;row<window.rows;row++) for (let col=0;col<2;col++) {
        const pane = document.createElementNS(ns,"rect"); pane.setAttribute("x",col ? "54":"0"); pane.setAttribute("y",String(row*100/window.rows+2)); pane.setAttribute("width","46"); pane.setAttribute("height",String(100/window.rows-7)); pane.setAttribute("fill","#ffda38"); svg.append(pane);
      }
      const hit = document.createElement("button"); hit.type="button";hit.className="window-hit";hit.setAttribute("aria-label",stage.title);
      hit.addEventListener("click",() => {
        if (entering) return; entering=true; node.classList.add("is-selected");
        art.style.transformOrigin = `${window.x+window.width/2}% ${window.y+window.height/2}%`;
        document.body.classList.add("entering");
        setTimeout(()=>location.assign("beijing-stage.html?id="+encodeURIComponent(stage.id)),matchMedia("(prefers-reduced-motion: reduce)").matches ? 150:1050);
      });node.append(svg,hit);
    } else { node.setAttribute("aria-hidden","true"); }
    layer.append(node);
  }
  addEventListener("pageshow",()=>{entering=false;document.body.classList.remove("entering");layer.querySelectorAll(".is-selected").forEach(n=>n.classList.remove("is-selected"));});
})();
