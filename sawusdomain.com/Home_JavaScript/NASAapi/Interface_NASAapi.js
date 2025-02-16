function Interface_NASAapi() {

    const windowBody = document.querySelector("#Window-Body-8");
    //console.log("Selected window-body: ", windowBody);

    windowBody.innerHTML = '';

    const descriptionDiv = document.createElement('div');
    descriptionDiv.id = "description";
    descriptionDiv.innerHTML = `
        This web application allows you to view the Astronomy Picture of the Day (APOD) provided by NASA.
        Select a date and the application will fetch the image and its description using NASA's API.
        The application makes an HTTP GET request to their API endpoint with the selected date as a parameter. 
        The API responds with JSON data containing the image URL, title, and description. This data is then displayed on the page.
    `;
    
    const datePickerDiv = document.createElement('div');
    datePickerDiv.id = "date-picker";
    
    const dateLabel = document.createElement('label');
    dateLabel.setAttribute('for', 'dateBox');
    dateLabel.textContent = 'Select a Date:';
    
    const dateInput = document.createElement('input');
    dateInput.type = 'date';
    dateInput.id = 'dateBox';
    
    const getButton = document.createElement('button');
    getButton.id = 'getButton';
    getButton.className = 'button';
    getButton.textContent = 'Get';
    
    const warningDiv = document.createElement('div');
    warningDiv.id = "warning";
    
    const nasaImage = document.createElement('img');
    nasaImage.id = 'nasaImage';
    nasaImage.src = 'Home_Assets/jpegIcon.png';
    nasaImage.alt = 'Default Image';

    const nasaVideo = document.createElement('iframe');
    nasaVideo.id = 'nasaVideo';
    nasaVideo.style.display = "none";

    const imageDescription = document.createElement('div');
    imageDescription.id = 'imageDescription';


    windowBody.appendChild(descriptionDiv);
    windowBody.appendChild(datePickerDiv);
    datePickerDiv.appendChild(dateLabel);
    datePickerDiv.appendChild(dateInput);
    datePickerDiv.appendChild(getButton);
    windowBody.appendChild(warningDiv);
    windowBody.appendChild(nasaImage);
    windowBody.appendChild(nasaVideo);
    windowBody.appendChild(imageDescription);
  


}

Interface_NASAapi();