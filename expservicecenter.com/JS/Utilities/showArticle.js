function showArticle(sectionId, articleId) {
  const sections = document.querySelectorAll("main > section");
  sections.forEach(section => section.classList.remove("visible"));

  const section = document.getElementById(sectionId);
  const article = document.getElementById(articleId);

  section.classList.add("visible");

  // Blink the article to draw attention
  article.classList.add("blink");
  article.addEventListener("animationend", () => {
    article.classList.remove("blink");
  }, { once: true });

  // Scroll to it after it becomes visible
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      window.scrollTo(0, article.offsetTop);
    });
  });
}
