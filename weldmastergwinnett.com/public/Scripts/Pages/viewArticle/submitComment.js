async function submitComment(form, parentId = null) {
  showLoadingScreen();

  try {
    const formData = new FormData(form);

    // JS is source of truth
    formData.set("articleType", "comment");

    // Parent ID (article being commented on)
    if (!parentId) {
      const parent = document.querySelector("article[data-article-id]");
      if (parent) parentId = parent.dataset.articleId;
    }
    formData.set("parentId", parentId);

    // Send (same endpoint as submitArticle)
    const res = await fetch("Scripts/Interface/POST_article.php", {
      method: "POST",
      body: formData
    });

    const data = await res.json();

    if (!data.success) {
      alert(`Error submitting comment: ${data.detail || ""}`);
      return;
    }

    form.reset();
    hideForm(form.id);

    // Insert new comment under the article
    document
      .querySelector(`.articleComments[data-parent-id="${parentId}"] .commentList`)
      ?.insertAdjacentHTML("beforeend", data.html);

  } catch (err) {
    console.error("submitComment error:", err);
    alert("Unexpected error: " + err.message);
  } finally {
    hideLoadingScreen();
  }
}
