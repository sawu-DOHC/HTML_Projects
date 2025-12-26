function embedYouTubeVideos_ThreadsComments(container = document) {
  const ytRegex =
    /https?:\/\/(?:www\.)?(?:youtube\.com\/(?:watch\?v=|shorts\/)|youtu\.be\/)([A-Za-z0-9_-]{11})(\?[^ \n<"]*)?/gi;

  // all text paragraphs inside any article (threads or comments)
  const elements = container.querySelectorAll("article .text");
  if (!elements.length) return;

  elements.forEach(el => {
    // avoid double embedding
    if (el.querySelector("iframe.youtubeVideo")) return;

    let html = el.innerHTML;
    let changed = false;

    html = html.replace(ytRegex, (match, videoId, query = "") => {
      const params = new URLSearchParams(query.slice(1));
      const t = params.get("t") || params.get("start");
      const startTime = t ? `&start=${encodeURIComponent(t)}` : "";
      const embedUrl = `https://www.youtube.com/embed/${videoId}?rel=0${startTime}`;
      changed = true;
      return `<iframe class="youtubeVideo" src="${embedUrl}" allowfullscreen></iframe>`;
    });

    if (changed) el.innerHTML = html;
  });
}




function showYouTubePreviewsInThreadCards(container = document) {
  const ytRegex =
    /https?:\/\/(?:www\.)?(?:youtube\.com\/(?:watch\?v=|shorts\/)|youtu\.be\/)([A-Za-z0-9_-]{11})(\?[^ \n<"]*)?/i;

  const cards = container.querySelectorAll(".threadCard");
  if (!cards.length) return;

  cards.forEach(card => {
    const textEl = card.querySelector(".text");
    if (!textEl) return;

    const text = textEl.textContent.trim();
    const match = text.match(ytRegex);
    if (!match) return;

    const [, videoId] = match;
    const thumbUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

    // Replace the text with a static preview image (no external link)
    textEl.innerHTML = `
      <div class="youtubePreview">
        <img src="${thumbUrl}" alt="YouTube preview" class="youtubeThumb">
      </div>
    `;
  });
}

document.addEventListener("DOMContentLoaded", () => {
  requestAnimationFrame(() => showYouTubePreviewsInThreadCards());
});

document.addEventListener("DOMContentLoaded", () => {
  requestAnimationFrame(() => embedYouTubeVideos_ThreadsComments());
});
