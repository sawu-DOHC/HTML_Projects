function renderTable(rows) {
    let body = document.querySelector("#dataTable tbody");
    body.innerHTML = "";

    let latest = rows.slice(-50).reverse();

    for (let r of latest) {
        let tr = document.createElement("tr");
        tr.innerHTML =
            "<td>" + r.id + "</td>" +
            "<td>" + r.timestamp + "</td>" +
            "<td>" + r.baro + "</td>" +
            "<td>" + r.clt + "</td>" +
            "<td>" + r.rpm + "</td>" +
            "<td>" + r.fuel_cc_min + "</td>" +
            "<td>" + r.iat + "</td>" +
            "<td>" + r.maf + "</td>" +
            "<td>" + r.ign + "</td>";

        body.appendChild(tr);
    }

    document.querySelector("#dataCount").textContent =
        "Total Data Points: " + rows.length.toLocaleString();
}
