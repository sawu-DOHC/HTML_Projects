<?php
// Database connection details
$servername = "localhost";
$username = "samwu1_broker_db";
$password = "f700f700";
$dbname = "samwu1_broker_db";

// List of cryptocurrencies to process
$currencies = ["bitcoin", "dogecoin", "ethereum"];

// Coingecko API base URL
$api_base_url = "https://api.coingecko.com/api/v3/coins";

// Create a connection to the database
$conn = new mysqli($servername, $username, $password, $dbname);

// Check for connection errors
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Loop through each cryptocurrency
foreach ($currencies as $currency_id) {
    // Fetch data from the API
    $api_url = "$api_base_url/$currency_id/market_chart?vs_currency=usd&days=1&interval=daily&precision=full";
    $api_response = file_get_contents($api_url);
    if ($api_response === false) {
        echo "Error: Unable to fetch API data for $currency_id.\n";
        continue;
    }

    // Decode the JSON response
    $data = json_decode($api_response, true);
    if (!isset($data['prices']) || empty($data['prices'])) {
        echo "Error: No price data found for $currency_id in the API response.\n";
        continue;
    }

    // Extract the midnight entry
    $midnightEntry = null;
    foreach ($data['prices'] as $price_entry) {
        $timestamp = $price_entry[0] / 1000; // Convert milliseconds to seconds
        $time = date("H:i:s", $timestamp); // Get time in H:i:s format

        if ($time === "00:00:00") {
            $midnightEntry = $price_entry;
            break;
        }
    }

    // Check if a midnight entry was found
    if ($midnightEntry === null) {
        echo "Error: No midnight entry found for $currency_id.\n";
        continue;
    }

    // Extract values for insertion
    $timestamp = date("Y-m-d H:i:s", $midnightEntry[0] / 1000); // Format as datetime
    $price = $midnightEntry[1];

    // Prepare and execute the SQL query
    $query = "INSERT INTO crypto_data (currency_id, timestamp, price) VALUES ('$currency_id', '$timestamp', $price)";
    if ($conn->query($query) === true) {
        echo "Midnight data for $currency_id inserted successfully.\n";
    } 
    else {
        echo "Error inserting data for $currency_id: " . $conn->error . "\n";
    }

    // Pause for 5 seconds before the next API call
    sleep(5); // Delay in seconds
}

// Close the database connection
$conn->close();
?>
