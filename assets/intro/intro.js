(() => {
  "use strict";
  const c = window.LEFT_INTRO_CONFIG;
  const $ = id => document.getElementById(id);
  const intro = $("intro"), computer = $("computer"), screen = $("screen-button");
  const layer = $("media-layer"), flicker = $("flicker-video"), movie = $("intro-video");
  const canvas = $("last-frame"), welcome = $("welcome-screen"), link = $("welcome-link");
  const text = $("welcome-text"), cursor = $("typing-cursor"), retry = $("media-retry");
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  const b = c.screenBounds, size = c.imageSize;


  const order = ["idle","zooming","transitioning","introVideo","welcome","entering"];
  let state = "idle", zoomDone = false, playing = false, fading = false;
  let crossfadeTimer, zoomAnimation, layerAnimation, videoFrame, polling;
  let frameReady = false, typingStarted = false, starting = false;
  let typingTimer, cursorTimer, typedCount = 0;
  const characters = Array.from(c.welcomeText);
  link.setAttribute("aria-label", c.welcomeText + "，进入主页");
  let fadeAnimations = [];
  function setState(next) {
    if (order.indexOf(next) !== order.indexOf(state) + 1) return false;
    state = next;
    document.body.dataset.introState = state;
    return true;
  }
  document.body.dataset.introState = state;
  computer.style.setProperty("--screen-left", b.x / size.width * 100 + "%");
  computer.style.setProperty("--screen-top", b.y / size.height * 100 + "%");
  computer.style.setProperty("--screen-width", b.width / size.width * 100 + "%");
  computer.style.setProperty("--screen-height", b.height / size.height * 100 + "%");
  flicker.muted = movie.muted = true;
  flicker.src = c.flickerVideo;
  movie.src = c.introVideo;
  movie.loop = false;
  function place(rect) {
    Object.assign(layer.style,{left:rect.left+"px",top:rect.top+"px",width:rect.width+"px",height:rect.height+"px"});
  }
  function screenRect() { return screen.getBoundingClientRect(); }
  function finishZoom() {
    if (zoomDone || state === "idle") return;
    zoomDone = true;
    if (zoomAnimation) zoomAnimation.cancel();
    if (layerAnimation) layerAnimation.cancel();
    intro.hidden = true;
    place({left:0,top:0,width:innerWidth,height:innerHeight});
  }
  function keepFrame() {
    if (movie.readyState < 2 || !movie.videoWidth) return;
    if (canvas.width !== movie.videoWidth) canvas.width = movie.videoWidth;
    if (canvas.height !== movie.videoHeight) canvas.height = movie.videoHeight;
    canvas.getContext("2d").drawImage(movie,0,0,canvas.width,canvas.height);
    frameReady = true;
  }
  function checkTypingTime() {
    if (state === "introVideo" && movie.currentTime >= c.typingStartTime) {
      setState("welcome");
      startTyping();
    }
  }
  function trackFrames() {
    if (movie.requestVideoFrameCallback) {
      videoFrame = movie.requestVideoFrameCallback(() => {
        keepFrame();
        checkTypingTime();
        if (!movie.ended && state !== "entering") trackFrames();
      });
    } else {
      polling = requestAnimationFrame(() => {
        keepFrame();
        checkTypingTime();
        if (!movie.ended && state !== "entering") trackFrames();
      });
    }
  }
  function finishTyping() {
    link.classList.add("is-ready");
    link.removeAttribute("aria-disabled");
    link.tabIndex = 0;
    cursorTimer = setTimeout(() => { cursor.hidden = true; }, c.cursorHoldDuration);
    link.focus({preventScroll:true});
  }
  function typeNext() {
    if (state !== "welcome" || document.hidden) return;
    typedCount++;
    text.textContent = characters.slice(0, typedCount).join("");
    if (typedCount < characters.length) typingTimer = setTimeout(typeNext, c.typingSpeed);
    else finishTyping();
  }
  function startTyping() {
    if (typingStarted || state !== "welcome") return;
    typingStarted = true;
    welcome.hidden = false;
    link.style.opacity = "1";
    link.setAttribute("aria-disabled", "true");
    cursor.hidden = false;
    typeNext();
  }
  function movieReady() {
    if (state !== "transitioning" || fading) return;
    fading = true;
    const duration = reduced.matches ? 0 : c.crossfadeDuration;
    // Reveal the decoded movie, not an empty video element; retain flicker until ready.
    fadeAnimations = [
      movie.animate([{opacity:0},{opacity:1}],{duration,easing:"ease-in-out",fill:"forwards"}),
      flicker.animate([{opacity:1},{opacity:0}],{duration,easing:"ease-in-out",fill:"forwards"})
    ];
    trackFrames();
    Promise.all(fadeAnimations.map(a=>a.finished)).then(() => {
      flicker.pause();
      movie.style.opacity = "1";
      flicker.style.opacity = "0";
      fadeAnimations.forEach(a=>a.cancel());
      fadeAnimations = [];
      setState("introVideo");
      checkTypingTime();
    }).catch(() => {});
  }
  async function startMovie() {
    if (state === "zooming") setState("transitioning");
    if (state !== "transitioning" || playing || starting) return;
    starting = true;
    try {
      await movie.play();
      playing = true;
      retry.hidden = true;
      // 'playing' means data is available; wait for an actual decoded frame if supported.
      if (movie.requestVideoFrameCallback) movie.requestVideoFrameCallback(movieReady);
      else movieReady();
    } catch (_) {
      retry.textContent = "继续播放";
      retry.hidden = false;
    } finally { starting = false; }
  }
  screen.addEventListener("click", () => {
    if (!setState("zooming")) return;
    screen.disabled = true;
    const rect = screenRect(), model = computer.getBoundingClientRect();
    const scale = Math.max(innerWidth/rect.width,innerHeight/rect.height);
    const tx=innerWidth/2-model.left-(rect.left-model.left+rect.width/2)*scale;
    const ty=innerHeight/2-model.top-(rect.top-model.top+rect.height/2)*scale;
    if (reduced.matches) { finishZoom(); startMovie(); return; }
    zoomAnimation=computer.animate([{transform:"translate(0,0) scale(1)"},
      {transform:"translate("+tx+"px,"+ty+"px) scale("+scale+")"}],
      {duration:c.zoomDuration,easing:"cubic-bezier(.4,0,.2,1)",fill:"forwards"});
    const frames=[];
    for(let n=0;n<=60;n++){
      const t=n/60,s=1+(scale-1)*t;
      const cx=rect.left+rect.width/2+(innerWidth/2-rect.left-rect.width/2)*t;
      const cy=rect.top+rect.height/2+(innerHeight/2-rect.top-rect.height/2)*t;
      const left=Math.max(0,cx-rect.width*s/2),top=Math.max(0,cy-rect.height*s/2);
      frames.push({offset:t,left:left+"px",top:top+"px",
        width:(Math.min(innerWidth,cx+rect.width*s/2)-left)+"px",
        height:(Math.min(innerHeight,cy+rect.height*s/2)-top)+"px"});
    }
    layerAnimation=layer.animate(frames,{duration:c.zoomDuration,easing:"cubic-bezier(.4,0,.2,1)",fill:"forwards"});
    crossfadeTimer=setTimeout(startMovie,c.crossfadeStart);
    zoomAnimation.finished.then(finishZoom).catch(()=>{});
  });
  movie.addEventListener("timeupdate",checkTypingTime);
  movie.addEventListener("ended",()=>{
    keepFrame();
    if(frameReady) canvas.hidden=false;
    checkTypingTime();

    // Preserve the final video frame. Typing continues; there is no automatic navigation.
  });
  movie.addEventListener("error",()=>{
    if(state==="idle") return;
    retry.textContent="视频加载失败，点击重试";retry.hidden=false;
  });
  retry.addEventListener("click",()=>{

    if(state==="idle"){flicker.play().then(()=>retry.hidden=true).catch(()=>{});return;}
    if(movie.error){movie.load();playing=false;}
    startMovie();
  });
  link.addEventListener("click",async event=>{
    if(event.button!==0||event.ctrlKey||event.metaKey||event.shiftKey||event.altKey)return;
    event.preventDefault();
    if(state!=="welcome"||!link.classList.contains("is-ready"))return;
    setState("entering");
    movie.pause();
    keepFrame();
    if(frameReady)canvas.hidden=false;
    if(!reduced.matches){
      await link.animate([{opacity:1},{opacity:0}],{duration:180,fill:"forwards"}).finished;
      await layer.animate([{opacity:1},{opacity:0}],{duration:260,fill:"forwards"}).finished;
    }
    location.assign(link.href);
  });
  function resize(){
    if(state==="idle")place(screenRect());
    else {finishZoom();place({left:0,top:0,width:innerWidth,height:innerHeight});}
  }
  window.addEventListener("resize",resize);
  reduced.addEventListener("change",()=>{
    if(reduced.matches&&state==="zooming"){
      finishZoom();clearTimeout(crossfadeTimer);startMovie();
    }

  });
  document.addEventListener("visibilitychange", () => {
    clearTimeout(typingTimer);
    if (!document.hidden && state === "welcome" && typingStarted && typedCount < characters.length) {
      typingTimer = setTimeout(typeNext,c.typingSpeed);
    }
  });
  window.addEventListener("pagehide",()=>{
    clearTimeout(crossfadeTimer);clearTimeout(typingTimer);clearTimeout(cursorTimer);flicker.pause();movie.pause();
    if(videoFrame&&movie.cancelVideoFrameCallback)movie.cancelVideoFrameCallback(videoFrame);
    cancelAnimationFrame(polling);
  });
  window.addEventListener("pageshow",event=>{
    if(!event.persisted)return;
    if (typingStarted && typedCount < characters.length) typingTimer = setTimeout(typeNext,c.typingSpeed);
    else if (typingStarted) cursor.hidden = true;
    resize();
    if(state==="idle")flicker.play().catch(()=>{});
    else if(state==="entering"){
      state="welcome";document.body.dataset.introState=state;
      link.getAnimations().forEach(a=>a.cancel());layer.getAnimations().forEach(a=>a.cancel());
    }else if(state==="zooming"||state==="transitioning"){
      playing=false;startMovie();
    }else if(!movie.ended){
      movie.play().then(trackFrames).catch(()=>{retry.hidden=false;});
    }
  });
  place(screenRect());
  flicker.play().catch(()=>{retry.textContent="播放屏幕频闪";retry.hidden=false;});
})();