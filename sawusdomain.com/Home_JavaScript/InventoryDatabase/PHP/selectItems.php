<?php
header('Access-Control-Allow-Origin: *');

include 'config.php';

$pdo = new PDO("mysql:host=" . DB_HOST . ";dbname=" . DB_NAME, DB_USER, DB_PASS);

// Get the category passed from JavaScript (through a GET or POST request)
$category = isset($_GET['category']) ? $_GET['category'] : '';

if ($category) {
    // Modify the query to sort results alphabetically by description
    $query = "SELECT * FROM `Items Table` WHERE `category` = :category ORDER BY `description` ASC";
    $stmt = $pdo->prepare($query);
    $stmt->bindParam(':category', $category, PDO::PARAM_STR);
    $stmt->execute();

    $items = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($items ? $items : ['message' => 'No items found in this category.']);
} else {
    echo json_encode(['message' => 'Category parameter is missing.']);
}
?>
