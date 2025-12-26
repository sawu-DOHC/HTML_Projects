function showForm(formId) {
  const el = document.getElementById(formId);
  el.classList.remove("hidden");
  el.classList.add("visible");
}

function hideForm(formId) {
  const el = document.getElementById(formId);
  el.classList.add("hidden");
  el.classList.remove("visible");
}
