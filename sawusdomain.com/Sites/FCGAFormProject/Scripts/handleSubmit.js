document.getElementById("submit-Button").addEventListener("click", function (event) {

    event.preventDefault(); // prevent form submission

    let isFormValid = true; // start with a valid form state

    // call validation methods with isFormValid as a parameter
    validateDeductionBegin(isFormValid);
    validateDeductionChange(isFormValid);
    validateDeductionStop(isFormValid);
    validateEffectiveDate(isFormValid);
    validateName(isFormValid);
    validatePhone(isFormValid);
    validateAddress(isFormValid);
    validateDateOfBirth(isFormValid);
    validateEmail(isFormValid);
    validateAge(isFormValid);
    validateEmployeeID(isFormValid);
    validateAnnualContribution(isFormValid);
    validateSignature(isFormValid);
    validateSignatureDate(isFormValid);
    validatePerPaycheckContribution(isFormValid);
    validateSQLInjection(isFormValid);

    // stop further execution if any validation fails
    if ( isFormValid == false ) {
        console.error("Form validation failed!");
        return;
    }

    // collect form data
    const formData = {

        deductionBegin: document.getElementById("begin-deduction_Button").checked,
        deductionChange: document.getElementById("change-deduction_Button").checked,
        deductionStop: document.getElementById("stop-deduction_Button").checked,
        effectiveDate: document.getElementById("effective-date_Field").value,
        name: document.getElementById("name_Field").value,
        phone: document.getElementById("phone_Field").value,
        address: document.getElementById("address_Field").value,
        dob: document.getElementById("dob_Field").value,
        email: document.getElementById("email_Field").value,
        age: document.getElementById("age_Field").value,
        employeeId: document.getElementById("employee-id_Field").value,
        annualContribution: document.getElementById("annual-contribution_Field1").value,
        signature: document.getElementById("signature_Field").value,
        signatureDate: document.getElementById("signature-date_Field").value,
        annualContributionOffice: document.getElementById("annual-contribution_Field2").value,
        remainingPaychecks: document.getElementById("remaining-paychecks_Field").value,
        perPaycheckContribution: document.getElementById("per-paycheck-contribution_Field").value

    };

    // log form data to console
    console.log("Form Data in JSON:", JSON.stringify(formData, null, 2));
});

