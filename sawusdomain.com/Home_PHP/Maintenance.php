<?php

$servername = 'localhost';
$dbname = 'samwu1_desktop_db';
$username = 'samwu1_desktop_db';
$password = '50175017Ss';



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

// Step 1: Delete all existing entries to rebuild the database
$query = "DELETE FROM crypto_data";
if ($conn->query($query) === TRUE) {
    echo "Existing data deleted. Rebuilding database...\n";
}
else {
    echo "Error deleting data: " . $conn->error . "\n";
    exit; // Exit if there's an error deleting the data
}

// Step 2: Reset the AUTO_INCREMENT value to 1
$resetAutoIncrementQuery = "ALTER TABLE crypto_data AUTO_INCREMENT = 1";
if ($conn->query($resetAutoIncrementQuery) === TRUE) {
    echo "AUTO_INCREMENT reset to 1.\n";
}
else {
    echo "Error resetting AUTO_INCREMENT: " . $conn->error . "\n";
}

// Function to fetch data with cURL
function fetchData($currency_id) {
    // Calculate the timestamps for 365 days ago to now
    $oneYearAgo = time() - (365 * 24 * 60 * 60); // 365 days ago
    $now = time(); // Current timestamp

    // API URL with the correct time range (from 365 days ago to now)
    $api_url = "https://api.coingecko.com/api/v3/coins/$currency_id/market_chart/range?vs_currency=usd&from=$oneYearAgo&to=$now";
    
    // Log the URL before sending the request
    echo "API Request URL: $api_url\n";  // Logging the URL to test manually

    // Initialize cURL session
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $api_url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_TIMEOUT, 30);  // Timeout in seconds
    curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0');  // Set a user agent to avoid issues

    // Execute cURL request
    $response = curl_exec($ch);

    // Check for cURL errors
    if ($response === false) {
        echo "cURL Error for $currency_id: " . curl_error($ch) . "\n";
        curl_close($ch);
        return false;
    }

    // Check if the API request was successful (check status code)
    $http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    if ($http_code != 200) {
        echo "Error fetching data for $currency_id. HTTP Code: $http_code\n";
        curl_close($ch);
        return false;
    }

    curl_close($ch);
    return json_decode($response, true);
}

// Function to fetch and insert data for each cryptocurrency
function fetchAndInsertData($currency_id, $conn) {
    // Fetch data
    $data = fetchData($currency_id);

    if (!$data || !isset($data['prices']) || empty($data['prices'])) {
        echo "Error: No price data found for $currency_id.\n";
        return;
    }

    // Step 2: Prepare query for inserting data
    $insert_query = "INSERT INTO crypto_data (currency_id, timestamp, price) VALUES ";
    $values = [];

    foreach ($data['prices'] as $price_entry) {
        // Convert the timestamp from milliseconds to a formatted datetime string
        $timestamp = date("Y-m-d H:i:s", $price_entry[0] / 1000);
        $price = number_format($price_entry[1], 2, '.', ''); // Ensure the price has 2 decimal places
        $values[] = "('$currency_id', '$timestamp', $price)";
    }

    // Add all values to the insert query
    $insert_query .= implode(", ", $values);

    // Execute the insert query
    if ($conn->query($insert_query) === TRUE) {
        echo "Data for $currency_id inserted successfully.\n";
    } else {
        echo "Error inserting data for $currency_id: " . $conn->error . "\n";
    }
}

// Loop through each cryptocurrency and fetch & insert data
foreach ($currencies as $currency_id) {
    fetchAndInsertData($currency_id, $conn);
    
    // Pause for a brief moment to avoid overloading the API
    sleep(5); // 5 seconds delay
}

// Close the database connection
$conn->close();
?>
