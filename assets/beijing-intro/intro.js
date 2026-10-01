(() => {
 const title=document.querySelector('.bj-intro-title'), artwork=title.querySelector('img');
 const background=new Image();background.src='assets/beijing-intro/flowers.jpg';
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');let leaving=false;
 const loaded=image=>image.complete?Promise.resolve():new Promise(resolve=>{image.addEventListener('load',resolve,{once:true});image.addEventListener('error',resolve,{once:true});});
 Promise.all([loaded(background),loaded(artwork)]).then(()=>requestAnimationFrame(()=>document.body.classList.add('is-ready')));
 title.addEventListener('animationend',event=>{if(event.animationName==='bj-title-arrive'){title.removeAttribute('aria-disabled');title.removeAttribute('tabindex');}});
 title.addEventListener('click',event=>{event.preventDefault();if(leaving||title.getAttribute('aria-disabled')==='true')return;leaving=true;document.body.classList.add('is-leaving');setTimeout(()=>location.assign(title.href),reduced.matches?150:750);});
 addEventListener('pageshow',event=>{if(event.persisted){leaving=false;document.body.classList.remove('is-leaving');}});
})();
