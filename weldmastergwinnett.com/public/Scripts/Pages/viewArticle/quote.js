function quote(articleId) {

  showForm('FormComment');

  const form = document.getElementById('FormComment');
  if (!form) return;

  const textarea = form.querySelector("textarea[name='body']");
  if (!textarea) return;

  const article = document.getElementById("article-" + articleId);
  if (!article) return;

  // Extract post ID or fallback to given articleId
  const postId = article.querySelector(".id, .commentId, .articleId")?.textContent.replace(/^#/, "").trim() || articleId;

  // Handle selected text if it's within the article's .text block
  const textBlock = article.querySelector(".text");
  const selection = window.getSelection();
  let selected = "";
  if (selection.rangeCount && textBlock.contains(selection.getRangeAt(0).commonAncestorContainer)) {
    selected = selection.toString().trim();
  }

  // Build prefill content
  let prefill = `@${postId}\n`;
  if (selected) {
    const quoted = selected
      .split("\n")
      .map(line => "> " + line.trim()) // Prefix each line with >
      .join("\n");
    prefill += quoted + "\n";
  }

  // Insert into textarea
  textarea.value = textarea.value
    ? textarea.value.trim() + "\n\n" + prefill
    : prefill;

  textarea.focus();
}
