<?php
header("Content-Type: application/json");

require_once __DIR__ . "/../../private/Database/Connect.php";
require_once __DIR__ . "/../../private/Database/DBO_inventory.php";

$dbo = new DBO_inventory($pdo);

$category    = $_POST['category']         ?? '';
$description = $_POST['description']      ?? '';
$partNumber  = $_POST['part_number']      ?? '';
$qoh         = $_POST['quantity_on_hand'] ?? 0;

if ($category === '' || $description === '') {
    echo json_encode([
        "success" => false,
        "error" => "missing required fields"
    ]);
    exit;
}

$data = [
    "category"         => $category,
    "description"      => $description,
    "part_number"      => $partNumber,
    "quantity_on_hand" => (int)$qoh
];

try {
    $newId = $dbo->createItem($data);
} catch (Throwable $e) {
    echo json_encode([
        "success" => false,
        "error" => $e->getMessage()
    ]);
    exit;
}

$timestamp = date("Y-m-d H:i:s");

$rowHtml = "
<tr data-cat=\"{$category}\" onclick=\"viewPart({$newId})\">
    <td>{$newId}</td>
    <td>{$description}</td>
    <td>{$partNumber}</td>
    <td>{$qoh}</td>
    <td>{$category}</td>
    <td>{$timestamp}</td>
    <td class='actions'>
        <button class='buttonGreen' onclick='event.stopPropagation(); addToCart({$newId})'>+</button>
    </td>
</tr>
";

echo json_encode([
    "success" => true,
    "newRowHtml" => $rowHtml
]);
