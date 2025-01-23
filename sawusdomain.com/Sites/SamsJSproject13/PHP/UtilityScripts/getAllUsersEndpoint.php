<?php

header('Content-Type: application/json'); // Set the response type to JSON

include __DIR__ . '/../UtilityScripts/DatabaseConnection.php'; // Include database connection

try {
    // Prepare and execute the SQL query to fetch all users
    $sql = "SELECT * FROM Users_Table";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        // Fetch all rows as an associative array
        $users = $result->fetch_all(MYSQLI_ASSOC);

        // Send the users data in JSON format
        echo json_encode([
            "status" => "success",
            "data" => $users
        ]);
    } else {
        echo json_encode([
            "status" => "error",
            "message" => "No users found."
        ]);
    }
} catch (Exception $e) {
    echo json_encode([
        "status" => "error",
        "message" => "An error occurred while fetching users.",
        "error" => $e->getMessage()
    ]);
}

$conn->close(); // Close the database connection

?>
