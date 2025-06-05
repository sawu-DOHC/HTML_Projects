
<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

//$host = 'localhost'; 
$host = 'mysql.freehostia.com';
$db   = 'samwu1_honeypot';
$user = 'samwu1_honeypot';
$pass = 'plX4eCK43$';
$charset = 'utf8mb4';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$db;charset=$charset", $user, $pass);
} 
catch (PDOException $e) {
    echo "❌ Connection failed: " . $e->getMessage();
}
