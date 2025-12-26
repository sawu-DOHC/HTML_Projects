<?php
require_once __DIR__ . '/../CRUD/config.php';
require_once __DIR__ . '/../../../vendor/autoload.php'; // adjust if needed

\Stripe\Stripe::setApiKey('sk_test_YOUR_SECRET_KEY'); // Replace with your real Stripe secret key

header('Content-Type: application/json');

// Step 1: Validate incoming data
$serviceId = $_POST['service_id'] ?? null;

if (!$serviceId || !is_numeric($serviceId)) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing or invalid service ID']);
    exit;
}

// Step 2: Look up the actual service info from your database
try {
    $stmt = $pdo->prepare("
    SELECT name, price 
    FROM services WHERE service_id = ?
    ");
    
    $stmt->execute([$serviceId]);
    $service = $stmt->fetch();

    if (!$service) {
        http_response_code(404);
        echo json_encode(['error' => 'Service not found']);
        exit;
    }

    $name = $service['name'];
    $price = $service['price'];

    // Step 3: Create Stripe checkout session with trusted server-side values
    $session = \Stripe\Checkout\Session::create([
        'payment_method_types' => ['card'],
        'line_items' => [[
            'price_data' => [
                'currency' => 'usd',
                'product_data' => ['name' => $name],
                'unit_amount' => intval($price * 100),
            ],
            'quantity' => 1,
        ]],
        'mode' => 'payment',
        'success_url' => 'https://yourdomain.com/success.html',
        'cancel_url' => 'https://yourdomain.com/cancel.html',
    ]);

    echo json_encode(['id' => $session->id]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
