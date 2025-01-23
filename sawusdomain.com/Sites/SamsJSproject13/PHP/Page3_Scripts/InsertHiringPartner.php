<?php

session_start();

include __DIR__ . '/../UtilityScripts/DatabaseConnection.php';


$partnerName = $_POST['partner_name'];
$companyPhone = $_POST['company_phone'];
$streetAddress = $_POST['street_address'];
$city = $_POST['city'];
$state = $_POST['state'];
$zip = $_POST['zip'];
$productDescription = $_POST['product_description'];
$contactName = $_POST['contact_name'];
$contactTitle = $_POST['contact_title'];
$contactPhone = $_POST['contact_phone'];
$contactEmail = $_POST['contact_email'];
$payRate = $_POST['pay_rate'];
$isFullTime = isset($_POST['employmentType']) && in_array('fullTime', $_POST['employmentType']) ? 1 : 0;
$isPartTime = isset($_POST['employmentType']) && in_array('partTime', $_POST['employmentType']) ? 1 : 0;
$hasMedicalBenefits = isset($_POST['benefits']) && in_array('medical', $_POST['benefits']) ? 1 : 0;
$hasDentalBenefits = isset($_POST['benefits']) && in_array('dental', $_POST['benefits']) ? 1 : 0;
$hasRetirementBenefits = isset($_POST['benefits']) && in_array('retirement', $_POST['benefits']) ? 1 : 0;
$hasPaidTimeOff = isset($_POST['benefits']) && in_array('paidTimeOff', $_POST['benefits']) ? 1 : 0;
$tig = isset($_POST['weldingType']) && in_array('T.I.G', $_POST['weldingType']) ? 1 : 0;
$sprayTransfer = isset($_POST['weldingType']) && in_array('Spray Transfer', $_POST['weldingType']) ? 1 : 0;
$shortCircuit = isset($_POST['weldingType']) && in_array('Short Circuit', $_POST['weldingType']) ? 1 : 0;
$fluxCore = isset($_POST['weldingType']) && in_array('Flux Core', $_POST['weldingType']) ? 1 : 0;
$stick = isset($_POST['weldingType']) && in_array('Stick', $_POST['weldingType']) ? 1 : 0;
$other = isset($_POST['weldingType']) && in_array('Other', $_POST['weldingType']) ? 1 : 0;
$firstShift = isset($_POST['shift']) && in_array('First Shift', $_POST['shift']) ? 1 : 0;
$secondShift = isset($_POST['shift']) && in_array('Second Shift', $_POST['shift']) ? 1 : 0;
$thirdShift = isset($_POST['shift']) && in_array('Third Shift', $_POST['shift']) ? 1 : 0;
$weldTestDescription = $_POST['weldTest_description'];
$Notes = $_POST['notes'];
$username = $_SESSION['username'];
$IPAddress = $_SERVER['REMOTE_ADDR'];

$sql = "INSERT INTO Hiring_Partners_Table (CompanyName, CompanyPhone, StreetAddress, City, State, ZIPCode, ProductDescription, ContactName, ContactTitle, ContactPhone, ContactEmail, PayRate, FullTime, PartTime, Medical, Dental, RetirementPlan, PaidTimeOff, TIG, SprayTransfer, ShortCircuit, FluxCore, Stick, Other, FirstShift, SecondShift, ThirdShift, WeldTestDescription, Notes, User, IPAddress) VALUES ('$partnerName', '$companyPhone', '$streetAddress', '$city', '$state', '$zip', '$productDescription', '$contactName', '$contactTitle', '$contactPhone', '$contactEmail', '$payRate', '$isFullTime', '$isPartTime', '$hasMedicalBenefits', '$hasDentalBenefits', '$hasRetirementBenefits', '$hasPaidTimeOff', '$tig', '$sprayTransfer', '$shortCircuit', '$fluxCore', '$stick', '$other', '$firstShift', '$secondShift', '$thirdShift', '$weldTestDescription', '$Notes', '$username', '$IPAddress')";

if ($conn->query($sql) === TRUE) {
    header('Content-Type: application/json');
    echo json_encode(["status" => "success", "message" => "PHP: New partner added successfully."]);
} 
else {
    header('Content-Type: application/json');
    echo json_encode(["status" => "error", "message" => "PHP: Error adding new partner."]);
}

$conn->close();

?>
