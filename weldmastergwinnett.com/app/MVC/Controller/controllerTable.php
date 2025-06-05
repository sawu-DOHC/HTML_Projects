<?php

require_once __DIR__ . '/../Model/Data.php';
require_once __DIR__ . '/../Model/Cell.php';
require_once __DIR__ . '/../Model/Table.php';

require_once __DIR__ . '/../../CRUD/Read/samples.php';
require_once __DIR__ . '/../../CRUD/Read/joints.php';
require_once __DIR__ . '/../../CRUD/Read/thicknesses.php';

function buildTable(string $process, string $material, array $joints, array $thicknesses): Table {
    
    $rows = samples( $process, $material );
    $table = new Table( $process, $material, $joints, $thicknesses );

    foreach ($rows as $row) {
        $data = new Data($row);
        $table->addSample($data);
    }

    return $table;
}

