<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type');
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Headers: Content-Type');
    header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
    exit(0);
}
// Include the database configuration
include 'config.php';

// Get the raw POST data
$data = json_decode(file_get_contents('php://input'), true);

// Validate the input data
if (isset($data['description']) && isset($data['partNumber']) && isset($data['quantity']) && isset($data['category'])) {
    
    $description = $data['description'];
    $partNumber = $data['partNumber'];
    $quantity = $data['quantity'];
    $category = $data['category'];

    try {
        // Create a PDO instance for database connection
        $pdo = new PDO("mysql:host=" . DB_HOST . ";dbname=" . DB_NAME, DB_USER, DB_PASS);

        // Prepare the SQL query to insert the new item
        $query = "INSERT INTO `Items Table` (`category`, `description`, `part_number`, `quantity_on_hand`) 
                  VALUES (:category, :description, :partNumber, :quantity)";

        $stmt = $pdo->prepare($query);

        // Bind the parameters to the query
        $stmt->bindParam(':category', $category);
        $stmt->bindParam(':description', $description);
        $stmt->bindParam(':partNumber', $partNumber);
        $stmt->bindParam(':quantity', $quantity);

        // Execute the query
        if ($stmt->execute()) {
            echo json_encode(['message' => 'Item added successfully']);
        } else {
            echo json_encode(['message' => 'Failed to add item']);
        }

    } catch (PDOException $e) {
        // Handle database connection errors
        echo json_encode(['message' => 'Database error: ' . $e->getMessage()]);
    }
} 
else {
    // Return an error message if data is missing
    echo json_encode(['message' => 'Missing required fields']);
}
?>
