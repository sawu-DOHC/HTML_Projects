function handleSubmit(event) {
    event.preventDefault();
  
    const formElement = document.getElementById('register-form');
    const formData = new FormData(formElement);
  
    // Get service ID from the form's dataset and add it to the FormData
    const serviceId = formElement.dataset.serviceId;
    formData.append('service_id', serviceId);
  
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
  
    console.log('Form submitted:');
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Phone:', phone);
    console.log('Service ID:', serviceId);
    console.log('Service Name:', document.getElementById('service-name').textContent);
    console.log('Description:', document.getElementById('service-description').textContent);
    console.log('Price:', document.getElementById('service-price').textContent);
  

  
    closeRegisterModal()
}
