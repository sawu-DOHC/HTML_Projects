<?php

$host = 'mysql.freehostia.com';
$db   = 'samwu1_sparkforgelabs';
$user = 'samwu1_sparkforgelabs';
$pass = '434gJFRyx+';
$charset = 'utf8mb4';

// Enable full error reporting for development
error_reporting(E_ALL);
ini_set('display_errors', 1);

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";

$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION, 
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,       
    PDO::ATTR_EMULATE_PREPARES   => false,                  
];

try {
    $pdo = new PDO($dsn, $user, $pass, $options);
} 
catch (PDOException $e) {
    die('Database connection failed: ' . $e->getMessage());
}
