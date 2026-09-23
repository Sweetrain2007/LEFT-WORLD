(() => {
  "use strict";
  const contact = document.getElementById("left-contact");
  if (contact.dataset.chatInitialized === "true") return;
  contact.dataset.chatInitialized = "true";
  const config = window.LEFT_CHAT_CONFIG;
  const list = document.querySelector(".message-list");
  const buttons = [...document.querySelectorAll("[data-share]")];
  const records = new Map();
  const pending = new Map();
  let firstTimer, noticeTimer, scheduled = false;
  const intro = {id: "intro", sender: "left", type: "text", text: "This is LEFT"};

  document.querySelectorAll("[data-left-avatar]").forEach(img => { img.src = config.leftAvatar; });
  function selectContact() {
    contact.classList.add("selected");
    contact.setAttribute("aria-pressed", "true");
    document.getElementById("left-chat").hidden = false;
  }
  function clearNotice() {
    clearTimeout(noticeTimer);
    contact.classList.remove("has-new-message");
    contact.removeAttribute("aria-label");
  }
  function notify() {
    clearNotice();
    void contact.offsetWidth;
    contact.classList.add("has-new-message");
    contact.setAttribute("aria-label", "LEFT，收到一条新消息");
    noticeTimer = setTimeout(clearNotice, 1200);
  }
  function element(tag, className, text) {
    const node = document.createElement(tag);
    node.className = className;
    if (text) node.textContent = text;
    return node;
  }
  function appendMessage(message, animate = true) {
    if (records.has(message.id)) return;
    records.set(message.id, message);
    const row = element("article", "incoming-message" + (animate ? "" : " message-restored"));
    row.dataset.messageId = message.id;
    const image = element("img", "message-avatar");
    image.src = config.leftAvatar;
    image.alt = "LEFT 头像";
    image.width = image.height = 32;
    const content = element("div", "message-content");
    content.append(element("div", "message-sender", "LEFT"));
    if (message.type === "text") {
      content.append(element("p", "message-text", message.text));
    } else {
      const share = config.shares[message.type];
      const link = element("a", "share-message");
      link.href = share.href;
      const heading = element("span", "share-message-heading");
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute("class", "pixel-icon");
      svg.setAttribute("aria-hidden", "true");
      const use = document.createElementNS("http://www.w3.org/2000/svg", "use");
      use.setAttribute("href", "#" + share.icon);
      svg.append(use);
      heading.append(svg, element("strong", "", share.title));
      link.append(heading, element("span", "share-message-label", share.text), element("span", "share-message-arrow", ">"));
      content.append(link);
    }
    row.append(image, content);
    list.append(row);
    list.scrollTop = list.scrollHeight;
    if (animate) notify();
  }
  function receiveIntro() {
    if (document.hidden) return;
    appendMessage(intro);
  }
  function requestShare(type) {
    const id = type + "-share";
    if (records.has(id) || pending.has(type)) return;
    const button = buttons.find(item => item.dataset.share === type);
    button.disabled = true;
    button.setAttribute("aria-busy", "true");
    pending.set(type, setTimeout(() => {
      pending.delete(type);
      // The greeting always precedes requested content, even with an early click.
      clearTimeout(firstTimer);
      appendMessage(intro);
      appendMessage({id, sender: "left", type});
      button.disabled = false;
      button.removeAttribute("aria-busy");
    }, config.shareMessageDelay));
  }
  function restoreBase() {
    clearTimeout(firstTimer);
    pending.forEach(timer => clearTimeout(timer));
    pending.clear();
    clearNotice();
    records.clear();
    list.replaceChildren();
    appendMessage(intro, false);
    buttons.forEach(button => {
      button.disabled = false;
      button.removeAttribute("aria-busy");
    });
  }
  function start() {
    if (scheduled) return;
    scheduled = true;
    // Only the base-greeting flag belongs to this history entry; shares stay in memory.
    let returning = false;
    try {
      returning = sessionStorage.getItem("left-chat-return") === "1";
      sessionStorage.removeItem("left-chat-return");
    } catch (_) {}
    try {
      returning ||= /\/(route|music)\.html$/.test(new URL(document.referrer).pathname);
    } catch (_) {}
    if (returning || (history.state && history.state.leftChatVisited)) restoreBase();
    else firstTimer = setTimeout(receiveIntro, config.firstMessageDelay);
  }
  contact.addEventListener("click", selectContact);
  document.getElementById("profile-avatar").addEventListener("click", () => {
    document.dispatchEvent(new CustomEvent("left:open-profile", {detail: {contactId: "left", source: "avatar"}}));
  });
  document.getElementById("chat-input").addEventListener("submit", event => event.preventDefault());
  buttons.forEach(button => button.addEventListener("click", () => requestShare(button.dataset.share)));
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden && scheduled && !records.has("intro")) {
      clearTimeout(firstTimer);
      firstTimer = setTimeout(receiveIntro, config.firstMessageDelay);
    }
  });
  window.addEventListener("pagehide", () => {
    history.replaceState({...history.state, leftChatVisited: true}, "");
    restoreBase();
  });
  window.addEventListener("pageshow", event => {
    if (event.persisted) restoreBase();
  });
  selectContact();
  if (document.readyState === "complete") start();
  else window.addEventListener("load", start, {once: true});
})();