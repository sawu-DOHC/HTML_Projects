<?php

require_once __DIR__ . '/../connect.php';

function welders(): array
{
    global $pdo;

    $arr_welders = [];

    $str_query = "SELECT * FROM welders";  

    $stmt = $pdo->query($str_query);

    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $arr_welders[] = $row;
    }

    return $arr_welders;
}
?>
