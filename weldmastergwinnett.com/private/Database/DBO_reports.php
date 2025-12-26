<?php

class DBO_reports {
    // === Properties ===
    public string $reportId;
    public string $articleId;
    public string $userId;
    public string $createdAt;

    private PDO $pdo;

    public function __construct(PDO $pdo) {
        $this->pdo = $pdo;
    }

    // === CREATE ===
    public function createReport(int $articleId, int $userId): int {
        $sql = "
            INSERT INTO reports (articleId, userId)
            VALUES (:articleId, :userId)
        ";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([
            'articleId' => $articleId,
            'userId'    => $userId
        ]);
        return (int)$this->pdo->lastInsertId();
    }

    // === READ ===
    public function readReportCountByArticle(int $articleId): int {
        $sql = "
            SELECT COUNT(*) 
            FROM reports
            WHERE articleId = :articleId
        ";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute(['articleId' => $articleId]);

        return (int)$stmt->fetchColumn();
    }

    public function readReportCounts(): array {
        $sql = "
            SELECT articleId, COUNT(*) AS reportCount
            FROM reports
            GROUP BY articleId
        ";
        $stmt = $this->pdo->query($sql);
        return $stmt->fetchAll(PDO::FETCH_ASSOC) ?: [];
    }

    // === UPDATE ===
    public function updateReportStatus(int $reportId, string $status): bool {
        // placeholder if you later add a status column
        return false;
    }

    // === DELETE ===
    public function deleteReport(int $articleId, int $userId): bool {
        $sql = "
            DELETE FROM reports
            WHERE articleId = :articleId
              AND userId    = :userId
        ";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([
            'articleId' => $articleId,
            'userId'    => $userId
        ]);
        return $stmt->rowCount() > 0;
    }
}
