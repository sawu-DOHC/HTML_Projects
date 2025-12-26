<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

$host = 'mysql.freehostia.com';
//$host = 'localhost';
$db   = 'samwu1_weldmaster';
$user = 'samwu1_weldmaster';
$pass = '6Sr35NFbm^';
$charset = 'utf8mb4';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$db;charset=$charset", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    date_default_timezone_set('America/New_York');

    $pdo->exec("SET time_zone = '-04:00'"); // EDT now, switch to -05:00 in winter
} 
catch (PDOException $e) {
    die("❌ Connection failed: " . $e->getMessage());
}
