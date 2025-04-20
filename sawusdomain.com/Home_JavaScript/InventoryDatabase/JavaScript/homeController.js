function homeController() {

  const takeInventoryButton = document.getElementById('takeInventoryButton');
  const printInventoryButton = document.getElementById('printInventoryButton');
  const addNewItemButton = document.getElementById('add-new-item-button');

  if (takeInventoryButton) {
      takeInventoryButton.addEventListener('click', takeInventory);
  }

  if (printInventoryButton) {
      printInventoryButton.addEventListener('click', printInventory);
  }

}
function toggleHome() {
  const homeIcon = document.getElementById('homeIcon');
  const homeContainer = document.getElementById('homeContainer');

  if (homeIcon.classList.contains('active')) {
    console.log("Home is active, hiding home.");
    homeIcon.classList.remove('active');
    homeContainer.style.display = "none"; // Hide the home container
  } else {
    console.log("Home is inactive, showing home.");
    homeIcon.classList.add('active');
    homeContainer.style.display = "block"; // Show the home container
  }
}


async function takeInventory() {
  try {
      const json_data = await fetchInventoryData();
      let printableHTML = `
          <html>
          <head>
            <title>Inventory Count</title>
<style>
    body {
        font-family: Arial, sans-serif;
        margin: 20px;
    }

    h1 {
        text-align: center;
    }

    table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 0;
    }

    th, td {
        border: 1px solid #ccc;
        padding: 2px;
        text-align: left;
        max-width: 200px; 
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    th {
        background-color: #f4f4f9;
        text-align: center;
    }
</style>


          </head>
          <body>
            <h1>Inventory Count</h1>
            <table>
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Description</th>
                  <th>Part Number</th>
                  <th>QOH</th>
                  <th>Count</th>
                </tr>
              </thead>
              <tbody>
      `;
      
      for (let item of json_data) {
          printableHTML += `
              <tr>
                <td>${item.category}</td>
                <td>${item.description}</td>
                <td>${item.part_number}</td>
                <td>${item.quantity_on_hand}</td>
                <td></td>
              </tr>
          `;
      }
      
      printableHTML += `
              </tbody>
            </table>
          </body>
          </html>
      `;
      
      const printWindow = window.open('', '', 'height=1200,width=1600');
      printWindow.document.write(printableHTML);
      printWindow.document.close();
      printWindow.focus();
      printWindow.print();
      printWindow.close();
  } catch (error) {
      console.error('Error taking inventory:', error);
  }
}
async function printInventory() {
  try {
      const json_data = await fetchInventoryData();
      let printableHTML = `
          <html>
          <head>
            <title>Print Inventory</title>
<style>
    body {
        font-family: Arial, sans-serif;
        margin: 20px;
    }

    h1 {
        text-align: center;
    }

    table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 0;
    }

    th, td {
        border: 1px solid #ccc;
        padding: 2px;
        text-align: left;
        max-width: 200px; 
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    th {
        background-color: #f4f4f9;
        text-align: center;
    }
</style>

          </head>
          <body>
            <h1>Inventory List</h1>
            <table>
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Description</th>
                  <th>Part Number</th>
                  <th>QOH</th>
                </tr>
              </thead>
              <tbody>
      `;

      for (let item of json_data) {
          printableHTML += `
              <tr>
                <td>${item.category}</td>
                <td>${item.description}</td>
                <td>${item.part_number}</td>
                <td>${item.quantity_on_hand}</td>
              </tr>
          `;
      }

      printableHTML += `
              </tbody>
            </table>
          </body>
          </html>
      `;

      const printWindow = window.open('', '', 'height=1200,width=1600');
      printWindow.document.write(printableHTML);
      printWindow.document.close();
      printWindow.focus();
      printWindow.print();
      printWindow.close();
  } 
  catch (error) {
      console.error("Error printing inventory:", error);
  }
}
