<?php

class DBO_samples {
    // === Properties (schema columns) ===
    public string $articleId;
    public string $process;
    public string $material;
    public string $joint;
    public string $thickness;
    public string $countryId;

    private PDO $pdo;

    public function __construct(PDO $pdo) {
        $this->pdo = $pdo;
    }

    // === CREATE ===
    public function createSample(array $data): bool {
        $sql = "
            INSERT INTO samples (
                articleId, countryId, process, material, thickness, joint
            ) VALUES (
                :articleId, :countryId, :process, :material, :thickness, :joint
            )
        ";
        $stmt = $this->pdo->prepare($sql);
        return $stmt->execute([
            'articleId' => $data['articleId'],
            'countryId' => $data['countryId'],
            'process'   => $data['process'],
            'material'  => $data['material'],
            'thickness' => $data['thickness'],
            'joint'     => $data['joint'],
        ]);
    }

    // === READ ===
    public function readSampleById(int $articleId): array {
        $sql = "
            SELECT a.*, s.*
            FROM article a
            JOIN samples s ON a.articleId = s.articleId
            WHERE a.articleType = 'sample'
              AND a.articleId = :id
        ";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute(['id' => $articleId]);
        return $stmt->fetch(PDO::FETCH_ASSOC) ?: [];
    }

    public function readSamples(): array {
        $sql = "
            SELECT a.*, s.*
            FROM article a
            JOIN samples s ON a.articleId = s.articleId
            WHERE a.articleType = 'sample'
            ORDER BY a.createdAt DESC
        ";
        $stmt = $this->pdo->query($sql);
        return $stmt->fetchAll(PDO::FETCH_ASSOC) ?: [];
    }

    public function readEnumValues(string $column): array {
        $sql = "SHOW COLUMNS FROM `samples` LIKE :column";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute(['column' => $column]);
        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$row || !isset($row['Type'])) {
            return [];
        }

        preg_match_all("/'([^']+)'/", $row['Type'], $matches);
        return $matches[1] ?? [];
    }

    // === UPDATE ===
    public function updateSample(int $articleId, array $data): bool {
        $sets = [];
        foreach ($data as $col => $val) {
            $sets[] = "$col = :$col";
        }

        $sql = "UPDATE samples SET " . implode(", ", $sets) . " WHERE articleId = :id";
        $stmt = $this->pdo->prepare($sql);
        $data['id'] = $articleId;

        return $stmt->execute($data);
    }

    // === DELETE ===
    public function deleteSample(int $articleId): bool {
        $sql = "DELETE FROM samples WHERE articleId = :id";
        $stmt = $this->pdo->prepare($sql);
        return $stmt->execute(['id' => $articleId]);
    }
}
