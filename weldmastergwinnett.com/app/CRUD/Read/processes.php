<?php

require_once __DIR__ . '/../connect.php';

function processes(): array
{
    global $pdo;

    $arr_processes = [];

    $str_query = "SELECT * FROM processes ORDER BY process_name DESC";
    
    $stmt = $pdo->query($str_query);

    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $arr_processes[] = $row;
    }

    return $arr_processes;
}
