document.addEventListener("DOMContentLoaded", function () {
    // Field Selection
    const dobField = document.getElementById("dob_Field"); // Date of Birth field
    const ageField = document.getElementById("age_Field"); // Age field

    // Calculate Age Function
    function calculateAge(dob) {
        const today = new Date();
        let age = today.getFullYear() - dob.getFullYear();
        const monthDiff = today.getMonth() - dob.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
            age--;
        }
        return age;
    }

    // Validation on Blur
    function validateAndSetAge() {
        const dobValue = dobField.value;
        if (!dobValue) {
            ageField.value = ""; // Clear the age field if DOB is empty
            return;
        }

        const dob = new Date(dobValue);
        const age = calculateAge(dob);

        if (age < 18 || age > 120) {
            alert("Age must be between 18 and 120.");
            dobField.value = ""; // Clear the DOB field
            ageField.value = ""; // Clear the age field
        } else {
            ageField.value = age; // Set the calculated age
        }
    }

    // Attach Blur Event Listener
    dobField.addEventListener("blur", validateAndSetAge);
});
