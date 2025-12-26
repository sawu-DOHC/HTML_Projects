function filterInventory(category) {
    console.log("filterInventory:", category);

    const rows = document.querySelectorAll("#inventoryBody tr");

    rows.forEach(row => {
        const cats = row.dataset.cat.split(",").map(c => c.trim());

        const match = (category === "All") || cats.includes(category);

        row.style.display = match ? "" : "none";
    });
}
