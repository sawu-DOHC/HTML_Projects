document.addEventListener("DOMContentLoaded", () => {
  const comments = document.querySelectorAll(".text");

  comments.forEach(textElem => {
    textElem.innerHTML = textElem.innerHTML.replace(
      /@(\d+)/g,
      '<a href="#article-$1" class="mention">@$1</a>'
    );
  });
});
