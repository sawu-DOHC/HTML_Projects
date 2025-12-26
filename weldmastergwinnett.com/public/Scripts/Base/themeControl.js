/* ===============================
   THEME CONFIG
=============================== */
const backgrounds = {
  "spring-day":    "/Assets/Themes/springDay1.jpg",
  "spring-night":  "/Assets/Themes/springNight.jpg",
  "summer-day":    "/Assets/Themes/summerDay3.jpg",
  "summer-night":  "/Assets/Themes/summerNight1.jpg",
  "fall-day":      "/Assets/Themes/fallDay.jpg",
  "fall-night":    "/Assets/Themes/fallNight1.jpg",
  "winter-day":    "/Assets/Themes/winterDay3.jpg",
  "winter-night":  "/Assets/Themes/winterNight.jpg",

  "jail-day":      null,
  "jail-night":    null,

  "christmas":     "/Assets/Themes/christmas.jpg",
  "Win95":         "/Assets/Themes/win95.jpg"
};

document.addEventListener("DOMContentLoaded", () => {

    const footer = document.querySelector("footer");
    if (!footer) return;

    footer.insertAdjacentHTML("beforeend", `
        <form id="FormTheme">
          <fieldset>
            <label>theme
              <select id="ThemeSelect" onchange="setTheme(this.value)">
                <option value="spring-day">spring (day)</option>
                <option value="spring-night">spring (night)</option>
                <option value="summer-day">summer (day)</option>
                <option value="summer-night">summer (night)</option>
                <option value="fall-day">fall (day)</option>
                <option value="fall-night">fall (night)</option>
                <option value="winter-day">winter (day)</option>
                <option value="winter-night">winter (night)</option>
                <option value="jail-day">jail (day)</option>
                <option value="jail-night">jail (night)</option>
                <option value="christmas">christmas</option>
                <option value="Win95">1996</option>
              </select>
            </label>
          </fieldset>
        </form>
    `);

    const select = document.getElementById("ThemeSelect");

    const now   = new Date();
    const day   = now.getDay();        // 0 = Sun, 6 = Sat
    const date  = now.getDate();       // 1–31
    const month = now.getMonth() + 1;  // 1–12
    const hour  = now.getHours();      // 0–23

    // ---- CHRISTMAS ALWAYS WINS ----
    if (month === 12 && date === 25) {
        localStorage.removeItem("theme");   // prevent sticking forever
        select.value = "christmas";
        setTheme("christmas");
        return;
    }

    // ---- USER SAVED THEME ----
    const saved = localStorage.getItem("theme");
    if (saved) {
        select.value = saved;
        setTheme(saved);
        return;
    }

    // ---- WEEKEND JAIL ----
    if (day === 0 || day === 6) {
        const jailTheme = (hour >= 6 && hour < 18)
            ? "jail-day"
            : "jail-night";

        select.value = jailTheme;
        setTheme(jailTheme);
        return;
    }

    // ---- SEASON + DAY/NIGHT ----
    let season;
    if (month >= 3 && month <= 5) season = "spring";
    else if (month >= 6 && month <= 8) season = "summer";
    else if (month >= 9 && month <= 11) season = "fall";
    else season = "winter";

    const feel = (hour >= 6 && hour < 18) ? "day" : "night";
    const autoTheme = `${season}-${feel}`;

    select.value = autoTheme;
    setTheme(autoTheme);
});



/* ===============================
   MAIN THEME SWITCH
=============================== */
function setTheme(themeKey) {
    localStorage.setItem("theme", themeKey);

    disableSnow();
    disableScanlines();

    const bgEl = document.getElementById("Background");
    const bgPath = backgrounds[themeKey] || null;

    bgEl.style.backgroundImage = bgPath ? `url('${bgPath}')` : "none";
    document.body.className = themeKey;

    switch (themeKey) {
    
        case "spring-day":
            break;
    
        case "spring-night":
            break;
    
        case "summer-day":
            break;
    
        case "summer-night":
            break;
    
        case "fall-day":
            break;
    
        case "fall-night":
            break;
    
        case "winter-day":
            enableSnow();
            break;
    
        case "winter-night":
            enableSnow();
            break;
    
        case "jail-day":
            break;
    
        case "jail-night":
            break;
    
        case "christmas":
            enableSnow();
            break;
    
        case "Win95":
            enableScanlines();
            break;
    
        default:
            break;
    }


    console.log("Theme applied:", themeKey);
}



/* ===============================
   SNOW EFFECT
=============================== */
let snowActive = false;

function enableSnow() {
  if (snowActive) return;
  snowActive = true;

  const canvas = document.createElement("canvas");
  canvas.id = "snow";
  Object.assign(canvas.style, {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    pointerEvents: "none",
    zIndex: 4
  });
  document.body.appendChild(canvas);

  const ctx = canvas.getContext("2d");
  let width, height;
  let flakes = [];

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    flakes = Array.from({ length: 8 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 3 + 1,
      d: Math.random() + 0.5
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "white";

    for (const f of flakes) {
      ctx.beginPath();
      ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
      ctx.fill();
    }

    for (const f of flakes) {
      f.y += f.d;
      f.x += Math.sin(f.y * 0.01) * 0.5;

      if (f.y > height) {
        f.y = -5;
        f.x = Math.random() * width;
      }
    }

    requestAnimationFrame(draw);
  }

  window.addEventListener("resize", resize);
  resize();
  draw();
}

function disableSnow() {
  const el = document.getElementById("snow");
  if (el) el.remove();
  snowActive = false;
}



/* ===============================
   SCANLINES EFFECT
=============================== */
let scanlineActive = false;

function enableScanlines() {
  if (scanlineActive) return;
  scanlineActive = true;

  const canvas = document.createElement("canvas");
  canvas.id = "scanlines";
  Object.assign(canvas.style, {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    pointerEvents: "none",
    zIndex: 4
  });
  document.body.appendChild(canvas);

  const ctx = canvas.getContext("2d");
  let width, height, offset = 0;

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);

    const spacing = 200;
    const lineHeight = 1;
    const speed = 0.2;

    offset = (offset + speed) % spacing;

    ctx.fillStyle = "rgba(0,255,247,0.32)";

    for (let y = offset; y < height; y += spacing) {
      ctx.fillRect(0, y, width, lineHeight);
    }

    requestAnimationFrame(draw);
  }

  window.addEventListener("resize", resize);
  resize();
  draw();
}

function disableScanlines() {
  const el = document.getElementById("scanlines");
  if (el) el.remove();
  scanlineActive = false;
}
