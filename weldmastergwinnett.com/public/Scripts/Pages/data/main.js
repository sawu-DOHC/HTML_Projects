document.addEventListener("DOMContentLoaded", () => {
    requestAnimationFrame(() => {
        setTimeout(loadData, 50);  
    });
});

async function loadData() {
    let url = "Scripts/Interface/GET_data.php?nocache=" + Date.now();
    let res  = await fetch(url);
    let json = await res.json();
    let rows = json.data || [];

    renderGraph1(rows);
    renderGraph2(rows);
    renderGraph3(rows);

    renderTable(rows);
}
