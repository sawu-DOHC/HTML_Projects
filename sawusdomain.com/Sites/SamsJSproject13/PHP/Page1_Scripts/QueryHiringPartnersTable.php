<?php

include __DIR__ . '/../UtilityScripts/DatabaseConnection.php';


$sortColumn = $_GET['sort']; // get sort column from GET parameters
$sortOrder = $_GET['order']; // get sort order from GET parameters

$sql = "SELECT Partner_ID, CompanyName, CompanyPhone, City, ZIPCode, ContactName, ContactTitle, ContactPhone, ContactEmail, PayRate, TIG, SprayTransfer, ShortCircuit, FluxCore, Stick, Other, User, LastModified, IPAddress 
        FROM Hiring_Partners_Table 
        ORDER BY `$sortColumn` $sortOrder";


$result = $conn->query($sql); // execute the query

$data = $result->fetch_all(MYSQLI_ASSOC); // fetch all rows as associative array

if ($data[0] != null) { // if data found
    header('Content-Type: application/json'); // set response header to JSON
    echo json_encode(['status' => 'success', 'data' => $data]); // return JSON response with success status and data
} 
else { // if no data found
    header('Content-Type: application/json'); // set response header to JSON
    echo json_encode(['status' => 'error', 'message' => 'PHP: error']); // return JSON response with error status
}

$conn->close(); // close the database connection
?>
