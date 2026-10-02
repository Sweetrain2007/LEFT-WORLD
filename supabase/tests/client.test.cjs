const assert=require('node:assert/strict'),vm=require('node:vm'),fs=require('node:fs'),path=require('node:path');
const source=fs.readFileSync(path.join(__dirname,'../../assets/message-wall/client.js'),'utf8');
let signins=0,session=null,options;
const window={LEFT_SUPABASE_CONFIG:{url:'https://test.invalid',publishableKey:'sb_publishable_test_only'},supabase:{createClient:(url,key,opts)=>{options=opts;return {auth:{getSession:async()=>({data:{session}}),signInAnonymously:async()=>{signins++;session={user:{id:'anonymous-test'}};return {data:{user:session.user}};}}};}}};
vm.runInNewContext(source,{window,navigator:{},atob:s=>Buffer.from(s,'base64').toString()});
(async()=>{const api=window.LEFT_MESSAGE_CLIENT;const ids=await Promise.all([api.identity(),api.identity()]);assert.equal(signins,1);assert.equal(ids.join(','),'anonymous-test,anonymous-test');await api.identity();assert.equal(signins,1);assert.equal(options.auth.persistSession,true);assert.equal(options.auth.autoRefreshToken,true);console.log('PASS: concurrent anonymous initialization is shared; existing session restored, persistence and refresh enabled.');})().catch(e=>{console.error(e);process.exitCode=1;});
