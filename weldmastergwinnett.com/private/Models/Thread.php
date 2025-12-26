<?php

require_once __DIR__ . '/Article.php';
require_once __DIR__ . '/Comment.php';
require_once __DIR__ . '/../Database/DBO_article.php';

class Thread extends Article {

  public const TYPE = 'thread';

  private string $preview = '';

  public function __construct(array $data) {
    parent::__construct($data);
    $this->articleType = self::TYPE;
    $this->preparePreview();
  }

  public static function load(PDO $pdo, int $articleId) {
    $dbo  = new DBO_article($pdo);
    $rows = $dbo->readFullArticle_Thread($articleId);

    if (empty($rows)) {
      return null;
    }

    $thread = new self($rows[0]);

    foreach (array_slice($rows, 1) as $row) {
      $thread->addComment(new Comment($row));
    }

    return $thread;
  }

  public function save(PDO $pdo): void {
    $dbo = new DBO_article($pdo);

    $newId = $dbo->createArticle([
      'userId'      => $this->userId,
      'parentId'    => $this->parentId,
      'articleType' => self::TYPE,
      'displayName' => $this->displayName,
      'title'       => $this->title,
      'body'        => $this->body,
      'mediaSrc'    => $this->mediaSrc,
      'sectionId'   => $this->sectionId,
    ]);

    $row = $dbo->readArticleById($newId);

    $this->articleId    = (string)$row['articleId'];
    $this->createdAt    = (string)$row['createdAt'];
    $this->updatedAt    = (string)$row['updatedAt'];
    $this->reportCount  = (string)($row['reportCount'] ?? '0');
    $this->commentCount = (string)($row['commentCount'] ?? '0');
  }

  public function delete(PDO $pdo): void {
    $dbo = new DBO_article($pdo);
    $dbo->deleteArticle((int)$this->articleId);

    $file  = $this->mediaDirectory . $this->mediaFullPath;
    $thumb = $this->mediaDirectory . $this->mediaThumbPath;

    if (file_exists($file)) {
      unlink($file);
    }
    if ($thumb && $thumb !== $this->mediaFullPath && file_exists($thumb)) {
      unlink($thumb);
    }
  }

  public function renderArticleCard(): string {
    $title       = htmlspecialchars($this->title, ENT_QUOTES, 'UTF-8');
    $displayName = htmlspecialchars($this->displayName, ENT_QUOTES, 'UTF-8');

    // Only escape preview if it contains no HTML tag
    $preview = (strip_tags($this->preview) === $this->preview)
        ? htmlspecialchars($this->preview, ENT_QUOTES, 'UTF-8')
        : $this->preview;

    return <<<HTML
      <a href="viewArticle.php?articleId={$this->articleId}" class="threadAnchor">
        <article id="thread-{$this->articleId}" 
                 class="threadCard"
                 data-article-id="{$this->articleId}"
                 data-user-id="{$this->userId}"
                 data-section-id="{$this->sectionId}"
                 data-parent-id="{$this->parentId}"
                 data-report-count="{$this->reportCount}"
                 data-comment-count="{$this->commentCount}">

          <div class="header">
            <h3 class="title">{$title}</h3>
          </div>

          <div class="body">
            {$this->renderCardMedia()}
            <p class="text">{$preview}</p>
            <span class="author">By: {$displayName}</span>
          </div>

          <div class="footer">
            <button type="button" class="actionIcon">
              💬 <span class="commentCount">{$this->commentCount}</span>
            </button>
            <button type="button" class="actionIcon" onclick="event.preventDefault(); submitReport({$this->articleId})">
              🚩 <span class="reportCount">{$this->reportCount}</span>
            </button>
          </div>

        </article>
      </a>
    HTML;
  }


  public function renderArticle(): string {
      $title       = htmlspecialchars($this->title, ENT_QUOTES, 'UTF-8');
      $displayName = htmlspecialchars($this->displayName, ENT_QUOTES, 'UTF-8');
      $body        = htmlspecialchars($this->body, ENT_QUOTES, 'UTF-8');

      return <<<HTML
        <article id="article-{$this->articleId}" 
          class="thread expanded"
          data-article-id="{$this->articleId}"
          data-section-id="{$this->sectionId}">



          <div class="header">
            <span class="author">{$displayName}</span>
            <span class="id">#{$this->articleId}</span>
          </div>

          <h2 class="title">{$title}</h2>

          <div class="body">
            {$this->renderMedia()}
            <p class="text">{$body}</p>
          </div>

          <div class="footer">
            <time class="timestamp">{$this->createdAt}</time>
            <button class="actionIcon" onclick="quote({$this->articleId})">💬 Quote</button>
            <button class="actionIcon" onclick="submitReport({$this->articleId})">
              🚩 Report (<span class="reportCount">{$this->reportCount}</span>)
            </button>
          </div>

          <div class="replyLinks" data-article-id="{$this->articleId}"></div>

        </article>
      HTML;
  }


private function preparePreview(): void {
    $limit   = 150;
    $content = trim($this->body);

    // If there's an uploaded image/video, show plain text
    if (!empty($this->mediaSrc)) {
        $this->preview = strlen($content) > $limit
            ? substr($content, 0, $limit) . '…'
            : $content;
        return;
    }

    // Keep URLs so JS can embed them later
    $text = preg_replace('/\s+/', ' ', $content);

    $this->preview = strlen($text) > $limit
        ? substr($text, 0, $limit) . '…'
        : $text;
}



}
