<?php
include 'config.php'; 

$conn = new mysqli($servername, $username, $password, $dbname);

$ipAddress = $_SERVER['REMOTE_ADDR'];
if (empty($ipAddress)) {
    $ipAddress = 'UNKNOWN';
}

$sql = "INSERT INTO table1 (column1) VALUES ('$ipAddress')";
$conn->query($sql);

$countQuery = "SELECT COUNT(*) AS total FROM table1";
$result = $conn->query($countQuery);
$row = $result->fetch_assoc();
echo $row['total'];

$conn->close();
?>
