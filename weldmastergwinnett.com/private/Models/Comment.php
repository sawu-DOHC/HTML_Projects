<?php

require_once __DIR__ . '/Article.php';
require_once __DIR__ . '/../Database/DBO_article.php';

class Comment extends Article {

    public const TYPE = 'comment';

    public function __construct(array $data) {
        parent::__construct($data);
        $this->articleType = self::TYPE;
    }

    public static function load(PDO $pdo, int $articleId) {
        $dbo = new DBO_article($pdo);
        $row = $dbo->readArticleById($articleId);

        if (empty($row)) {
            return null;
        }

        return new self($row);
    }

    public function save(PDO $pdo): void {
        $dbo = new DBO_article($pdo);

        $newId = $dbo->createArticle([
            'userId'      => $this->userId,
            'parentId'    => $this->parentId,
            'articleType' => self::TYPE,
            'displayName' => $this->displayName,
            'title'       => null, // comments don’t use titles
            'body'        => $this->body,
            'mediaSrc'    => $this->mediaSrc,
            'sectionId'   => $this->sectionId,
        ]);

        $row = $dbo->readArticleById($newId);

        $this->articleId   = (string)$row['articleId'];
        $this->createdAt   = (string)$row['createdAt'];
        $this->updatedAt   = (string)$row['updatedAt'];
        $this->reportCount = (string)($row['reportCount'] ?? '0');

        // bump parent comment count
        if ($this->parentId !== '') {
            $dbo->updateArticle((int)$this->parentId);
        }
    }

    public function delete(PDO $pdo): void {
        $dbo = new DBO_article($pdo);
        $dbo->deleteArticle((int)$this->articleId);

        $file = $this->mediaDirectory . $this->mediaFullPath;
        if (file_exists($file)) {
            unlink($file);
        }
    }

    public function renderArticleCard(): string {
        // Comments don’t have a mini card, reuse full render
        return $this->renderArticle();
    }

    public function renderArticle(): string {
        $displayName = htmlspecialchars($this->displayName, ENT_QUOTES, 'UTF-8');
        $body        = htmlspecialchars($this->body, ENT_QUOTES, 'UTF-8');
    
        return <<<HTML
          <article id="article-{$this->articleId}"
                   class="comment"
                   data-article-id="{$this->articleId}"
                   data-parent-id="{$this->parentId}"
                   data-user-id="{$this->userId}"
                   data-report-count="{$this->reportCount}">
    
            <div class="header">
              <span class="author">{$displayName}</span>
              <span class="commentId">#{$this->articleId}</span>
            </div>
    
            <div class="body">
              {$this->renderMediaThumb()}
              <p class="text">{$body}</p>
            </div>
    
            <div class="footer">
              <time class="timestamp">{$this->createdAt}</time>
              <button type="button" class="actionIcon" onclick="quote({$this->articleId})">💬 Quote</button>
              <button type="button" class="actionIcon" onclick="submitReport({$this->articleId})">
                🚩 Report (<span class="reportCount">{$this->reportCount}</span>)
              </button>
            </div>
    
            <div class="replyLinks" data-article-id="{$this->articleId}"></div>
    
          </article>
        HTML;
    }

}
