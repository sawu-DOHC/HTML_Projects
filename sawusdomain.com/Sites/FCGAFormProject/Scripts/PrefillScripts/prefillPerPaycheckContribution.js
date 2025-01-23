function calculatePerPaycheckContribution(annualContributionField1, remainingPaychecksField, perPaycheckContributionField) {
    const annualContribution = parseFloat(annualContributionField1.value);
    const remainingPaychecks = parseInt(remainingPaychecksField.value);
    if (isNaN(annualContribution) || isNaN(remainingPaychecks) || remainingPaychecks === 0) {
        alert("Invalid input for annual contribution or remaining paychecks.");
        perPaycheckContributionField.value = "";
        return false;
    }
    perPaycheckContributionField.value = (annualContribution / remainingPaychecks).toFixed(2);
    return true;
}
