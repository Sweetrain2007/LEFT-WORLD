(function () {
  const section = document.getElementById("works");
  const shell = section.querySelector(".player-shell");
  const earphones = section.querySelector(".player-earphones");
  const list = shell.querySelector(".stage-list");
  let rows = [];
  const songs = walkmanSongs;
  const SONGS_PER_PAGE = 4;
  const totalPages = Math.ceil(songs.length / SONGS_PER_PAGE);
  let currentPage = 0, pageChanging = false, pageAnimation;
  const bar = list.querySelector(".selection-bar");
  const counter = shell.querySelector(".player-counter");
  const motion = matchMedia("(prefers-reduced-motion: reduce)");
  const storageKey = "left-walkman-stage-return";
  const entryUrl = new URL(location.href);
  let musicView = entryUrl.searchParams.get("view") === "player" ||
    (history.state && history.state.musicView === "player") ? "player" : "intro";
  let restored = history.state?.walkman;
  if (!restored && entryUrl.searchParams.get("view") === "player") {
    try { restored = JSON.parse(sessionStorage.getItem(storageKey)); } catch (_) {}
  }
  // Consume the return marker; only this history entry remembers the view.
  entryUrl.searchParams.delete("view");
  history.replaceState({...history.state, musicView}, "", entryUrl.href);
  section.dataset.musicView = musicView;
  function rememberPlayer() {
    musicView = "player";
    section.dataset.musicView = musicView;
    history.replaceState({...history.state, musicView}, "");
  }
  let activeIndex = 0, confirming = false, nativeNavigation = false;
  let confirmTimer, entranceTimer, counterAnimation, pointerFrame;
  function rememberSelection() {
    history.replaceState({...history.state, walkman:{currentPage, songId:rows[activeIndex]?.dataset.songId}}, "");
  }
  function renderPage(page, songId) {
    currentPage = Math.max(0, Math.min(totalPages - 1, Number.isInteger(page) ? page : 0));
    list.querySelectorAll(".stage-row").forEach(row => row.remove());
    rows = songs.slice(currentPage * SONGS_PER_PAGE, (currentPage + 1) * SONGS_PER_PAGE).map((song, index) => {
      const row = document.createElement("a");
      row.className = "icon-link stage-row"; row.href = song.route;
      row.dataset.songId = song.id; row.dataset.stageId = song.stageId;
      row.setAttribute("aria-label", song.label);
      const image = document.createElement("img"); image.src = song.icon; image.alt = song.alt; image.decoding = "async";
      const number = document.createElement("span"); number.className = "stage-number"; number.setAttribute("aria-hidden", "true");
      number.textContent = String(currentPage * SONGS_PER_PAGE + index + 1).padStart(2, "0");
      const chevron = document.createElement("span"); chevron.className = "stage-chevron"; chevron.textContent = ">"; chevron.setAttribute("aria-hidden", "true");
      row.append(image, number, chevron); list.append(row); return row;
    });
    bindRows();
    select(Math.max(0, rows.findIndex(row => row.dataset.songId === songId)), false);
  }
  async function changePage(direction) {
    if (totalPages <= 1 || pageChanging || confirming) return;
    pageChanging = true;
    // Only the LCD list fades; the shell never re-enters its arrival animation.
    try {
      if (!motion.matches) {
        pageAnimation = list.animate([{opacity:1, transform:"translateY(0)"},{opacity:0, transform:"translateY(-3px)"}], {duration:100, fill:"forwards"});
        await pageAnimation.finished;
      }
      renderPage((currentPage + direction + totalPages) % totalPages);
      pageAnimation?.cancel();
      if (!motion.matches) {
        pageAnimation = list.animate([{opacity:0, transform:"translateY(3px)"},{opacity:1, transform:"translateY(0)"}], {duration:100});
        await pageAnimation.finished;
      }
    } catch (_) { /* Navigation can cancel an in-flight LCD transition. */ }
    finally { pageAnimation?.cancel(); pageChanging = false; }
  }
  function positionBar() {
    if (!rows.length) { bar.hidden = true; return; }
    bar.hidden = false;
    bar.style.height = rows[activeIndex].offsetHeight + "px";
    bar.style.transform = "translateY(" + rows[activeIndex].offsetTop + "px)";
  }
  function select(index, animate = true) {
    if (confirming || !rows.length) return;
    const next = (index + rows.length) % rows.length;
    const changed = next !== activeIndex;
    activeIndex = next;
    rows.forEach((row, i) => {
      row.classList.toggle("is-selected", i === activeIndex);
      if (i === activeIndex) row.setAttribute("aria-current", "true");
      else row.removeAttribute("aria-current");
    });
    counter.textContent = String(currentPage * SONGS_PER_PAGE + activeIndex + 1).padStart(2, "0") + "/" + String(songs.length).padStart(2, "0");
    if (changed && animate && !motion.matches && counter.animate) {
      if (counterAnimation) counterAnimation.cancel();
      counterAnimation = counter.animate([{opacity:.65},{opacity:1}], {duration:140,easing:"ease-out"});
    }
    positionBar();
    rememberSelection();
  }
  function enter() {
    if (confirming || pageChanging || !rows.length) return;
    try { sessionStorage.setItem(storageKey, JSON.stringify({currentPage, songId:rows[activeIndex].dataset.songId})); } catch (_) {}
    clearTimeout(entranceTimer);
    shell.classList.remove("player-arriving", "player-pending");
    rememberPlayer();
    confirming = true;
    const target = rows[activeIndex];
    shell.classList.add("player-confirming");
    confirmTimer = setTimeout(() => {
      // Dispatch through the original anchor; its href remains the navigation source.
      nativeNavigation = true;
      try { target.click(); }
      finally { nativeNavigation = false; }
      confirming = false;
      shell.classList.remove("player-confirming");
    }, motion.matches ? 0 : 250);
  }
  function bindRows() { rows.forEach((row, index) => {
    row.style.setProperty("--row-index", index);
    row.addEventListener("pointerenter", () => select(index));
    row.addEventListener("focus", () => select(index));
    row.addEventListener("click", event => {
      if (nativeNavigation) return;
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        select(index);
        return;
      }
      event.preventDefault();
      if (confirming) return;
      select(index);
      enter();
    });
  });
  }
  shell.querySelector(".wheel-prev").addEventListener("click", () => changePage(-1));
  shell.querySelector(".wheel-next").addEventListener("click", () => changePage(1));
  shell.querySelector(".wheel-center").addEventListener("click", enter);
  shell.querySelector(".wheel-play").addEventListener("click", enter);
  document.addEventListener("keydown", event => {
    if (event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey) return;
    if (!["ArrowUp","ArrowDown","Enter"].includes(event.key)) return;
    const focused = document.activeElement;
    if (event.key === "Enter" && focused?.closest(".control-wheel button")) return;
    if (focused && focused !== document.body && !shell.contains(focused)) return;
    const rect = shell.getBoundingClientRect();
    if (rect.bottom <= 0 || rect.top >= innerHeight) return;
    event.preventDefault();
    if (event.repeat && event.key === "Enter") return;
    if (event.key === "ArrowUp") select(activeIndex - 1);
    else if (event.key === "ArrowDown") select(activeIndex + 1);
    else enter();
  });
  function resetTilt() {
    cancelAnimationFrame(pointerFrame);
    shell.style.setProperty("--tilt-x", "0deg");
    shell.style.setProperty("--tilt-y", "0deg");
    earphones.style.setProperty("--wire-x", "0px");
    earphones.style.setProperty("--wire-y", "0px");
  }
  section.addEventListener("pointermove", event => {
    if (motion.matches || event.pointerType !== "mouse") return;
    cancelAnimationFrame(pointerFrame);
    pointerFrame = requestAnimationFrame(() => {
      const rect = shell.getBoundingClientRect();
      const x = (event.clientX - rect.left - rect.width / 2) / (rect.width / 2 + 100);
      const y = (event.clientY - rect.top - rect.height / 2) / (rect.height / 2 + 100);
      if (Math.abs(x) > 1 || Math.abs(y) > 1) { resetTilt(); return; }
      shell.style.setProperty("--tilt-x", (-y).toFixed(3) + "deg");
      shell.style.setProperty("--tilt-y", (x * 1.5).toFixed(3) + "deg");
      earphones.style.setProperty("--wire-x", (x * 1.5).toFixed(3) + "px");
      earphones.style.setProperty("--wire-y", (y * 1.2).toFixed(3) + "px");
    });
  });
  section.addEventListener("pointerleave", resetTilt);
  function arrive() {
    if (musicView === "player") {
      shell.classList.remove("player-pending", "player-arriving");
      return;
    }
    rememberPlayer();
    shell.classList.remove("player-pending");
    if (!motion.matches) {
      shell.classList.add("player-arriving");
      entranceTimer = setTimeout(() => shell.classList.remove("player-arriving"), 1100);
    }
  }
  renderPage(restored?.currentPage, restored?.songId);
  if ("ResizeObserver" in window) new ResizeObserver(positionBar).observe(list);
  else window.addEventListener("resize", positionBar);
  if (musicView === "intro" && !motion.matches && "IntersectionObserver" in window) {
    shell.classList.add("player-pending");
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) { arrive(); observer.disconnect(); }
    }, {threshold:.15});
    observer.observe(shell);
  } else arrive();
  motion.addEventListener("change", () => {
    if (motion.matches) {
      clearTimeout(entranceTimer);
      shell.classList.remove("player-pending", "player-arriving");
      resetTilt();
      if (counterAnimation) counterAnimation.cancel();
    }
  });
  window.addEventListener("pageshow", event => {
    if (!event.persisted) return;
    rememberPlayer();
    clearTimeout(confirmTimer);
    clearTimeout(entranceTimer);
    confirming = false;
    shell.classList.remove("player-confirming", "player-pending", "player-arriving");
    resetTilt();
    pageAnimation?.cancel(); pageChanging = false;
    select(activeIndex, false);
  });
  section.querySelector("[data-chat-return]").addEventListener("click", () => {
    try { sessionStorage.removeItem(storageKey); } catch (_) {}
  });
  window.addEventListener("pagehide", () => { clearTimeout(confirmTimer); pageAnimation?.cancel(); resetTilt(); });
})();
