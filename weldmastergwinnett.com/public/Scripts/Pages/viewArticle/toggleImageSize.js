function toggleImageSize(img) {
  const wrapper = img.closest("article");
  if (!wrapper || !wrapper.classList.contains("comment")) return; // only comments

  img.classList.toggle("expanded");
  img.src = img.classList.contains("expanded") 
    ? img.dataset.full 
    : img.dataset.thumb;
}
                                          