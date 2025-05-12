<?php
require_once __DIR__ . '/../connect.php';

function samples(string $process_name, string $material_name): array
{
    global $pdo;

    $sql = "
        SELECT  s.*,
                p.process_name,
                m.material_name,
                j.joint_name,
                t.thickness_value,
                w.welder_name
        FROM    samples s
        JOIN    processes   p ON p.process_id   = s.process_id
        JOIN    materials   m ON m.material_id  = s.material_id
        JOIN    joints      j ON j.joint_id     = s.joint_id
        JOIN    thicknesses t ON t.thickness_id = s.thickness_id
        JOIN    welders     w ON w.welder_id    = s.welder_id
        WHERE   p.process_name = :process
          AND   m.material_name = :material
    ";

    $stmt = $pdo->prepare($sql);
    $stmt->execute([
        ':process'  => $process_name,
        ':material' => $material_name
    ]);

    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}
