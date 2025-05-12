<?php

require_once __DIR__ . '/../connect.php';

function materials(): array
{
    global $pdo;

    $arr_materials = [];

    $str_query = "SELECT * FROM materials ORDER BY material_name DESC";  

    $stmt = $pdo->query($str_query);

    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $arr_materials[] = $row;
    }

    return $arr_materials;
}
?>
