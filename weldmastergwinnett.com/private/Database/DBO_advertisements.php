<?php

class DBO_advertisements {

    private PDO $pdo;

    public function __construct(PDO $pdo) {
        $this->pdo = $pdo;
    }

    // === CREATE ===
    public function createAdvertisement(array $data): int {
        $sql = "
            INSERT INTO advertisements (name, filename, url, start_date, end_date, is_active, weight)
            VALUES (:name, :filename, :url, :start_date, :end_date, :is_active, :weight)
        ";

        $stmt = $this->pdo->prepare($sql);

        $stmt->bindValue(':name',       $data['name']);
        $stmt->bindValue(':filename',   $data['filename']);
        $stmt->bindValue(':url',        $data['url']);
        $stmt->bindValue(':start_date', $data['start_date'], is_null($data['start_date']) ? PDO::PARAM_NULL : PDO::PARAM_STR);
        $stmt->bindValue(':end_date',   $data['end_date'],   is_null($data['end_date'])   ? PDO::PARAM_NULL : PDO::PARAM_STR);
        $stmt->bindValue(':is_active',  $data['is_active'],  PDO::PARAM_BOOL);
        $stmt->bindValue(':weight',     $data['weight'],     PDO::PARAM_INT);

        if (!$stmt->execute()) {
            $error = $stmt->errorInfo();
            throw new RuntimeException("[DBO_advertisements] Insert failed: {$error[2]}");
        }

        return (int)$this->pdo->lastInsertId();
    }

    // === READ ===
    public function readAdvertisementById(int $id): array {
        $sql = "
            SELECT *
            FROM advertisements
            WHERE id = :id
        ";

        $stmt = $this->pdo->prepare($sql);
        $stmt->execute(['id' => $id]);

        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        return $row ?: [];
    }
    
    public function readAdvertisements(): array {
        $sql = "
            SELECT *
            FROM advertisements
            WHERE is_active = TRUE
              AND (start_date IS NULL OR start_date <= NOW())
              AND (end_date   IS NULL OR end_date   >= NOW())
            ORDER BY weight DESC, created_at ASC
        ";
    
        $stmt = $this->pdo->query($sql);
        return $stmt->fetchAll(PDO::FETCH_ASSOC) ?: [];
    }
    

    // === UPDATE ===
    public function incrementImpression(int $id): bool {
        $sql = "
            UPDATE advertisements
            SET impressions = impressions + 1
            WHERE id = :id
        ";

        $stmt = $this->pdo->prepare($sql);
        return $stmt->execute(['id' => $id]);
    }

    public function incrementClick(int $id): bool {
        $sql = "
            UPDATE advertisements
            SET clicks = clicks + 1
            WHERE id = :id
        ";

        $stmt = $this->pdo->prepare($sql);
        return $stmt->execute(['id' => $id]);
    }

    public function setActive(int $id, bool $active): bool {
        $sql = "
            UPDATE advertisements
            SET is_active = :active
            WHERE id = :id
        ";

        $stmt = $this->pdo->prepare($sql);
        return $stmt->execute([
            'id'     => $id,
            'active' => $active
        ]);
    }

    public function updateAdvertisement(int $id, array $data): bool {
        $sql = "
            UPDATE advertisements
            SET
                name       = :name,
                filename   = :filename,
                url        = :url,
                start_date = :start_date,
                end_date   = :end_date,
                weight     = :weight
            WHERE id = :id
        ";

        $stmt = $this->pdo->prepare($sql);

        return $stmt->execute([
            'id'         => $id,
            'name'       => $data['name'],
            'filename'   => $data['filename'],
            'url'        => $data['url'],
            'start_date' => $data['start_date'],
            'end_date'   => $data['end_date'],
            'weight'     => $data['weight']
        ]);
    }

    // === DELETE ===
    public function deleteAdvertisement(int $id): bool {
        $sql = "
            DELETE FROM advertisements
            WHERE id = :id
        ";

        $stmt = $this->pdo->prepare($sql);
        return $stmt->execute(['id' => $id]);
    }
}
