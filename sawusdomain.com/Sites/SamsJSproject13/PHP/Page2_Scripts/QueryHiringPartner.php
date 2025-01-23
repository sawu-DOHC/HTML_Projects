<?php

include __DIR__ . '/../UtilityScripts/DatabaseConnection.php';


$id = intval($_GET['id']); // get ID from GET parameters and convert to integer

$stmt = $conn->prepare(
   "SELECT * 
    FROM Hiring_Partners_Table 
    WHERE Partner_ID = ?");

    
$stmt->bind_param("i", $id); // bind ID parameter
$stmt->execute(); // execute the query
$result = $stmt->get_result(); // get query result

$data = $result->fetch_assoc(); // fetch row as associative array

$stmt->close(); // close the prepared statement
$conn->close(); // close the database connection

header('Content-Type: application/json'); // set response header to JSON
echo json_encode($data); // return JSON-encoded data
?>
