<?php

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');



$conn = new mysqli("localhost", "samwu1_sparkforgelabs", "434gJFRyx+", "samwu1_sparkforgelabs");

// Execute the query
$result = $conn->query(
    "SELECT service_id, name, description, duration, style, price 
    FROM services"
    );

// Initialize an array to hold the services
$services = [];

// Iterate over the result set using foreach
foreach ($result as $row) {
    $services[] = $row;
}

// Encode the array to JSON and output
echo json_encode($services);

$conn->close();

?>
