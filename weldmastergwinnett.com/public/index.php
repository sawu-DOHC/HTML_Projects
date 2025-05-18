<?php

require_once __DIR__ . '/../app/CRUD/Read/materials.php';
require_once __DIR__ . '/../app/CRUD/Read/joints.php';
require_once __DIR__ . '/../app/CRUD/Read/thicknesses.php';
require_once __DIR__ . '/../app/CRUD/Read/welders.php';
require_once __DIR__ . '/../app/CRUD/Read/samples.php';
require_once __DIR__ . '/../app/CRUD/Read/processes.php';

require_once __DIR__ . '/../app/MVC/View/generateSections.php';
require_once __DIR__ . '/../app/MVC/View/generateNavigation.php';

$arr_processes = processes();
$welders = welders();

$welderNames = [];
foreach ($welders as $welder) {
    $welderNames[] = $welder['welder_name'];
}

$welderKeywords = implode(', ', $welderNames); // turns an array of strings into comma separated values 

?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  
  <title>weldmastergwinnett.com</title>


  <meta name="description" content="A digital shrine of the best welds.">
  <meta name="keywords" content="welding, Gwinnett, Georgia, <?= htmlspecialchars($welderKeywords) ?>, MIG, TIG, Stick, Spray-Trasnfer">
  <meta name="author" content="WeldMaster Gwinnett">

  <meta property="og:title" content="WeldMaster Gwinnett - Legendary Welders of GA">
  <meta property="og:description" content="WeldMaster Gwinnett highlights legendary welders from Georgia.">
  <meta property="og:image" content="Assets/preview.jpg">
  <meta property="og:url" content="https://weldmastergwinnett.com">
  <meta property="og:type" content="website">


  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="WeldMaster Gwinnett - Legendary Welders of GA">
  <meta name="twitter:description" content="WeldMaster Gwinnett showcases legendary welders from Georgia.">
  <meta name="twitter:image" content="Assets/preview.jpg">


  <link rel="stylesheet" href="CSS/Base/A_body.css">
  <link rel="stylesheet" href="CSS/Base/B_header.css">
  <link rel="stylesheet" href="CSS/Base/C_nav.css">
  <link rel="stylesheet" href="CSS/Base/D_main.css">
  <link rel="stylesheet" href="CSS/Base/E_footer.css">
  <link rel="stylesheet" href="CSS/Components/home.css">
  <link rel="stylesheet" href="CSS/Components/leaderboard.css">
  <link rel="stylesheet" href="CSS/Components/table.css">

  <link rel="canonical" href="https://weldmastergwinnett.com/" />

  <script src="Utilities/toggleMenu.js" defer></script>
  <script src="Utilities/handleCellClick.js" defer></script>
  <script src="Utilities/showSection.js" defer></script>
  <script src="Utilities/hideLeaderboard.js" defer></script>
  <script src="Utilities/showLeaderboard.js" defer></script>
</head>


<body>

    <header>
  <h1>WELDMASTER GWINNETT</h1>
  <button id="menuButton" aria-label="Toggle Menu">☰</button>
    </header>










    <nav>
      <ul>
          <li class="Home"><a onclick="showSection('Home')">Home</a></li>
          
          <?= generateNavigation($arr_processes); ?>




      </ul>
    </nav>


    <main>

      <section id="Home" class="visible">
        <article>
            <h2>Welcome to Gwinnett Weldmaster</h2>

            <p>
              What is this site? A portfolio? A resume?<br>
              <strong>Not quite.</strong><br>
              It's a digital shrine dedicated to showcasing some of the cleanest and most impressive welds coming out of Georgia. 
            </p>

            <p>Every weld here is certified for 1000 horsepower, 1000 years, or 1000 tons.</p>

            <h3>FAQs</h3>

            <ul>
              <li><strong>Why don’t you show the back of the thin stuff?</strong>  
                <br>No point, you can't make it to the table if you have bleed-through.</li>
              <li><strong>What position are the welds done in?</strong>  
                <br>Doesn't matter, welded-helded, grinder-paint, welder-yaint</li>
              <li><strong>How do I make it on the table?</strong>  
                <br>You can't, but if you know someone that can weld, have them email a pic of their boogers to <a href="mailto:info@weldmastergwinnett.com">info@weldmastergwinnett.com</a>.</li>
            </ul>
        </article>
      </section>

      <section id="Leaderboard" class="hidden">
        <button id="close" onclick="hideLeaderboard()">×</button>
        <div id="cardList"></div>
      </section>


    
      <?php foreach ($arr_processes as $process): ?>
        <?= generateSections($process); ?>
      <?php endforeach; ?>



















    </main>



















    <footer>
    </footer>

</body>
</html>
