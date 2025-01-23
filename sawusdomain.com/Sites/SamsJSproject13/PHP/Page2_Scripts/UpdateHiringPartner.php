<?php

session_start();

include __DIR__ . '/../UtilityScripts/DatabaseConnection.php';


$input = file_get_contents('php://input');
$data = json_decode($input, true);

$id = intval($data['id']);
$partner_name = $data['partner_name'];
$company_phone = $data['company_phone'];
$street_address = $data['street_address'];
$city = $data['city'];
$state = $data['state'];
$zip = $data['zip'];
$product_description = $data['product_description'];
$contact_name = $data['contact_name'];
$contact_title = $data['contact_title'];
$contact_phone = $data['contact_phone'];
$contact_email = $data['contact_email'];
$pay_rate = $data['pay_rate'];
$fullTime = intval($data['fullTime']);
$partTime = intval($data['partTime']);
$medical = intval($data['medical']);
$dental = intval($data['dental']);
$retirement = intval($data['retirement']);
$paidTimeOff = intval($data['paidTimeOff']);
$tig = intval($data['tig']);
$spray_transfer = intval($data['spray_transfer']);
$short_circuit = intval($data['short_circuit']);
$flux_core = intval($data['flux_core']);
$stick = intval($data['stick']);
$other = intval($data['other']);
$firstShift = intval($data['firstShift']);
$secondShift = intval($data['secondShift']);
$thirdShift = intval($data['thirdShift']);
$weldTest_description = $data['weldTest_description'];
$notes = $data['notes'];
$username = $_SESSION['username'];

$stmt = $conn->prepare("UPDATE Hiring_Partners_Table 
                        SET CompanyName=?, CompanyPhone=?, StreetAddress=?, City=?, State=?, ZIPCode=?, ProductDescription=?, ContactName=?, ContactTitle=?, ContactPhone=?, ContactEmail=?, PayRate=?, FullTime=?, PartTime=?, Medical=?, Dental=?, RetirementPlan=?, PaidTimeOff=?, TIG=?, SprayTransfer=?, ShortCircuit=?, FluxCore=?, Stick=?, Other=?, FirstShift=?, SecondShift=?, ThirdShift=?, WeldTestDescription=?, Notes=?, User=?, LastModified=CURRENT_TIMESTAMP 
                        WHERE Partner_ID=?");

$stmt->bind_param("sssssssssssdiiiiiiiiiiiiiiisssi", 
    $partner_name, $company_phone, $street_address, $city, $state, $zip, $product_description, $contact_name, $contact_title, 
    $contact_phone, $contact_email, $pay_rate, $fullTime, $partTime, $medical, $dental, $retirement, $paidTimeOff, 
    $tig, $spray_transfer, $short_circuit, $flux_core, $stick, $other, $firstShift, $secondShift, $thirdShift, 
    $weldTest_description, $notes, $username, $id
);

if ($stmt->execute()) {
    header('Content-Type: application/json');
    echo json_encode(['status' => 'success', 'message' => 'Data updated successfully']);
} 
else {
    header('Content-Type: application/json');
    echo json_encode(['status' => 'error', 'message' => 'Error updating data: ' . $stmt->error]);
}

$stmt->close();
$conn->close();

?>
