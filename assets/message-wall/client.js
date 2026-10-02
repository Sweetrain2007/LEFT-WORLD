(() => {
  "use strict";
  let client, pendingIdentity;
  function getClient() {
    if (client) return client;
    const config = window.LEFT_SUPABASE_CONFIG || {};
    if (!config.url || !config.publishableKey) throw new Error("留言服务尚未配置，请稍后再试。文字会保留。");
    if (!/^https:\/\//.test(config.url)) throw new Error("留言服务配置有误。");
    let publicKey = config.publishableKey.startsWith("sb_publishable_");
    if (!publicKey) {
      try { const part = config.publishableKey.split(".")[1]; publicKey = JSON.parse(atob(part.replace(/-/g,"+").replace(/_/g,"/"))).role === "anon"; } catch (_) {}
    }
    if (!publicKey) throw new Error("请使用 Supabase 公开客户端 key。");
    if (!window.supabase?.createClient) throw new Error("留言服务未能加载，请刷新后重试。文字会保留。");
    client = window.supabase.createClient(config.url, config.publishableKey, {
      auth: {persistSession:true, autoRefreshToken:true, detectSessionInUrl:false}
    });
    return client;
  }
  async function identity() {
    if (pendingIdentity) return pendingIdentity;
    const restore = async () => {
      const api = getClient();
      const {data,error} = await api.auth.getSession();
      if (error) throw new Error("无法恢复留言身份，请稍后重试。");
      if (data.session) return data.session.user.id;
      const result = await api.auth.signInAnonymously();
      if (result.error || !result.data.user) throw new Error("暂时无法建立留言身份，请稍后重试。");
      return result.data.user.id;
    };
    // A separate cross-tab lock avoids creating two anonymous users on first visit.
    pendingIdentity = (navigator.locks ? navigator.locks.request("left-wall-identity", restore) : restore());
    try { return await pendingIdentity; } finally { pendingIdentity = null; }
  }
  window.LEFT_MESSAGE_CLIENT = {getClient, identity};
})();
