(() => {
  "use strict";
  const api = window.LEFT_MESSAGE_CLIENT;
  const fields = "id,content,visibility,status,created_at,x,y";
  const pageSize = 20;
  const map = row => ({...row,createdAt:row.created_at});
  function check(error) {
    if (!error) return;
    if (error.message?.includes("MESSAGE_BLOCKED")) throw new Error("留言包含暂不允许发布的词语，请修改后重试。");
    throw new Error("留言服务暂时不可用，请稍后重试。未发送的文字会保留。");
  }
  async function list(kind,page=0) {
    const client = api.getClient();
    let query = client.from("messages").select(fields);
    if (kind === "mine") query = query.eq("author_id",await api.identity());
    else query = query.eq("visibility","public").eq("status","approved");
    const start = Math.max(0,Math.floor(page))*pageSize;
    const {data,error} = await query.order("created_at",{ascending:false}).order("id",{ascending:false}).range(start,start+pageSize);
    check(error);
    return {rows:data.slice(0,pageSize).map(map),hasMore:data.length>pageSize};
  }
  window.LEFT_MESSAGE_STORE = Object.freeze({
    init: () => api.identity(),
    listPublic: page => list("public",page),
    listMine: page => list("mine",page),
    listFlowers: async () => {
      const {data,error} = await api.getClient().from("messages").select("id,x,y").eq("visibility","public").eq("status","approved").order("created_at",{ascending:false}).order("id",{ascending:false}).limit(150);
      check(error); return data;
    },
    save: async draft => {
      if (!draft.content.trim() || draft.content.length>500 || !["public","private"].includes(draft.visibility)) throw new Error("请填写 1–500 字留言。");
      // Optional existing frontend moderation hook; database trigger is authoritative.
      if (window.LEFT_MESSAGE_MODERATION && !(await window.LEFT_MESSAGE_MODERATION(draft.content))) throw new Error("请修改留言内容后重试。");
      const author_id = await api.identity();
      const client = api.getClient();
      const payload = {id:draft.id,author_id,content:draft.content,visibility:draft.visibility,x:draft.x,y:draft.y};
      const {data,error} = await client.from("messages").insert(payload).select(fields).single();
      // Retry after an uncertain network response: confirm the same owner's stored ID.
      if (error?.code === "23505") {
        const existing = await client.from("messages").select(fields).eq("id",draft.id).eq("author_id",author_id).single();
        check(existing.error); return map(existing.data);
      }
      check(error); return map(data);
    }
  });
})();
