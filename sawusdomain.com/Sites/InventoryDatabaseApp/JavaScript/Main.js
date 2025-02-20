let cart = new Cart();

document.addEventListener('DOMContentLoaded', async function() {


    // get json 
    var json_data = await fetchData();

    // extract categories
    var set_string_categories = new Set(); // gonnna use the good ol' set to not have to bother checking for unique-ness
    
    for ( var i = 0; i < json_data.length; i++ ) {

        set_string_categories.add( json_data[i].category );
    }
    
    console.log( "Categories", Array.from( set_string_categories ) );
    


    // make folder div for each category with a table that can be populated with items/rows
    
    const mainDiv = document.querySelector("main");

    var set_object_folders = new Set();

    for ( const category of set_string_categories ) {

        const newFolder = new Folder( category );

        set_object_folders.add( newFolder );

    }


    // for each category, extract all associtated objects from json and create row objects, poplate the folders inner table with the contents



    for ( const object_folder of set_object_folders ) {

        var filteredItems = json_data.filter( element => element.category === object_folder.string_category );

        for ( const element of filteredItems ) {

            let newRow = new Row(element.id, element.category, element.description, element.part_number, element.quantity_on_hand, element.last_updated);
            
            
        }

        
        
    }


    // add new item functionality in home page

    
    const addButton = document.getElementById( "add-to-cart" );

    addButton.addEventListener("click", addNewItem);


    // default to home page
    showFolder("Home");

    


    const takeInventoryButton = document.getElementById("takeInventoryButton");

    takeInventoryButton.addEventListener("click", takeInventory);
    

    const printInventoryButton = document.getElementById("printInventoryButton");

    printInventoryButton.addEventListener("click", printInventory );
    
    document.getElementById("print").addEventListener("click", function() {
        cart.printCart();
    });
    


});
async function fetchData() {
    try {
        var response = await fetch('https://sawusdomain.com/Sites/InventoryDatabaseApp/PHP/select.php');
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        var data = await response.json();
        console.log(data);
        return data;
    } 
    catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
}

function showFolder( category ) {

    var folders = document.querySelectorAll('.folder');
    for (var i = 0; i < folders.length; i++) {
        folders[i].classList.remove('active');
    }

    var tabs = document.querySelectorAll('.tab');
    for (var j = 0; j < tabs.length; j++) {
        tabs[j].classList.remove('active');
    }

    var activeFolder = document.getElementById(category + "-Folder");
    if (activeFolder) {
        activeFolder.classList.add('active');
    }
    for (var k = 0; k < tabs.length; k++) {

        if (tabs[k].textContent.trim() === category) {
            tabs[k].classList.add('active');
            break;
        }
    }








}

function addNewItem() {
    const descriptionField = document.getElementById("description");
    const partNumberField = document.getElementById("part_number");
    const quantityField = document.getElementById("qoh");
    const categoryField = document.getElementById("category");

    const description = descriptionField.value;
    const partNumber = partNumberField.value;
    const quantity = quantityField.value;
    const category = categoryField.value;

    console.log("Add new item:", description, partNumber, quantity, category);

    fetch("https://sawusdomain.com/Sites/InventoryDatabaseApp/PHP/insert.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            description: description,
            partNumber: partNumber,
            quantity: quantity,
            category: category
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log(data.message);
        descriptionField.value = "";
        partNumberField.value = "";
        quantityField.value = "";
        categoryField.selectedIndex = 0;
    })
    .catch(error => console.error("Error:", error));
}

async function takeInventory() {
    try {
        const json_data = await fetchData();
        let printableHTML = `
            <html>
            <head>
              <title>Inventory Count</title>
                <style>
                  body { font-family: Arial, sans-serif; margin: 20px; }
                  h1 { text-align: center; }
                  table { width: 100%; border-collapse: collapse; margin-top: 0; }
                  th, td { border: 1px solid #ccc; padding: 2px; text-align: left; }
                  th { background-color: #f4f4f9; text-align: center; }
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
        const json_data = await fetchData();
        let printableHTML = `
            <html>
            <head>
              <title>Print Inventory</title>
              <style>
                body { font-family: Arial, sans-serif; margin: 20px; }
                h1 { text-align: center; }
                table { width: 100%; border-collapse: collapse; margin-top: 0; }
                th, td { border: 1px solid #ccc; padding: 2px; text-align: left; }
                th { background-color: #f4f4f9; text-align: center; }
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


