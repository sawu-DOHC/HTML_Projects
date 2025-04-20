function navController( inventoryData ) {

    const categories = new Set(); // Initialize a set to store unique categories
  
    // Directly iterate through inventoryData and add each category to the set
    inventoryData.forEach(item => {
      categories.add(item.category);
    });
  
    const navContainer = document.getElementById("navContainer"); // Get the nav container
  
    // Clear existing content in the nav container to avoid duplicating tabs
    navContainer.innerHTML = '';
  
    // Iterate over each unique category and create a nav tab
    categories.forEach(category => {
      const navTab = document.createElement('div');
      navTab.id = `nav-tab-${category}`;
      navTab.className = 'tab';
      navTab.textContent = category;
      navTab.setAttribute('category', category); // Adding 'category' attribute to each tab
      navTab.addEventListener('click', function() { showTable(category); });
  
      navContainer.appendChild(navTab); // Append the nav tab to the nav container
    });
  
    console.log(categories); // Output the set to the console to see the unique categories
}

function toggleNav() {
  // Only run nav toggle logic if viewport width is below 1000px
  if (window.innerWidth < 1000) {
    const cartIcon = document.getElementById('cartIcon');
    const homeIcon = document.getElementById('homeIcon');
    const navIcon = document.getElementById('navIcon');

    const cartContainer = document.getElementById('cartContainer');
    const homeContainer = document.getElementById('homeContainer');
    const navContainer = document.getElementById('navContainer');

    // If nav icon is already active, deactivate and hide nav container
    if (navIcon.classList.contains('active')) {
      navIcon.classList.remove('active');
      navContainer.style.display = "none";
    } 
    else {
      // Activate nav icon, deactivate the others
      navIcon.classList.add('active');
      cartIcon.classList.remove('active');
      homeIcon.classList.remove('active');

      // Show nav container
      navContainer.style.display = "flex";

      // Hide the other containers
      cartContainer.style.display = "none";
      homeContainer.style.display = "none";
    }
  }
}
function showTable(category) {
  // Hide all tables first
  document.querySelectorAll('.table').forEach(table => {
      table.style.display = 'none';
  });

  // Find the table associated with the clicked tab's category and display it
  const tableToShow = document.getElementById(`table-${category}`);
  if (tableToShow) {
      tableToShow.style.display = 'block';
  }

  // Remove the 'active' class from all tabs to reset their state
  document.querySelectorAll('.tab').forEach(tab => {
      tab.classList.remove('active');
  });

  // Add the 'active' class to the tab that matches the current category
  const activeTab = document.querySelector(`.tab[category="${category}"]`);
  if (activeTab) {
      activeTab.classList.add('active');
  }
}
