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
    windowBody.appendChild(descriptionDiv);

    const datePickerDiv = document.createElement('div');
    datePickerDiv.id = "date-picker";
    

    const dateLabel = document.createElement('label');
    dateLabel.setAttribute('for', 'dateBox');
    dateLabel.textContent = 'Select a Date:';
    datePickerDiv.appendChild(dateLabel);
    

    const dateInput = document.createElement('input');
    dateInput.type = 'date';
    dateInput.id = 'dateBox';
    datePickerDiv.appendChild(dateInput);
    

    const getButton = document.createElement('button');
    getButton.id = 'getButton';
    getButton.className = 'button';
    getButton.textContent = 'Get';
    datePickerDiv.appendChild(getButton);
    
    windowBody.appendChild(datePickerDiv);

    const warningDiv = document.createElement('div');
    warningDiv.id = "warning";
    windowBody.appendChild(warningDiv);

    const dataContainerDiv = document.createElement('div');
    dataContainerDiv.id = "dataContainer";

    const nasaImage = document.createElement('img');
    nasaImage.id = 'nasaImage';
    nasaImage.src = 'Home_Assets/jpegIcon.png';
    nasaImage.alt = 'Default Image';

    const nasaVideo = document.createElement('iframe');
    nasaVideo.id = 'nasaVideo';

    const imageDescription = document.createElement('div');
    imageDescription.id = 'imageDescription';

    dataContainerDiv.appendChild(nasaImage);
    dataContainerDiv.appendChild(nasaVideo);
    dataContainerDiv.appendChild(imageDescription);
    windowBody.appendChild(dataContainerDiv);


}

Interface_NASAapi();