<?php
session_start();

if (!isset($_SESSION['loggedin'])) {
    header("Location: login.php");
    exit;
}

$user = htmlspecialchars($_SESSION['user']);
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Corp Internal Dashboard</title>
  <link rel="stylesheet" href="Assets/style.css">
</head>
<body>

<h1>Welcome, <?php echo $user; ?></h1>

<nav>
  <ul>
    <li><a href="#">User Management</a></li>
    <li><a href="#">Reports</a></li>
    <li><a href="#">Payroll</a></li>
    <li><a href="#">System Logs</a></li>
    <li><a href="#">VPN Settings</a></li>
  </ul>
</nav>



</body>
</html>
