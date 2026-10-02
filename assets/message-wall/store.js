(() => {
  "use strict";
  // LOCAL MOCK ADAPTER ONLY. A future server must authorize owner reads/writes
  // and enforce public/private access with RLS. Browser IDs are not authentication.
  const KEY = "left-message-wall-local-v1", OWNER_KEY = "left-message-wall-owner-v1";
  let ownerId;
  try {
    ownerId = localStorage.getItem(OWNER_KEY);
    if (!ownerId) { ownerId = crypto.randomUUID(); localStorage.setItem(OWNER_KEY, ownerId); }
  } catch (_) { ownerId = crypto.randomUUID(); }
  function read() {
    try {
      const rows = JSON.parse(localStorage.getItem(KEY) || "[]");
      if (!Array.isArray(rows)) return [];
      return rows.filter(m => m && typeof m.content === "string" && m.content.length <= 500 && ["public","private"].includes(m.visibility) && Number.isFinite(m.x) && Number.isFinite(m.y)).map(m => ({...m, ownerId:m.ownerId || ownerId}));
    } catch (_) { return []; }
  }
  function newest(rows) { return rows.sort((a,b) => (Date.parse(b.createdAt)||0) - (Date.parse(a.createdAt)||0)); }
  window.LEFT_MESSAGE_STORE = Object.freeze({
    listPublic: () => newest(read().filter(m => m.visibility === "public")),
    listMine: () => newest(read().filter(m => m.ownerId === ownerId)),
    listFlowers: () => read().filter(m => m.visibility === "public" || m.ownerId === ownerId).map(({x,y}) => ({x:Math.min(100,Math.max(0,x)),y:Math.min(100,Math.max(0,y))})),
    save: draft => {
      if (!draft.content.trim() || draft.content.length > 500 || !["public","private"].includes(draft.visibility)) throw new Error("Invalid message");
      const message = {...draft, ownerId};
      const rows = read(); rows.push(message);
      // A failed write throws; do not play a success animation or discard the draft.
      localStorage.setItem(KEY, JSON.stringify(rows));
      return message;
    }
  });
})();
