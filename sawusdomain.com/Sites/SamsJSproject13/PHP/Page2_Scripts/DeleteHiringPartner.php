<?php

session_start();

include __DIR__ . '/../UtilityScripts/DatabaseConnection.php';


$id = intval($_GET['id']); // get ID from GET parameters and convert to integer

$stmt = $conn->prepare("DELETE FROM Hiring_Partners_Table WHERE Partner_ID = ?");
$stmt->bind_param("i", $id); // bind ID parameter

if ($stmt->execute()) { // if deletion successful
    header('Content-Type: application/json'); // set response header to JSON
    echo json_encode(['status' => 'success', 'message' => 'PHP: Data deleted successfully']); // return JSON response with success status
}
else { // if deletion failed
    header('Content-Type: application/json'); // set response header to JSON
    echo json_encode(['status' => 'error', 'message' => 'PHP: Error deleting data: ']); // return JSON response with error status
}

$stmt->close(); // close the prepared statement
$conn->close(); // close the database connection

?>
