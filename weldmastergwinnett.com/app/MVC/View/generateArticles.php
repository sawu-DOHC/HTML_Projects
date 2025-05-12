<?php

require_once __DIR__ . '/../../CRUD/Read/materials.php';
require_once __DIR__ . '/generateTable.php';

function generateArticles(string $process_name): string
{
    ob_start();

    $materials = materials();

    foreach ($materials as $material) {
        $material_id = $material['material_name'];
        echo "<article id='{$process_name}-{$material_id}'>";
        echo "<h3>{$material_id}</h3>";
        echo generateTable($process_name, $material_id);
        echo "</article>";
    }

    return ob_get_clean();
}
