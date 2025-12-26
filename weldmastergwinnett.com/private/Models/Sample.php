<?php

require_once __DIR__ . '/Article.php';
require_once __DIR__ . '/Comment.php';
require_once __DIR__ . '/../Database/DBO_article.php';
require_once __DIR__ . '/../Database/DBO_samples.php';

class Sample extends Article {

  public const TYPE = 'sample';

  public string $countryId;
  public string $process;
  public string $material;
  public string $thickness;
  public string $joint;

  public function __construct(array $data) {
      parent::__construct($data);

      $this->articleType = self::TYPE;
      $this->countryId   = (string)$data['countryId'];
      $this->process     = (string)$data['process'];
      $this->material    = (string)$data['material'];
      $this->thickness   = (string)$data['thickness'];
      $this->joint       = (string)$data['joint'];
  }

  public static function load(PDO $pdo, int $articleId) {
      $dbo  = new DBO_article($pdo);
      $rows = $dbo->readFullArticle_Sample($articleId);

      if (empty($rows)) {
          return null;
      }

      $sample = new self($rows[0]);

      foreach (array_slice($rows, 1) as $row) {
          $sample->addComment(new Comment($row));
      }

      return $sample;
  }

public function save(PDO $pdo): void {
    $dboArticle = new DBO_article($pdo);

    // 1️⃣ Insert base article
    $newId = $dboArticle->createArticle([
        'userId'      => $this->userId,
        'parentId'    => $this->parentId,
        'articleType' => self::TYPE,
        'displayName' => $this->displayName,
        'title'       => $this->title,
        'body'        => $this->body,
        'mediaSrc'    => $this->mediaSrc,
        'sectionId'   => $this->sectionId,
    ]);

    if (!$newId) {
        throw new RuntimeException("Failed to insert into article table.");
    }

    // 2️⃣ Insert into samples
    $dboSamples = new DBO_samples($pdo);
    $success = $dboSamples->createSample([
        'articleId' => $newId,
        'countryId' => $this->countryId,
        'process'   => $this->process,
        'material'  => $this->material,
        'thickness' => $this->thickness,
        'joint'     => $this->joint,
    ]);

    if (!$success) {
        throw new RuntimeException("Failed to insert into samples table.");
    }

    // 3️⃣ Reload populated article info
    $row = $dboArticle->readArticleById($newId);

    $this->articleId    = (string)$row['articleId'];
    $this->createdAt    = (string)$row['createdAt'];
    $this->updatedAt    = (string)$row['updatedAt'];
    $this->reportCount  = (string)($row['reportCount'] ?? '0');
    $this->commentCount = (string)($row['commentCount'] ?? '0');
}
public function delete(PDO $pdo): void {
    // intentionally left blank to satisfy abstract definition
}

public function renderArticleCard(): string {
    $displayName = htmlspecialchars($this->displayName, ENT_QUOTES, 'UTF-8');
    $title       = htmlspecialchars($this->title, ENT_QUOTES, 'UTF-8');

    return <<<HTML
      <a href="viewArticle.php?articleId={$this->articleId}" class="sampleAnchor">
        <article id="sample-{$this->articleId}" 
                 class="sampleCard"
                 data-article-id="{$this->articleId}"
                 data-user-id="{$this->userId}"
                 data-section-id="{$this->sectionId}"
                 data-parent-id="{$this->parentId}"
                 data-welder="{$displayName}"
                 data-process="{$this->process}"
                 data-material="{$this->material}"
                 data-thickness="{$this->thickness}"
                 data-joint="{$this->joint}">

          <div class="header">
            <span class="author">{$displayName}</span>
          </div>

          <div class="body">
            {$this->renderCardMedia()}
            <img class="flagOverlay" 
                 src="Assets/Flags/{$this->countryId}.svg" 
                 alt="{$this->countryId} flag">
            <div class="attributes">
              <span>{$this->process}</span>
              <span>{$this->material}</span>
              <span>{$this->thickness}</span>
              <span>{$this->joint}</span>
            </div>
          </div>

          <div class="footer"></div>

        </article>
      </a>
    HTML;
}

  public function renderArticle(): string {
      $displayName = htmlspecialchars($this->displayName, ENT_QUOTES, 'UTF-8');
      $title       = htmlspecialchars($this->title, ENT_QUOTES, 'UTF-8');
      $body        = htmlspecialchars($this->body, ENT_QUOTES, 'UTF-8');
  
      return <<<HTML
        <article id="article-{$this->articleId}" 
                 class="sample"
                 data-article-id="{$this->articleId}">
  
          <div class="header">
            <h1 class="author">{$displayName}</h1>
          </div>
  
          <div class="body">
            {$this->renderMedia()}
            <img class="flagOverlay" src="Assets/Flags/{$this->countryId}.svg" alt="{$this->countryId} flag">
            <h2 class="title">{$title}</h2>
            <div class="attributes">
              <span>{$this->process}</span>
              <span>{$this->material}</span>
              <span>{$this->thickness}</span>
              <span>{$this->joint}</span>
            </div>
            <p class="text">{$body}</p>
          </div>
  
          <div class="footer">
            <button class="actionIcon" onclick="quote({$this->articleId})">💬 Quote</button>
          </div>
  
        </article>
      HTML;
  }
  
  public function renderMediaThumb(): string {
      if ($this->getMediaThumbPath() === '') return '';
      return <<<HTML
          <img class="articleMedia thumb"
               src="Assets/Uploads/{$this->getMediaThumbPath()}"
               alt="sample thumbnail"
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
               alt="sample media"
               loading="lazy"
               data-thumb="Assets/Uploads/{$this->getMediaThumbPath()}"
               data-full="Assets/Uploads/{$this->getMediaFullPath()}"
               onclick="toggleImageSize(this)">
      HTML;
  }
}
