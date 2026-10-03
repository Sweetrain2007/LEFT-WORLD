(() => {
  "use strict";
  const root = document.querySelector("[data-stage-detail]");
  if (!root) return;
  const stage = window.LEFT_STAGE_ARCHIVES?.[root.dataset.stageDetail];
  if (!stage) return;
  // Shared StageDetail template. Each existing route supplies only its data key.
  const template = document.createElement("template");
  template.innerHTML = `
    <nav class="archive-nav" aria-label="档案导航">
      <a class="archive-back" data-field="back">← 返回长江国际</a>
      <span class="archive-brand">LEFT’S WORLD</span>
    </nav>
    <article class="archive-window" aria-labelledby="stage-title">
      <header class="archive-titlebar">
        <span><i class="file-icon" aria-hidden="true"></i> STAGE ARCHIVE</span>
        <span data-field="number"></span>
      </header>
      <div class="archive-toolbar"><span>LEFT’S WORLD / STAGE ARCHIVE</span><span>舞台档案</span></div>
      <div class="archive-content">
        <figure class="archive-poster">
          <div class="poster-mount"><img data-field="poster" decoding="async"></div>
          <figcaption><span>POSTER</span><time data-field="posterDate"></time></figcaption>
        </figure>
        <section class="archive-record" aria-label="舞台记录">
          <p class="record-label">STAGE ARCHIVE</p>
          <time class="record-date" data-field="date"></time>
          <div class="record-heading">
            <p class="record-series" data-field="series"></p>
            <h1 id="stage-title" data-field="name"></h1>
          </div>
          <p class="record-artist" data-field="artist"></p>
          <div class="archive-video">
            <span class="video-label" data-field="videoLabel"></span>
            <a class="watch-video" data-field="video" target="_blank" rel="noopener noreferrer">
              <span aria-hidden="true">▶</span> WATCH VIDEO <span aria-hidden="true">↗</span>
            </a>
            <p class="video-note">Bilibili · 在新标签页打开</p>
          </div>
        </section>
      </div>
      <footer class="archive-status"><span><i aria-hidden="true"></i> LEFT / STAGE ARCHIVE</span><span data-field="footerDate"></span></footer>
    </article>`;
  const view = template.content.cloneNode(true);
  const field = key => view.querySelector('[data-field="' + key + '"]');
  for (const key of ["series", "name", "artist", "videoLabel"]) field(key).textContent = stage[key];
  for (const key of ["date", "posterDate"]) {
    field(key).textContent = stage.date || "";
    field(key).hidden = !stage.date;
    if (stage.dateTime) field(key).dateTime = stage.dateTime;
  }
  field("number").textContent = "FILE / " + stage.number;
  field("footerDate").textContent = stage.date || "";
  field("poster").src = stage.poster;
  field("poster").alt = stage.title + "原海报";
  field("back").href = stage.returnUrl;
  const videos = stage.videos || [{label: stage.videoLabel, url: stage.videoUrl}];
  const videoTemplate = field("video");
  const videoList = document.createElement("div");
  videoList.className = "video-links";
  for (const video of videos) {
    const anchor = videoTemplate.cloneNode(true);
    anchor.removeAttribute("data-field");
    anchor.href = video.url;
    if (videos.length > 1) {
      const label = document.createElement("span");
      label.textContent = video.label;
      anchor.replaceChildren(label);
      const arrow = document.createElement("span");
      arrow.textContent = "↗";
      arrow.setAttribute("aria-hidden", "true");
      anchor.append(arrow);
    }
    anchor.setAttribute("aria-label", "观看" + stage.name + " " + video.label + "（Bilibili，新标签页）");
    videoList.append(anchor);
  }
  videoTemplate.replaceWith(videoList);
  root.replaceChildren(view);
  document.title = stage.name + " · STAGE ARCHIVE | LEFT’s World";
})();