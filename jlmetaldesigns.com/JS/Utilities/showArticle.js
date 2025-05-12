function showArticle(sectionId, articleId) {
  const sections = document.querySelectorAll("main > section");

  for (let i = 0; i < sections.length; i++) {
    sections[i].classList.remove("visible");
  }

  const section = document.getElementById(sectionId);
  const article = document.getElementById(articleId);

  section.classList.add("visible");
  article.classList.add("blink");

  article.addEventListener("animationend", () => {
    article.classList.remove("blink");
  }, { once: true });

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      window.scrollTo(0, article.offsetTop);
    });
  });
}
