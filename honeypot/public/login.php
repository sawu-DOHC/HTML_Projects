<?php
session_start();
require_once __DIR__ . '/../app/CRUD/config.php';

$error = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = trim($_POST['username'] ?? '');
    $password = trim($_POST['password'] ?? '');

    // ───────────────────────────────────────────────────────────────
    // Step 1: Capture attacker metadata
    // ───────────────────────────────────────────────────────────────
    $ip_address = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
    $user_agent = $_SERVER['HTTP_USER_AGENT'] ?? 'unknown';

    // ───────────────────────────────────────────────────────────────
    // Step 2: Get or create attacker record
    // ───────────────────────────────────────────────────────────────
    $stmt = $pdo->prepare("
        SELECT id
        FROM attackers
        WHERE ip_address = ?
    ");
    $stmt->execute([$ip_address]);
    $attacker = $stmt->fetch();

    if ($attacker) {
        $attacker_id = $attacker['id'];
        $pdo->prepare("
            UPDATE attackers
            SET last_seen = NOW(), hit_count = hit_count + 1
            WHERE id = ?
        ")->execute([$attacker_id]);
    } else {
        $pdo->prepare("
            INSERT INTO attackers (ip_address, user_agent)
            VALUES (?, ?)
        ")->execute([$ip_address, $user_agent]);

        $attacker_id = $pdo->lastInsertId();
    }

    // ───────────────────────────────────────────────────────────────
    // Step 3: Look up user
    // ───────────────────────────────────────────────────────────────
    $stmt = $pdo->prepare("
        SELECT id, password
        FROM users
        WHERE username = ?
    ");
    $stmt->execute([$username]);
    $db_user = $stmt->fetch();

    $user_id = null;
    $success = false;

    if ($db_user && $password === $db_user['password']) {
        $user_id = $db_user['id'];
        $success = true;
    }

    // ───────────────────────────────────────────────────────────────
    // Step 4: Log login attempt
    // ───────────────────────────────────────────────────────────────
    $stmt = $pdo->prepare("
        INSERT INTO login_attempts (
            attacker_id,
            user_id,
            username_attempted,
            password_attempted,
            success
        )
        VALUES (?, ?, ?, ?, ?)
    ");
    $stmt->execute([
        $attacker_id,
        $user_id,
        $username,
        $password,
        $success
    ]);

    // ───────────────────────────────────────────────────────────────
    // Step 5: Handle login outcome
    // ───────────────────────────────────────────────────────────────
    if ($success) {
        $_SESSION['loggedin'] = true;
        $_SESSION['user'] = $username;
        header("Location: dashboard.php");
        exit;
    } 
    else {
        $error = "Invalid login credentials.";
    }
}
?>
