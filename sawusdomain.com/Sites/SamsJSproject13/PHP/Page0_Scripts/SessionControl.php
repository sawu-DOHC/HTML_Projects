<?php
// Enable error reporting for debugging purposes
error_reporting(E_ALL);
ini_set('display_errors', 1);

if (session_status() == PHP_SESSION_NONE) {
    session_start();
}

if (isset($_GET['action']) && $_GET['action'] === 'get_session_data') {

    header('Content-Type: application/json');

    echo json_encode([
        'username' => $_SESSION['username'] ?? null,
        'password' => $_SESSION['password'] ?? null,
        'permissions' => $_SESSION['permissions'] ?? null
    ]);

    exit();
    
} 
else {
    echo json_encode([
        'status' => 'error',
        'message' => 'Invalid action or missing action parameter'
    ]);
    exit();
}
?>
