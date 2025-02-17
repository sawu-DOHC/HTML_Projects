<?php
header('Access-Control-Allow-Origin: *');

include 'config.php';  


$pdo = new PDO("mysql:host=" . DB_HOST . ";dbname=" . DB_NAME, DB_USER, DB_PASS);


$query = "SELECT * FROM `Items Table`";

$stmt = $pdo->prepare($query);
$stmt->execute();


$items = $stmt->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($items ? $items : ['message' => 'No items found.']);

?>
