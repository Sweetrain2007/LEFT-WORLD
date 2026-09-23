/* Keep existing home.html section links connected to the preserved old page. */
(() => {
  const legacyIds = new Set(["about-left","about-title","profile-title","bio-about-title",
    "film-title","music-title","timeline-title","left-habits","habits-title",
    "route-screen","journey-title","works"]);
  function preserveLegacyAnchor() {
    const id = location.hash.slice(1);
    if (id === "route-screen" || id === "journey-title") {
      location.replace("route.html" + location.hash);
      return;
    }
    if (id === "works") {
      location.replace("music.html#works");
      return;
    }
    if (legacyIds.has(id)) location.replace("legacy-home.html" + location.hash);
  }
  preserveLegacyAnchor();
  window.addEventListener("hashchange",preserveLegacyAnchor);
})();