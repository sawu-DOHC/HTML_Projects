<?php

function generateNavigation(array $processes): string
{
    ob_start();

    foreach ($processes as $process) {
        $name = $process['process_name'];
        echo "<li><a href=\"#$name\" onclick=\"showSection('$name'); return false;\">$name</a></li>";
    }

    return ob_get_clean();
}
