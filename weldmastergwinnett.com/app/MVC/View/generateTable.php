<?php

require_once __DIR__ . '/../Controller/controllerTable.php';
require_once __DIR__ . '/../../CRUD/Read/joints.php';
require_once __DIR__ . '/../../CRUD/Read/thicknesses.php';

function generateTable(string $process_name, string $material_name): string{
    $joints = joints();
    $thicknesses = thicknesses();

    $table = buildTable($process_name, $material_name, $joints, $thicknesses);

    return $table->render($joints, $thicknesses);
}
