<?php

require_once __DIR__ . '/../connect.php';

function thicknesses(): array
{
    global $pdo;

    $arr_thicknesses = [];

    $str_query = "SELECT * FROM thicknesses";  

    $stmt = $pdo->query($str_query);

    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $arr_thicknesses[] = $row;
    }

    return $arr_thicknesses;
}
?>
