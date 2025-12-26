<?php

class DBO_users {
    // === Properties ===
    public string $userId;
    public string $ipAddress;
    public string $userAgent;
    public string $createdAt;

    private PDO $pdo;

    public function __construct(PDO $pdo) {
        $this->pdo = $pdo;
    }

    // === CREATE ===
    public function createUser(array $data): int {
        $sql = "
            INSERT INTO users (ipAddress, userAgent)
            VALUES (:ipAddress, :userAgent)
        ";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute($data);

        return (int)$this->pdo->lastInsertId();
    }

    // === READ ===
    public function readUserById(int $userId): array {
        $sql = "
            SELECT * 
            FROM users
            WHERE userId = :id
        ";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute(['id' => $userId]);

        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        return $row ?: [];
    }

    public function readUserByIp(string $ipAddress): array {
        $sql = "
            SELECT * 
            FROM users
            WHERE ipAddress = :ip
        ";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute(['ip' => $ipAddress]);

        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        return $row ?: [];
    }

    public function readUsers(): array {
        $sql = "
            SELECT * 
            FROM users
            ORDER BY createdAt DESC
        ";
        $stmt = $this->pdo->query($sql);
        return $stmt->fetchAll(PDO::FETCH_ASSOC) ?: [];
    }

    // === UPDATE ===
    public function updateUser(int $userId, array $data): bool {
        $sets = [];
        foreach ($data as $col => $val) {
            $sets[] = "$col = :$col";
        }

        $sql = "UPDATE users SET " . implode(", ", $sets) . " WHERE userId = :id";
        $stmt = $this->pdo->prepare($sql);
        $data['id'] = $userId;

        return $stmt->execute($data);
    }

    // === DELETE ===
    public function deleteUser(int $userId): bool {
        $sql = "
            DELETE FROM users
            WHERE userId = :id
        ";
        $stmt = $this->pdo->prepare($sql);
        return $stmt->execute(['id' => $userId]);
    }
}
