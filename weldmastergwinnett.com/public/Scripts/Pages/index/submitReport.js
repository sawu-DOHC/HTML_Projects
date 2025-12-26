async function submitReport(articleId) {
  try {
    const res = await fetch('/API/POST_report.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ articleId })
    });

    const data = await res.json();
    console.log("REPORT RESPONSE:", data);

    if (!data.success) {
      alert(`Error: ${data.error || 'Unknown'}`);
      return;
    }

    // 🔧 Update count on both thread and comment
    const article = document.querySelector(`[data-article-id="${articleId}"]`);
    if (article) {
      const countEl = article.querySelector('.reportCount');
      if (countEl) countEl.textContent = data.reportCount;
    }
  } catch (err) {
    console.error("submitReport error:", err);
    alert("Unexpected error submitting report.");
  }
}
