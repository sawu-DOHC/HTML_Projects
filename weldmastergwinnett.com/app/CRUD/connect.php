<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

$host = 'mysql.freehostia.com'; //'mysql.freehostia.com';
$db   = 'samwu1_weldmaster';
$user = 'samwu1_weldmaster';
$pass = '6Sr35NFbm^';
$charset = 'utf8mb4';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$db;charset=$charset", $user, $pass);
    
} 
catch (PDOException $e) {
    echo "❌ Connection failed: " . $e->getMessage();
}
