<?php

header_remove("X-Powered-By");
header("Content-Type: application/json; charset=UTF-8");

$servername = 'localhost';
$dbname = 'samwu1_desktop_db';
$username = 'samwu1_desktop_db';
$password = '50175017Ss';

try {
    // Create a new PDO connection
    $pdo = new PDO("mysql:host=$servername;dbname=$dbname;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // SQL query to fetch all data from resources_table
    $sql = "SELECT * FROM resources_table";
    $stmt = $pdo->prepare($sql);
    $stmt->execute();

    // Fetch data as an associative array
    $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Return the data as JSON
    echo json_encode([
        "success" => true,
        "data" => $results
    ]);

} 
catch (PDOException $e) {
    // Return error as JSON
    echo json_encode([
        "success" => false,
        "error" => $e->getMessage()
    ]);
}
