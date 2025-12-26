<?php

require_once __DIR__ . '/../../private/Database/Connect.php';

require_once __DIR__ . '/../../private/Database/DBO_article.php';
require_once __DIR__ . '/../../private/Database/DBO_flags.php';
require_once __DIR__ . '/../../private/Database/DBO_ledger.php';
require_once __DIR__ . '/../../private/Database/DBO_reports.php';
require_once __DIR__ . '/../../private/Database/DBO_samples.php';
require_once __DIR__ . '/../../private/Database/DBO_users.php';

class Sanitizer {

    private PDO $pdo;

    private DBO_article $dboArticle;
    private DBO_flags   $dboFlags;
    private DBO_reports $dboReports;
    private DBO_samples $dboSamples;
    private DBO_users   $dboUsers;

    private array $profanityPatterns = [];
    private array $injectionPatterns = [];

    public const PROFANITY_PATH = __DIR__ . '/../Misc/patternsProfanity.json';
    public const INJECTION_PATH = __DIR__ . '/../Misc/patternsInjection.json';

    public function __construct(PDO $pdo) {
        $this->dboArticle = new DBO_article($pdo);
        $this->dboFlags   = new DBO_flags($pdo);
        $this->dboReports = new DBO_reports($pdo);
        $this->dboSamples = new DBO_samples($pdo);
        $this->dboUsers   = new DBO_users($pdo);

        $this->pdo = $pdo;

        $this->loadProfanityPatterns();
        $this->loadInjectionPatterns();
    }

    public function sanitizeInput(array &$input): void {
        foreach ($input as $key => &$val) {
            if ($val === null) continue;

            // Skip file fields
            if (in_array($key, ['tmpPath'], true)) {
                continue;
            }

            // IP addresses
            if ($key === 'ipAddress') {
                continue;
            }

            // User agent
            if ($key === 'userAgent') {
                continue;
            }

            // User-generated fields
            $val = (string)$val;
            $val = $this->trimWhitespace($val);
            $val = $this->normalizeWhitespace($val);
            $val = $this->filterInjection($val, $key);
            $val = $this->removeSymbols($val, $key);
            $val = $this->filterProfanity($val);
            $val = $this->stripYouTubeTracking($val);
        }
    }

    private function removeSymbols(string $val, string $field): string {
        // TODO: implement symbol stripping
        return $val;
    }

    private function trimWhitespace(string $val): string {
        // TODO: implement trimming
        return $val;
    }

    private function normalizeWhitespace(string $val): string {
        // TODO: implement normalization
        return $val;
    }

    public static function escapeForHtml(string $val): string {
        // TODO: implement HTML escaping
        return $val;
    }

    private function filterProfanity(string $val): string {
        static $patterns = null;

        if ($patterns === null) {
            $jsonPath = __DIR__ . '/../../app/Misc/patternsProfanity.json';
            $patterns = file_exists($jsonPath)
                ? json_decode(file_get_contents($jsonPath), true)
                : [];
        }

        if (empty($patterns)) {
            return $val;
        }

        foreach ($patterns as $pattern) {
            $safe = preg_quote($pattern, '/');
            $val = preg_replace("/\b{$safe}\b/i", "***", $val);
        }

        return $val;
    }

    private function filterInjection(string $val, string $field): string {
        // TODO: implement injection filtering
        return $val;
    }

    private function loadProfanityPatterns(): void {
        // TODO: load from patternsProfanity.json
        $this->profanityPatterns = [];
    }

    private function loadInjectionPatterns(): void {
        // TODO: load from patternsInjection.json
        $this->injectionPatterns = [];
    }

    /**
     * Removes YouTube tracking/query parameters from pasted links.
     */
    private function stripYouTubeTracking(string $strInput): string {
        $strPattern = '/
            (https?:\/\/(?:www\.)?(?:youtube\.com\/(?:watch\?v=|shorts\/)|youtu\.be\/))  # base URL
            ([a-zA-Z0-9_-]{11})                                                          # video ID
            (\?[^ \n<"]*)?                                                               # optional query string
        /x';

        $strOutput = preg_replace_callback($strPattern, function ($arrMatches) {
            $strBaseUrl     = $arrMatches[1] ?? '';
            $strVideoId     = $arrMatches[2] ?? '';
            $strQueryString = $arrMatches[3] ?? '';

            $strFinalUrl = $strBaseUrl . $strVideoId;

            if ($strQueryString !== '') {
                $strQueryNoMark = ltrim($strQueryString, '?');
                $arrParams = [];
                parse_str($strQueryNoMark, $arrParams);

                $tsKey   = '';
                $tsValue = '';

                foreach ($arrParams as $k => $v) {
                    if ($k === 't' || $k === 'start') {
                        $tsKey   = $k;
                        $tsValue = $v;
                    }
                }

                if ($tsKey !== '' && $tsValue !== '') {
                    $strFinalUrl .= '?' . $tsKey . '=' . $tsValue;
                }
            }

            return $strFinalUrl;
        }, $strInput);

        return $strOutput;
    }
}
