<?php
// Enable error reporting for debugging
header("Access-Control-Allow-Origin: https://www.sawusdomain.com");

include 'config.php'; 

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    error_log("Connection failed: " . $conn->connect_error);
    die("Connection failed: " . $conn->connect_error);
}

$ipAddress = $_SERVER['REMOTE_ADDR'];
if (empty($ipAddress)) {
    $ipAddress = 'UNKNOWN';
}

$sql = "INSERT INTO table1 (column1) VALUES ('$ipAddress')";
if (!$conn->query($sql)) {
    error_log("Insert error: " . $conn->error);
    // You can optionally output an error message here
    die("Insert error: " . $conn->error);
}

// If you want to keep this script quiet, simply remove the echo
// echo "Success";

$conn->close();
?>
