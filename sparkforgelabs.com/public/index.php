<?php
require_once __DIR__ . '/../app/CRUD/config.php';
require_once __DIR__ . '/../app/CRUD/Read/services.php';

$services = services($pdo);
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="author" content="Samuel Wubishet">
    <meta name="description" content="Welding workshops for teens and adults in Georgia. Website designed by Samuel Wubishet.">
    <meta name="robots" content="index, follow">


    <meta property="og:title" content="Spark Forge Labs">
    <meta property="og:description" content="Welding classes and hands-on hobby training. Site by Samuel Wubishet.">
    <meta property="og:url" content="https://sparkforgelabs.com">
    <meta property="og:type" content="website">
    <meta property="og:image" content="https://sparkforgelabs.com/Assets/base/Logo1.png">

    <link rel="icon" type="image/svg+xml" href="Assets/base/LogoTab.svg">


    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Spark Forge Labs",
      "url": "https://sparkforgelabs.com",
      "author": {
        "@type": "Person",
        "name": "Samuel Wubishet",
        "url": "https://sawusdomain.com"
      },
      "description": "Welding workshops in Georgia for teens and adults. Website developed by Samuel Wubishet."
    }
    </script>

    
    <title>Spark Forge Labs</title>

    <link rel="stylesheet" href="CSS/Base/A_body.css">
    <link rel="stylesheet" href="CSS/Base/B_header.css">
    <link rel="stylesheet" href="CSS/Base/C_nav.css">
    <link rel="stylesheet" href="CSS/Base/D_main.css">
    <link rel="stylesheet" href="CSS/Base/E_footer.css">

    <link rel="stylesheet" href="CSS/Components/Home.css">
    <link rel="stylesheet" href="CSS/Components/About.css">
    <link rel="stylesheet" href="CSS/Components/Services.css">
    <link rel="stylesheet" href="CSS/Components/CheckoutModal.css">
    <link rel="stylesheet" href="CSS/Components/Gallery.css">
    <link rel="stylesheet" href="CSS/Components/Contact.css">
    <link rel="stylesheet" href="CSS/Components/Themes.css">

    <script src="Utilities/paypal.js" defer></script>
    <script src="Utilities/checkoutModalController.js" defer></script>
    <script src="Utilities/showSection.js" defer></script>
    <script src="Utilities/toggleNav.js" defer></script>
    <script src="Utilities/themeControl.js" defer></script>

    <link rel="icon" type="image/svg+xml" href="Assets/LogoTab.svg">

    <script src="https://js.stripe.com/v3/"></script>


</head>
<body>


    <header>
      <div id="headerTopRow">
        <a id="logoLink" href="#home" onclick="showSection('home')">
          <img id="logoImg" src="Assets/Logo1.png" alt="Spark Forge Labs Logo">
        </a>
      
        <h1>SPARK FORGE LABS</h1>
      
        <a id="callButton" href="tel:4043956339" aria-label="Call Us">
          <img id="callIcon" src="Assets/phoneIconResized.png" alt="Call">
        </a>
      </div>
    
      <button id="menuButton" aria-label="Toggle Menu">☰</button>
    </header>


    <nav>
      <ul>
        <li><a onclick="showSection('home')">Home</a></li>
        <li><a onclick="showSection('about')">About</a></li>
        <li><a onclick="showSection('services')">Services</a></li>
        <li><a onclick="showSection('gallery')">Gallery</a></li>
        <li><a onclick="showSection('contact')">Contact</a></li>
      </ul>
    </nav>


  
    

    <main>

      <section id="section-fade-overlay">
      </section>

      <section id="home" class="visible">
        <img src="Assets/Logo1.png" alt="Spark Forge Labs logo" class="hero-img">
      
        <p>
          <strong>Welcome to Spark Forge Labs</strong> — a space where creativity meets craftsmanship. Whether you're a teen (13+) curious about welding or an adult ready to try something bold, our workshops are designed to be friendly, practical, and inspiring.
        </p>

        <ul>
          <li>
            🔍 <a href="#gallery" onclick="showSection('gallery')">Browse our workshop gallery</a>
          </li>
          <li>
            🛠️ <a href="#services" onclick="showSection('services')">Explore all available services</a>
          </li>
          <li>
            👨‍🏫 <a href="#about" onclick="showSection('about')">Meet your instructor</a>
          </li>
          <li>
            📬 <a href="mailto:info@sparkforgelabs.com">info@sparkforgelabs.com</a>
          </li>
          <li>
            📞 <a href="tel:4043956339">(404) 395-6339</a>
          </li>
        </ul>





        <div id="card-list">


            <div class="card">
              <div class="card-image">
                <img src="Assets/mig5.jpg" alt="MIG welding technique demonstrated by Ryan Schmidt at Spark Forge Labs" />
              </div>
              <div class="card-text">
                <h3>MIG Welding</h3>
                <p>
                  Uses a wire electrode and shielding gas for quick, clean welds. Great for beginners.
                </p>
              </div>
            </div>

            <div class="card">
              <div class="card-image">
                <img src="Assets/tig3.jpg" alt="TIG welding session led by Ryan Schmidt in Georgia" />
              </div>
              <div class="card-text">
                <h3>TIG Welding</h3>
                <p>
                  A precise method using a tungsten electrode and optional filler rod. Ideal for detailed work.
                </p>
              </div>
            </div>

            <div class="card">
              <div class="card-image">
                <img src="Assets/stick5.jpg" alt="Stick welding demonstration by Ryan Schmidt" />
              </div>
              <div class="card-text">
                <h3>Stick Welding</h3>
                <p>
                  A rugged, versatile method using flux-coated rods. Perfect for outdoor and heavy-duty jobs.
                </p>
              </div>
            </div>

        </div>

    
      </section>

      <section id="about">
              
        <div class="container">
          <div class="a">
            <div class="photo-wrapper">
              <img src="Assets/Ryan.jpg" alt="Ryan Schmidt" />
              <span class="photo-caption">Ryan Schmidt</span>
            </div>
          </div>
          <div class="b">
            <p><strong>Hi, I’m Ryan Schmidt</strong> — your welding instructor here at Spark Forge Labs.</p>

            <p>My passion for welding began back in 2015 when I enrolled in a local trade school. What started as a curiosity quickly turned into a career. While still a student, I became a welding lab assistant, and by 2017, I had completed the program and continued working closely with both students and instructors.</p>

            <p>In 2020, I stepped into the role of full-time welding instructor. Since then, I’ve had the privilege of teaching students from all walks of life — from curious hobbyists to career changers.</p>

            <p>At Spark Forge Labs, my mission is to create a safe, flexible, and supportive learning environment tailored to your pace and goals. Whether you're picking up welding as a personal skill or exploring it as a new trade, our one-on-one sessions are designed to give you the focus and hands-on experience you deserve.</p>

            <p>I can’t wait to help you discover the art of welding.</p>
          </div>
        </div>

      </section>

      <section id="services">
          <p>   
              At Spark Forge Labs, we specialize in providing top-notch welding education tailored specifically for hobbyists.
              Whether you're a teenager (13+) or an adult eager to develop new skills, our comprehensive, hands-on workshop is designed to ignite your passion for welding.
              With an experienced guide, state-of-the-art equipment, and flexible scheduling, you'll gain the knowledge and confidence to tackle a variety of creative welding projects.
              Join us at Spark Forge Labs and discover the joy of crafting unique and artistic metalwork.

              Ignite your creativity with us today!🔥
          </p>
        
          <table class="services-table">
            <thead>
              <tr>
                <th>Service</th>
                <th>Duration</th>
                <th>Style</th>
                <th>Price</th>
                <th>Register</th>
              </tr>
            </thead>
            <tbody id="services-tbody">

              <tr>
                <td>Gift Cards</td>
                <td>Varies</td>
                <td>Any</td>
                <td>Varies</td>
                <td>
                  <a href="https://giftup.app/place-order/93ebbe45-1091-4a2f-c56e-08dcff1fd9d6?platform=hosted" 
                     target="_blank" 
                     class="register-btn">
                     Buy Gift Card
                  </a>
                </td>
              </tr>

              <?php foreach ($services as $service): ?>
                <tr id="service-<?= htmlspecialchars($service['service_id']) ?>" data-service-id="<?= htmlspecialchars($service['service_id']) ?>" data-price="<?= htmlspecialchars($service['price']) ?>" data-description="<?= htmlspecialchars($service['description']) ?>" data-name="<?= htmlspecialchars($service['name']) ?>">
                  <td data-label="Service"><?= htmlspecialchars($service['name']) ?></td>
                  <td data-label="Duration"><?= htmlspecialchars($service['duration']) ?></td>
                  <td data-label="Style"><?= htmlspecialchars($service['style']) ?></td>
                  <td data-label="Price">$<?= htmlspecialchars($service['price']) ?></td>
                  <td data-label="Register"><button class="register-btn" onclick="openCheckoutModal(event)">Register</button></td>
                </tr>
              <?php endforeach; ?>

              
            </tbody>
          </table>
            
          <div id="checkoutModal">

              <button
  class="register-btn"
  type="button"
  data-name="<?= htmlspecialchars($service['name']) ?>"
  data-description="<?= htmlspecialchars($service['description']) ?>"
  data-price="<?= htmlspecialchars($service['price']) ?>"
  onclick="openCheckoutModal(this)"
>
  Register
</button>


              <form id="register-form" action="/PHP/submitRegistration.php" method="POST">
                <label for="name">Name</label>
                <input id="name" type="text" name="name_text" required>

                <label for="email">Email</label>
                <input id="email" type="email" name="email_text" required>

                <label for="phone">Phone</label>
                <input id="phone" type="tel" name="phone_text">

                <h3 id="service-name"></h3>
                <p id="service-description" class="form-static-display"></p>
                <p id="service-price" class="form-static-display"></p>

                <div id="payment-options">
                  <div id="paypal-button-container"></div>
                  <!-- Venmo Link Here -->
                  <!-- Stripe Button or Link -->
                </div>
              </form>

          </div>

            
          
          
          <div id="ppe-container">
            <h3>Required Personal Protective Equipment</h3>
            <ul>
              <li><a href="https://www.google.com/search?q=Tillman+6230+flame+resistant+jacket" target="_blank">Flame-resistant jacket (Tillman 6230)</a></li>
              <li><a href="https://www.google.com/search?q=Tillman+42+MIG+welding+gloves" target="_blank">MIG welding gloves (Tillman 42)</a></li>
              <li><a href="https://www.google.com/search?q=Tillman+24C+TIG+welding+gloves" target="_blank">TIG welding gloves (Tillman 24C)</a></li>
              <li><a href="https://www.google.com/search?q=Tillman+750+STICK+welding+gloves" target="_blank">STICK welding gloves (Tillman 750)</a></li>
              <li><a href="https://www.google.com/search?q=welding+cap" target="_blank">Welding cap</a></li>
              <li><a href="https://www.google.com/search?q=3M+Virtua+Safety+Glasses" target="_blank">Safety glasses (3M Virtua)</a></li>
              <li><a href="https://www.google.com/search?q=Lincoln+Electric+welding+helmet" target="_blank">Welding hood (optional)</a></li>
              <li>100% cotton jeans</li>
              <li>Leather boots (non-synthetic)</li>
            </ul>
          </div>


      </section>
      
      <section id="gallery">

        <div class="gallery-container">
          <img src="Assets/img1.jpg"  alt="Samuel Wubishet welding at Spark Forge Labs" class="gallery-image" />
          <img src="Assets/img2.jpg"  alt="Samuel Wubishet in welding training session" class="gallery-image" />
          <img src="Assets/img3.jpg"  alt="Welding project at Spark Forge Labs by Samuel Wubishet" class="gallery-image" />
          <img src="Assets/img4.jpg"  alt="Samuel Wubishet during MIG welding practice" class="gallery-image" />
          <img src="Assets/img5.jpg"  alt="Masked welder working — Samuel Wubishet photo log" class="gallery-image" />
          <img src="Assets/img6.jpg"  alt="Samuel Wubishet TIG welding at workshop" class="gallery-image" />
          <img src="Assets/img7.jpg"  alt="Student welding moment, part of Samuel Wubishet's training series" class="gallery-image" />
          <img src="Assets/img8.jpg"  alt="Welding session from Samuel Wubishet’s technical gallery" class="gallery-image" />
          <img src="Assets/img9.jpg"  alt="Welding education archive by Samuel Wubishet" class="gallery-image" />
          <img src="Assets/img10.jpg" alt="Hands-on welding demo credited to Samuel Wubishet" class="gallery-image" />
          <img src="Assets/img11.jpg" alt="Samuel Wubishet workshop moment with safety gear" class="gallery-image" />
          <img src="Assets/img12.jpg" alt="Close-up of welding arc — Samuel Wubishet's site project" class="gallery-image" />
          <img src="Assets/img13.jpg" alt="Welding mask on, torch in hand — Samuel Wubishet photo" class="gallery-image" />
          <img src="Assets/img14.jpg" alt="Field training photo from Samuel Wubishet's welding series" class="gallery-image" />
          <img src="Assets/img15.jpg" alt="Workshop photo: weld practice at Samuel Wubishet’s site" class="gallery-image" />
          <img src="Assets/img16.jpg" alt="Spark Forge Labs gallery image attributed to Samuel Wubishet" class="gallery-image" />
          <img src="Assets/img17.jpg" alt="Shielded welder featured on Samuel Wubishet's website" class="gallery-image" />
          <img src="Assets/img18.jpg" alt="Metal arc welding photo — Samuel Wubishet developer log" class="gallery-image" />
          <img src="Assets/img19.jpg" alt="Samuel Wubishet welding archive, Monroe GA" class="gallery-image" />
          <img src="Assets/img20.jpg" alt="Scene from welding class posted by Samuel Wubishet" class="gallery-image" />
        </div>
      
      </section>
      
      <section id="contact">

        <p>Feel free to reach out to us via any of the following methods. We are located in lilburn near J.B. Williams park.</p>
        <ul>
          <li>
            <label>Email:</label>
            <a href="mailto:info@SparkForgeLabs.com">info@SparkForgeLabs.com</a>
          </li>
          <li>
            <label>Facebook:</label>
            <a href="https://facebook.com/SparkForgeLabs" target="_blank">facebook.com/SparkForgeLabs</a>
          </li>
          <li>
            <label>Instagram:</label>
            <a href="https://instagram.com/SparkForgeLabs" target="_blank">instagram.com/SparkForgeLabs</a>
          </li>
        </ul>

        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4987.4647776481315!2d-84.1177480874602!3d33.85173747312166!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88f5a5446a7888db%3A0xe60d4760b69aac05!2sJ.%20B.%20Williams%20Park!5e1!3m2!1sen!2sus!4v1742579664395!5m2!1sen!2sus"></iframe>
      
      </section>

      <script type="application/ld+json">
        {
          "@context": "https://schema.org",
          "@type": "Person",
          "name": "Samuel Wubishet",
          "image": [
            "https://example.com/Assets/gallery/img1.jpg",
            "https://example.com/Assets/gallery/img2.jpg",
            "https://example.com/Assets/gallery/img3.jpg"
          ],
          "jobTitle": "Welder / Programmer Developer",
          "url": "https://sawusdomain.com",
          "worksFor": {
            "@type": "Organization",
            "name": "Spark Forge Labs"
          }
        }
      </script>
        
    </main>

    <footer>
      <div class="footer-info-row">
        <div>
          <h3>Location</h3>
          <p>
            <a href="https://maps.google.com/?q=4935+Five+Forks+Trickum+Rd+SW,+Lilburn,+GA+30047" target="_blank" rel="noopener">
              <img src="Assets/pointer.png" alt="Location icon">
              4935 Five Forks Trickum Rd SW<br>
              Lilburn, GA 30047
            </a>
          </p>
        </div>

        <div>
          <h3>Socials</h3>
          <div style="display:flex; gap:1rem; justify-content:center;">
            <a href="https://www.facebook.com/SparkForgeLabs" target="_blank">
              <img src="Assets/facebook3.png" alt="Facebook">
            </a>
            <a href="https://www.instagram.com/SparkForgeLabs/" target="_blank">
              <img src="Assets/instagram2.png" alt="Instagram">
            </a>

          </div>
          <a> Facebook | instagram</a>
        </div>

        <div>
          <h3>Email</h3>
          <p>
            <a href="mailto:info@sparkforgelabs.com">
              <img src="Assets/email3.png" alt="Email icon">
              info@SparkForgeLabs.com
            </a>
          </p>
        </div>

        <div>
          <h3>Phone</h3>
          <p>
            <a href="tel:+4043956339">
              <img src="Assets/phone.png" alt="Phone icon">
              (404) 395-6339
            </a>
          </p>
        </div>

      </div>

      <fieldset>
            <legend>Mode</legend>
            <label><input type="radio" name="mode" value="day"> Day</label>
            <label><input type="radio" name="mode" value="night"> Night</label>
      </fieldset>

      <p class="footer-credit">
        Site designed by <a href="https://webmastergwinnett.com" target="_blank">Samuel Wubishet</a>
      </p>
    </footer>
 
</body>
</html>
