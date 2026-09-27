(() => {
  "use strict";
  const config = window.LEFT_CHAT_CONFIG;
  const leftProfile = config.leftProfile;
  const popup = document.createElement("section");
  popup.id = "left-profile-popup";
  popup.className = "left-profile-popup";
  popup.hidden = true;
  popup.setAttribute("role", "dialog");
  popup.setAttribute("aria-labelledby", "left-profile-title");
  popup.innerHTML = `
    <header class="left-profile-titlebar">
      <strong id="left-profile-title"></strong>
      <button type="button" class="left-profile-close" aria-label="关闭 LEFT 资料">×</button>
    </header>
    <div class="left-profile-body">
      <div class="left-profile-identity">
        <img class="left-profile-image" width="46" height="46" alt="LEFT 头像">
        <div><strong class="left-profile-name"></strong><span class="left-profile-online"><i aria-hidden="true"></i> 在线</span></div>
      </div>
      <div class="left-profile-actions">
        <button type="button" data-profile-action="space">进入空间</button>
        <a data-profile-action="log">查看日志</a>
      </div>
    </div>`;
  popup.querySelector("#left-profile-title").textContent = leftProfile.name;
  popup.querySelector(".left-profile-name").textContent = leftProfile.name;
  popup.querySelector("img").src = config.leftAvatar;
  const space = popup.querySelector('[data-profile-action="space"]');
  const log = popup.querySelector('[data-profile-action="log"]');
  space.disabled = !leftProfile.weiboUrl;
  if (space.disabled) space.title = "尚未设置空间地址";
  log.href = leftProfile.logUrl;
  document.body.append(popup);
  let anchor = null;
  const primaryTriggers = [...document.querySelectorAll("#profile-avatar,#mobile-profile-avatar")];
  primaryTriggers.forEach(button => {
    button.setAttribute("aria-haspopup", "dialog");
    button.setAttribute("aria-controls", popup.id);
    button.setAttribute("aria-expanded", "false");
  });

  function close(restoreFocus = false) {
    if (popup.hidden) return;
    const previous = anchor;
    popup.hidden = true;
    if (anchor) anchor.setAttribute("aria-expanded", "false");
    anchor = null;
    if (restoreFocus && previous?.isConnected) previous.focus({preventScroll:true});
  }
  function position() {
    if (popup.hidden || !anchor) return;
    if (!anchor.getClientRects().length) { close(); return; }
    const viewport = window.visualViewport;
    const left = viewport?.offsetLeft || 0, top = viewport?.offsetTop || 0;
    const width = viewport?.width || document.documentElement.clientWidth;
    const height = viewport?.height || window.innerHeight;
    popup.style.maxWidth = Math.max(0, width - 16) + "px";
    popup.style.maxHeight = Math.max(0, height - 16) + "px";
    const rect = anchor.getBoundingClientRect();
    const w = popup.offsetWidth, h = popup.offsetHeight;
    let x = rect.right + 8, y = rect.top;
    if (x + w > left + width - 8) x = rect.left - w - 8;
    if (x < left + 8) { x = rect.left; y = rect.bottom + 8; }
    if (y + h > top + height - 8) y = rect.top - h - 8;
    popup.style.left = Math.max(left + 8, Math.min(x, left + width - w - 8)) + "px";
    popup.style.top = Math.max(top + 8, Math.min(y, top + height - h - 8)) + "px";
  }
  function toggle(nextAnchor) {
    if (!nextAnchor) return;
    if (!popup.hidden && nextAnchor === anchor) { close(true); return; }
    close();
    anchor = nextAnchor;
    anchor.setAttribute("aria-haspopup", "dialog");
    anchor.setAttribute("aria-controls", popup.id);
    anchor.setAttribute("aria-expanded", "true");
    popup.hidden = false;
    position();
    popup.querySelector(".left-profile-close").focus({preventScroll:true});
  }
  function openWeibo() {
    if (leftProfile.weiboUrl) window.open(leftProfile.weiboUrl, "_blank", "noopener,noreferrer");
  }
  function openLog(event) {
    // Keep normal anchor navigation, including new-tab gestures.
    if (event.button === 0 && !event.ctrlKey && !event.metaKey && !event.shiftKey && !event.altKey) {
      try { sessionStorage.setItem("left-chat-return", "1"); } catch (_) {}
      close();
    }
  }
  space.addEventListener("click", openWeibo);
  log.addEventListener("click", openLog);
  popup.querySelector(".left-profile-close").addEventListener("click", () => close(true));
  document.addEventListener("left:open-profile", event => toggle(event.detail?.anchor));
  document.addEventListener("click", event => {
    const target = event.target;
    const trigger = target.closest('[data-profile-trigger="left"]');
    if (trigger) { toggle(trigger); return; }
    const contactAvatar = target.closest("#left-contact .avatar-frame");
    if (contactAvatar) { toggle(document.getElementById("left-contact")); return; }
    if (target.closest("#profile-avatar,#mobile-profile-avatar")) return;
    if (!popup.contains(target)) close();
  });
  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && !popup.hidden) { event.preventDefault(); close(true); }
  });
  window.addEventListener("resize", position);
  document.addEventListener("scroll", position, true);
  window.visualViewport?.addEventListener("resize", position);
  window.visualViewport?.addEventListener("scroll", position);
  window.addEventListener("pagehide", () => close());
})();