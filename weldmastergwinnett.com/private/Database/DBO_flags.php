<?php

class DBO_flags {
    // === Properties ===
    public string $countryId;
    public string $countryName;

    private PDO $pdo;

    public function __construct(PDO $pdo) {
        $this->pdo = $pdo;
    }

    // === CREATE ===
    public function createFlag(array $data): bool {
        $sql = "
            INSERT INTO flags (countryId, countryName)
            VALUES (:countryId, :countryName)
        ";
        $stmt = $this->pdo->prepare($sql);
        return $stmt->execute([
            'countryId'   => $data['countryId'],
            'countryName' => $data['countryName']
        ]);
    }

    // === READ ===
    public function readFlagById(string $countryId): array {
        $sql = "
            SELECT countryId, countryName
            FROM flags
            WHERE countryId = :id
        ";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute(['id' => $countryId]);
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        return $row ?: [];
    }

    public function readFlags(): array {
        $sql = "
            SELECT countryId, countryName
            FROM flags
            ORDER BY countryName ASC
        ";
        $stmt = $this->pdo->query($sql);
        return $stmt->fetchAll(PDO::FETCH_ASSOC) ?: [];
    }

    // === UPDATE ===
    public function updateFlag(string $countryId, array $data): bool {
        $sql = "
            UPDATE flags
            SET countryName = :countryName
            WHERE countryId = :id
        ";
        $stmt = $this->pdo->prepare($sql);
        return $stmt->execute([
            'id'          => $countryId,
            'countryName' => $data['countryName']
        ]);
    }

    // === DELETE ===
    public function deleteFlag(string $countryId): bool {
        $sql = "
            DELETE FROM flags
            WHERE countryId = :id
        ";
        $stmt = $this->pdo->prepare($sql);
        return $stmt->execute(['id' => $countryId]);
    }
}
