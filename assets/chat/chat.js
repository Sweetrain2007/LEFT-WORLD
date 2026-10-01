(() => {
  "use strict";
  const contact = document.getElementById("left-contact");
  if (contact.dataset.chatInitialized === "true") return;
  contact.dataset.chatInitialized = "true";
  const config = window.LEFT_CHAT_CONFIG;
  const lists = [...document.querySelectorAll(".message-list")];
  const mobileContact = document.getElementById("mobile-contact");
  const buttons = [...document.querySelectorAll("[data-share]")];
  const voiceButtons = [...document.querySelectorAll("[data-voice-request]")];
  const voiceLibrary = typeof leftVoiceLibrary === "undefined" ? [] : leftVoiceLibrary;
  const voiceAudio = new Audio();
  voiceAudio.preload = "metadata";
  let activeVoiceId = null, lastVoiceId = null, voiceSequence = 0, playbackToken = 0;
  function syncVoicePlayback() {
    document.querySelectorAll(".voice-message").forEach(button => {
      const playing = button.dataset.voiceId === activeVoiceId && !voiceAudio.paused && !voiceAudio.ended;
      button.setAttribute("aria-pressed", String(playing));
      button.setAttribute("aria-label", playing ? "暂停 LEFT 语音" : "播放 LEFT 语音");
    });
  }
  function stopVoice() {
    playbackToken++;
    voiceAudio.pause();
    voiceAudio.removeAttribute("src");
    voiceAudio.load();
    activeVoiceId = null;
    syncVoicePlayback();
  }
  function toggleVoice(message) {
    if (activeVoiceId === message.id && !voiceAudio.paused) {
      playbackToken++; voiceAudio.pause(); return;
    }
    voiceAudio.pause();
    if (activeVoiceId !== message.id) {
      activeVoiceId = message.id; voiceAudio.src = message.src;
    }
    if (voiceAudio.ended) voiceAudio.currentTime = 0;
    const attempt = ++playbackToken;
    voiceAudio.play().catch(() => { if (attempt === playbackToken) syncVoicePlayback(); });
    syncVoicePlayback();
  }
  ["play", "pause", "ended", "error"].forEach(event => voiceAudio.addEventListener(event, syncVoicePlayback));
  const durations = new Map();
  function showDuration(src, duration) {
    if (!Number.isFinite(duration) || duration <= 0) return;
    durations.set(src, duration);
    document.querySelectorAll(".voice-message").forEach(button => {
      if (button.dataset.voiceSrc === src) button.querySelector(".voice-duration").textContent = Math.ceil(duration) + '″';
    });
  }
  const metadataAudio = new Map();
  function loadVoiceDuration(message) {
    if (durations.has(message.src)) { showDuration(message.src, durations.get(message.src)); return; }
    if (Number.isFinite(message.duration) && message.duration > 0) { showDuration(message.src, message.duration); return; }
    if (metadataAudio.has(message.src)) return;
    const probe = new Audio(); metadataAudio.set(message.src, probe); probe.preload = "metadata";
    probe.addEventListener("loadedmetadata", () => showDuration(message.src, probe.duration), {once:true});
    probe.src = message.src;
  }
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
    mobileContact.classList.remove("has-new-message");
    contact.removeAttribute("aria-label");
  }
  function notify() {
    clearNotice();
    void contact.offsetWidth;
    contact.classList.add("has-new-message");
    void mobileContact.offsetWidth;
    mobileContact.classList.add("has-new-message");
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
    message = {...message, receivedAt: new Date()};
    records.set(message.id, message);
    lists.forEach(list => renderMessage(message, list, animate));
    if (animate) notify();
  }
  function renderMessage(message, list, animate) {
    const row = element("article", "incoming-message" + (animate ? "" : " message-restored"));
    row.dataset.messageId = message.id;
    const image = element("img", "message-avatar");
    image.src = config.leftAvatar;
    image.alt = "LEFT 头像";
    image.width = image.height = 32;
    const content = element("div", "message-content");
    const sender = element("div", "message-sender", "LEFT");
    if (list.hasAttribute("data-mobile-messages")) {
      const time = element("time", "mobile-message-time",
        message.receivedAt.toLocaleTimeString("zh-CN", {hour:"2-digit", minute:"2-digit", hour12:false}));
      time.dateTime = message.receivedAt.toISOString();
      sender.append(time);
    }
    content.append(sender);
    if (message.type === "text") {
      content.append(element("p", "message-text", message.text));
    } else if (message.type === "voice") {
      const bubble = element("button", "voice-message");
      bubble.type = "button";
      bubble.dataset.voiceId = message.id;
      bubble.dataset.voiceSrc = message.src;
      bubble.setAttribute("aria-label", "播放 LEFT 语音");
      bubble.setAttribute("aria-pressed", "false");
      const waves = element("span", "voice-waves", ")))");
      waves.setAttribute("aria-hidden", "true");
      bubble.append(waves, element("span", "voice-duration", "语音"));
      bubble.addEventListener("click", () => toggleVoice(message));
      content.append(bubble);
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
    const avatarButton = element("button", "message-profile-trigger");
    avatarButton.type = "button";
    avatarButton.dataset.profileTrigger = "left";
    avatarButton.setAttribute("aria-label", "打开 LEFT 个人资料");
    avatarButton.append(image);
    row.append(avatarButton, content);
    list.append(row);
    if (message.type === "voice") loadVoiceDuration(message);
    list.scrollTop = list.scrollHeight;
  }
  function receiveIntro() {
    if (document.hidden) return;
    appendMessage(intro);
  }
  function requestShare(type) {
    const id = type + "-share";
    if (records.has(id) || pending.has(type)) return;
    const matching = buttons.filter(item => item.dataset.share === type);
    matching.forEach(button => {
      button.disabled = true;
      button.setAttribute("aria-busy", "true");
    });
    pending.set(type, setTimeout(() => {
      pending.delete(type);
      // The greeting always precedes requested content, even with an early click.
      clearTimeout(firstTimer);
      appendMessage(intro);
      appendMessage({id, sender: "left", type});
      matching.forEach(button => {
        button.disabled = false;
        button.removeAttribute("aria-busy");
      });
    }, config.shareMessageDelay));
  }
  function requestVoice() {
    if (pending.has("voice") || !voiceLibrary.length) return;
    const eligible = voiceLibrary.filter(item => typeof item.src === "string" && item.src.trim());
    if (!eligible.length) return;
    const different = eligible.filter(item => item.id !== lastVoiceId);
    const pool = different.length ? different : eligible;
    voiceButtons.forEach(button => { button.disabled = true; button.setAttribute("aria-busy", "true"); });
    pending.set("voice", setTimeout(() => {
      pending.delete("voice");
      const chosen = pool[Math.floor(Math.random() * pool.length)];
      lastVoiceId = chosen.id;
      clearTimeout(firstTimer);
      appendMessage(intro);
      appendMessage({id: "voice-" + (++voiceSequence), sender:"left", type:"voice", src:chosen.src, duration:chosen.duration});
      voiceButtons.forEach(button => { button.disabled = false; button.removeAttribute("aria-busy"); });
    }, 500 + Math.floor(Math.random() * 701)));
  }
  voiceButtons.forEach(button => button.addEventListener("click", requestVoice));
  function restoreBase() {
    stopVoice();
    voiceButtons.forEach(button => { button.disabled = false; button.removeAttribute("aria-busy"); });
    clearTimeout(firstTimer);
    pending.forEach(timer => clearTimeout(timer));
    pending.clear();
    clearNotice();
    records.clear();
    lists.forEach(list => list.replaceChildren());
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
  ["profile-avatar", "mobile-profile-avatar"].forEach(id => document.getElementById(id).addEventListener("click", event => {
    document.dispatchEvent(new CustomEvent("left:open-profile", {detail: {contactId: "left", source: "avatar", anchor: event.currentTarget}}));
  }));
  ["chat-input", "mobile-chat-input"].forEach(id =>
    document.getElementById(id).addEventListener("submit", event => event.preventDefault()));
  const drafts = ["message-draft", "mobile-message-draft"].map(id => document.getElementById(id));
  drafts.forEach(draft => draft.addEventListener("input", () => {
    drafts.forEach(other => { if (other !== draft) other.value = draft.value; });
  }));
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