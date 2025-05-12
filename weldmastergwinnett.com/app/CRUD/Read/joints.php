<?php

require_once __DIR__ . '/../connect.php';

function joints(): array
{
    global $pdo;

    $arr_joints = [];

    $str_query = "SELECT * FROM joints ORDER BY joint_name DESC";  

    $stmt = $pdo->query($str_query);

    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $arr_joints[] = $row;
    }

    return $arr_joints;
}
?>
