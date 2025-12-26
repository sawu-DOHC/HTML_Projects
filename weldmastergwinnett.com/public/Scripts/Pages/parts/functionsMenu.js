function printInventory() {
    let selected = document.querySelector("#print_category").value;
    let rows = document.querySelectorAll("#InventoryTable tbody tr");

    let groups = {};
    let today = new Date().toLocaleDateString();

    for (let i = 0; i < rows.length; i++) {
        let cells = rows[i].children;

        let desc = cells[1].innerText;
        let part = cells[2].innerText;
        let fullCat = cells[4].innerText;
        let cats = fullCat.split(",");

        for (let j = 0; j < cats.length; j++) {
            let name = cats[j].trim();
            if (name.length < 1) continue;

            let match = (selected === "all") || (name === selected);
            if (!match) continue;

            if (!groups[name]) groups[name] = [];

            groups[name].push({
                desc: desc,
                part: part,
                cat: fullCat
            });
        }
    }

    let html = "";

    for (let name in groups) {
        let list = groups[name];

        html += `
            <div class="category-page">
                <h3>${name}</h3>

                <table border="1" cellspacing="0" cellpadding="5" width="100%">
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Part #</th>
                            <th>Categories</th>
                            <th>QOH</th>
                        </tr>
                    </thead>
                    <tbody>
        `;

        for (let k = 0; k < list.length; k++) {
            html += `
                <tr>
                    <td>${list[k].desc}</td>
                    <td>${list[k].part}</td>
                    <td>${list[k].cat}</td>
                    <td></td>
                </tr>
            `;
        }

        html += `
                    </tbody>
                </table>

                <p style="text-align:right;">Items: ${list.length}</p>
            </div>
        `;
    }

    openPrintWindow("Inventory Count", `<h1>Inventory Count — ${today}</h1>${html}`);
}


function openPrintWindow(title, html) {
    let win = window.open("", "", "width=1200,height=1000");
    win.document.write("<html><head><title>" + title + "</title></head><body>" + html + "</body></html>");
    win.document.close();
    win.focus();
    win.print();
    win.close();
}
function filterCategory() {
    let select = document.querySelector("#CategorySelect");
    let chosen = select ? select.value : "";

    let rows = document.querySelectorAll("#InventoryTable tbody tr");

    for (let i = 0; i < rows.length; i++) {
        let row = rows[i];
        let cell = row.children[4];
        let fullCat = cell.innerText;

        if (chosen === "") {
            row.style.display = "";
            continue;
        }

        if (fullCat.indexOf(chosen) !== -1) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }
    }
}
