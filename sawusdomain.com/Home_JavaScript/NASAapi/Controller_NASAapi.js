async function Controller_NASAapi() {

    let warning = document.getElementById("warning");
    let nasaImage = document.getElementById("nasaImage");
    let nasaVideo = document.getElementById("nasaVideo");
    let imageDescription = document.getElementById("imageDescription");
    let getButton = document.getElementById('getButton');
    let dateInput = document.getElementById('dateBox');

    getButton.addEventListener('click', async () => {

        dateInput = document.getElementById("dateBox").value;

        const apiKey = 'OBucfKBJ8Cvj8YUy1hd1h089azgMdsU6eIaIA3uQ';
        const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${dateInput}`;

        try {
            const response = await fetch( apiUrl );

            if ( response.status === 400 ) {
                warning.textContent = "NASA's API only goes back to June 16, 1995.";


                nasaImage.src = "Home_Assets/jpegIcon.png";
                nasaImage.style.display = "block";
                nasaImage.style.height = "auto";
                nasaImage.style.width = "atuo";


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
                nasaImage.style.height = "45rem";
                nasaImage.style.width = "60rem";

                nasaVideo.style.display = "none";
            } 
            else if ( data.media_type === "video" ) {
                nasaVideo.src = data.url;
                nasaVideo.style.display = "block";
                nasaVideo.style.height = "45rem";
                nasaVideo.style.width = "60rem";

                nasaImage.style.display = "none";
            }
        } 
        catch ( error ) {
            console.error("Controller_NASAapi.getButton.addEventListener(): error fetching data.", error );
        }
    });
}
Controller_NASAapi();