function tableController(inventoryData) {
  const tableContainer = document.getElementById('tableContainer');
  tableContainer.innerHTML = '';

  const categories = new Set(inventoryData.map(item => item.category));

  categories.forEach(category => {
    const elementTable = document.createElement('div');
    elementTable.id = `table-${category}`;
    elementTable.classList.add("table");
    elementTable.setAttribute('category', category);
    elementTable.style.display = 'none';

    elementTable.innerHTML = `
      <h2>${category}</h2>
      <table>
        <thead>
          <tr>
            <th>Description</th>
            <th>Part Number</th>
            <th>QOH</th>
            <th>Last Updated</th>
          </tr>
        </thead>
        <tbody id="tbody-${category}"></tbody>
      </table>
      <div class="table-actions">
        <button class="print-category-button" onclick="printCategoryTable('${category}')">🖨️ Print Inventory Sheet</button>
        <button class="print-category-button" onclick="printCategoryCountSheet('${category}')">✅ Count Inventory Sheet</button>
      </div>
    `;

    tableContainer.appendChild(elementTable);

    const tbody = document.getElementById(`tbody-${category}`);
    inventoryData.filter(item => item.category === category).forEach(item => {
      const row = document.createElement('tr');
      row.setAttribute('data-id', item.id);
      row.setAttribute('data-category', item.category);

      row.innerHTML = `
        <td class="description">${item.description}</td>
        <td class="part-number">${item.part_number}</td>
        <td class="quantity">${item.quantity_on_hand}</td>
        <td>${item.last_updated}</td>
      `;

      row.addEventListener("click", function() {
        showDetails(this);
      });

      tbody.appendChild(row);
    });
  });
}

async function toggleEditSave(button) {
  const detailsContainer = document.getElementById("detailsContainer");
  const isEditMode = button.textContent.trim() === "Edit";

  const descriptionInput = document.getElementById("detail_description");
  const partNumberInput = document.getElementById("detail_part_number");
  const quantityInput = document.getElementById("detail_quantity");

  const itemId = detailsContainer.getAttribute("data-id");
  const category = detailsContainer.getAttribute("data-category"); // Get the category from the detailsContainer

  if (!itemId) {
      alert("Error: No item selected.");
      return;
  }

  if (isEditMode) {
      button.textContent = "Save";
      button.classList.add("save-mode");

      descriptionInput.removeAttribute("disabled");
      partNumberInput.removeAttribute("disabled");
      quantityInput.removeAttribute("disabled");
  } 
  else {
      button.textContent = "Edit";
      button.classList.remove("save-mode");

      descriptionInput.setAttribute("disabled", true);
      partNumberInput.setAttribute("disabled", true);
      quantityInput.setAttribute("disabled", true);

      const itemData = {
          itemId: itemId,
          description: descriptionInput.value.trim(),
          partNumber: partNumberInput.value.trim(),
          quantity_on_hand: parseInt(quantityInput.value, 10)
      };

      console.log("🚀 Sending Item Data:", itemData); // Log the item data

      await saveItem(itemData);  // Call the save function

      // After saving, refresh the category
      await refreshCategory(category); // Pass the category to refresh
  }
}



async function saveItem(itemData) {
  try {
      console.log("📡 Sending data to API:", itemData);

      const response = await fetch('https://sawusdomain.com/Home_JavaScript/InventoryDatabase/PHP/updateItem.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(itemData)
      });

      const responseText = await response.text(); // Get raw response
      console.log("🛠 Raw API Response:", responseText); 

      let responseData;
      try {
          responseData = JSON.parse(responseText); // Parse the JSON response
      } catch (e) {
          console.error('Error parsing response as JSON:', e);
          alert('Error parsing response data.');
          return;
      }

      console.log("✅ Parsed Response:", responseData);

      alert(responseData.message);
  } catch (error) {
      console.error("❌ Fetch error:", error);
      alert('Error updating item: ' + error.message);
  }
}

async function deleteItem() {
  const detailsContainer = document.getElementById("detailsContainer");
  const itemId = detailsContainer.getAttribute("data-id");

  if (!itemId) {
      alert("No item selected to delete.");
      return;
  }

  if (confirm("Are you sure you want to delete this item? This action cannot be undone.")) {
      try {
          const response = await fetch("https://sawusdomain.com/Home_JavaScript/InventoryDatabase/PHP/delete.php", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json"
              },
              body: JSON.stringify({ itemId: itemId })
          });

          const responseData = await response.json();
          alert(responseData.message);

          if (responseData.message.includes("successfully")) {
              detailsContainer.style.display = "none"; // Hide details container after deletion
              removeRowFromTable(itemId); // Remove the deleted row from the table
          }
      } catch (error) {
          console.error("Error deleting item:", error);
          alert("Error deleting item: " + error.message);
      }
  } else {
      alert("Deletion canceled.");
  }
}

// Helper function to remove the deleted item from the table
function removeRowFromTable(itemId) {
  const row = document.querySelector(`tr[data-id="${itemId}"]`);
    row.remove();
  
}

async function refreshCategory(category) {
  // Log the category we are looking for
  console.log(`🔍 Looking for table body with ID: tbody-${category}`);

  // Fetch items for the given category from the API
  const url = `https://sawusdomain.com/Home_JavaScript/InventoryDatabase/PHP/selectItems.php?category=${encodeURIComponent(category)}`;
  
  try {
      const response = await fetch(url);
      const items = await response.json();

      // Find the table body for the given category
      let tableBody = document.getElementById(`tbody-${category}`);

      // Log if the table body is found or not
      console.log(`🔍 Found table body:`, tableBody);

      // If table body doesn't exist, create the table for that category
      if (!tableBody) {
          console.log(`❌ Table body not found for category: ${category}, creating new table.`);

          const tableContainer = document.getElementById('tableContainer');

          // Create a new table for the category if it doesn't exist
          const elementTable = document.createElement('div');
          elementTable.id = `table-${category}`;
          elementTable.classList.add("table");
          elementTable.setAttribute('category', category);
          elementTable.style.display = 'block'; // Ensure the table is visible
          elementTable.innerHTML = `
              <h2>${category}</h2>
              <table>
                  <thead>
                      <tr>
                          <th>Description</th>
                          <th>Part Number</th>
                          <th>QOH</th>
                          <th>Last Updated</th>
                      </tr>
                  </thead>
                  <tbody id="tbody-${category}"></tbody>
              </table>
          `;
          tableContainer.appendChild(elementTable);

          // Now get the newly created table body
          tableBody = document.getElementById(`tbody-${category}`);
      }

      // Clear any existing rows in the table body
      tableBody.innerHTML = '';

      // If there are items, create new rows for each item
      if (items.length > 0) {
          items.forEach(item => {
              const row = document.createElement('tr');
              row.setAttribute('data-id', item.id);
              row.setAttribute('data-category', item.category); // Add category as an attribute to each row

              row.innerHTML = `
                  <td class="description">${item.description}</td>
                  <td class="part-number">${item.part_number}</td>
                  <td class="quantity">${item.quantity_on_hand}</td>
                  <td>${item.last_updated}</td>
              `;

              // Attach event listener to each row for showing details
              row.addEventListener("click", function() {
                  showDetails(this);  // Show the details when the row is clicked
              });

              // Append the row to the table body
              tableBody.appendChild(row);
          });
      } else {
          alert('No items found in this category.');
      }

  } catch (error) {
      console.error('Error retrieving items:', error);
      alert('Error retrieving items: ' + error.message);
  }
}

function addToCart() {
  const detailsContainer = document.getElementById("detailsContainer");
  const itemId = detailsContainer.getAttribute("data-id");
  const description = document.getElementById("detail_description").value;
  const partNumber = document.getElementById("detail_part_number").value;
  const quantity = document.getElementById("detail_quantity").value;
  
  const cartTableBody = document.getElementById("cart");
  if (!cartTableBody) return;

  // Check if item already exists in cart
  if (document.getElementById(`cart-item-${itemId}`)) {
      alert("This item is already in your cart.");
      return;
  }

  // Create a new row for the cart
  const cartRow = document.createElement("tr");
  cartRow.id = `cart-item-${itemId}`;
  cartRow.innerHTML = `
      <td>${description}</td>
      <td>${partNumber}</td>
      <td>${quantity}</td>
      <td><input type="number" value="1" class="cart-quantity" min="1"></td>
      <td><button class="remove-cart-item" onclick="removeFromCart('${itemId}')">Remove</button></td>
  `;

  cartTableBody.appendChild(cartRow);

  // Trigger cart icon glow effect
  triggerCartGlow();
}


function triggerCartGlow() {
  const cartIcon = document.getElementById('cartIcon');
  if (!cartIcon) return;

  cartIcon.classList.add('cart-glow');

  setTimeout(() => {
    cartIcon.classList.remove('cart-glow');
  }, 500); // Glow lasts for 0.5 seconds
}

function showDetails(row) {
  const detailsContainer = document.getElementById("detailsContainer");

  // Get the category and item ID from the clicked row
  const itemId = row.getAttribute("data-id");
  const category = row.getAttribute("data-category");  // Retrieve the category from the row
  const description = row.querySelector(".description").textContent;
  const partNumber = row.querySelector(".part-number").textContent;
  const quantity = row.querySelector(".quantity").textContent;

  // Set the correct itemId and category in detailsContainer
  detailsContainer.setAttribute("data-id", itemId);  // Set the item ID in detailsContainer
  detailsContainer.setAttribute("data-category", category);  // Set the category in detailsContainer

  // Populate the details container with the item data
  document.getElementById("detail_id").textContent = itemId;
  document.getElementById("detail_description").value = description;
  document.getElementById("detail_part_number").value = partNumber;
  document.getElementById("detail_quantity").value = quantity;

  // Make sure the details container is visible
  detailsContainer.style.display = "block";  // Show the container
}



// Add a global event listener once to detect clicks outside
document.addEventListener("click", function(event) {
  const detailsContainer = document.getElementById("detailsContainer");

  // Check if the detailsContainer is visible and the click is outside
  if (detailsContainer.style.display === "block" && !detailsContainer.contains(event.target) && !event.target.closest("tr")) {
      detailsContainer.style.display = "none";
  }
});



function printCategoryTable(category) {
  const tableBody = document.getElementById(`tbody-${category}`);
  if (!tableBody || tableBody.children.length === 0) {
    alert(`No items found in category: ${category}`);
    return;
  }

  let printableHTML = `
    <html>
    <head>
      <title>${category} Inventory Sheet</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 15px;
          font-size: 0.8rem;
        }

        h1 {
          text-align: center;
          border-bottom: 1px solid #000;
          padding-bottom: 5px;
        }

        table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 1rem;
        }

        th, td {
          padding: 0.25rem;
          text-align: left;
          border: 1px solid #000;
        }
      </style>
    </head>
    <body>
      <h1>${category} Inventory Sheet</h1>
      <table>
        <thead>
          <tr>
            <th>Description</th>
            <th>Part Number</th>
            <th>QOH</th>
            <th>Last Modified</th>
          </tr>
        </thead>
        <tbody>
  `;

  Array.from(tableBody.children).forEach(row => {
    const description = row.querySelector('.description')?.innerText || '';
    const partNumber = row.querySelector('.part-number')?.innerText || '';
    const quantity = row.querySelector('.quantity')?.innerText || '';
    const lastUpdated = row.children[3]?.innerText || '';

    printableHTML += `
      <tr>
        <td>${description}</td>
        <td>${partNumber}</td>
        <td>${quantity}</td>
        <td>${lastUpdated}</td>
      </tr>
    `;
  });

  printableHTML += `
        </tbody>
      </table>
    </body>
    </html>
  `;

  const printWindow = window.open('', '', 'height=1000,width=1400');
  printWindow.document.write(printableHTML);
  printWindow.document.close();
  printWindow.focus();
  printWindow.print();
  printWindow.close();
}

function printCategoryCountSheet(category) {
  const tableBody = document.getElementById(`tbody-${category}`);
  if (!tableBody || tableBody.children.length === 0) {
    alert(`No items found in category: ${category}`);
    return;
  }

  let printableHTML = `
    <html>
    <head>
      <title>${category} Count Sheet</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 15px;
          font-size: 0.8rem;
        }

        h1 {
          text-align: center;
          border-bottom: 1px solid #000;
          padding-bottom: 5px;
        }

        table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 1rem;
        }

        th, td {
          padding: 0.25rem;
          text-align: left;
          border: 1px solid #000;
        }
      </style>
    </head>
    <body>
      <h1>${category} Count Sheet</h1>
      <table>
        <thead>
          <tr>
            <th>Description</th>
            <th>Part Number</th>
            <th>Count</th>
          </tr>
        </thead>
        <tbody>
  `;

  Array.from(tableBody.children).forEach(row => {
    const description = row.querySelector('.description')?.innerText || '';
    const partNumber = row.querySelector('.part-number')?.innerText || '';

    printableHTML += `
      <tr>
        <td>${description}</td>
        <td>${partNumber}</td>
        <td></td>
      </tr>
    `;
  });

  printableHTML += `
        </tbody>
      </table>
    </body>
    </html>
  `;

  const printWindow = window.open('', '', 'height=1000,width=1400');
  printWindow.document.write(printableHTML);
  printWindow.document.close();
  printWindow.focus();
  printWindow.print();
  printWindow.close();
}
