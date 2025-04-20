<?php

$servername = "localhost";
$username = "samwu1_sparkforgelabs";
$password = "434gJFRyx+";
$dbname = "samwu1_sparkforgelabs";

error_reporting(E_ALL);
ini_set('display_errors', 1);

$conn = new mysqli($servername, $username, $password, $dbname);

// check connection
if ( $conn->connect_error ) {
    die( "connection failed: " . $conn->connect_error );
}

?>
