(() => {
  "use strict";
  const c = window.LEFT_INTRO_CONFIG;
  const $ = id => document.getElementById(id);
  const intro = $("intro"), computer = $("computer"), screen = $("screen-button");
  const layer = $("media-layer"), flicker = $("flicker-video"), movie = $("intro-video");
  const canvas = $("last-frame"), welcome = $("welcome-screen"), link = $("welcome-link");
  const text = $("welcome-text"), cursor = $("typing-cursor");
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  const b = c.screenBounds, size = c.imageSize;


  const order = ["idle","zooming","transitioning","introVideo","welcome","entering"];
  let state = "idle", zoomDone = false, fading = false;
  let crossfadeTimer, zoomAnimation, layerAnimation, videoFrame, polling;
  let frameReady = false, typingStarted = false;
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

  let autoplayAllowed = false, staticMode = false, watchdog, staticTimer;
  let moviePlaying = false, tracking = false, progressTime = -1;
  let moviePrimed = false, movieStarted = false;
  function prepare(video) {
    video.muted = true; video.defaultMuted = true; video.playsInline = true;
    video.controls = false; video.disablePictureInPicture = true;
    video.setAttribute("muted", "");
    video.setAttribute("playsinline", "");
    video.setAttribute("webkit-playsinline", "");
  }
  function play(video, onFailure) {
    prepare(video);
    try {
      const promise = video.play();
      if (promise && typeof promise.then === "function") promise.then(() => {
        if(video === flicker && state === "idle") {
          autoplayAllowed = true;
          document.body.dataset.autoplayAllowed = "true";
        }
      }).catch(error => {
        // Pausing the initial gesture-authorized playback can abort its pending promise.
        if(video === movie && moviePrimed && !movieStarted && error.name === "AbortError")return;
        if(!document.hidden)onFailure(error);
      });
    } catch(error) {onFailure(error);}
  }
  function stopTracking() {
    tracking = false;
    if(videoFrame != null && movie.cancelVideoFrameCallback)movie.cancelVideoFrameCallback(videoFrame);
    cancelAnimationFrame(polling);
  }
  function armWatchdog() {
    clearTimeout(watchdog);
    if(!document.hidden && !staticMode && !movie.ended && state !== "idle" && state !== "entering")
      watchdog = setTimeout(useStatic,c.mediaTimeout);
  }
  function staticWelcome() {
    if(document.hidden || !staticMode || state !== "introVideo")return;
    setState("welcome");startTyping();
  }
  function useStatic() {
    if(staticMode || state === "idle" || state === "entering")return;
    staticMode = true;
    document.body.dataset.playbackMode = "static-fallback";
    clearTimeout(watchdog); stopTracking();
    fadeAnimations.forEach(a=>a.cancel());fadeAnimations=[];
    flicker.pause();movie.pause();
    flicker.style.opacity = movie.style.opacity = "0";
    flicker.style.visibility = movie.style.visibility = "hidden";
    if(frameReady)canvas.hidden=false;
    if(state === "transitioning")setState("introVideo");
    if(state === "introVideo")staticTimer=setTimeout(staticWelcome,c.typingStartTime*1000);
  }
  function autoRejected() {
    autoplayAllowed = false;
    document.body.dataset.autoplayAllowed = "false";
    if(state !== "idle")return;
    flicker.style.opacity="0";flicker.style.visibility="hidden";
    document.body.dataset.playbackMode="gesture-fallback";
  }
  prepare(flicker);prepare(movie);
  $("screen-fallback").src=c.screenFallback;
  flicker.poster=movie.poster=c.screenFallback;
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
    try { canvas.getContext("2d").drawImage(movie,0,0,canvas.width,canvas.height); frameReady = true; } catch (_) {}
  }
  function checkTypingTime() {
    if (state === "introVideo" && movie.currentTime >= c.typingStartTime) {
      setState("welcome");
      startTyping();
    }
  }
  function trackFrames() {
    if(tracking)return;
    tracking=true;
    function frame() {
      if(!tracking)return;
      keepFrame();checkTypingTime();
      if(movie.ended || movie.paused || state === "entering"){tracking=false;return;}
      if(movie.requestVideoFrameCallback)videoFrame=movie.requestVideoFrameCallback(frame);
      else polling=requestAnimationFrame(frame);
    }
    frame();
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
    if (document.hidden || state !== "transitioning" || fading || staticMode || !moviePlaying || !moviePrimed || movie.seeking || movie.readyState < 2) return;
    fading = true;
    movie.style.visibility = "visible";
    const duration = reduced.matches ? 0 : c.crossfadeDuration;
    // Dissolve to the paused first frame. Advance the movie only once it is fully visible.
    fadeAnimations = [
      movie.animate([{opacity:0},{opacity:1}],{duration,easing:"ease-in-out",fill:"forwards"}),
      flicker.animate([{opacity:flicker.style.opacity || "0"},{opacity:0}],{duration,easing:"ease-in-out",fill:"forwards"})
    ];
    Promise.all(fadeAnimations.map(a=>a.finished)).then(() => {
      if(staticMode)return;
      flicker.pause();
      movie.style.opacity = "1";
      flicker.style.opacity = "0";
      fadeAnimations.forEach(a=>a.cancel());
      fadeAnimations = [];
      setState("introVideo");
      movieStarted = true;
      progressTime = -1;
      if(!document.hidden){play(movie,useStatic);armWatchdog();}

    }).catch(() => {});
  }
  function startMovie() {
    if(state === "zooming")setState("transitioning");
    if(state !== "transitioning")return;
    if(staticMode) {
      setState("introVideo");
      staticTimer=setTimeout(staticWelcome,c.typingStartTime*1000);
    } else {movieReady();armWatchdog();}
  }
  function begin(event) {
    if(event.type === "pointerup" && (event.button !== 0 || event.isPrimary === false))return;
    if(!setState("zooming"))return;
    screen.disabled=true;
    // Synchronous calls within the screen gesture, before any timer or await.
    play(flicker,()=>{});
    play(movie,useStatic);
    armWatchdog();
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
  }
  screen.addEventListener("pointerup",begin);
  screen.addEventListener("click",begin);
  flicker.addEventListener("playing",()=>{
    if(staticMode || fading || !["idle","zooming","transitioning"].includes(state))return;
    if(state === "idle"){autoplayAllowed=true;document.body.dataset.autoplayAllowed="true";}
    flicker.style.visibility="visible";flicker.style.opacity="1";
    document.body.dataset.playbackMode=state === "idle" ? "autoplay" : (autoplayAllowed ? "autoplay" : "user-gesture");
  });
  flicker.addEventListener("error",()=>{
    flicker.style.visibility="hidden";flicker.style.opacity="0";
    if(state === "idle")document.body.dataset.playbackMode="gesture-fallback";
  });
  movie.addEventListener("playing",()=>{
    if(state === "idle" || state === "entering" || staticMode){movie.pause();return;}
    moviePlaying=true;
    if(!moviePrimed) {
      // Acquire permission in the click, then hold frame zero throughout zoom/crossfade.
      moviePrimed=true;
      movie.pause();
      stopTracking();
      try {movie.currentTime=0;} catch (_) {useStatic();return;}
      movieReady();
      return;
    }
    document.body.dataset.playbackMode=autoplayAllowed ? "autoplay" : "user-gesture";
    if(state === "introVideo" || state === "welcome"){movie.style.visibility="visible";movie.style.opacity="1";canvas.hidden=true;}
    armWatchdog();movieReady();trackFrames();
  });
  movie.addEventListener("seeked",movieReady);
  movie.addEventListener("loadeddata",movieReady);
  movie.addEventListener("timeupdate",()=>{
    checkTypingTime();
    if(movie.currentTime > progressTime){progressTime=movie.currentTime;armWatchdog();}
  });
  movie.addEventListener("ended",()=>{
    clearTimeout(watchdog);stopTracking();
    keepFrame();
    if(frameReady) canvas.hidden=false;
    checkTypingTime();

    if(state === "introVideo"){setState("welcome");startTyping();}
    // Preserve the final video frame. Typing continues; there is no automatic navigation.
  });
  movie.addEventListener("error",useStatic);
  link.addEventListener("click",async event=>{
    if(event.button!==0||event.ctrlKey||event.metaKey||event.shiftKey||event.altKey)return;
    event.preventDefault();
    if(state!=="welcome"||!link.classList.contains("is-ready"))return;
    setState("entering");clearTimeout(watchdog);
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
  function resume() {
    if(document.hidden)return;
    clearTimeout(typingTimer);
    if(typingStarted && typedCount < characters.length)typingTimer=setTimeout(typeNext,c.typingSpeed);
    else if(typingStarted)cursor.hidden=true;
    if(staticMode){clearTimeout(staticTimer);staticTimer=setTimeout(staticWelcome,0);return;}
    if(state === "idle")play(flicker,autoRejected);
    else if(!movieStarted && moviePrimed) {
      if(state === "zooming")play(flicker,()=>{});
      movieReady();armWatchdog();
    }
    else if(state !== "entering" && !movie.ended){play(movie,useStatic);armWatchdog();}
  }
  function suspend() {
    clearTimeout(typingTimer);clearTimeout(watchdog);
    stopTracking();
    if(fading && !staticMode){keepFrame();if(frameReady)canvas.hidden=false;}
    flicker.style.visibility="hidden";movie.style.visibility="hidden";
    flicker.pause();movie.pause();
  }
  document.addEventListener("visibilitychange",()=>{if(document.hidden)suspend();else resume();});
  window.addEventListener("pagehide",()=>{suspend();clearTimeout(cursorTimer);});
  window.addEventListener("pageshow",event=>{
    if(!event.persisted)return;
    if(state === "entering"){
      state="welcome";document.body.dataset.introState=state;
      link.getAnimations().forEach(a=>a.cancel());layer.getAnimations().forEach(a=>a.cancel());
    }
    resize();resume();
  });
  place(screenRect());
  play(flicker,autoRejected);
})();
