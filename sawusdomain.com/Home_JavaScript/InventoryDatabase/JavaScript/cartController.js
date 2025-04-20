function cartController(){


}

function toggleCart() {
    const cartIcon = document.getElementById('cartIcon');
    const cartContainer = document.getElementById('cartContainer');
  
    if (cartIcon.classList.contains('active')) {
      cartIcon.classList.remove('active');
      cartContainer.style.display = "none"; // Hide the cart container
    } else {
      cartIcon.classList.add('active');
      cartContainer.style.display = "block"; // Show the cart container
    }
  }
  
function printCart() {
    const cartTableBody = document.getElementById("cart");
    if (!cartTableBody || cartTableBody.children.length === 0) {
        alert("Cart is empty. Add items before printing.");
        return;
    }

    let printableHTML = `
        <html>
        <head>
            <title>Print Cart</title>
            <style>
                body { font-family: Arial, sans-serif; margin: 20px; }
                h1 { text-align: center; }
                table { width: 100%; border-collapse: collapse; margin-top: 0; }
                th, td { border: 1px solid #ccc; padding: 5px; text-align: left; }
                th { background-color: #f4f4f9; text-align: center; }
                td input { border: none; font-size: 1rem; width: 50px; text-align: center; }
            </style>
        </head>
        <body>
            <h1>Cart Summary</h1>
            <table>
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Part Number</th>
                        <th>Category</th> <!-- Category before Quantity -->
                        <th>Quantity</th>  <!-- Quantity after Category -->
                    </tr>
                </thead>
                <tbody>
    `;

    Array.from(cartTableBody.children).forEach(row => {
        const description = row.children[0].innerText;
        const partNumber = row.children[1].innerText || "N/A";
        const category = row.children[2].innerText; // Corrected index
        const quantityInput = row.children[3].querySelector("input"); // Ensure input exists

        const quantity = quantityInput ? quantityInput.value : "N/A"; // Prevent null errors

        printableHTML += `
            <tr>
                <td>${description}</td>
                <td>${partNumber}</td>
                <td>${category}</td>
                <td>${quantity}</td>
            </tr>
        `;
    });

    printableHTML += `
                </tbody>
            </table>
        </body>
        </html>
    `;

    const printWindow = window.open("", "", "height=1200,width=1600");
    printWindow.document.write(printableHTML);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
}
function removeFromCart(itemId) {
    const cartRow = document.getElementById(`cart-item-${itemId}`);
    if (cartRow) {
      cartRow.remove();
    }
  }
  