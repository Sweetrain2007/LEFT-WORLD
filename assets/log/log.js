(() => {
"use strict";
const list = document.getElementById("log-list");
const dialog = document.getElementById("listen-window");
const video = document.getElementById("letter-video");
const error = document.getElementById("listen-error");
let trigger = null, readingY = 0;
const entries = leftLogs.slice().sort((a, b) => b.date.localeCompare(a.date));
function element(tag, className, text) {
 const node = document.createElement(tag);
 if (className) node.className = className;
 if (text !== undefined) node.textContent = text;
 return node;
}
function openVideo(entry, button) {
 trigger = button; readingY = window.scrollY; error.hidden = true;
 video.pause(); video.src = entry.video;
 document.getElementById("listen-caption").textContent = [entry.date, entry.title].filter(Boolean).join(" / ");
 dialog.showModal();
 const playback = video.play();
 if (playback) playback.catch(() => { /* Native controls permit a manual retry. */ });
}
const years = new Set();
entries.forEach((entry, index) => {
 const article = element("article", "log-entry"); article.id = "log-entry-" + index;
 const time = element("time", "", entry.date); time.dateTime = entry.date; article.append(time);
 if (entry.title) article.append(element("div", "log-text", entry.title));
 article.append(element("div", "log-text", entry.content));
 if (entry.signature) article.append(element("p", "log-signature", entry.signature));
 if (typeof entry.video === "string" && entry.video.trim()) {
  const button = element("button", "listen-link", "LISTEN TO LEFT ▷");
  button.type = "button"; button.setAttribute("aria-haspopup", "dialog");
  button.addEventListener("click", () => openVideo(entry, button)); article.append(button);
 }
 list.append(article);
 const year = entry.date.slice(0, 4);
 if (!years.has(year)) {
  years.add(year); const link = element("a", "", year); link.href = "#" + article.id;
  document.getElementById("log-years").append(link);
 }
});
document.getElementById("log-count").textContent = entries.length;
document.getElementById("log-empty").hidden = entries.length > 0;
document.getElementById("listen-close").addEventListener("click", () => { video.pause(); dialog.close(); });
dialog.addEventListener("cancel", () => video.pause());
dialog.addEventListener("close", () => {
 video.pause(); video.removeAttribute("src"); video.load();
 if (trigger && trigger.isConnected) trigger.focus({preventScroll:true});
 window.scrollTo({top:readingY, behavior:"instant"});
});
video.addEventListener("error", () => { if (dialog.open) error.hidden = false; });
window.addEventListener("pagehide", () => { video.pause(); if (dialog.open) dialog.close(); });
})();
