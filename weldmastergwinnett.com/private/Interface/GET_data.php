<?php
// API/GET_data.php
require_once __DIR__ . '/../../private/Database/Connect.php';
header('Content-Type: application/json');

// get everything
$stmt = $pdo->query("
    SELECT 
        id,
        timestamp,
        baro,
        clt,
        rpm,
        fuel_cc_min,
        iat,
        maf,
        ign
    FROM torque_data
    ORDER BY timestamp ASC
");
$rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

// report total count
echo json_encode([
    'total' => count($rows),
    'data'  => $rows
]);
exit;
