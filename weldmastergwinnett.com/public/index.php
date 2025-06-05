<?php

require_once __DIR__ . '/../app/CRUD/Read/welders.php';
require_once __DIR__ . '/../app/CRUD/Read/processes.php';
require_once __DIR__ . '/../app/CRUD/Read/materials.php';
require_once __DIR__ . '/../app/CRUD/Read/joints.php';
require_once __DIR__ . '/../app/CRUD/Read/thicknesses.php';
require_once __DIR__ . '/../app/CRUD/Read/samples.php';

require_once __DIR__ . '/../app/MVC/View/generateSections.php';
require_once __DIR__ . '/../app/MVC/View/generateNavigation.php';

$arr_processes     = processes();
$arr_materials     = materials();
$arr_joints        = joints();
$arr_thicknesses   = thicknesses();
$welders           = welders();

$welderNames = [];
foreach ($welders as $welder) {
    $welderNames[] = $welder['welder_name'];
}

$welderKeywords = implode(', ', $welderNames);

?>


<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="icon" type="image/png" href="Assets/reliefSmall.png">

  <title>WeldMaster Gwinnett – Top Welding Samples in Georgia</title>



  <meta name="description" content="WeldMaster Gwinnett showcases the best TIG, MIG, Stick, and Spray welding samples from top welders in Georgia.">

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
  <link rel="stylesheet" href="CSS/Components/submit.css">
  <link rel="stylesheet" href="CSS/Components/themeForm.css">
  <link rel="stylesheet" href="CSS/Components/themes.css">

  <link rel="canonical" href="https://weldmastergwinnett.com/" />

  <script src="Utilities/toggleMenu.js" defer></script>
  <script src="Utilities/handleCellClick.js" defer></script>
  <script src="Utilities/showSection.js" defer></script>
  <script src="Utilities/hideLeaderboard.js" defer></script>
  <script src="Utilities/showLeaderboard.js" defer></script>
  <script src="Utilities/themeControl.js" defer></script>
  <script src="Utilities/onContentLoaded.js" defer></script>
</head>


<body>

    <header>







      <h1>WELDMASTER GWINNETT</h1>
      <button id="menuButton" aria-label="Toggle Menu">☰</button>



    </header>

    <nav>
      <ul>

          <li class="Home"><a onclick="showSection('Home')">Home</a></li>

          
          <?= generateNavigation($arr_processes);?>

          <li class="Submit" style="opacity: 0.25;"><a onclick="showSection('Submit')">Submit</a></li>

      </ul>
    </nav>

    <main>



      <section id="Leaderboard" class="hidden">
        <button id="close" onclick="hideLeaderboard()">×</button>
        <div id="cardList"></div>
      </section>

      <section id="Home" class="visible">
        <article>
            <h2>Welcome to Gwinnett Weldmaster</h2>

            <p>
              What is this site? A portfolio? A resume?<br>
              <strong>Not quite.</strong><br>
              It's a digital shrine dedicated to showcasing the most impressive welds coming out of Georgia. 
            </p>

            <h3>FAQs</h3>

            <ul>
              <li id="faq1">
                <strong>Why don’t you show the back of the thin stuff?</strong>  
                <br><br>You can't make it to the table if you have bleed through.
              </li>
              <li id="faq2">
                <img src="Assets/itDontMatta.png" alt="" class="faq-bg">
                <div class="faq-content">
                  <strong>What position are the welds done in?</strong>
                  <blockquote>
                    "It don't matta', nonna dis mattas."
                    <cite>~ Carl</cite>
                  </blockquote>
                </div>
              </li>


              <li id="faq3">
                <strong>How do I make it on the table?</strong>  
                <br><br>If you think you qualify, E-mail your boogers to <a href="mailto:info@weldmastergwinnett.com">info@weldmastergwinnett.com</a>.
              </li>
            </ul>

        </article>
      </section>

      <?php foreach ($arr_processes as $process): ?>
        <?= generateSections($process); ?>
      <?php endforeach; ?>



        
      <section id="Submit" class="hidden">
        <h2>Submit a Weld Sample</h2>
        <h3>Form</h3>
        <form id="form" method="POST" action="submitSample.php" enctype="multipart/form-data">

        <label for="welder_name">Welder Name:</label>
        <input type="text" name="welder_name" id="welder_name">

        <label for="contact">Contact:</label>
        <input type="text" name="contact" id="contact">



        <label for="process_id">Weld Process:</label>
        <select name="process_id" id="process_id" required>
          <option value="" disabled selected>Select Process</option>
          <?php foreach ($arr_processes as $process): ?>
            <option value="<?= $process['process_id'] ?>"><?= $process['process_name'] ?></option>
          <?php endforeach; ?>
        </select>
          
        <label for="material_id">Material:</label>
        <select name="material_id" id="material_id" required>
          <option value="" disabled selected>Select Material</option>
          <?php foreach ($arr_materials as $material): ?>
            <option value="<?= $material['material_id'] ?>"><?= $material['material_name'] ?></option>
          <?php endforeach; ?>
        </select>
          
        <label for="thickness_id">Thickness:</label>
        <select name="thickness_id" id="thickness_id" required>
          <option value="" disabled selected>Select Thickness</option>
          <?php foreach ($arr_thicknesses as $thickness): ?>
            <option value="<?= $thickness['thickness_id'] ?>"><?= $thickness['thickness_value'] ?></option>
          <?php endforeach; ?>
        </select>
          
        <label for="joint_id">Joint Type:</label>
        <select name="joint_id" id="joint_id" required>
          <option value="" disabled selected>Select Joint Type</option>
          <?php foreach ($arr_joints as $joint): ?>
            <option value="<?= $joint['joint_id'] ?>"><?= $joint['joint_name'] ?></option>
          <?php endforeach; ?>
        </select>



        <label for="description">Description:</label>
        <textarea name="description" id="description"></textarea>

        <label for="img_src">Full-size Image:</label>
        <input type="file" name="img_src" id="img_src" accept="image/*">

        <label for="amperage">Amperage:</label>
        <input type="text" name="amperage" id="amperage">

        <label for="voltage">Voltage:</label>
        <input type="text" name="voltage" id="voltage">

        <label for="frequency">Frequency:</label>
        <input type="text" name="frequency" id="frequency">

        <label for="balance">Balance:</label>
        <input type="text" name="balance" id="balance">

        <label for="duration">Duration:</label>
        <input type="text" name="duration" id="duration">

        <label for="wire_feed_speed">Wire Feed Speed:</label>
        <input type="text" name="wire_feed_speed" id="wire_feed_speed">

        <label for="filler_diameter">Filler Diameter:</label>
        <input type="text" name="filler_diameter" id="filler_diameter">

        <label for="gas_type">Gas Type:</label>
        <input type="text" name="gas_type" id="gas_type">

        <label for="gas_flow_rate">Gas Flow Rate:</label>
        <input type="text" name="gas_flow_rate" id="gas_flow_rate">

        <label for="polarity">Polarity:</label>
        <input type="text" name="polarity" id="polarity">

        <button type="submit">Upload Sample</button>
        </form>

      </section>




    </main>

<footer>

    <div id="themeToggle">
      <fieldset>
        <legend>Mode</legend>
        <label><input type="radio" name="mode" value="day"> Day</label>
        <label><input type="radio" name="mode" value="night"> Night</label>
      </fieldset>
      <fieldset>
        <legend>Season</legend>
        <label><input type="radio" name="season" value="spring"> Spring</label>
        <label><input type="radio" name="season" value="summer"> Summer</label>
        <label><input type="radio" name="season" value="fall"> Fall</label>
        <label><input type="radio" name="season" value="winter"> Winter</label>
      </fieldset>
    </div>

  <p>&copy; WeldMaster Gwinnett. All rights reserved.</p>
  <p>Curated by Samuel Wubishet – <a href="mailto:sam@webdmastergwinnett.com">sam@webmastergwinnett.com</a></p>
  <p>
    <a href="/license.html">License</a> |
    Built for Georgia’s welding elite
  </p>
</footer>


</body>
</html>
