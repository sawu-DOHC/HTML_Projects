<?php

ini_set('display_errors', 1);
error_reporting(E_ALL);

require_once __DIR__ . '/../Database/Connect.php';

require_once __DIR__ . '/../Models/Thread.php';
require_once __DIR__ . '/../Models/Sample.php';
require_once __DIR__ . '/../Models/Comment.php';

require_once __DIR__ . '/../Library/Validator.php';
require_once __DIR__ . '/../Library/Sanitizer.php';
require_once __DIR__ . '/../Library/Porter.php';



header('Content-Type: application/json');

// === Library instances ===
$validator = new Validator($pdo);
$sanitizer = new Sanitizer($pdo);
$porter    = new Porter($pdo);

// === Collect raw input (all default to null) ===
$input = [

    // --- Environment ---
    'ipAddress'   => $_SERVER['REMOTE_ADDR']     ?? null,
    'userAgent'   => $_SERVER['HTTP_USER_AGENT'] ?? null,

    // --- File (threads/samples) ---
    'tmpPath'      => $_FILES['media']['tmp_name'] ?? null,
    'originalName' => $_FILES['media']['name']     ?? null,
    'fileType'     => $_FILES['media']['type']     ?? null,
    'fileSize'     => $_FILES['media']['size']     ?? null,

    // --- User form (shared) ---
    'articleType'  => $_POST['articleType']  ?? null, 
    'parentId'     => $_POST['parentId']     ?? null,
    'sectionId'    => $_POST['sectionId']    ?? null,
    'body'         => $_POST['body']         ?? null,
    'title'        => $_POST['title']        ?? null,
    'displayName'  => $_POST['displayName']  ?? null,

    // --- Sample-specific ---
    'process'      => $_POST['process']      ?? null,
    'material'     => $_POST['material']     ?? null,
    'joint'        => $_POST['joint']        ?? null,
    'thickness'    => $_POST['thickness']    ?? null,
    'countryId'    => $_POST['countryId']    ?? null,

    // --- DB defaults / derived ---
    'userId'    => null,
    'mediaSrc'  => null,
    'createdAt' => null,
    'updatedAt' => null,

    'submissionHash' => null,
];

try {
    // === Pipeline ===
    $sanitizer->sanitizeInput($input);
    $validator->validateInput($input);
    $porter->transferFile($input);

    // === Model dispatch ===
    switch ($input['articleType']) {
        case Thread::TYPE:
            $model = new Thread($input);
            break;

        case Sample::TYPE:
            $model = new Sample($input);
            break;

        case Comment::TYPE:
            $model = new Comment($input);
            break;
        default:
            throw new InvalidArgumentException(
                "Rejected: invalid article type '{$input['articleType']}'"
            );
    }

    $model->save($pdo);

    echo json_encode([
        'success'   => true,
        'articleId' => $model->articleId ?? null,
        'html'      => $model->renderArticleCard()
    ]);

} 
catch (InvalidArgumentException $e) {
    echo json_encode([
        'success' => false,
        'error'   => 'Validation failed',
        'detail'  => $e->getMessage()
    ]);
} 
catch (RuntimeException $e) {
    echo json_encode([
        'success' => false,
        'error'   => 'Runtime error',
        'detail'  => $e->getMessage()
    ]);
} 
catch (Exception $e) {
    echo json_encode([
        'success' => false,
        'error'   => 'Unexpected error',
        'detail'  => $e->getMessage()
    ]);
}
