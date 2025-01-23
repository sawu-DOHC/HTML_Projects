document.addEventListener("DOMContentLoaded", function () {

    const signatureDateField = document.getElementById("signature-date_Field");

    function prefillSignatureDate() {

        const today = new Date();

        const formattedDate = today.toLocaleDateString("en-CA"); // Formats as YYYY-MM-DD
        
        signatureDateField.value = formattedDate;
    }

    prefillSignatureDate();
});