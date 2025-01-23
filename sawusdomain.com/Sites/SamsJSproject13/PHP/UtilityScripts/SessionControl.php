<?php

session_start();

header('Content-Type: application/json');

echo json_encode(
    [
    'username' => $_SESSION['username'] ?? null,
    'password' => $_SESSION['password'] ?? null,
    'permissions' => $_SESSION['permissions'] ?? null
    ]
);
?>
