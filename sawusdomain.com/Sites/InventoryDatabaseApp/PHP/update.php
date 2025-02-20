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

if (isset($data['itemId']) && isset($data['description']) && isset($data['partNumber']) && isset($data['qoh'])) {
    $itemId = $data['itemId'];
    $description = $data['description'];
    $partNumber = $data['partNumber'];
    $qoh = $data['qoh'];

    try {
        $pdo = new PDO("mysql:host=" . DB_HOST . ";dbname=" . DB_NAME, DB_USER, DB_PASS);
        $query = "UPDATE `Items Table` SET `description` = :description, `part_number` = :partNumber, `quantity_on_hand` = :qoh WHERE `id` = :itemId";
        $stmt = $pdo->prepare($query);
        $stmt->bindParam(':description', $description);
        $stmt->bindParam(':partNumber', $partNumber);
        $stmt->bindParam(':qoh', $qoh);
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
