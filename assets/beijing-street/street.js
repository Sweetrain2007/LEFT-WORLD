(() => {
  "use strict";
  const layer = document.getElementById("windows"), art = document.querySelector(".street-art");
  const bindings = new Map(beijingStages.map(stage => [stage.cellId,stage]));
  let entering = false;
  const hoverMedia = matchMedia("(hover: hover) and (pointer: fine)");
  const preview = document.createElement("div");
  preview.className = "window-preview"; preview.id = "beijing-window-preview";
  preview.setAttribute("role", "tooltip"); preview.setAttribute("aria-hidden", "true");
  const previewTitle = document.createElement("div"), previewDate = document.createElement("div");
  previewTitle.className = "window-preview-title"; previewDate.className = "window-preview-date";
  preview.append(previewTitle, previewDate); document.body.append(preview);
  let previewAnchor = null;
  function hidePreview() {
    previewAnchor?.removeAttribute("aria-describedby"); previewAnchor = null;
    preview.classList.remove("is-visible"); preview.setAttribute("aria-hidden", "true");
  }
  function showPreview(hit, stage) {
    if (!hoverMedia.matches || entering) return;
    previewAnchor?.removeAttribute("aria-describedby"); previewAnchor = hit;
    previewTitle.textContent = stage.title;
    previewDate.textContent = stage.date || ""; previewDate.hidden = !stage.date;
    const r = hit.getBoundingClientRect(), box = preview.getBoundingClientRect();
    const margin = 10, gap = 10, w = document.documentElement.clientWidth, h = innerHeight;
    let x, y = r.top + (r.height - box.height) / 2;
    if (r.right + gap + box.width <= w - margin) x = r.right + gap;
    else if (r.left - gap - box.width >= margin) x = r.left - gap - box.width;
    else {
      x = Math.max(margin, Math.min(w - box.width - margin, r.left + (r.width - box.width) / 2));
      y = r.top - gap - box.height;
      if (y < margin) y = r.bottom + gap;
    }
    preview.style.left = x + "px";
    preview.style.top = Math.max(margin, Math.min(h - box.height - margin, y)) + "px";
    hit.setAttribute("aria-describedby", preview.id);
    preview.setAttribute("aria-hidden", "false"); preview.classList.add("is-visible");
  }
  addEventListener("resize", hidePreview);
  document.addEventListener("scroll", hidePreview, true);
  hoverMedia.addEventListener("change", hidePreview);
  document.addEventListener("keydown", event => { if (event.key === "Escape") hidePreview(); });
  const liveCells = [];
  for (const window of beijingWindows) {
    const node = document.createElement("div"); node.className = "window";
    node.dataset.windowId = window.id; node.dataset.houseId = window.houseId;
    Object.assign(node.style, {left:window.x+"%",top:window.y+"%",width:window.width+"%",height:window.height+"%"});
    for (const cell of beijingWindowCells.filter(cell => cell.windowId === window.id)) {
      const pane = document.createElement("div"); pane.className = "window-cell"; pane.dataset.cellId = cell.id;
      Object.assign(pane.style,{left:cell.x+"%",top:cell.y+"%",width:cell.width+"%",height:cell.height+"%"});
      const stage = bindings.get(cell.id);
      if (stage) {
        pane.classList.add("is-lit");
        const light = document.createElement("span"); light.className = "cell-light";
        if (cell.shape) light.classList.add(cell.shape);
        light.setAttribute("aria-hidden","true");
        const hit = document.createElement("button"); hit.type="button";hit.className="cell-hit";hit.setAttribute("aria-label",stage.title);
        hit.addEventListener("pointerenter", event => { if (event.pointerType === "mouse") showPreview(hit, stage); });
        hit.addEventListener("pointerleave", hidePreview);
        hit.addEventListener("focus", () => showPreview(hit, stage));
        hit.addEventListener("blur", hidePreview);
        hit.addEventListener("click",() => {
          hidePreview();
          if (entering) return; entering=true; pane.classList.add("is-selected");
          art.style.transformOrigin = `${window.x+window.width*(cell.x+cell.width/2)/100}% ${window.y+window.height*(cell.y+cell.height/2)/100}%`;
          document.body.classList.add("entering");
          setTimeout(()=>location.assign("beijing-stage.html?id="+encodeURIComponent(stage.id)),matchMedia("(prefers-reduced-motion: reduce)").matches ? 150:1050);
        });
        pane.append(light,hit); liveCells.push({pane,hit});
      } else pane.setAttribute("aria-hidden","true");
      node.append(pane);
    }
    layer.append(node);
  }
  // Expand touch targets only. Bisect the space between nearby bound cells so
  // even future adjacent Stage cells never acquire overlapping hit rectangles.
  function sizeHitAreas() {
    if (entering) return;
    const touch = matchMedia("(max-width:767px), (pointer:coarse)").matches;
    const bounds = liveCells.map(({pane}) => pane.getBoundingClientRect());
    liveCells.forEach(({hit}, i) => {
      if (!touch) { hit.removeAttribute("style"); return; }
      const r=bounds[i], cx=r.left+r.width/2, cy=r.top+r.height/2;
      let left=cx-22,right=cx+22,top=cy-22,bottom=cy+22;
      bounds.forEach((other,j) => {
        if(i===j)return;
        const ox=other.left+other.width/2,oy=other.top+other.height/2;
        const dx=ox-cx,dy=oy-cy;
        if(Math.abs(dx)>=44 || Math.abs(dy)>=44)return;
        if(Math.abs(dx)>=Math.abs(dy)) {
          if(dx>0)right=Math.min(right,(cx+ox)/2-.5);else left=Math.max(left,(cx+ox)/2+.5);
        } else {
          if(dy>0)bottom=Math.min(bottom,(cy+oy)/2-.5);else top=Math.max(top,(cy+oy)/2+.5);
        }
      });
      Object.assign(hit.style,{left:(left-r.left)+"px",top:(top-r.top)+"px",width:(right-left)+"px",height:(bottom-top)+"px"});
    });
  }
  new ResizeObserver(sizeHitAreas).observe(art);
  addEventListener("resize",sizeHitAreas); sizeHitAreas();
  addEventListener("pageshow",()=>{
    entering=false;document.body.classList.remove("entering");
    layer.querySelectorAll(".is-selected").forEach(n=>n.classList.remove("is-selected"));
    if (matchMedia("(hover:none), (pointer:coarse)").matches) {
      hidePreview();
      if (document.activeElement?.matches(".cell-hit")) document.activeElement.blur();
      requestAnimationFrame(sizeHitAreas);
    }
  });
})();
