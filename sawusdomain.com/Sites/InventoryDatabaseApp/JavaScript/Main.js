
let cart = new Cart(); 

function showTable( category ) {


    // Get all the table elements and remove the "active" class using a for loop
    var tables = document.querySelectorAll('.folder');
    for (var i = 0; i < tables.length; i++) {
        tables[i].classList.remove('active');
    }

    // Get all the tab elements and remove the "active" class using a for loop
    var tabs = document.querySelectorAll('.tab');
    for (var j = 0; j < tabs.length; j++) {
        tabs[j].classList.remove('active');
    }

    // Show the active table corresponding to the category
    var activeTable = document.getElementById( category );
    activeTable.classList.add('active');

    // Highlight the active tab using a for loop
    for (var k = 0; k < tabs.length; k++) {
        if (tabs[k].textContent === category) {  // Removed .trim() here
            tabs[k].classList.add('active');
            break;
        }
    }

}

document.addEventListener('DOMContentLoaded', async function() {


    showTable('MIG');

    var jsonData = await fetchData();

    const migItems = jsonData.filter(item => item.category === 'MIG');
    const tigItems = jsonData.filter(item => item.category === 'TIG');
    const stickItems = jsonData.filter(item => item.category === 'Stick');
    const oxyFuelItems = jsonData.filter(item => item.category === 'Oxy Fuel');
    const plasmaItems = jsonData.filter(item => item.category === 'Plasma');
    const maintenanceItems = jsonData.filter(item => item.category === 'Maintenance');
    const rawMaterialItems = jsonData.filter(item => item.category === 'Raw Material');
    const ppeItems = jsonData.filter(item => item.category === 'PPE');

    const tableBodies = {
        mig: document.querySelector('#migTable'),
        tig: document.querySelector('#tigTable'),
        stick: document.querySelector('#stickTable'),
        oxyFuel: document.querySelector('#oxyFuelTable'),
        plasma: document.querySelector('#plasmaTable'),
        maintenance: document.querySelector('#maintenanceTable'),
        rawMaterial: document.querySelector('#rawMaterialTable'),
        ppe: document.querySelector('#ppeTable')
    };

    insertRowsIntoTable(migItems, tableBodies.mig);
    insertRowsIntoTable(tigItems, tableBodies.tig);
    insertRowsIntoTable(stickItems, tableBodies.stick);
    insertRowsIntoTable(oxyFuelItems, tableBodies.oxyFuel);
    insertRowsIntoTable(plasmaItems, tableBodies.plasma);
    insertRowsIntoTable(maintenanceItems, tableBodies.maintenance);
    insertRowsIntoTable(rawMaterialItems, tableBodies.rawMaterial);
    insertRowsIntoTable(ppeItems, tableBodies.ppe);


    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', () => {
            const row = button.closest('tr');
            const itemId = row.getAttribute('data-item-id');
            const description = row.querySelector('.description').textContent;
            const partNumber = row.querySelector('.part-number').textContent;
            const quantity = row.querySelector('.qoh').textContent; 

            cart.addItem(itemId, description, partNumber, quantity);
        });
    });


    document.getElementById("printCartButton").addEventListener('click', function() {
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
        return data;
    } 
    catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
}

function insertRowsIntoTable(items, tableBody) {
    items.forEach(item => {
        var row = new Row(item.id, item.description, item.part_number, item.quantity_on_hand, item.last_updated);
        row.insertRow(tableBody);
    });
}
