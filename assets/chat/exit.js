(() => {
  "use strict";
  const dialog = document.createElement("dialog");
  dialog.className = "chat-exit-dialog";
  dialog.setAttribute("aria-label", "I'm right by your side");
  const close = document.createElement("button");
  close.type = "button"; close.className = "chat-exit-cancel";
  close.textContent = "×"; close.setAttribute("aria-label", "取消退出");
  const line = document.createElement("p"); line.className = "chat-exit-line"; line.setAttribute("aria-hidden", "true");
  const text = document.createElement("span"), cursor = document.createElement("span");
  cursor.className = "chat-exit-cursor"; cursor.textContent = "|"; line.append(text, cursor);
  const leave = document.createElement("button");
  leave.type = "button"; leave.className = "chat-exit-leave"; leave.textContent = "LEAVE";
  dialog.append(close, line, leave); document.body.append(dialog);
  const phrase = "I'm right by your side", reduced = matchMedia("(prefers-reduced-motion: reduce)");
  let timer, cursorTimer, navigating = false;
  function stopTyping() { clearTimeout(timer); clearTimeout(cursorTimer); }
  function open() {
    if (dialog.open || navigating) return;
    stopTyping(); text.textContent = ""; cursor.hidden = false; dialog.showModal(); close.focus();
    let count = 0;
    function type() {
      text.textContent = phrase.slice(0, ++count);
      if (count < phrase.length) timer = setTimeout(type, 80);
      else cursorTimer = setTimeout(() => { cursor.hidden = true; }, 1200);
    }
    if (reduced.matches) { text.textContent = phrase; cursor.hidden = true; }
    else timer = setTimeout(type, 80);
  }
  function cancel() { if (!navigating) dialog.close(); }
  close.addEventListener("click", cancel);
  dialog.addEventListener("click", event => {
    if (event.target !== dialog) return;
    const r = dialog.getBoundingClientRect();
    if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) cancel();
  });
  dialog.addEventListener("cancel", event => { if (navigating) event.preventDefault(); });
  dialog.addEventListener("close", stopTyping);
  document.querySelectorAll(".window-controls .close").forEach(original => {
    const button = document.createElement("button"); button.type = "button"; button.className = "close chat-exit-trigger";
    button.setAttribute("aria-label", "退出 LEFT’S WORLD");
    const controls = original.parentElement; controls.removeAttribute("aria-hidden");
    [...controls.children].filter(n => n !== original).forEach(n => n.setAttribute("aria-hidden", "true"));
    original.replaceWith(button); button.addEventListener("click", open);
  });
  leave.addEventListener("click", () => {
    if (navigating) return;
    navigating = true; stopTyping(); leave.disabled = close.disabled = true; document.body.classList.add("chat-exiting");
    // Fresh navigation runs the original Intro initializer at idle. Existing Chat pagehide cleans temporary messages and audio.
    setTimeout(() => location.assign("index.html"), reduced.matches ? 150 : 420);
  });
  addEventListener("pageshow", event => {
    if (!event.persisted) return;
    navigating = false; leave.disabled = close.disabled = false; document.body.classList.remove("chat-exiting");
    if (dialog.open) dialog.close();
  });
})();