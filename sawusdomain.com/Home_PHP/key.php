<?php

header('Access-Control-Allow-Origin: *'); // This allows all domains, adjust as necessary for security
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Database connection details
$string_servername = "localhost";
$string_username = "samwu1_broker_db";
$string_password = "f700f700";
$string_dbname = "samwu1_broker_db";

// Set the response header to indicate JSON data
header('Content-Type: application/json');

// Retrieve the raw POST data
$string_rawData = file_get_contents("php://input");

// Decode the JSON payload into a PHP array
$array_data = json_decode($string_rawData, true);

// Extract the SQL query from the data array
$string_query = $array_data['query']; // Error if 'query' key is missing!


// Create a connection to the database
$object_connection = new mysqli($string_servername, $string_username, $string_password, $string_dbname);

// Check for connection errors
if ($object_connection->connect_error) {

    echo json_encode(["status" => "error", "message" => "Connection failed: " . $object_connection->connect_error]);

    exit;
}

// Execute the SQL query and send the appropriate response
$object_result = $object_connection->query($string_query);


if ($object_result === TRUE) {

    echo json_encode(["status" => "success", "message" => "Query executed successfully"]);

} 
elseif ($object_result instanceof mysqli_result) {
    // For SELECT queries
    $array_rows = [];
    while ($array_row = $object_result->fetch_assoc()) {
        $array_rows[] = $array_row;
    }
    echo json_encode(["status" => "success", "data" => $array_rows]);
}
else {
    echo json_encode(["status" => "error", "message" => "Query failed: " . $object_connection->error]);
}

// Close the database connection
$object_connection->close();
?>
