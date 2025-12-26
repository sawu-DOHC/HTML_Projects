function hideFlaggedContent(scope = document, threshold = 2) {

  const articles = scope.querySelectorAll("article[data-report-count]");

  for (const element of articles) {

    const count = parseInt(element.dataset.reportCount, 10);

    if (isNaN(count) || count <= threshold) continue;

    // skip OP thread/sample views
    if (element.classList.contains("viewThread") || element.classList.contains("viewSample")) {
      continue;
    }


    element.classList.add("flagged-blur");
    element.dataset.blurred = "true";   // marker for toggle logic
  }
}

// === run on page load ===
document.addEventListener("DOMContentLoaded", () => {
  hideFlaggedContent(document.body);
});

// === unblur on first click ===
document.addEventListener("click", (e) => {
  const flagged = e.target.closest(".flagged-blur");
  if (!flagged) return;

  if (flagged.dataset.blurred === "true") {
    // first click = just unblur
    e.preventDefault();
    e.stopPropagation();
    flagged.classList.remove("flagged-blur");
    flagged.dataset.blurred = "false";
  } 
  
});
