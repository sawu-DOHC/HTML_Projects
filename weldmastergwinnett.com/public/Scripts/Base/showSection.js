function showSection(id) {
    // hide all sections on the page
    document.querySelectorAll("section")
        .forEach(sec => sec.classList.remove("active"));

    // deactivate all buttons that have a data-target attribute
    document.querySelectorAll("[data-target]")
        .forEach(btn => btn.classList.remove("active"));

    // activate the section
    document.getElementById(id).classList.add("active");

    // activate the matching button
    document.querySelector(`[data-target="${id}"]`)
        .classList.add("active");
}
