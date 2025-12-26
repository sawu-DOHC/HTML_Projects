<?php

class DBO_ledger {
    // === Properties ===
    public string $ledgerId;
    public string $userId;
    public string $ipAddress;
    public string $actionType;
    public string $submissionHash;
    public string $status;
    public string $createdAt;

    private PDO $pdo;

    public function __construct(PDO $pdo) {
        $this->pdo = $pdo;
    }

    // === CREATE ===
    public function createLedgerEntry(array $data): int {
        $map = [
            'thread'    => 'create_thread',
            'sample'    => 'create_sample',
            'comment'   => 'create_comment',
            'merch'     => 'create_merch',
            'inventory' => 'create_inventory',
            'report'    => 'submit_report',
        ];
        $actionType = $map[$data['articleType'] ?? ''] ?? null;
    
        $sql = "
            INSERT INTO ledger
            (userId, ipAddress, actionType, submissionHash, status, rejectionReason)
            VALUES
            (:userId, :ipAddress, :actionType, :submissionHash, :status, :rejectionReason)
        ";
    
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([
            'userId'         => $data['userId'] ?? null,
            'ipAddress'      => $data['ipAddress'] ?? null,
            'actionType'     => $actionType,
            'submissionHash' => $data['submissionHash'] ?? null,
            'status'         => $data['status'] ?? 'accepted',
            'rejectionReason'=> $data['rejectionReason'] ?? null,
        ]);
    
        return (int)$this->pdo->lastInsertId();
    }
    
    // === VALIDATION ===
    private function validateActionType(?string $value): void {
        $valid = [
            'create_thread',
            'create_comment',
            'create_sample',
            'create_battle',
            'create_merch',
            'create_inventory',
            'submit_report',
        ];

        if (!in_array($value, $valid, true)) {
            throw new InvalidArgumentException("Invalid actionType: " . ($value ?? 'NULL'));
        }
    }

    // === READ (count within interval) ===
    public function readLedgerByUserId(int $userId, int $interval): int {
        $interval = (int)$interval;
        $sql = "
            SELECT COUNT(*) 
            FROM ledger 
            WHERE userId = :userId 
              AND createdAt >= (NOW() - INTERVAL $interval SECOND)
        ";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute(['userId' => $userId]);
        return (int)$stmt->fetchColumn();
    }

    // === READ (by hash) ===
    public function readLedgerByHash(string $submissionHash): array {
        $sql = "
            SELECT ledgerId, userId, actionType, submissionHash, createdAt
            FROM ledger
            WHERE status = 'accepted'
              AND submissionHash = :submissionHash
            ORDER BY createdAt DESC
            LIMIT 10
        ";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute(['submissionHash' => $submissionHash]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC) ?: [];
    }

    // === UPDATE ===
    public function updateLedgerStatus(int $ledgerId, string $status): bool {
        $sql = "
            UPDATE ledger
            SET status = :status
            WHERE ledgerId = :id
        ";
        $stmt = $this->pdo->prepare($sql);
        return $stmt->execute([
            'status' => $status,
            'id'     => $ledgerId
        ]);
    }

    // === DELETE ===
    public function deleteLedger(int $ledgerId): bool {
        $sql = "DELETE FROM ledger WHERE ledgerId = :id";
        $stmt = $this->pdo->prepare($sql);
        return $stmt->execute(['id' => $ledgerId]);
    }
}
