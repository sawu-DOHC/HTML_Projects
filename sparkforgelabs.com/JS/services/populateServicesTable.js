async function populateServicesTable() {
  try {
    const response = await fetch('https://sparkforgelabs.com/PHP/getServices.php');

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const services = await response.json();
    const tbody = document.getElementById('services-tbody');
    tbody.innerHTML = ''; // Clear previous content


    // 💳 Hardcoded affiliate gift card row at the end
    const giftRow = document.createElement('tr');
    giftRow.innerHTML = `
      <td>Gift Cards</td>
      <td>Varies</td>
      <td>Any</td>
      <td>Varies</td>
      <td>
        <a href="https://giftup.app/place-order/93ebbe45-1091-4a2f-c56e-08dcff1fd9d6?platform=hosted" target="_blank" class="register-btn">
          Buy Gift Card
        </a>
      </td>
    `;
    tbody.appendChild(giftRow);
    
    for (const service of services) {
      const row = document.createElement('tr');

      row.id = `service-${service.service_id}`;
      row.dataset.serviceId = service.service_id;
      row.dataset.price = service.price;
      row.dataset.description = service.description;
      row.dataset.name = service.name;

      // All services temporarily disabled for now
      const registerBtnHTML = `
      <button 
        style="background-color: #888; color: #ddd; cursor: not-allowed; pointer-events: none; border: none; padding: 0.5rem 1rem; font-size: 1.25rem;"
      >
        Coming Soon
      </button>
    `;
    

      row.innerHTML = `
      <td data-label="Service">${service.name}</td>
      <td data-label="Duration">${service.duration}</td>
      <td data-label="Style">${service.style}</td>
      <td data-label="Price">$${service.price}</td>
      <td data-label="Register">${registerBtnHTML}</td>
    `;
    


      tbody.appendChild(row);
    }



  } catch (error) {
    console.error('Error fetching services:', error);
  }
}

populateServicesTable();
