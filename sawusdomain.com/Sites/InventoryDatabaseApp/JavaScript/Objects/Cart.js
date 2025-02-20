class Cart {
    constructor() {
        this.items = []; // Array to store items
        this.cartTableBody = document.getElementById("cart");
    }

    addItem(itemId, description, partNumber, quantity) {
        // If the item already exists, update its quantity
        let existingItem = this.items.find(item => item.itemId === itemId);
        if (existingItem) {
            existingItem.quantity = existingItem.quantity + (parseInt(quantity) || 1);
        }
        else {
            this.items.push({
                itemId: itemId,
                description: description,
                partNumber: partNumber,
                quantity: parseInt(quantity) || 1
            });
        }
        this.updateCartDisplay();
    }

    removeItem(itemId) {
        this.items = this.items.filter(item => item.itemId !== itemId);
        this.updateCartDisplay();
    }

    updateCartDisplay() {

        this.cartTableBody.innerHTML = "";

        for (let item of this.items) {
            const row = document.createElement("tr");

            const tdDesc = document.createElement("td");
            tdDesc.textContent = item.description;
            row.appendChild(tdDesc);

            const tdPart = document.createElement("td");
            tdPart.textContent = item.partNumber;
            row.appendChild(tdPart);

            const tdQty = document.createElement("td");

            const qtyInput = document.createElement("input");
            qtyInput.type = "number";
            qtyInput.value = item.quantity;
            qtyInput.classList.add("quantity-input");
            qtyInput.addEventListener("change", () => {
                item.quantity = parseInt(qtyInput.value) || 0;
            });
            tdQty.appendChild(qtyInput);
            row.appendChild(tdQty);

            const tdActions = document.createElement("td");
            const removeBtn = document.createElement("button");
            removeBtn.textContent = "Remove";
            removeBtn.addEventListener("click", () => {
                this.removeItem(item.itemId);
            });
            tdActions.appendChild(removeBtn);
            row.appendChild(tdActions);

            this.cartTableBody.appendChild(row);
        }
    }

    printCart() {
        let printableHTML = `
            <html>
            <head>
              <title>Cart Printout</title>
              <style>
                body { font-family: Arial, sans-serif; margin: 20px; }
                h1 { text-align: center; }
                table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
                th { background-color: #f4f4f9; text-align: center; }
              </style>
            </head>
            <body>
              <h1>Cart</h1>
              <table>
                <thead>
                  <tr>
                    <th>Description</th>
                    <th>Part Number</th>
                    <th>Quantity</th>
                  </tr>
                </thead>
                <tbody>
        `;
        for (let item of this.items) {
            printableHTML += `
                <tr>
                  <td>${item.description}</td>
                  <td>${item.partNumber}</td>
                  <td>${item.quantity}</td>
                </tr>
            `;
        }
        
        printableHTML += `
                </tbody>
              </table>
            </body>
            </html>
        `;

        let printWindow = window.open("", "", "height=1200,width=1600");

        printWindow.document.write(printableHTML);
        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
        printWindow.close();
    }
}
