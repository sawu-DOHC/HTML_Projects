document.addEventListener( "DOMContentLoaded", function () {

    const dobField = document.getElementById("dob_Field"); 
    const ageField = document.getElementById("age_Field"); 

    function calculateAge( dob ) {
        const today = new Date();
        let age = today.getFullYear() - dob.getFullYear();
        const monthDiff = today.getMonth() - dob.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
            age--;
        }
        return age;
    }

    function validateAndSetAge() {
        const dobValue = dobField.value;
        if (!dobValue) {
            ageField.value = ""; 
            return;
        }

        const dob = new Date(dobValue);
        const age = calculateAge(dob);

        if (age < 18 || age > 120) {
            alert("Age must be between 18 and 120.");
            dobField.value = ""; 
            ageField.value = ""; 
        } 
        else {
            ageField.value = age; 
        }
    }

    // atach "Blur" event listener that gets called on text box exit
    dobField.addEventListener("blur", validateAndSetAge);
});
