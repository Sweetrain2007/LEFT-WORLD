(() => {
  "use strict";
  const FLOWER_ASSET = "assets/message-wall/forget-me-not.png";
  const store = window.LEFT_MESSAGE_STORE;
  const dialog = document.getElementById("note-dialog"), form = document.getElementById("note-form");
  const text = document.getElementById("note-text"), sky = document.getElementById("sky");
  const reader = document.getElementById("read-dialog"), status = document.getElementById("wall-status");
  const write = document.getElementById("write-message");
  let state = "idle";
  function setState(next) { state = next; document.body.dataset.state = next; }
  function remaining() { document.getElementById("remaining").textContent = `还可写 ${500 - text.value.length} 字`; }
  function openNote() { if (state === "sending") return; setState("writing"); dialog.showModal(); }
  function closeNote() { if (state === "sending") return; dialog.close(); setState("idle"); write.focus(); }
  function addFlower(message) {
    const button = document.createElement("button"); button.type = "button"; button.className = "sky-flower";
    button.style.left = message.x + "%"; button.style.top = message.y + "%";
    button.setAttribute("aria-label", "PUBLIC MESSAGES · 查看公开留言");
    const image = document.createElement("img"); image.src = FLOWER_ASSET; image.alt = ""; button.append(image);
    button.addEventListener("click", () => openCollection("public"));
    sky.append(button);
  }
  function openCollection(kind) {
    const mine = kind === "mine";
    document.getElementById("read-title").textContent = mine ? "MY MESSAGES" : "PUBLIC MESSAGES";
    document.getElementById("collection-note").textContent = mine
      ? "当前浏览器身份的留言 · PUBLIC + ONLY ME"
      : "公开留言 · 当前仅预览本地记录，尚未连接所有访客的留言。";
    const list = document.getElementById("message-collection"); list.replaceChildren();
    const rows = mine ? store.listMine() : store.listPublic();
    if (!rows.length) {
      const empty = document.createElement("p"); empty.className = "collection-empty";
      empty.textContent = mine ? "还没有写下留言。愿下一朵勿忘我来自你。" : "这里还没有公开留言。";
      list.append(empty);
    }
    rows.forEach(message => {
      const paper = document.createElement("article"); paper.className = "collection-letter";
      const body = document.createElement("p"); body.textContent = message.content;
      const meta = document.createElement("div"); meta.className = "letter-meta";
      const date = document.createElement("time");
      if (Number.isFinite(Date.parse(message.createdAt))) {
        date.dateTime = message.createdAt; date.textContent = new Date(message.createdAt).toLocaleDateString("zh-CN");
      }
      const scope = document.createElement("span"); scope.textContent = message.visibility === "public" ? "PUBLIC" : "ONLY ME";
      meta.append(date,scope); paper.append(body,meta); list.append(paper);
    });
    reader.showModal(); reader.scrollTop = 0;
  }
  store.listFlowers().forEach(addFlower);
  document.getElementById("my-messages").addEventListener("click", () => openCollection("mine"));
  text.addEventListener("input", () => { text.setCustomValidity(""); remaining(); });
  write.addEventListener("click", openNote);
  document.getElementById("close-note").addEventListener("click", closeNote);
  dialog.addEventListener("cancel", event => { event.preventDefault(); closeNote(); });
  document.getElementById("close-read").addEventListener("click", () => reader.close());
  form.addEventListener("submit", async event => {
    event.preventDefault(); if (state === "sending") return;
    if (!text.value.trim()) { text.setCustomValidity("请先写下想对 LEFT 说的话。"); text.reportValidity(); return; }
    const message = {id: crypto.randomUUID(), content:text.value, visibility:new FormData(form).get("visibility"), form:"flower", createdAt:new Date().toISOString(), x:8 + Math.random()*84, y:10 + Math.random()*76};
    try { store.save(message); } catch (_) {
      text.setCustomValidity("未能保存留言，请检查浏览器存储后重试。你的文字仍在这里。"); text.reportValidity(); return;
    }
    setState("sending"); write.disabled = true;
    form.querySelectorAll("button,input,textarea").forEach(el => {el.disabled = true;});
    const rect = form.getBoundingClientRect();
    const flower = document.createElement("img"); flower.src = FLOWER_ASSET; flower.alt = ""; flower.className = "flower-flight";
    flower.style.left = rect.left + rect.width/2 - 70 + "px"; flower.style.top = rect.top + rect.height/2 - 70 + "px";
    // The dialog top layer keeps the flower above the paper during the flight.
    dialog.append(flower);
    const target = sky.getBoundingClientRect();
    const dx = target.left + target.width*message.x/100 - (rect.left + rect.width/2);
    const dy = target.top + target.height*message.y/100 - (rect.top + rect.height/2);
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const duration = reduced ? 250 : 3200;
    const opts = {duration, fill:"forwards", easing:"cubic-bezier(.22,.61,.36,1)"};
    const ui = form.querySelector(".paper-ui").animate([{opacity:1},{opacity:0,offset:.22},{opacity:0}],opts);
    const paper = form.animate([{transform:"translateY(0) scale(1)",opacity:1},{transform:"translateY(-16px) scale(.95)",opacity:1,offset:.18},{transform:"translateY(-26px) scale(.3,.2)",opacity:0,offset:.43},{transform:"translateY(-26px) scale(.3,.2)",opacity:0}],opts);
    const flight = flower.animate(reduced ? [{opacity:0,transform:`translate(${dx}px,${dy}px) scale(.086)`},{opacity:1,transform:`translate(${dx}px,${dy}px) scale(.086)`}] : [{opacity:0,transform:"translate(0,-26px) scale(.25)",offset:0},{opacity:0,transform:"translate(0,-26px) scale(.4)",offset:.24},{opacity:1,transform:"translate(0,-26px) scale(1)",offset:.43},{opacity:1,transform:"translate(0,-30px) scale(1)",offset:.52},{opacity:1,transform:`translate(${dx}px,${dy}px) scale(.086)`,offset:1}],opts);
    await flight.finished;
    addFlower(message); dialog.close(); flower.remove(); ui.cancel(); paper.cancel();
    form.reset(); remaining(); form.querySelectorAll("button,input,textarea").forEach(el => {el.disabled = false;});
    write.disabled = false; setState("idle"); write.focus();
    status.textContent = "勿忘我已留在夜空。小花通往公开留言，MY MESSAGES 收藏你的文字。";
  });
  openNote();
})();
