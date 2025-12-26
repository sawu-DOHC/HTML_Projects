<?php
require_once __DIR__ . '/../private/Database/Connect.php';
require_once __DIR__ . '/../private/Database/DBO_users.php';
require_once __DIR__ . '/../private/Database/DBO_inventory.php';
require_once __DIR__ . '/../private/Models/Item.php';
require_once __DIR__ . '/../private/Library/Loader.php';

$dboInventory = new DBO_inventory($pdo);
$items        = $dboInventory->readAll();
$categories   = $dboInventory->readCategories();

$totalItems      = count($items);
$totalCategories = count($categories);
$lastUpdated     = !empty($items) ? max(array_column($items, 'last_updated')) : 'N/A';
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link rel="icon" type="image/png" href="Assets/Uploads/reliefSmall.png">
<title>InventoryMaster Gwinnett</title>

<?php loadAssets("parts"); ?>

</head>

<body>

<header>
  <h1>INVENTORYMASTER GWINNETT</h1>
</header>

<nav>
  <ul>
    <li><a href="index.php">home</a></li>
    <li><a href="parts.php" class="active">parts</a></li>
    <li><a href="data.php">data</a></li>
    <li><a href="shop.php">shop</a></li>
    <li><a href="faq.php">faq</a></li>
  </ul>
</nav>

<div id="Background"></div>

<main id="InventoryApplication">

  <div id="InventoryNavigation">

    <button class="navigationButton active" data-target="MenuSection" onclick="showSection('MenuSection')">
      <span class="icon">📋</span>
      <span class="label">menu</span>
    </button>

    <button class="navigationButton" data-target="CartSection" onclick="showSection('CartSection')">
      <span class="icon">🛒</span>
      <span class="label">cart</span>
    </button>

    <button class="navigationButton" data-target="InventorySection" onclick="showSection('InventorySection')">
      <span class="icon">📦</span>
      <span class="label">inventory</span>
    </button>

  </div>

  <section id="MenuSection">

      <h4>main menu</h4>

      <details id="PrintInventory">
        <summary>Print Inventory Sheets</summary>

        <form id="FormPrintInventory" onsubmit="event.preventDefault(); printInventory();">
          <fieldset>

              <label>
                  category
                  <select id="print_category">
                      <option value="all">All Categories</option>
                      <?php foreach ($categories as $cat): ?>
                          <option value="<?= htmlspecialchars($cat) ?>"><?= htmlspecialchars($cat) ?></option>
                      <?php endforeach; ?>
                  </select>
              </label>
              
              <button type="submit" class="buttonBlue">print</button>

          </fieldset>
        </form>
      </details>

      <details id="AddItem">

        <summary>Add New Item</summary>

        <form id="FormAddItem" onsubmit="event.preventDefault(); submitItem();">
          <fieldset>

              <label>
                  description
                  <input type="text" id="new_description" placeholder="Enter description">
              </label>
              
              <label>
                  part number
                  <input type="text" id="new_part_number" placeholder="Enter p/n">
              </label>
              
              <label>
                  quantity
                  <input type="number" id="new_qoh" placeholder="Enter qty">
              </label>
              
              <label>
                  category
                  <select id="new_category">
                      <?php foreach ($categories as $cat): ?>
                          <option value="<?= htmlspecialchars($cat) ?>"><?= htmlspecialchars($cat) ?></option>
                      <?php endforeach; ?>
                  </select>
              </label>
              
              <button type="submit" class="buttonGreen">add item</button>

          </fieldset>
        </form>

      </details>

      <details id="Meta" open>
        <summary>Meta</summary>

        <div class="metaContent">
            <p>Total items: <?= $totalItems ?></p>
            <p>Total categories: <?= $totalCategories ?></p>
            <p>Last update: <?= htmlspecialchars($lastUpdated) ?></p>
            <p>Categories:</p>
            <p>
                <?php foreach ($categories as $cat): ?>
                    <?= htmlspecialchars($cat) ?><?= $cat !== end($categories) ? ', ' : '' ?>
                <?php endforeach; ?>
            </p>
        </div>
      </details>

  </section>

  <section id="CartSection">
      <h4>cart</h4>

      <table id="CartTable">
          <thead>
              <tr>
                  <th>Description</th>
                  <th>P/N</th>
                  <th>Category</th>
                  <th>Qty</th>
                  <th>Remove</th>
              </tr>
          </thead>

          <tbody id="cart"></tbody>
      </table>

      <button id="print-button" class="buttonYellow" onclick="printCart()">Print</button>
  </section>

  <section id="InventorySection">
    <h4>inventory</h4>

    <details id="FilterInventory">
      <summary>Filter Inventory</summary>

      <form id="FormFilterInventory" onsubmit="event.preventDefault();">
        <fieldset>

            <label>
                category
                <select id="CategorySelect" onchange="filterCategory(this.value)">
                    <option value="">All</option>
                    <?php foreach ($categories as $cat): ?>
                        <option value="<?= htmlspecialchars($cat) ?>"><?= htmlspecialchars($cat) ?></option>
                    <?php endforeach; ?>
                </select>
            </label>
                    
        </fieldset>
      </form>
    </details>

    <table id="InventoryTable">
      <thead>
        <tr>
          <th>ID</th>
          <th>Description</th>
          <th>P/N</th>
          <th>Qty</th>
          <th>Category</th>
          <th>Updated</th>
          <th>Add</th>
        </tr>
      </thead>

      <tbody id="inventoryBody">
        <?php foreach ($items as $data): ?>
          <?php
            $item = new Item($data);
            echo $item->renderRow();
          ?>
        <?php endforeach; ?>
      </tbody>
    </table>

  </section>

</main>

  <footer>

  </footer>

</body>
</html>
