function Interface_InventoryDatabase() {
    
    const targetElement = document.querySelector("#Window-Body-21");

    if (!targetElement) {
        console.error("Element with ID 'Window-Body-21' not found.");
        return;
    }
    console.log("Window body found");

    const cssFiles = [
        "https://sawusdomain.com/Home_JavaScript/InventoryDatabase/CSS/iconContainer.css",
        "https://sawusdomain.com/Home_JavaScript/InventoryDatabase/CSS/navContainer.css",
        "https://sawusdomain.com/Home_JavaScript/InventoryDatabase/CSS/tableContainer.css",
        "https://sawusdomain.com/Home_JavaScript/InventoryDatabase/CSS/homeContainer.css",
        "https://sawusdomain.com/Home_JavaScript/InventoryDatabase/CSS/cartContainer.css",
        "https://sawusdomain.com/Home_JavaScript/InventoryDatabase/CSS/detailsContainer.css",
    ];

    const jsFiles = [
        "https://sawusdomain.com/Home_JavaScript/InventoryDatabase/JavaScript/navController.js",
        "https://sawusdomain.com/Home_JavaScript/InventoryDatabase/JavaScript/tableController.js",
        "https://sawusdomain.com/Home_JavaScript/InventoryDatabase/JavaScript/homeController.js",
        "https://sawusdomain.com/Home_JavaScript/InventoryDatabase/JavaScript/cartController.js",
        "https://sawusdomain.com/Home_JavaScript/InventoryDatabase/JavaScript/detailsController.js",
    ];


    function loadCSS( path ) {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = path;
        link.onload = () => console.log(`CSS loaded: ${path}`);
        link.onerror = () => console.error(`Failed to load CSS: ${path}`);
        document.head.appendChild(link);
    }

    function loadJS( path ) {
        const script = document.createElement("script");
        script.src = path;
        script.onload = () => console.log(`JS loaded: ${path}`);
        script.onerror = () => console.error(`Failed to load JS: ${path}`);
        document.head.appendChild(script);
    }


    for ( let i = 0; i < cssFiles.length; i++ ) {
        loadCSS(cssFiles[i]);
    }

    for ( let j = 0; j < jsFiles.length; j++ ) {
        loadJS( jsFiles[j] );
    }

    // Clear previous content (if necessary)
    targetElement.innerHTML = '';

    // Append iconContainer content
    targetElement.innerHTML += `
        <div id="iconContainer">
            <div id="homeIcon" class="iconButton" onclick="toggleHome()">&#127968;</div>
            <div id="cartIcon" class="iconButton" onclick="toggleCart()">&#128722;</div>
        </div>
    `;

    // Append navContainer content
    targetElement.innerHTML += `
        <div id="navContainer">
            <!-- Navigation content goes here -->
        </div>
    `;

    // Append homeContainer content
    targetElement.innerHTML += `
        <div id="homeContainer">
            <h2>Home</h2>
            <div class="controls">
                <button id="takeInventoryButton" class="home-button">Take Inventory</button>
                <button id="printInventoryButton" class="home-button">Print Inventory</button>
            </div>

            <div class="sub-category">
                <h3>Add New Item</h3>
                <div class="item-form">
                    <table>
                        <thead>
                            <tr>
                                <th>Description</th>
                                <th>Part Number</th>
                                <th>Quantity</th>
                                <th>Category</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr id="row-new">
                                <td class="description"><input type="text" id="new_description" placeholder="Enter description"></td>
                                <td class="part-number"><input type="text" id="new_part_number" placeholder="Enter p/n"></td>
                                <td class="qoh"><input type="number" id="new_qoh" placeholder="Enter qty"></td>
                                <td class="category">
                                    <select id="new_category">
                                        <option value="MIG">MIG</option>
                                        <option value="TIG">TIG</option>
                                        <option value="Stick">Stick</option>
                                        <option value="Oxy-Fuel">Oxy-Fuel</option>
                                        <option value="Plasma">Plasma</option>
                                        <option value="Maintenance">Maintenance</option>
                                        <option value="Raw-Material">Raw-Material</option>
                                        <option value="PPE">PPE</option>
                                        <option value="Gas">PPE</option>
                                    </select>
                                </td>
                                <td class="actions">
                                    <button id="add-new-item-button" onclick="addNewItem()">Add</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    `;
    
    // Append cartContainer content
    targetElement.innerHTML += `

    <div id="cartContainer">
    <h2>Cart</h2>
    <button id="print-button" onclick="printCart()">Print</button>
    <div class="item-form">
        <table>
            <thead>
                <tr>
                    <th>Description</th>
                    <th>Part Number</th>
                    <th>Category</th> 
                    <th>Quantity</th> 
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody id="cart">
            </tbody>
        </table>
    </div>
    </div>

    `;

    // Append tableContainer content
    targetElement.innerHTML += `
        <div id="tableContainer">
            <!-- Placeholder for future table content -->
        </div>
    `;

    // Append detailsContainer content
    targetElement.innerHTML += `
        <div id="detailsContainer" data-id="" category="">
            <div class="detail-id-container">
                <label for="detail_id">Item ID:</label>
                <span id="detail_id">detail-id</span>
            </div>

            <div class="detail-row">
                <label for="detail_description">Description:</label>
                <input type="text" id="detail_description" value="Description" disabled>
            </div>

            <div class="detail-row">
                <label for="detail_part_number">Part Number:</label>
                <input type="text" id="detail_part_number" value="Part Number" disabled>
            </div>

            <div class="detail-row">
                <label for="detail_quantity">Quantity:</label>
                <input type="text" id="detail_quantity" value="Quantity" disabled>
            </div>

            <div class="details-buttons">
                <button id="addDetailButton" onclick="addToCart()">Add To Cart</button>
                <button id="editDetailButton" onclick="toggleEditSave(this)">Edit</button>
                <button id="deleteDetailButton" onclick="deleteItem()">Delete</button>
            </div>
        </div>

    `;


}

Interface_InventoryDatabase();
