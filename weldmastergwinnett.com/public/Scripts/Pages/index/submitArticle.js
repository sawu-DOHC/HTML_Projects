async function submitArticle(form) {
  showLoadingScreen();

  try {
    const formData = new FormData(form);

    // Determine type from form id
    let type = "";
    if (form.id === "FormSample") type = "sample";
    if (form.id === "FormThread") type = "thread";

    if (!type) {
      console.error("submitArticle: invalid form id:", form.id);
      hideLoadingScreen();
      return;
    }

    formData.set("articleType", type);

    console.group("submitArticle");
    console.log("Type:", type);
    console.groupEnd();

    const res = await fetch("Scripts/Interface/POST_article.php", {
      method: "POST",
      body: formData
    });

    const data = await res.json();

    if (!data.success) {
      alert(`Error submitting ${type}: ${data.detail || ""}`);
      return;
    }

    form.reset();
    hideForm(form.id);

    if (type === "thread") {
      document.getElementById("ThreadGrid")
        ?.insertAdjacentHTML("afterbegin", data.html);
    } else {
      document.getElementById("SampleGrid")
        ?.insertAdjacentHTML("afterbegin", data.html);
    }

    const el = document.querySelector(`[data-article-id="${data.articleId}"]`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      el.classList.add("flash");
      setTimeout(() => el.classList.remove("flash"), 1000);
    }

  } catch (err) {
    console.error("submitArticle error:", err);
    alert("Unexpected error: " + err.message);
  } finally {
    hideLoadingScreen();
  }
}
