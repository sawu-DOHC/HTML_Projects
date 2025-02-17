class Cart {
    constructor() {
        this.items = [];
        this.loadFromStorage(); // Load from local storage if available
    }

    addItem(itemId, description, partNumber) {
        const existingItem = this.items.find(item => item.itemId === itemId);
        if (existingItem) {
            existingItem.quantity += 1; // Increment quantity by 1 if item exists
        } else {
            const item = { itemId, description, partNumber, quantity: 1 }; // Add new item with quantity 1
            this.items.push(item);
        }
        this.saveToStorage();
        this.updateCartDisplay(); // Update the cart display after adding
    }

    removeItem(itemId) {
        this.items = this.items.filter(item => item.itemId !== itemId); // Remove item from cart
        this.saveToStorage();
        this.updateCartDisplay(); // Update the cart display after removal
    }

    updateCartDisplay() {
        const cartTableBody = document.getElementById("cart");
        if (!cartTableBody) {
            console.error("Cart table body not found!");
            return; // Exit if the cart table body is not found
        }
        cartTableBody.innerHTML = ''; // Clear existing cart items before rendering
    
        this.items.forEach(item => {
            const row = document.createElement("tr");
            const descriptionCell = document.createElement("td");
            descriptionCell.textContent = item.description;
            row.appendChild(descriptionCell);
    
            const partNumberCell = document.createElement("td");
            partNumberCell.textContent = item.partNumber;
            row.appendChild(partNumberCell);
    
            const quantityCell = document.createElement("td");
            quantityCell.textContent = item.quantity;
            row.appendChild(quantityCell);
    
            const actionsCell = document.createElement("td");
            const removeButton = document.createElement("button");
            removeButton.textContent = "Remove";
            removeButton.addEventListener("click", () => {
                this.removeItem(item.itemId);
            });
            actionsCell.appendChild(removeButton);
            row.appendChild(actionsCell);
    
            cartTableBody.appendChild(row);
        });
    }
    
    saveToStorage() {
        localStorage.setItem("cart", JSON.stringify(this.items)); // Save cart items in local storage
    }

    loadFromStorage() {
        const savedCart = localStorage.getItem("cart");
        if (savedCart) {
            this.items = JSON.parse(savedCart); // Load cart items from local storage
        }
        this.updateCartDisplay(); // Render the cart items after loading from storage
    }

    clearCart() {
        this.items = []; // Clear all items in the cart
        this.saveToStorage();
        this.updateCartDisplay(); // Update the cart display after clearing
    }


    
    printCart() {
        // Create a new window for printing
        const printWindow = window.open('', '', 'width=1600, height=1200');
    
        // Generate HTML content for printing
        let printContent = `
            <html>
            <head>
                <title>Cart Print</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        margin: 0;
                        padding: 20px;
                    }
                    h2 {
                        text-align: left;
                    }
                    table {
                        width: 100%;
                        border-collapse: collapse;
                        margin-top: 20px;
                    }
                    th, td {
                        padding: 8px;
                        text-align: center;
                        border: 1px solid #ddd;
                    }
                    th {
                        background-color: #f2f2f2;
                    }
                    td {
                        text-align: left;
                    }
                    @media print {
                        button {
                            display: none;
                        }
                        body {
                            margin: 0;
                            padding: 20px;
                        }
                    }
                </style>
            </head>
            <body>
                <h2>Shopping Cart</h2>
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
    
        // Loop through the cart items and add them to the table
        cart.items.forEach(item => {
            printContent += `
                <tr>
                    <td>${item.description}</td>
                    <td>${item.partNumber}</td>
                    <td>${item.quantity}</td>
                </tr>
            `;
        });
    
        // Close the table and the document
        printContent += `
                    </tbody>
                </table>
            </body>
            </html>
        `;
    
        // Write the content to the print window
        printWindow.document.write(printContent);
        printWindow.document.close(); // Ensure the content is loaded
    
        // Trigger the print dialog
        printWindow.print();
        printWindow.close(); // Close the window after printing
    }
}
