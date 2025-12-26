<?php

require_once __DIR__ . '/../../private/Database/Connect.php';

require_once __DIR__ . '/../../private/Database/DBO_article.php';
require_once __DIR__ . '/../../private/Database/DBO_flags.php';
require_once __DIR__ . '/../../private/Database/DBO_ledger.php';
require_once __DIR__ . '/../../private/Database/DBO_reports.php';
require_once __DIR__ . '/../../private/Database/DBO_samples.php';
require_once __DIR__ . '/../../private/Database/DBO_users.php';

class Validator {

    private PDO $pdo;

    private DBO_article $dboArticle;
    private DBO_flags   $dboFlags;
    private DBO_ledger  $dboLedger;
    private DBO_reports $dboReports;
    private DBO_samples $dboSamples;
    private DBO_users   $dboUsers;

    public function __construct(PDO $pdo) {
        $this->pdo = $pdo;

        $this->dboArticle = new DBO_article($pdo);
        $this->dboFlags   = new DBO_flags($pdo);
        $this->dboLedger  = new DBO_ledger($pdo);
        $this->dboReports = new DBO_reports($pdo);
        $this->dboSamples = new DBO_samples($pdo);
        $this->dboUsers   = new DBO_users($pdo);
    }

    public function validateInput(array &$input): void {
        $defaults = [
            'ipAddress'      => null,
            'userAgent'      => null,
            'tmpPath'        => null,
            'originalName'   => null,
            'fileType'       => null,
            'fileSize'       => null,
            'articleType'    => '',
            'parentId'       => null,
            'userId'         => null,
            'displayName'    => 'Anonymous',
            'title'          => '',
            'body'           => '',
            'mediaSrc'       => null,
            'process'        => null,
            'material'       => null,
            'joint'          => null,
            'thickness'      => null,
            'countryId'      => null,
            'submissionHash' => null,
            'reportCount'    => 0,
            'commentCount'   => 0,
            'createdAt'      => null,
            'updatedAt'      => null,
            'status'         => 'accepted',
        ];
        $input = array_merge($defaults, $input);

        $input['userId'] = $this->resolveUserId($input['ipAddress'], $input['userAgent']);
        $input['submissionHash'] = $this->hashSubmission($input);

        try {
            $this->checkRateLimit($input['userId']);
            $this->checkDuplicate($input['submissionHash']);
            $this->checkBanList($input['ipAddress']);

            $this->validateArticleType($input['articleType']);
            $this->validateUserId($input['userId']);
            $this->validateParentId($input['parentId'], $input['articleType']);
            $this->validateDisplayName($input['displayName']);
            $this->validateTitle($input['title']);
            $this->validateBody($input['body']);
            $this->validateMediaSrc($input['mediaSrc']);

            $this->validateProcess($input['process']);
            $this->validateMaterial($input['material']);
            $this->validateJoint($input['joint']);
            $this->validateThickness($input['thickness']);
            $this->validateCountryId($input['countryId']);

            $this->validateTmpPath($input['tmpPath']);
            $this->validateOriginalName($input['originalName']);
            $this->validateFileType($input['fileType']);
            $this->validateFileSize($input['fileSize']);

            $input['status'] = 'accepted';
            $this->dboLedger->createLedgerEntry($input);

        } catch (RuntimeException $e) {
            $msg = strtolower($e->getMessage());
            $input['status'] = str_contains($msg, 'duplicate') ? 'duplicate' : 'rejected';

            error_log("[VALIDATOR] Rejected submission: {$e->getMessage()}");

            try {
                $this->dboLedger->createLedgerEntry($input);
            } catch (Throwable $inner) {}

            throw $e;

        } catch (Throwable $e) {
            $input['status'] = 'failed';
            error_log("[VALIDATOR] Validation failed fatally: {$e->getMessage()}");

            try {
                $this->dboLedger->createLedgerEntry($input);
            } catch (Throwable $inner) {}

            throw $e;
        }
    }

    private function resolveUserId(?string $ip, ?string $ua): ?int {
        if (!$ip) throw new RuntimeException("missing ip address");
        $user = $this->dboUsers->readUserByIp($ip);
        if ($user && isset($user['userId'])) return (int)$user['userId'];

        $userId = $this->dboUsers->createUser([
            'ipAddress' => $ip,
            'userAgent' => $ua ?? '',
        ]);
        if (!$userId) throw new RuntimeException("failed to create user");
        return (int)$userId;
    }

    private function checkRateLimit(int $userId): void {
        $limit = 4;
        $interval = 60;
        $count = $this->dboLedger->readLedgerByUserId($userId, $interval);
        if ($count >= $limit) throw new RuntimeException("[checkRateLimit] rate limit exceeded");
    }

    private function checkDuplicate(string $hash): void {
        $rows = $this->dboLedger->readLedgerByHash($hash);
        if (!empty($rows)) {
            throw new RuntimeException("[checkDuplicate] duplicate submission detected for hash $hash");
        }
    }

    private function checkBanList(?string $ip): void {
        return;
    }

    private function hashSubmission(array $input): string {
        $data = json_encode([
            'userId'      => $input['userId'] ?? '',
            'body'        => $input['body'] ?? '',
            'articleType' => $input['articleType'] ?? '',
            'parentId'    => $input['parentId'] ?? '',
            'process'     => $input['process'] ?? '',
            'material'    => $input['material'] ?? '',
            'joint'       => $input['joint'] ?? '',
            'thickness'   => $input['thickness'] ?? '',
            'countryId'   => $input['countryId'] ?? '',
        ]);
        return hash('sha256', $data);
    }

    private function validateArticleType(?string &$value): void {
        $allowed = ['thread', 'sample', 'comment', 'battle'];
        if (!in_array($value, $allowed, true)) {
            throw new InvalidArgumentException("invalid articleType");
        }
        $value = trim($value);
    }

    private function validateUserId(&$value): void {
        if ($value === null || !ctype_digit((string)$value)) {
            throw new InvalidArgumentException("[validateUserId] userId must be numeric");
        }
        $value = (int)$value;
    }

    private function validateParentId(&$value, ?string $type): void {
        $isTopLevel = in_array($type, ['thread', 'sample', 'battle'], true);
        if ($isTopLevel) {
            $value = null;
            return;
        }

        if ($value === '' || $value === null || $value === '0' || $value === 0) {
            throw new InvalidArgumentException("[validateParentId] missing parentId for comment");
        }

        if (!ctype_digit((string)$value)) {
            throw new InvalidArgumentException("[validateParentId] non-numeric parentId '{$value}'");
        }

        $id = (int)$value;
        $parent = $this->dboArticle->readArticleById($id);
        if (empty($parent)) {
            throw new InvalidArgumentException("[validateParentId] parent article #{$id} not found");
        }

        $value = $id;
    }

    private function validateDisplayName(?string &$value): void {
        if (!$value || trim($value) === '') {
            $value = 'Anonymous';
            return;
        }
        $value = trim($value);
        if (strlen($value) > 32) $value = substr($value, 0, 32);
    }

    private function validateTitle(?string &$value): void {
        if ($value === null) $value = '';
        $value = trim($value);
    }

    private function validateBody(?string &$value): void {
        if ($value === null || trim($value) === '') {
            throw new InvalidArgumentException("empty body");
        }
        $value = trim($value);
    }

    private function validateMediaSrc(?string &$value): void {
        if ($value === null || $value === '') {
            $value = null;
            return;
        }
        $value = trim($value);
        if (strlen($value) > 255) {
            throw new InvalidArgumentException("[validateMediaSrc] path too long");
        }
    }

    private function validateTmpPath(?string &$value): void {}
    private function validateOriginalName(?string &$value): void {}
    private function validateFileType(?string &$value): void {}
    private function validateFileSize(?int &$value): void {}
    private function validateProcess(?string &$value): void {}
    private function validateMaterial(?string &$value): void {}
    private function validateJoint(?string &$value): void {}
    private function validateThickness(?string &$value): void {}
    private function validateCountryId(?string &$value): void {}
}
