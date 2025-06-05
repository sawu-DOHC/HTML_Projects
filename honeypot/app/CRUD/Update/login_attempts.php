<?php
session_start();
require_once __DIR__ . '/../app/CRUD/config.php';
require_once __DIR__ . '/../app/handlers/LoginHandler.php';

$error = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
    $ua = $_SERVER['HTTP_USER_AGENT'] ?? 'unknown';
    
    ['username' => $username, 'password' => $password] = parse_credentials();

    $attacker_id = get_attacker_id($pdo, $ip, $ua);
    ['success' => $success, 'user_id' => $user_id] = check_credentials($pdo, $username, $password);
    log_attempt($pdo, $attacker_id, $user_id, $username, $password, $success);

    if ($success) {
        $_SESSION['loggedin'] = true;
        $_SESSION['user'] = $username;
        header("Location: dashboard.php");
        exit;
    }

    $error = "Invalid login credentials.";
}
?>
