<?php
include 'config.php'; 

$conn = new mysqli($servername, $username, $password, $dbname);

$sql = "SELECT COUNT(*) AS total FROM table1";
$result = $conn->query($sql);
$row = $result->fetch_assoc();
echo $row['total'];

$conn->close();
?>
