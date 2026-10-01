(() => {
"use strict";
const album=document.getElementById("qijiang-album");
if(!album)return;
const book=album.querySelector(".qa-book");
const {memorySpreads,cover,pages,flipDuration}=window.QIJIANG_ALBUM;
const viewer=document.getElementById("qa-viewer");
const closeButton=viewer.querySelector(".qa-viewer-close");
const motion=matchMedia("(prefers-reduced-motion: reduce)");
let current=0,turning=false,animation=null,finishTurn=null,lastFocus=null;
const paper=index=>index===0?cover:pages;
function el(tag,cls){const n=document.createElement(tag);n.className=cls;return n;}
function itemNode(item,count,slot){
 const button=el("button","qa-item");button.type="button";
 button.setAttribute("aria-label",item.type==="video"?"查看视频":(item.alt||"查看照片"));
 const ratio=item.width/item.height || 1.33;
 // Width is a fraction of the half-page; fit the media's original aspect ratio.
 const maxHeight=count===1?.66:.31;
 const width=Math.min(count===1?.73:.70,maxHeight*(1044/699)*ratio);
 button.style.width=width*100+"%";
 button.style.setProperty("--ratio",String(ratio));
 button.style.setProperty("--rotation",(item.rotation||0)+"deg");
 button.style.left=(count===1?50:slot===0?48:53)+"%";
 button.style.top=(count===1?50:slot===0?29:71)+"%";
 const print=el("span","qa-print");
 let media;
 if(item.type==="video"&&!item.poster){
  media=el("video","");media.src=item.src+"#t=0.1";media.preload="metadata";
  media.muted=true;media.defaultMuted=true;media.playsInline=true;media.controls=false;media.autoplay=false;
  media.setAttribute("aria-hidden","true");
 }else{media=el("img","");media.src=item.type==="video"?item.poster:item.src;media.alt="";media.draggable=false;}
 print.append(media);button.append(print);
 const tape=el("span","qa-tape");tape.dataset.style=item.tapeStyle||"cream";tape.setAttribute("aria-hidden","true");button.append(tape);
 if(item.tapes===2){const t=tape.cloneNode(true);t.classList.add("qa-tape-second");button.append(t);}
 if(item.type==="video"){const mark=el("span","qa-play-mark");mark.textContent="▶";mark.setAttribute("aria-hidden","true");button.append(mark);}
 button.addEventListener("click",event=>{event.stopPropagation();if(!turning)openViewer(item,button);});
 return button;
}
function page(index,side,interactive=true){
 const n=el("div","qa-page qa-"+side);
 const crop=el("div","qa-paper qa-"+side),img=el("img","");
 img.src=paper(index);img.alt="";crop.append(img);n.append(crop);
 if(interactive){
  const zone=el("button","qa-turn-zone");zone.type="button";
  zone.setAttribute("aria-label",side==="left"?"翻到上一组双页":"翻到下一组双页");
  zone.disabled=side==="left"?index===0:index===memorySpreads.length-1;
  zone.addEventListener("click",()=>turn(side==="left"?-1:1));n.append(zone);
 }
 if(index>0)(memorySpreads[index][side]||[]).forEach((item,i,items)=>n.append(itemNode(item,items.length,i)));
 if(!interactive){n.inert=true;n.setAttribute("aria-hidden","true");}
 return n;
}
function render(){
 book.querySelectorAll(".qa-page,.qa-leaf").forEach(n=>n.remove());
 book.append(page(current,"left"),page(current,"right"));
 book.dataset.spread=String(current);
}
function turn(direction){
 const target=current+direction;
 if(turning||viewer.open||target<0||target>=memorySpreads.length)return;
 turning=true;book.classList.add("is-turning");book.setAttribute("aria-busy","true");
 const side=direction>0?"right":"left",opposite=direction>0?"left":"right";
 const front=page(current,side,false),back=page(target,opposite,false);
 const underneath=book.querySelector(".qa-page.qa-"+side);
 underneath.replaceWith(page(target,side));
 const leaf=el("div","qa-leaf "+(direction>0?"forward":"backward"));
 leaf.setAttribute("aria-hidden","true");leaf.inert=true;
 const face=el("div","qa-face"),reverse=el("div","qa-face qa-back");
 face.append(front);reverse.append(back);leaf.append(face,reverse);book.append(leaf);
 let done=false;
 finishTurn=()=>{if(done)return;done=true;current=target;turning=false;book.classList.remove("is-turning");book.removeAttribute("aria-busy");render();animation=null;finishTurn=null;};
 if(motion.matches||!leaf.animate){finishTurn();return;}
 animation=leaf.animate([
  {transform:"rotateY(0deg)","--shade":0},
  {transform:"rotateY("+(-direction*85)+"deg)","--shade":.85,offset:.48},
  {transform:"rotateY("+(-direction*180)+"deg)","--shade":0}
 ],{duration:flipDuration,easing:"cubic-bezier(.35,.05,.25,1)",fill:"forwards"});
 animation.finished.then(()=>finishTurn?.()).catch(()=>finishTurn?.());
}
function openViewer(item,trigger){
 lastFocus=trigger;
 const media=el(item.type==="video"?"video":"img","qa-viewer-media");
 media.src=item.src;
 if(item.type==="video"){media.controls=true;media.playsInline=true;media.preload="metadata";media.autoplay=false;if(item.poster)media.poster=item.poster;}
 else media.alt=item.alt||"相册原图";
 viewer.append(media);viewer.showModal();closeButton.focus();
}
function cleanupViewer(){
 const media=viewer.querySelector(".qa-viewer-media");
 if(media?.tagName==="VIDEO"){media.pause();media.removeAttribute("src");media.load();}
 media?.remove();lastFocus?.focus({preventScroll:true});
}
function closeViewer(){if(viewer.open)viewer.close();}
closeButton.addEventListener("click",closeViewer);
viewer.addEventListener("click",event=>{if(event.target===viewer)closeViewer();});
viewer.addEventListener("close",cleanupViewer);
viewer.addEventListener("cancel",event=>{event.preventDefault();closeViewer();});
album.addEventListener("keydown",event=>{
 if(viewer.open||event.target.closest(".qa-item"))return;
 if(event.key==="ArrowRight"||event.key==="ArrowLeft"){event.preventDefault();turn(event.key==="ArrowRight"?1:-1);}
});
addEventListener("pagehide",()=>{
 if(viewer.open)closeViewer();
 if(animation){animation.cancel();finishTurn?.();}
});
motion.addEventListener("change",()=>{if(motion.matches&&animation){animation.cancel();finishTurn?.();}});
render();
})();