(() => {
  "use strict";
  const map = document.querySelector(".fold-map");
  const trigger = map.querySelector(".map-open-button");
  const places = map.querySelector(".map-places");
  const lastPanel = map.querySelector(".map-panel-four");
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  let timer;
  function rememberOpen() {
    try { history.replaceState({...history.state, leftMapOpen: true}, ""); } catch (_) {}
  }
  function finish(restored = false) {
    clearTimeout(timer);
    if (restored) map.classList.add("map-restored");
    map.dataset.mapState = "open";
    trigger.hidden = true;
    trigger.disabled = true;
    trigger.setAttribute("aria-expanded", "true");
    places.removeAttribute("inert");
    places.removeAttribute("aria-hidden");
    rememberOpen();
  }
  function unfold() {
    if (map.dataset.mapState !== "folded") return;
    trigger.disabled = true;
    trigger.hidden = true;
    map.dataset.mapState = "unfolding";
    if (reduced.matches) finish();
    else timer = setTimeout(() => finish(), 1650);
  }
  trigger.addEventListener("click", unfold);
  lastPanel.addEventListener("transitionend", event => {
    if (event.target === lastPanel && event.propertyName === "transform" && map.dataset.mapState === "unfolding") finish();
  });
  // Existing location back links use home.html#journey-title, redirected here by legacy-routes.js.
  // Fresh Chat shares use route.html without that hash, so no persistent global flag is needed.
  if (history.state?.leftMapOpen || location.hash === "#journey-title") finish(true);
  window.addEventListener("pageshow", event => {
    if (event.persisted && history.state?.leftMapOpen) finish(true);
  });
  window.addEventListener("pagehide", () => {
    clearTimeout(timer);
    if (map.dataset.mapState === "unfolding") finish(true);
  });
})();