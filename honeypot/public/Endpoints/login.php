<?php
session_start();

require_once __DIR__ . '/../../app/CRUD/config.php';
require_once __DIR__ . '/../../app/MVC/Controllers/LoginController.php';

$error = '';

if ( $_SERVER['REQUEST_METHOD'] === 'POST' ) {

    $loginController = new LoginController($object_pdo);

    $loginController->recordClientInfo();        // IP, agent, headers, etc.
    $loginController->findClient();              // get/create client row (by IP/UA)
    $loginController->checkCredentials();        // check username/password
    $loginController->recordLoginAttempt();      // save the attempt, outcome

    if ( $loginController->loginSuccessful() ) {   
        $loginController->startSession();
        header("Location: dashboard.php");
        exit;
    } 
    else {
        $error = "Invalid login credentials.";
    }
}


?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Login</title>
  <link rel="stylesheet" href="/CSS/style.css">
</head>
<body>

<a href="/index.php">← Back to home</a>

<h2>Login</h2>

<?php if (!empty($error)) echo "<p class='error'>$error</p>"; ?>

<form method="POST" action="">
  <label>
    Username:
    <input type="text" name="username" required>
  </label>
  
  <br><br>

  <label>
    Password:
    <input type="password" name="password" required>
  </label>
  
  <br><br>

  <button type="submit">Login</button>
</form>

</body>
</html>
