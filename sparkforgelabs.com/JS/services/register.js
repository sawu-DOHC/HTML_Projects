function openRegisterModal( event ) {
  event.preventDefault();
  event.stopPropagation();

  const row_htmlElement = event.target.closest( 'tr' );
  const serviceName_string = row_htmlElement.dataset.name;
  const serviceDescription_string = row_htmlElement.dataset.description;
  const servicePrice_string = row_htmlElement.dataset.price;
  const serviceId_string = row_htmlElement.dataset.serviceId;

  document.getElementById( 'service-name' ).textContent = serviceName_string;
  document.getElementById( 'service-description' ).textContent = serviceDescription_string;
  document.getElementById( 'service-price' ).textContent = `$${servicePrice_string}`;

  document.getElementById( 'register-form' ).setAttribute( 'data-service-id', serviceId_string );

  document.getElementById( 'register-overlay' ).classList.add( 'show' );

  document.getElementById( 'paypal-button-container' ).innerHTML = ''; 
  initializePayPalButton( servicePrice_string );
}

  function closeRegisterModal() {
    document.getElementById('register-overlay').classList.remove('show');
  }
  