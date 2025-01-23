<?php

header('Content-Type: application/json'); // Set the response type to JSON

include __DIR__ . '/../UtilityScripts/DatabaseConnection.php'; // Include database connection

try {
    // Prepare and execute the SQL query to fetch all hiring partners
    $sql = "SELECT * FROM Hiring_Partners_Table";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        // Fetch all rows as an associative array
        $hiringPartners = $result->fetch_all(MYSQLI_ASSOC);

        // Send the data in JSON format
        echo json_encode([
            "status" => "success",
            "data" => $hiringPartners
        ]);
    } else {
        echo json_encode([
            "status" => "error",
            "message" => "No hiring partners found."
        ]);
    }
} catch (Exception $e) {
    echo json_encode([
        "status" => "error",
        "message" => "An error occurred while fetching hiring partners.",
        "error" => $e->getMessage()
    ]);
}

$conn->close(); // Close the database connection

?>
