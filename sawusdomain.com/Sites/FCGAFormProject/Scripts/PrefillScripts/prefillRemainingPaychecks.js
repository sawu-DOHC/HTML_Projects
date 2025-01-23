function prefillRemainingPaychecks() {

    const remainingPaychecksField = document.getElementById("remaining-paychecks_Field");

    const today = new Date();

    const currentMonth = today.getMonth();

    const monthsRemaining = 11 - currentMonth;

    let remainingPaychecks = monthsRemaining * 2;

    if ( today.getDate() > 14 ) {
        remainingPaychecks += 1; // add 1 if date is greater than 14
    } 
    else {
        remainingPaychecks += 2; // add 2 if date is 14 or earlier
    }

    remainingPaychecksField.value = remainingPaychecks;
}

document.addEventListener("DOMContentLoaded", prefillRemainingPaychecks);
