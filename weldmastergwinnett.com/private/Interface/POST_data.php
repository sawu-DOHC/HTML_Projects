<?php
// POST_data.php
require_once __DIR__ . '/../../private/Database/Connect.php';

// === Correct Torque PID mapping ===
$baro        = $_GET['kff1270'] ?? null;   // Barometer
$clt         = $_GET['k5'] ?? null;        // Coolant temp
$rpm         = $_GET['kc'] ?? null;        // RPM
$fuel_cc_min = $_GET['kff125a'] ?? null;   // Fuel flow
$iat         = $_GET['kf'] ?? null;        // Intake air temp
$maf         = $_GET['k10'] ?? null;       // MAF
$ign         = $_GET['ke'] ?? null;        // Timing advance

try {
    $stmt = $pdo->prepare("
        INSERT INTO torque_data (baro, clt, rpm, fuel_cc_min, iat, maf, ign)
        VALUES (:baro, :clt, :rpm, :fuel_cc_min, :iat, :maf, :ign)
    ");
    $stmt->execute([
        ':baro'        => $baro,
        ':clt'         => $clt,
        ':rpm'         => $rpm,
        ':fuel_cc_min' => $fuel_cc_min,
        ':iat'         => $iat,
        ':maf'         => $maf,
        ':ign'         => $ign
    ]);
} catch (PDOException $e) {
    error_log('[POST_data] insert failed: ' . $e->getMessage());
}

// === Required plain-text acknowledgment for Torque ===
header('Content-Type: text/plain');
echo "OK!";
exit;
