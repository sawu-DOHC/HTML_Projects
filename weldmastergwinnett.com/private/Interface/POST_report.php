<?php
require_once __DIR__ . '/../../private/Database/Connect.php';
require_once __DIR__ . '/../../private/Database/DBO_users.php';
require_once __DIR__ . '/../../private/Database/DBO_reports.php';

header('Content-Type: application/json');

try {
    // parse input (expects JSON { articleId: N })
    $data = json_decode(file_get_contents('php://input'), true);
    $articleId = isset($data['articleId']) ? (int)$data['articleId'] : 0;

    if ($articleId <= 0) {
        echo json_encode(['success' => false, 'error' => 'Missing or invalid articleId']);
        exit;
    }

    // identify user by IP (create if missing)
    $ip        = $_SERVER['REMOTE_ADDR']     ?? '';
    $userAgent = $_SERVER['HTTP_USER_AGENT'] ?? '';

    $dboUsers = new DBO_users($pdo);
    $userRow  = $dboUsers->readUserByIp($ip);

    if ($userRow) {
        $userId = (int)$userRow['userId'];
    } else {
        $userId = $dboUsers->createUser([
            'ipAddress' => $ip,
            'userAgent' => $userAgent
        ]);
        $userId = (int)$userId;
    }

    $dboReports = new DBO_reports($pdo);

    $pdo->beginTransaction();

    // toggle: if exists delete -> removed, otherwise insert -> added
    $deleted = $dboReports->deleteReport($articleId, $userId);

    if ($deleted) {
        $action = 'removed';
    } else {
        $dboReports->createReport($articleId, $userId);
        $action = 'added';
    }

    $count = $dboReports->readReportCountByArticle($articleId);

    $pdo->commit();

    echo json_encode([
        'success'     => true,
        'action'      => $action,
        'reportCount' => $count,
        'articleId'   => $articleId
    ]);
    exit;
} catch (Throwable $e) {
    if ($pdo->inTransaction()) $pdo->rollBack();
    echo json_encode([
        'success' => false,
        'error'   => 'Database error',
        'detail'  => $e->getMessage()
    ]);
    exit;
}
