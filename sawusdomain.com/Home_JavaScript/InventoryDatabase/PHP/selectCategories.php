<?php
header('Access-Control-Allow-Origin: *');

include 'config.php';  

$pdo = new PDO("mysql:host=" . DB_HOST . ";dbname=" . DB_NAME, DB_USER, DB_PASS);

$query = "SELECT DISTINCT category FROM `Items Table`";
$stmt = $pdo->prepare($query);
$stmt->execute();

$categories = $stmt->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($categories ? $categories : ['message' => 'No categories found.']);
?>
