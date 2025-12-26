<?php
require_once __DIR__ . '/../private/Database/Connect.php';
require_once __DIR__ . '/../private/Library/Loader.php';

require_once __DIR__ . '/../private/Models/Article.php';
require_once __DIR__ . '/../private/Models/Sample.php';
require_once __DIR__ . '/../private/Models/Thread.php';
require_once __DIR__ . '/../private/Models/Comment.php';

$articleId = (int)($_GET['articleId'] ?? 0);
$article   = Article::loadUnified($pdo, $articleId);

if (!$article) {
    die("Article not found.");
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<link rel="icon" type="image/png" href="Assets/Uploads/reliefSmall.png">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title><?= htmlspecialchars($article->title) ?></title>

<?php loadAssets("viewArticle"); ?>



</head>

<body>

<div id="Background"></div>
<div id="LoadingScreen" class="hidden">
  <div class="spinner"></div>
  <p>Uploading, dont click on anything just wait!</p>
</div>

<main>

  <?= $article->renderArticle(); ?>

  <button onclick="showForm('FormComment')">+ reply</button>

  <div class="articleComments" data-parent-id="<?= $article->articleId ?>">
    <div class="commentList">
      <?php foreach ($article->getComments() as $comment): ?>
        <?= $comment->renderArticle(); ?>
      <?php endforeach; ?>
    </div>
  </div>

  <form id="FormComment" class="hidden" enctype="multipart/form-data"
        onsubmit="event.preventDefault(); submitComment(this);">

    <fieldset>

      <input type="hidden" name="parentId" value="<?= $article->articleId ?>">
      <input type="hidden" name="sectionId" value="<?= $article->sectionId ?>">

      <label>display name
        <input type="text" name="displayName" maxlength="100" placeholder="anonymous">
      </label>

      <label>image
        <input type="file" name="media" accept=".jpg,.jpeg,.gif,.webm">
      </label>

      <label>comment
        <textarea name="body" rows="5" maxlength="1000" required></textarea>
      </label>

      <button type="submit">post comment</button>
      <button type="button" class="cancel" onclick="hideForm('FormComment')">cancel</button>

    </fieldset>

  </form>

</main>

<footer></footer>

</body>
</html>
