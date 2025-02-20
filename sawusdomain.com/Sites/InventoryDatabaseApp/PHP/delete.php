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

if (isset($data['itemId'])) {
    $itemId = $data['itemId'];

    try {
        $pdo = new PDO("mysql:host=" . DB_HOST . ";dbname=" . DB_NAME, DB_USER, DB_PASS);
        $query = "DELETE FROM `Items Table` WHERE id = :itemId";
        $stmt = $pdo->prepare($query);
        $stmt->bindParam(':itemId', $itemId, PDO::PARAM_INT);

        if ($stmt->execute()) {
            echo json_encode(['message' => 'Item deleted successfully']);
        } else {
            echo json_encode(['message' => 'Failed to delete item']);
        }
    } catch (PDOException $e) {
        echo json_encode(['message' => 'Database error: ' . $e->getMessage()]);
    }
} else {
    echo json_encode(['message' => 'Missing required field: itemId']);
}
?>
