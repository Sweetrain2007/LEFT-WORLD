/* One-shot CRT transition; no changes to chat message state. */
(() => {
"use strict";
const key="left-crt-route-entry", root=document.documentElement;
const reduced=()=>matchMedia("(prefers-reduced-motion: reduce)").matches;
let leaving=false,timer;
function clean(){
 clearTimeout(timer);leaving=false;
 root.classList.remove("crt-route-pending","crt-route-boot");
 document.querySelectorAll(".crt-transition-overlay").forEach(n=>n.remove());
}
function overlay(mode){
 const n=document.createElement("div");n.className="crt-transition-overlay "+mode;
 n.setAttribute("aria-hidden","true");
 n.innerHTML='<i class="crt-boot-line"></i><i class="crt-boot-noise"></i>';
 document.body.append(n);return n;
}
addEventListener("pageshow",e=>{if(e.persisted)clean();});
if(/\/route\.html$/.test(location.pathname)){
 let entry=null;
 try{entry=JSON.parse(sessionStorage.getItem(key));sessionStorage.removeItem(key);}catch(_){}
 const nav=performance.getEntriesByType("navigation")[0],age=Date.now()-(entry?.time||0);
 if(!entry||age<0||age>15000||(nav&&nav.type!=="navigate"))return;
 root.classList.add("crt-route-pending");
 // Consume token before rendering: refresh and history restoration do not replay.
 document.addEventListener("DOMContentLoaded",async()=>{
  const img=document.querySelector(".crt-image"),veil=overlay("crt-arriving");
  if(img&&typeof img.decode==="function")
   await Promise.race([img.decode().catch(()=>{}),new Promise(r=>setTimeout(r,1500))]);
  root.classList.remove("crt-route-pending");root.classList.add("crt-route-boot");
  veil.classList.add("is-running");timer=setTimeout(clean,reduced()?160:650);
 },{once:true});
 return;
}
if(!/\/home\.html$/.test(location.pathname))return;
document.addEventListener("click",e=>{
 const link=e.target.closest?.("a.share-message");
 if(!link||e.defaultPrevented||e.button!==0||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||link.target==="_blank")return;
 const target=new URL(link.href,location.href);
 if(target.origin!==location.origin||!/\/route\.html$/.test(target.pathname))return;
 e.preventDefault();if(leaving)return;leaving=true;
 overlay("crt-departing");
 const image=new Image();image.src="assets/location/crt-computer-clean.png";
 timer=setTimeout(()=>{
  try{sessionStorage.setItem(key,JSON.stringify({time:Date.now()}));}catch(_){}
  location.assign(target.href);
 },reduced()?120:550);
});
})();