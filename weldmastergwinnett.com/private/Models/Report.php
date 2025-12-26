<?php
require_once __DIR__ . '/../Database/DBO_reports.php';

class Report {
    public const TYPE = 'report';

    // Core fields
    public string $articleId;
    public string $userId;

    // Derived
    public string $action;       // 'added' or 'removed'
    public string $reportCount;  // total reports after toggle

    public function __construct(array $data) {
        $this->articleId = (string)($data['articleId'] ?? '');
        $this->userId    = (string)($data['userId'] ?? '');
    }

    public function store(PDO $pdo): void {
        $dboReports = new DBO_reports($pdo);

        $deleted = $dboReports->deleteReport(
            (int)$this->articleId,
            (int)$this->userId
        );

        if ($deleted) {
            $this->action = 'removed';
        } else {
            $dboReports->createReport(
                (int)$this->articleId,
                (int)$this->userId
            );
            $this->action = 'added';
        }

        $this->reportCount = (string)$dboReports->readReportCountByArticle(
            (int)$this->articleId
        );
    }

    public function render(): string {
        return json_encode([
            'articleId'   => $this->articleId,
            'action'      => $this->action,
            'reportCount' => $this->reportCount,
        ]);
    }
}
