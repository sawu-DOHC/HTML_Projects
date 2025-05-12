<?php

require_once __DIR__ . '/generateArticles.php';

function generateSections(array $process): string{
    ob_start();

    echo "<section id='{$process['process_name']}' class='hidden'>";
    echo "<h2>{$process['process_name']} Welding</h2>";

    echo generateArticles($process['process_name']);
    echo "</section>";


    return ob_get_clean();
}


