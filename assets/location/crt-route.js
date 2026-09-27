(() => {
  "use strict";
  const icon = document.getElementById("open-route");
  const prompt = document.getElementById("route-prompt");
  const route = document.getElementById("route-window");
  const ok = document.getElementById("route-ok");
  const maximize = document.getElementById("route-maximize");
  let loaded = false;
  function remember(open) {
    try { history.replaceState({...history.state, leftRouteOpen:open}, ""); } catch (_) {}
  }
  function close() {
    prompt.hidden = route.hidden = true;
    icon.setAttribute("aria-expanded","false");
    remember(false);
    icon.focus({preventScroll:true});
  }
  function showRoute(focus = true) {
    loaded = true;
    prompt.hidden = true;
    route.hidden = false;
    icon.setAttribute("aria-expanded","true");
    remember(true);
    if(focus) route.querySelector("a").focus({preventScroll:true});
  }
  icon.addEventListener("click", () => {
    if(loaded) showRoute();
    else {
      prompt.hidden = false;
      icon.setAttribute("aria-expanded","true");
      ok.focus({preventScroll:true});
    }
  });
  ok.addEventListener("click", () => showRoute());
  document.querySelectorAll("[data-close]").forEach(button => button.addEventListener("click",close));
  document.getElementById("route-minimize").addEventListener("click",close);
  maximize.addEventListener("click", () => {
    const expanded = route.classList.toggle("is-maximized");
    maximize.setAttribute("aria-pressed",String(expanded));
    maximize.setAttribute("aria-label",expanded ? "还原路线窗口" : "最大化路线窗口");
  });
  document.addEventListener("keydown", event => {
    if(event.key === "Escape" && (!route.hidden || !prompt.hidden)) {
      event.preventDefault();close();
    }
  });
  // Keep existing destination-page return links and browser Back restoration.
  if(history.state?.leftRouteOpen || (history.state?.leftRouteOpen == null && location.hash === "#journey-title")) showRoute(false);
})();