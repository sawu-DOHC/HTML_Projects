<?php

abstract class Article {

    public string $articleId;
    public string $sectionId;
    public string $userId;
    public string $parentId;
    public string $articleType;
    public string $displayName;
    public string $title;
    public string $body;
    public string $mediaSrc;
    public string $createdAt;
    public string $updatedAt;

    // === Derived values ===
    public string $reportCount;
    public string $commentCount;

    // === Media paths ===
    protected string $mediaFullPath  = '';
    protected string $mediaThumbPath = '';
    protected string $mediaDirectory = __DIR__ . '/../../public/Assets/Uploads/';

    // === Related comments ===
    protected array $comments = [];

    // === Construction ===
    public function __construct(array $data) {
        $this->articleId    = (string)($data['articleId']    ?? '');
        $this->sectionId    = (string)($data['sectionId']    ?? '');
        $this->userId       = (string)($data['userId']       ?? '');
        $this->parentId     = (string)($data['parentId']     ?? '');
        $this->articleType  = (string)($data['articleType']  ?? '');
        $this->displayName  = (string)($data['displayName']  ?? 'Anonymous');
        $this->title        = (string)($data['title']        ?? '');
        $this->body         = (string)($data['body']         ?? '');
        $this->mediaSrc     = (string)($data['mediaSrc']     ?? '');
        $this->createdAt    = (string)($data['createdAt']    ?? '');
        $this->updatedAt    = (string)($data['updatedAt']    ?? '');
        $this->reportCount  = (string)($data['reportCount']  ?? '0');
        $this->commentCount = (string)($data['commentCount'] ?? '0');
    
        $this->setMediaPaths();
    }

    // === Required methods subclasses must implement ===
    abstract public static function load(PDO $pdo, int $articleId);
    abstract public function save(PDO $pdo): void;
    abstract public function delete(PDO $pdo): void;
    abstract public function renderArticleCard(): string; // card view
    abstract public function renderArticle(): string;      // full view

    // --- Media rendering now centralized ---
    // === Cards only (gallery, forum list, etc.)
    public function renderCardMedia(): string {
        if ($this->getMediaThumbPath() === '') return '';
        return <<<HTML
            <img class="cardMedia"
                 src="Assets/Uploads/{$this->getMediaThumbPath()}"
                 alt="card thumbnail"
                 loading="lazy">
        HTML;
    }

    public function renderMediaThumb(): string {
        if ($this->getMediaThumbPath() === '') return '';
        return <<<HTML
            <img class="articleMedia thumb"
                 src="Assets/Uploads/{$this->getMediaThumbPath()}"
                 alt="article thumbnail"
                 loading="lazy"
                 data-thumb="Assets/Uploads/{$this->getMediaThumbPath()}"
                 data-full="Assets/Uploads/{$this->getMediaFullPath()}"
                 onclick="toggleImageSize(this)">
        HTML;
    }

    public function renderMedia(): string {
        if ($this->getMediaFullPath() === '') return '';
        return <<<HTML
            <img class="articleMedia expanded"
                 src="Assets/Uploads/{$this->getMediaFullPath()}"
                 alt="article media"
                 loading="lazy"
                 data-thumb="Assets/Uploads/{$this->getMediaThumbPath()}"
                 data-full="Assets/Uploads/{$this->getMediaFullPath()}"
                 onclick="toggleImageSize(this)">
        HTML;
    }

    protected function setMediaPaths(): void {
        if ($this->mediaSrc === '') {
            $this->mediaFullPath  = '';
            $this->mediaThumbPath = '';
            return;
        }

        $this->mediaFullPath = $this->mediaSrc;

        $thumbName = preg_replace('/(\.[^.]+)$/', '_thumb$1', $this->mediaSrc);
        $thumbPath = $this->mediaDirectory . $thumbName;

        $this->mediaThumbPath = file_exists($thumbPath) ? $thumbName : $this->mediaSrc;
    }

    public function getMediaFullPath(): string {
        return $this->mediaFullPath;
    }

    public function getMediaThumbPath(): string {
        return $this->mediaThumbPath;
    }

    public function addComment(Comment $comment): void {
        $this->comments[] = $comment;
    }

    public function getComments(): array {
        return $this->comments;
    }

    public function renderComments(): string {
        if (empty($this->comments)) {
            return '';
        }

        $html = '';
        foreach ($this->comments as $comment) {
            $html .= $comment->renderArticle();
        }

        return <<<HTML
          <div class="articleComments" data-parent-id="{$this->articleId}">
            <h4>Comments (<span class="commentCount">{$this->commentCount}</span>)</h4>
            <div class="commentList">
              {$html}
            </div>
          </div>
        HTML;
    }
    public static function loadUnified(PDO $pdo, int $articleId) {
        $dbo = new DBO_article($pdo);
        $row = $dbo->readArticleById($articleId);
        
        if (!$row) return null;
        
        $type = $row['articleType'];
        
        if ($type === 'sample') {
            return Sample::load($pdo, $articleId);
        }
        if ($type === 'thread') {
            return Thread::load($pdo, $articleId);
        }
    
        return null;
    }

}
