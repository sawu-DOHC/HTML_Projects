<?php
header('Access-Control-Allow-Origin: *');

include 'config.php';  

$pdo = new PDO("mysql:host=" . DB_HOST . ";dbname=" . DB_NAME, DB_USER, DB_PASS);

// Modify the query to sort results alphabetically by description
$query = "SELECT * FROM `Items Table` ORDER BY `description` ASC";

$stmt = $pdo->prepare($query);
$stmt->execute();

$items = $stmt->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($items ? $items : ['message' => 'No items found.']);
?>
