<?php
require_once __DIR__ . '/../private/Database/Connect.php';

require_once __DIR__ . '/../private/Database/DBO_article.php';
require_once __DIR__ . '/../private/Database/DBO_flags.php';
require_once __DIR__ . '/../private/Database/DBO_samples.php';

require_once __DIR__ . '/../private/Models/Article.php';
require_once __DIR__ . '/../private/Models/Sample.php';
require_once __DIR__ . '/../private/Models/Thread.php';

require_once __DIR__ . '/../private/Library/Loader.php';

$dboArticle = new DBO_article($pdo);
$dboSamples = new DBO_samples($pdo);
$dboFlags   = new DBO_flags($pdo);

$sampleRows = $dboArticle->readArticlesByType('sample');
$threadRows = $dboArticle->readArticlesByType('thread');

$samples = [];
foreach ($sampleRows as $row) {
    $samples[] = new Sample($row);
}

$threads = [];
foreach ($threadRows as $row) {
    $threads[] = new Thread($row);
}

$flags       = $dboFlags->readFlags();
$processes   = $dboSamples->readEnumValues('process');
$materials   = $dboSamples->readEnumValues('material');
$thicknesses = $dboSamples->readEnumValues('thickness');
$joints      = $dboSamples->readEnumValues('joint');
$welders     = $dboArticle->readDistinctWelders();
?>
<!DOCTYPE html>
<html lang="en">           
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="icon" type="image/png" href="Assets/Uploads/reliefSmall.png">
  <title>WeldMaster Gwinnett - Gallery</title>
  <meta name="description" content="WeldMaster Gwinnett showcases the best welding samples and discussion threads.">
  <meta name="keywords" content="welding, TIG, MIG, Stick, Spray">
  <meta name="author" content="WeldMaster Gwinnett">
  <link rel="canonical" href="https://weldmastergwinnett.com/" />

  <?php loadAssets("index"); ?>

</head>

<body>

  <div id="Background"></div>
  <div id="LoadingScreen" class="hidden">
    <div class="spinner"></div>
    <p>Uploading, dont click on anything just wait!</p>
  </div>
  



  <header>
    <h1>WELDMASTER GWNNETT</h1>
  </header>





  <nav>
    <ul>
      <li><a href="index.php" class="active">home</a></li>
      <li><a href="parts.php">parts</a></li>
      <li><a href="data.php">data</a></li>
      <li><a href="shop.php">shop</a></li>
      <li><a href="faq.php">faq</a></li>
    </ul>
  </nav>

  <main>

    <div id="IndexNavigation">

      <button class="navigationButton active"
              data-target="Gallery"
              onclick="showSection('Gallery')">
        <span class="icon">📷</span>
        <span class="label">gallery</span>
      </button>

      <button class="navigationButton"
              data-target="Forum"
              onclick="showSection('Forum')">
        <span class="icon">📰</span>
        <span class="label">forum</span>
      </button>

    </div>

    <section id="Gallery">
      <h4>Gallery</h4>

      <details id="FilterSamples">

        <summary>Filter Samples</summary>

        <form id="FormFilterSamples">
          <fieldset>

            <label>
              Welder
              <select name="welder">
                <option value="All">All</option>
                <?php foreach ($welders as $w): ?>
                  <option value="<?= htmlspecialchars($w) ?>"><?= htmlspecialchars($w) ?></option>
                <?php endforeach; ?>
              </select>
            </label>

            <label>
              Process
              <select name="process">
                <option value="All">All</option>
                <?php foreach ($processes as $p): ?>
                  <option value="<?= htmlspecialchars($p) ?>"><?= htmlspecialchars($p) ?></option>
                <?php endforeach; ?>
              </select>
            </label>

            <label>
              Material
              <select name="material">
                <option value="All">All</option>
                <?php foreach ($materials as $m): ?>
                  <option value="<?= htmlspecialchars($m) ?>"><?= htmlspecialchars($m) ?></option>
                <?php endforeach; ?>
              </select>
            </label>

            <label>
              Thickness
              <select name="thickness">
                <option value="All">All</option>
                <?php foreach ($thicknesses as $t): ?>
                  <option value="<?= htmlspecialchars($t) ?>"><?= htmlspecialchars($t) ?></option>
                <?php endforeach; ?>
              </select>
            </label>

            <label>
              Joint
              <select name="joint">
                <option value="All">All</option>
                <?php foreach ($joints as $j): ?>
                  <option value="<?= htmlspecialchars($j) ?>"><?= htmlspecialchars($j) ?></option>
                <?php endforeach; ?>
              </select>
            </label>

          </fieldset>
        </form>

      </details>

      <div id="SampleGrid">
        <?php foreach ($samples as $sample): ?>
          <?= $sample->renderArticleCard(); ?>
        <?php endforeach; ?>
      </div>

      <button onclick="showForm('FormSample')">submit sample</button>

    </section>

    <section id="Forum">
      <h4>Forum</h4>

      <button id="StartThreadButton" onclick="showForm('FormThread')">
        + [start thread]
      </button>

      <div id="ThreadGrid">
        <?php foreach ($threads as $thread): ?>
          <?= $thread->renderArticleCard(); ?>
        <?php endforeach; ?>
      </div>

    </section>

<form id="FormThread" class="hidden"
      enctype="multipart/form-data"
      onsubmit="event.preventDefault(); submitArticle(this);">

  <fieldset>

    <div class="row1">
      <label>display name
        <input type="text" name="displayName" maxlength="100" placeholder="anonymous">
      </label>
    </div>

    <div class="row2">
      <label>title (required)
        <input type="text" name="title" maxlength="200" required placeholder="thread or battle title">
      </label>
    </div>

    <div class="row3">
      <label>body
        <textarea name="body" rows="6" maxlength="2000"
                  placeholder="what do you think?"></textarea>
      </label>
    </div>

    <div class="row4">
      <label>image (optional)
        <input type="file" name="media" accept=".jpg,.jpeg,.gif,.webm,.png">
      </label>
    </div>

    <div class="row5">
      <button type="submit">post</button>
      <button type="button" class="cancel" onclick="hideForm('FormThread')">cancel</button>
    </div>

  </fieldset>

</form>

<form id="FormSample" class="hidden"
      enctype="multipart/form-data"
      onsubmit="event.preventDefault(); submitArticle(this);">

  <fieldset>

    <div class="row1">

      <label>display name
        <input type="text" name="displayName" maxlength="100" placeholder="anonymous">
      </label>

      <label>title (required)
        <input type="text" name="title" maxlength="255" required>
      </label>

      <label>flag (required)
        <select name="countryId" required>
          <?php foreach ($flags as $f): ?>
            <option value="<?= htmlspecialchars($f['countryId']) ?>"
              <?= $f['countryId'] === 'US' ? 'selected' : '' ?>>
              <?= strtolower(htmlspecialchars($f['countryName'])) ?>
            </option>
          <?php endforeach; ?>
        </select>
      </label>

      <label>image (required)
        <input type="file" name="media" accept=".jpg,.jpeg,.png" required>
      </label>

    </div>

    <div class="row2">

      <label>process (required)
        <select name="process" required>
          <option value="" disabled selected>select process</option>
          <?php foreach ($processes as $p): ?>
            <option value="<?= htmlspecialchars($p) ?>">
              <?= strtolower(htmlspecialchars($p)) ?>
            </option>
          <?php endforeach; ?>
        </select>
      </label>

      <label>material (required)
        <select name="material" required>
          <option value="" disabled selected>select material</option>
          <?php foreach ($materials as $m): ?>
            <option value="<?= htmlspecialchars($m) ?>">
              <?= strtolower(htmlspecialchars($m)) ?>
            </option>
          <?php endforeach; ?>
        </select>
      </label>

      <label>thickness (required)
        <select name="thickness" required>
          <option value="" disabled selected>select thickness</option>
          <?php foreach ($thicknesses as $t): ?>
            <option value="<?= htmlspecialchars($t) ?>">
              <?= strtolower(htmlspecialchars($t)) ?>
            </option>
          <?php endforeach; ?>
        </select>
      </label>

      <label>joint (required)
        <select name="joint" required>
          <option value="" disabled selected>select joint</option>
          <?php foreach ($joints as $j): ?>
            <option value="<?= htmlspecialchars($j) ?>">
              <?= strtolower(htmlspecialchars($j)) ?>
            </option>
          <?php endforeach; ?>
        </select>
      </label>

    </div>

    <div class="row3">
      <label>settings / notes
        <textarea name="body" rows="3" maxlength="250"
                  placeholder="describe machine settings, filler, technique, etc."></textarea>
      </label>
    </div>

    <div class="row4">
      <button type="submit">submit sample</button>
      <button type="button" class="cancel"
              onclick="hideForm('FormSample')">cancel</button>
    </div>

  </fieldset>

</form>

  </main>

  <footer>

  </footer>


</body>
</html>
