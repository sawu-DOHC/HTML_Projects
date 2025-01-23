<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

session_start();

include __DIR__ . '/../UtilityScripts/DatabaseConnection.php';

$username = $_POST['username']; // get username from POST data
$password = $_POST['password']; // get password from POST data

$stmt = $conn->prepare(
    "SELECT * 
     FROM Users_Table 
     WHERE username = ? AND password = ?"
); // prepare SQL statement

$stmt->bind_param("ss", $username, $password); // bind parameters
$stmt->execute(); // execute SQL query
$result = $stmt->get_result(); // get query result

$rows = $result->fetch_all(MYSQLI_ASSOC); // fetch all rows as associative array

if (!empty($rows)) { // if user found
    $row = $rows[0]; // get the first row
    
    // set session variables
    $_SESSION['username'] = $row['username'];
    $_SESSION['password'] = $row['password'];
    $_SESSION['permissions'] = $row['permissions'];

    // return a JSON response with required data
    header('Content-Type: application/json');
    echo json_encode([
        'status' => 'success',
        'username' => $row['username'],
        'password' => $row['password'],
        'permissions' => $row['permissions']
    ]);
} else { // if user not found
    // return a JSON response for invalid credentials
    header('Content-Type: application/json');
    echo json_encode([
        'status' => 'error',
        'message' => 'Invalid username or password'
    ]);
}

$stmt->close(); // close the prepared statement
$conn->close(); // close the database connection
?>
