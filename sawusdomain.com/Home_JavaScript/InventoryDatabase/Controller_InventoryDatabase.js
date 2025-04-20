async function Controller_InventoryDatabase() {

  let inventoryData;  

  try {

    inventoryData = await fetchInventoryData();  

    console.log('Inventory Data Fetched:', inventoryData);  

    navController(inventoryData);
    homeController();
    cartController();
    //iconController();
    tableController(inventoryData);

  } 
  catch (error) {
    console.error(' somethin aint right ', error  );

  }

  this.ma

}

Controller_InventoryDatabase();



async function fetchInventoryData() {
  const response = await fetch('https://sawusdomain.com/Home_JavaScript/InventoryDatabase/PHP/select.php');
  if (!response.ok) {
      throw new Error('Network response was not ok: ' + response.statusText);
  }
  return response.json();
}





async function addNewItem() {
  const newDescriptionField = document.getElementById("new_description");
  const newPartNumberField = document.getElementById("new_part_number");
  const newQuantityField = document.getElementById("new_qoh");
  const newCategoryField = document.getElementById("new_category");

  const description = newDescriptionField.value;
  const partNumber = newPartNumberField.value;
  const quantity = newQuantityField.value;
  const category = newCategoryField.value;

  console.log("Add new item:", description, partNumber, quantity, category);

  try {
      const payload = { description, partNumber, quantity, category };

      const response = await fetch(
          "https://sawusdomain.com/Home_JavaScript/InventoryDatabase/PHP/insert.php",
          {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(payload)
          }
      );

      if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data.message);

      // Reset fields after successful addition
      newDescriptionField.value = "";
      newPartNumberField.value = "";
      newQuantityField.value = "";
      newCategoryField.selectedIndex = 0;

      // Refresh inventory to reflect the newly added item
      await refreshCategory(category);
  } catch (error) {
      console.error("Error adding new item:", error);
  }
}


function handleScreenSizeChange() {
  const navContainer = document.getElementById('navContainer');
  const navIcon = document.getElementById('navIcon');
  const window21 = document.getElementById('window-21'); // Assuming 'window-21' is the ID of your div

  // Get the width of the div
  const window21Width = window21.offsetWidth;

  // Check both the window width and the div's width
  if ( window.innerWidth >= 1000 || window21Width >= 1000 ) {
      // Show nav by default if both conditions are met
      navContainer.style.display = "flex";
      navIcon.classList.add('active');
  } 
  else {

  }
}



async function insertStylesheet(hypertextReference, identifier) {
    return new Promise((resolve, reject) => {
        if (document.getElementById(identifier)) {
            console.warn(`Stylesheet ${identifier} is already loaded.`);
            return resolve();
        }
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = hypertextReference;
        link.id = identifier;
        link.onload = () => resolve();
        link.onerror = () => reject(new Error(`Failed to load stylesheet from ${hypertextReference}`));
        document.head.appendChild(link);
    });
}




async function insertScript(source, identifier) {
    return new Promise((resolve, reject) => {
        if (document.getElementById(identifier)) {
            console.warn(`Script ${identifier} is already loaded.`);
            return resolve();
        }
        const script = document.createElement('script');
        script.src = source;
        script.defer = true;
        script.id = identifier;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error(`Failed to load script from ${source}`));
        document.head.appendChild(script);
    });
}






