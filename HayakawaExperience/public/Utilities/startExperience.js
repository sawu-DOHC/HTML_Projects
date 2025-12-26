const audio = new Audio("Assets/intro.mp3");
let skipped = false;

function startExperience() {
  const btn    = document.getElementById("startButton");
  const title  = document.querySelector("h1");
  const crest  = document.getElementById("crest");
  const kanji  = document.getElementById("kanji");
  const header = document.querySelector("header");
  const nav    = document.querySelector("nav");
  const main   = document.querySelector("main");

  if (!btn || !title || !crest || !kanji || !header || !nav || !main) {
    console.warn("Missing one or more key elements.");
    return;
  }

  const fastForward = () => {
    if (skipped) return;
    skipped = true;

    crest.classList.add("visible", "shrunk");
    kanji.classList.add("visible", "shrunk");
    header.classList.add("shrunk");
    nav.classList.add("fade-in");
    document.body.classList.add("bg-visible");
  };

  // Delay listener just enough to avoid capturing the start button click
  setTimeout(() => {
    document.addEventListener("click", fastForward, { once: true });
  }, 300);

  // Step 1: fade out
  btn.classList.add("fade-out");
  title.classList.add("fade-out");
  audio.play().catch(err => console.warn("Autoplay failed:", err));

  // Step 2–5, unless fast-forwarded
  setTimeout(() => {
    if (skipped) return;
    crest.classList.add("visible");
  }, 5500);

  setTimeout(() => {
    if (skipped) return;
    kanji.classList.add("visible");
  }, 7000);

  setTimeout(() => {
    if (skipped) return;
    crest.classList.add("shrunk");
    kanji.classList.add("shrunk");
    header.classList.add("shrunk");
    setTimeout(() => {
      if (skipped) return;
      nav.classList.add("fade-in");
    }, 500);
  }, 10000);

  setTimeout(() => {
    if (skipped) return;
    document.body.classList.add("bg-visible");
  }, 11500);
}
function openResyPopup() {
  const url = "https://resy.com/cities/atlanta-ga/venues/hayakawa?date=2025-05-30&seats=2";
  const w = 800, h = 600;
  const left = (screen.width - w) / 2;
  const top = (screen.height - h) / 2;

  window.open(url, "resyWindow", `width=${w},height=${h},left=${left},top=${top}`);
}
