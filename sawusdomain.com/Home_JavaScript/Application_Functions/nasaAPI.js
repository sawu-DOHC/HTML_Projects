async function fetchNASAData() {
    const warning = document.getElementById("warning");
    const dateInput = document.getElementById("dateBox").value;
    const nasaImage = document.getElementById("nasaImage");
    const nasaVideo = document.getElementById("nasaVideo");
    const imageDescription = document.getElementById("imageDescription");
    const apiKey = 'OBucfKBJ8Cvj8YUy1hd1h089azgMdsU6eIaIA3uQ';
    const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${dateInput}`;

    const response = await fetch(apiUrl);

    if (response.status === 400) {

        warning.textContent = "NASA's API only goes back to June 16, 1995.";
        warning.style.display = "block";

        nasaImage.src = "Home_Assets/jpegIcon.png";
        nasaImage.style.display = "block";
        nasaVideo.style.display = "none";
        imageDescription.textContent = "";

        return;
    }

    const data = await response.json();
    
    warning.textContent = "";
    imageDescription.textContent = data.explanation;

    if ( data.media_type === "image" ) {

        nasaImage.src = data.url;
        nasaImage.alt = data.title;
        nasaImage.style.display = "block";
        nasaVideo.style.display = "none";
    } 
    else if ( data.media_type === "video" ) {

        nasaVideo.src = data.url;
        nasaVideo.style.display = "block";
        nasaImage.style.display = "none";
    }
}
