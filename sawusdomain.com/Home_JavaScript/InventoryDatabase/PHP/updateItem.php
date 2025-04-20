<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Headers: Content-Type');
    header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
    exit(0);
}

include 'config.php';

$data = json_decode(file_get_contents('php://input'), true);

// Log received data for debugging purposes
file_put_contents("debug_log.txt", json_encode($data, JSON_PRETTY_PRINT) . "\n", FILE_APPEND);

// Check if data is properly received
if (!$data) {
    echo json_encode(['message' => 'Invalid JSON input']);
    exit();
}

if (isset($data['itemId']) && isset($data['description']) && isset($data['partNumber']) && isset($data['quantity_on_hand'])) {
    $itemId = intval($data['itemId']);
    $description = trim($data['description']);
    $partNumber = trim($data['partNumber']);
    $quantity_on_hand = intval($data['quantity_on_hand']); // Ensure correct field is used

    try {
        $pdo = new PDO("mysql:host=" . DB_HOST . ";dbname=" . DB_NAME, DB_USER, DB_PASS, [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
        ]);

        $query = "UPDATE `Items Table` 
                  SET `description` = :description, 
                      `part_number` = :partNumber, 
                      `quantity_on_hand` = :quantity_on_hand
                  WHERE `id` = :itemId"; // Ensure column name is correct
        $stmt = $pdo->prepare($query);
        $stmt->bindParam(':description', $description, PDO::PARAM_STR);
        $stmt->bindParam(':partNumber', $partNumber, PDO::PARAM_STR);
        $stmt->bindParam(':quantity_on_hand', $quantity_on_hand, PDO::PARAM_INT);
        $stmt->bindParam(':itemId', $itemId, PDO::PARAM_INT);

        if ($stmt->execute()) {
            echo json_encode(['message' => 'Item updated successfully']);
        } else {
            echo json_encode(['message' => 'Failed to update item']);
        }
    } catch (PDOException $e) {
        echo json_encode(['message' => 'Database error: ' . $e->getMessage()]);
    }
} else {
    echo json_encode(['message' => 'Missing required fields']);
}
?>
