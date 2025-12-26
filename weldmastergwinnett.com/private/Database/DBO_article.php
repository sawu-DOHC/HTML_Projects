<?php

class DBO_article {

    private PDO $pdo;

    public function __construct(PDO $pdo) {
        $this->pdo = $pdo;
    }

    // === CREATE ===
    public function createArticle(array $data): int {
        $sql = "
            INSERT INTO article
            (userId, parentId, articleType, displayName, title, body, mediaSrc)
            VALUES (:userId, :parentId, :articleType, :displayName, :title, :body, :mediaSrc)
        ";

        $stmt = $this->pdo->prepare($sql);

        $stmt->bindValue(':userId',      $data['userId']);
        $stmt->bindValue(':parentId',    $data['parentId'], is_null($data['parentId']) ? PDO::PARAM_NULL : PDO::PARAM_INT);
        $stmt->bindValue(':articleType', $data['articleType']);
        $stmt->bindValue(':displayName', $data['displayName']);
        $stmt->bindValue(':title',       $data['title']);
        $stmt->bindValue(':body',        $data['body']);
        $stmt->bindValue(':mediaSrc',    $data['mediaSrc']);

        if (!$stmt->execute()) {
            $error = $stmt->errorInfo();
            throw new RuntimeException("[DBO_article] Insert failed: {$error[2]}");
        }

        return (int)$this->pdo->lastInsertId();
    }


    // === READ ===
    public function readArticleById(int $articleId): array {
        $sql = "
            SELECT 
                a.*,
                COALESCE(r.reportCount, 0) AS reportCount
            FROM article a
            LEFT JOIN (
                SELECT articleId, COUNT(*) AS reportCount
                FROM reports
                GROUP BY articleId
            ) r ON r.articleId = a.articleId
            WHERE a.articleId = :id
        ";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute(['id' => $articleId]);
        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        return $row ?: [];
    }
    public function readArticlesByType(string $type): array {
        $sql = "
            SELECT 
                a.*,
                s.countryId, s.process, s.material, s.thickness, s.joint,
                COALESCE(reportCounts.reportCount, 0)   AS reportCount,
                COALESCE(commentCounts.commentCount, 0) AS commentCount
            FROM article a
            LEFT JOIN samples s 
                ON a.articleId = s.articleId AND a.articleType = 'sample'
            LEFT JOIN (
                SELECT articleId, COUNT(*) AS reportCount
                FROM reports
                GROUP BY articleId
            ) AS reportCounts 
                ON reportCounts.articleId = a.articleId
            LEFT JOIN (
                SELECT parentId, COUNT(*) AS commentCount
                FROM article
                WHERE articleType = 'comment'
                GROUP BY parentId
            ) AS commentCounts
                ON commentCounts.parentId = a.articleId
            WHERE a.articleType = :type
            ORDER BY a.updatedAt DESC

        ";
    
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute(['type' => $type]); // fixed
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }


    public function readComments(int $articleId): array {
        $sql = "
            SELECT 
                a.*,
                COALESCE(r.reportCount, 0) AS reportCount
            FROM article a
            LEFT JOIN (
                SELECT articleId, COUNT(*) AS reportCount
                FROM reports
                GROUP BY articleId
            ) r ON a.articleId = r.articleId
            WHERE a.parentId = :parentId
              AND a.articleType = 'comment'
            ORDER BY a.createdAt ASC
        ";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute(['parentId' => $articleId]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
    public function readDistinctWelders(): array {
        $sql = "
            SELECT DISTINCT displayName
            FROM article
            WHERE articleType = 'sample'
              AND displayName IS NOT NULL
              AND displayName <> ''
            ORDER BY displayName ASC
        ";
        $stmt = $this->pdo->query($sql);
        return $stmt->fetchAll(PDO::FETCH_COLUMN) ?: [];
    }
    public function readFullArticle_Thread(int $articleId): array {
        $sql = "
            SELECT a.*, COALESCE(r.reportCount, 0) AS reportCount
            FROM article a
            LEFT JOIN (
                SELECT articleId, COUNT(*) AS reportCount
                FROM reports
                GROUP BY articleId
            ) r ON r.articleId = a.articleId
            WHERE a.articleId = :id OR a.parentId = :id
            ORDER BY a.createdAt ASC
        ";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute(['id' => $articleId]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
    public function readFullArticle_Sample(int $articleId): array {
        $sql = "
        SELECT 
            a.*,
            s.countryId, s.process, s.material, s.thickness, s.joint,
            COALESCE(r.reportCount, 0)   AS reportCount,
            COALESCE(c.commentCount, 0)  AS commentCount
        FROM article a
        JOIN samples s ON a.articleId = s.articleId
        LEFT JOIN (
            SELECT articleId, COUNT(*) AS reportCount
            FROM reports
            GROUP BY articleId
        ) r ON r.articleId = a.articleId
        LEFT JOIN (
            SELECT parentId, COUNT(*) AS commentCount
            FROM article
            WHERE articleType = 'comment'
            GROUP BY parentId
        ) c ON c.parentId = a.articleId
        WHERE a.articleId = :id
          AND a.articleType = 'sample'
        ";
    
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute(['id' => $articleId]);
        $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
        $sqlComments = "
            SELECT *
            FROM article
            WHERE articleType = 'comment'
              AND parentId = :id
            ORDER BY createdAt ASC
        ";
        $stmtComments = $this->pdo->prepare($sqlComments);
        $stmtComments->execute(['id' => $articleId]);
        $comments = $stmtComments->fetchAll(PDO::FETCH_ASSOC);
    
        return array_merge($rows, $comments);
    }

    // === UPDATE ===
    public function updateArticle(int $articleId): bool {
        $sql = "UPDATE article SET updatedAt = CURRENT_TIMESTAMP WHERE articleId = :id";
        $stmt = $this->pdo->prepare($sql);
        return $stmt->execute(['id' => $articleId]);
    }

    // === DELETE ===
    public function deleteArticle(int $articleId): bool {
        $sql = "DELETE FROM article WHERE articleId = :id";
        $stmt = $this->pdo->prepare($sql);
        return $stmt->execute(['id' => $articleId]);
    }
}
