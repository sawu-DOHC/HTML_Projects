<?php

function loadAssets(string $pageName): void {
    $publicRoot = realpath(__DIR__ . '/../../public');

    loadCSS("$publicRoot/Stylesheets/Base");
    loadCSS("$publicRoot/Stylesheets/Pages/$pageName");

    loadJS("$publicRoot/Scripts/Base");
    loadJS("$publicRoot/Scripts/Pages/$pageName");
}

function loadCSS(string $dir): void {
    if (!is_dir($dir)) return;

    $publicRoot = realpath(__DIR__ . '/../../public');

    foreach (glob("$dir/*.css") as $file) {
        $url = str_replace($publicRoot, '', $file);
        $url = ltrim($url, '/\\');
        echo "<link rel='stylesheet' href=\"$url\">" . PHP_EOL;
    }
}

function loadJS(string $dir): void {
    if (!is_dir($dir)) return;

    $publicRoot = realpath(__DIR__ . '/../../public');

    foreach (glob("$dir/*.js") as $file) {
        $url = str_replace($publicRoot, '', $file);
        $url = ltrim($url, '/\\');
        echo "<script src=\"$url\" defer></script>" . PHP_EOL;
    }
}

