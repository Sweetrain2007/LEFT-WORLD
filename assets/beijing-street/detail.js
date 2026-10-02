(() => {
  "use strict";
  const stage = beijingStages.find(s => s.id === new URLSearchParams(location.search).get("id"));
  if (!stage) return;
  document.title = stage.title + " | LEFT’s World";
  const root = document.getElementById("stage-content");
  const poster = document.createElement("img");
  poster.className = "stage-poster"; poster.src = stage.poster; poster.alt = stage.title + "海报";
  const links = document.createElement("nav"); links.className = "stage-videos"; links.setAttribute("aria-label","演唱会视频");
  stage.videos.forEach((video,index) => {
    const link = document.createElement("a"); link.href = video.url;
    link.target = "_blank"; link.rel = "noopener noreferrer";
    link.textContent = String(index+1).padStart(2,"0") + "　" + video.title;
    links.append(link);
  });
  root.append(poster,links);
})();
