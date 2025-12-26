<?php

function services(PDO $pdo): array {
    $sql = "SELECT service_id, name, description, duration, style, price 
            FROM services 
            ORDER BY name ASC";

    $stmt = $pdo->prepare($sql);
    $stmt->execute();

    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}
