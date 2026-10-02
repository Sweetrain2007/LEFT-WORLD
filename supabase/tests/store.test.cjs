const assert=require('node:assert/strict'),vm=require('node:vm'),fs=require('node:fs'),path=require('node:path');
const source=fs.readFileSync(path.join(__dirname,'../../assets/message-wall/store.js'),'utf8');
let calls=[],response={data:[],error:null},identities=0;
function query(){const q={};for(const name of ['select','eq','order','insert'])q[name]=(...args)=>{calls.push([name,...args]);return q;};for(const name of ['range','limit','single'])q[name]=(...args)=>{calls.push([name,...args]);return Promise.resolve(response);};return q;}
const client={from:table=>{assert.equal(table,'messages');return query();}};
const window={LEFT_MESSAGE_CLIENT:{getClient:()=>client,identity:async()=>{identities++;return 'user-a';}}};
vm.runInNewContext(source,{window});const store=window.LEFT_MESSAGE_STORE;
(async()=>{
 await store.listPublic();assert(calls.some(x=>x[1]==='visibility'&&x[2]==='public'));assert(calls.some(x=>x[1]==='status'&&x[2]==='approved'));assert(!calls.some(x=>x[1]==='author_id'));assert.equal(identities,0);
 calls=[];await store.listMine();assert(calls.some(x=>x[1]==='author_id'&&x[2]==='user-a'));assert(!calls.some(x=>x[1]==='visibility'));
 calls=[];await store.listPublic(2);assert.equal(JSON.stringify(calls.find(x=>x[0]==='range')),JSON.stringify(['range',40,60]));
 calls=[];await store.listFlowers();assert(calls.some(x=>x[0]==='limit'&&x[1]===150));
 response={data:{id:'new',created_at:'2026-10-02T00:00:00Z'},error:null};calls=[];
 await store.save({id:'new',content:'test',visibility:'private',x:20,y:20,status:'approved',author_id:'forged'});
 const payload=calls.find(x=>x[0]==='insert')[1];assert.equal(payload.author_id,'user-a');assert(!('status' in payload));
 window.LEFT_MESSAGE_MODERATION=()=>false;calls=[];await assert.rejects(()=>store.save({content:'blocked',visibility:'public'}));assert.equal(calls.length,0);delete window.LEFT_MESSAGE_MODERATION;
 response={data:null,error:{message:'MESSAGE_BLOCKED'}};await assert.rejects(()=>store.save({id:'x',content:'blocked',visibility:'public',x:20,y:20}),/不允许/);
 console.log('PASS: public/mine query separation, pagination, flower cap, trusted author, no client status, moderation rejection.');
})().catch(e=>{console.error(e);process.exitCode=1;});
