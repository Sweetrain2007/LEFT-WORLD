(() => {
"use strict";
const stage=document.getElementById("log-intro"), prompt=document.getElementById("memory-prompt");
const video=document.getElementById("memory-video"), play=document.getElementById("memory-play");
const skip=document.getElementById("memory-skip"), error=document.getElementById("memory-error");
const content=document.getElementById("log-content"), config=window.LEFT_LOG_INTRO;
let state="prompt", token=0, timer;
video.src=config.video;
function stop(){video.pause();}
function showError(){
 if(state!=="playing")return;
 token++;stop();state="prompt";stage.dataset.state=state;
 prompt.hidden=false;error.hidden=false;play.disabled=false;play.focus();
}
function finish(immediate=false){
 if(state==="leaving"||state==="done")return;
 state="leaving";token++;stop();stage.dataset.state=state;
 content.hidden=false;content.inert=true;content.classList.add("log-revealing");
 const duration=immediate?0:matchMedia("(prefers-reduced-motion: reduce)").matches?120:config.fadeDuration;
 clearTimeout(timer);
 timer=setTimeout(()=>{
  state="done";stage.hidden=true;content.inert=false;
  content.querySelector("a").focus({preventScroll:true});
 },duration);
}
play.addEventListener("click",()=>{
 if(state!=="prompt")return;
 state="playing";const attempt=++token;
 error.hidden=true;play.disabled=true;
 video.muted=false;video.defaultMuted=false;video.volume=1;video.playsInline=true;
 try { video.currentTime=0; } catch (_) {}
 // play() is called synchronously in the click gesture, before any await or timer.
 try{
  const promise=video.play();
  stage.dataset.state=state;
  if(promise)promise.catch(()=>{if(token===attempt)showError();});
 }catch(_){showError();}
});
video.addEventListener("playing",()=>{if(state==="playing")stage.classList.add("has-picture");});
video.addEventListener("error",showError);
video.addEventListener("ended",()=>finish());
skip.addEventListener("click",()=>finish());
document.getElementById("memory-skip-prompt").addEventListener("click",()=>finish());
window.addEventListener("pagehide",()=>{token++;stop();clearTimeout(timer);});
window.addEventListener("pageshow",event=>{
 if(!event.persisted)return;
 token++;stop();state="prompt";stage.hidden=false;stage.dataset.state=state;
 stage.classList.remove("has-picture");prompt.hidden=false;play.disabled=false;error.hidden=true;
 content.hidden=true;content.inert=true;content.classList.remove("log-revealing");
});
// Leaving the tab never restarts the movie. The user can always skip or retry.
})();