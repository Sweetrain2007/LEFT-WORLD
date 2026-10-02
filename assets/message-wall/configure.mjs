// Run manually; no automatic deployment or build configuration changes.
import {writeFile} from "node:fs/promises";
const url = process.env.SUPABASE_URL, publishableKey = process.env.SUPABASE_PUBLISHABLE_KEY;
if (!url || !publishableKey || !url.startsWith("https://")) throw new Error("Set SUPABASE_URL and SUPABASE_PUBLISHABLE_KEY");
let valid = publishableKey.startsWith("sb_publishable_");
try { valid ||= JSON.parse(Buffer.from(publishableKey.split(".")[1],"base64url").toString()).role === "anon"; } catch {}
if (!valid) throw new Error("Only publishable/anon public keys are permitted");
await writeFile(new URL("supabase-config.js",import.meta.url),"window.LEFT_SUPABASE_CONFIG = "+JSON.stringify({url,publishableKey})+";\n");
console.log("Public configuration written. No deployment performed.");
