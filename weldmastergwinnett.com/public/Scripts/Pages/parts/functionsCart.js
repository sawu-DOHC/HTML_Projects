let array_cartItems = window._savedCartItems || [];

function addToCart(id) {
    let rows = document.querySelectorAll("#InventoryTable tbody tr");
    let row = null;

    for (let i = 0; i < rows.length; i++) {
        let cellId = rows[i].children[0].innerText.trim();
        if (cellId === String(id)) {
            row = rows[i];
            break;
        }
    }

    if (row === null) return;

    let found = false;

    for (let i = 0; i < array_cartItems.length; i++) {
        if (array_cartItems[i].id === id) {
            array_cartItems[i].quantity++;
            found = true;
            break;
        }
    }

    if (!found) {
        array_cartItems.push({
            id: id,
            description: row.children[1].innerText,
            part:       row.children[2].innerText,
            category:   row.children[4].innerText,
            quantity:   1
        });
    }

    updateCartTable();

    let cell = row.children[6];
    let prev = cell.innerHTML;
    cell.innerText = "Added!";
    setTimeout(function() { cell.innerHTML = prev; }, 800);
}

function updateCartTable() {
    let tbody = document.querySelector("#cart");
    if (!tbody) return;

    if (array_cartItems.length === 0) {
        tbody.innerHTML = "<tr><td colspan='5' style='text-align:center;opacity:0.7;'>Cart is empty</td></tr>";
        localStorage.removeItem("cartItems");
        return;
    }

    let html = "";

    for (let i = 0; i < array_cartItems.length; i++) {
        let item = array_cartItems[i];

        html += "<tr>";
        html += "<td>" + item.description + "</td>";
        html += "<td>" + item.part + "</td>";
        html += "<td>" + item.category + "</td>";
        html += "<td><input type='number' min='1' value='" + item.quantity + "' onchange='setQuantity(" + item.id + ", this.value)'></td>";
        html += "<td style='text-align:center;'>";
        html += "<button class='buttonRed' onclick='removeFromCart(" + item.id + ")'>x</button>";
        html += "</td>";
        html += "</tr>";
    }

    tbody.innerHTML = html;
    localStorage.setItem("cartItems", JSON.stringify(array_cartItems));
}

function setQuantity(id, qty) {
    qty = parseInt(qty);
    if (isNaN(qty) || qty < 1) qty = 1;

    for (let i = 0; i < array_cartItems.length; i++) {
        if (array_cartItems[i].id === id) {
            array_cartItems[i].quantity = qty;
            break;
        }
    }

    updateCartTable();
}

function removeFromCart(id) {
    let newList = [];

    for (let i = 0; i < array_cartItems.length; i++) {
        if (array_cartItems[i].id !== id) {
            newList.push(array_cartItems[i]);
        }
    }

    array_cartItems = newList;
    updateCartTable();
}

function printCart() {
    if (array_cartItems.length === 0) {
        alert("Cart is empty.");
        return;
    }

    let today = new Date().toLocaleDateString();

    let rows = "";

    for (let i = 0; i < array_cartItems.length; i++) {
        let item = array_cartItems[i];

        rows += `
            <tr>
                <td>${item.description}</td>
                <td>${item.part}</td>
                <td>${item.category}</td>
                <td></td>
            </tr>
        `;
    }

    let html = `
        <h1>Cart — ${today}</h1>

        <div class="category-page">
            <h3>Cart</h3>

            <table border="1" cellspacing="0" cellpadding="5" width="100%">
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Part #</th>
                        <th>Category</th>
                        <th>Order</th>
                    </tr>
                </thead>

                <tbody>
                    ${rows}
                </tbody>
            </table>

            <p style="text-align:right;">Items: ${array_cartItems.length}</p>
        </div>
    `;

    openPrintWindow("Cart", html);
}


function openPrintWindow(title, html) {
    let win = window.open("", "", "width=1200,height=1000");
    win.document.write("<html><head><title>" + title + "</title></head><body>" + html + "</body></html>");
    win.document.close();
    win.focus();
    win.print();
    win.close();
}
