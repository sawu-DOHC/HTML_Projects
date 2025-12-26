<?php
require_once __DIR__ . '/../private/Database/Connect.php';
require_once __DIR__ . '/../private/Library/Loader.php';
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="icon" type="image/png" href="Assets/Uploads/reliefSmall.png">
  <title>Weldmaster Gwinnett</title>

  <?php loadAssets("shop"); ?>

</head>

<body>
  <div id="Background"></div>



  <header><h1>WELDMASTER GWINNETT</h1></header>

  <nav>
    <ul>
      <li><a href="index.php">home</a></li>
      <li><a href="parts.php">parts</a></li>
      <li><a href="data.php">data</a></li>
      <li><a href="shop.php" class="active">shop</a></li>
      <li><a href="faq.php">faq</a></li>
    </ul>
  </nav>

  <main>

    <section id="Keyboards" class="active">

      <h2>Keyboards</h2>

      <div id="ProductGrid">

        <!-- SEASONS (75%) -->
        <article class="product" data-keyboard="v1-spring">
          <img src="Assets/Keyboards/75percent.jpg">
          <h2>V1 — Spring</h2>
        </article>

        <article class="product" data-keyboard="v1-summer">
          <img src="Assets/Keyboards/75percent.jpg">
          <h2>V1 — Summer</h2>
        </article>

        <article class="product" data-keyboard="v1-autumn">
          <img src="Assets/Keyboards/75percent.jpg">
          <h2>V1 — Autumn</h2>
        </article>

        <article class="product" data-keyboard="v1-winter">
          <img src="Assets/Keyboards/75percent.jpg">
          <h2>V1 — Winter</h2>
        </article>


        <!-- PERSONAL THEMES (100%) -->
        <article class="product" data-keyboard="v6-wrench">
          <img src="Assets/Keyboards/100percent.jpg">
          <h2>V6 — Wrench</h2>
        </article>

        <article class="product" data-keyboard="v6-terminal">
          <img src="Assets/Keyboards/100percent.jpg">
          <h2>V6 — Terminal</h2>
        </article>

        <article class="product" data-keyboard="q6-brg">
          <img src="Assets/Keyboards/100percent.jpg">
          <h2>Q6 — BRG</h2>
        </article>

        <article class="product" data-keyboard="q6-weld">
          <img src="Assets/Keyboards/100percent.jpg">
          <h2>Q6 — Weld</h2>
        </article>


        <!-- CYCLES (75%) -->
        <article class="product" data-keyboard="inland-day">
          <img src="Assets/Keyboards/75percent.jpg">
          <h2>Inland — Day</h2>
        </article>

        <article class="product" data-keyboard="inland-night">
          <img src="Assets/Keyboards/75percent.jpg">
          <h2>Inland — Night</h2>
        </article>


        <!-- OTHER (75%) -->
        <article class="product" data-keyboard="v10-alice">
          <img src="Assets/Keyboards/75percent.jpg">
          <h2>V10 — Alice</h2>
        </article>

        <article class="product" data-keyboard="q1">
          <img src="Assets/Keyboards/75percent.jpg">
          <h2>Q1</h2>
        </article>


        <!-- DRAGONSHIT COLLECTION -->
        <article class="product" data-keyboard="golden-white-dragon">
          <img src="Assets/Keyboards/90percent.jpg">
          <h2>Golden White Dragon</h2>
        </article>

        <article class="product" data-keyboard="golden-black-dragon">
          <img src="Assets/Keyboards/90percent.jpg">
          <h2>Golden Black Dragon</h2>
        </article>

        <article class="product" data-keyboard="dragonshit-60-white">
          <img src="Assets/Keyboards/75percent.jpg">
          <h2>Dragonshit 60% White</h2>
        </article>

        <article class="product" data-keyboard="dragonshit-60-black">
          <img src="Assets/Keyboards/75percent.jpg">
          <h2>Dragonshit 60% Black</h2>
        </article>

      </div>

    </section>


  </main>

  <footer>

  </footer>

</body>
</html>
