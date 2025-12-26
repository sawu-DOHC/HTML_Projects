<?php
require_once __DIR__ . '/../private/Database/Connect.php';
require_once __DIR__ . '/../private/Library/Loader.php';
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="icon" type="image/png" href="Assets/Uploads/reliefSmall.png">
  <title>WrenchMaster Gwinnett</title>

  <script src="https://cdn.plot.ly/plotly-2.32.0.min.js"></script>

  <?php loadAssets("data"); ?>

</head>

<body>
  <div id="Background"></div>

  <header><h1>WRENCHMASTER GWINNETT</h1></header>

<nav>
  <ul>
    <li><a href="index.php">home</a></li>
    <li><a href="parts.php">parts</a></li>
    <li><a href="data.php" class="active">data</a></li>
    <li><a href="shop.php">shop</a></li>
    <li><a href="faq.php">faq</a></li>
  </ul>
</nav>

<main id="GraphApplication">

<section id="GraphsSection">

  <article class="graphContainer">
    <h2>RPM vs Fuel vs Ignition</h2>
    <div class="LoadingScreen">
      <div class="spinner"></div>
      <p>Rendering graph, just wait! Consider upgrading your device this is not a good look.</p>
    </div>
    <div id="graph_1" class="graph"></div>
  </article>

  <article class="graphContainer">
    <h2>RPM vs Fuel vs MAF</h2>
    <div class="LoadingScreen">
      <div class="spinner"></div>
      <p>Rendering graph, just wait! Consider upgrading your device this is not a good look.</p>
    </div>
    <div id="graph_2" class="graph"></div>
  </article>

  <article class="graphContainer">
    <h2>RPM vs Coolant Temp vs Ignition</h2>
    <div class="LoadingScreen">
      <div class="spinner"></div>
      <p>Rendering graph, just wait! Consider upgrading your device this is not a good look.</p>
    </div>
    <div id="graph_3" class="graph"></div>
  </article>

  <p id="dataCount">Loading...</p>

  <table id="dataTable">
    <thead>
      <tr>
        <th>ID</th><th>Timestamp</th><th>Baro</th><th>CLT</th>
        <th>RPM</th><th>Fuel (cc/min)</th><th>IAT</th><th>MAF</th><th>IGN</th>
      </tr>
    </thead>
    <tbody>
      <tr><td colspan="9">Loading data...</td></tr>
    </tbody>
  </table>

</section>

</main>

  <footer>

  </footer>

</body>
</html>
