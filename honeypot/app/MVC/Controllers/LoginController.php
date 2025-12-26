<?php

class LoginController {

    private $pdo;                // PDO database connection object

    private $username;           // Username from POST
    private $password;           // Password from POST

    private $ip;                 // Client IP address
    private $userAgent;          // Client user agent

    private $client_id = null;   // ID of client in the 'clients' table
    private $user_id = null;     // ID of the user in 'users' table (if found)

    private $login_success = false; // Whether the login attempt succeeded

    public function __construct($pdo) {
        $this->pdo = $pdo;
        $this->username = trim($_POST['username'] ?? '');
        $this->password = trim($_POST['password'] ?? '');
    }

    // Step 1: Record request info (IP, User Agent)
    public function recordClientInfo() {
        $this->ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
        $this->userAgent = $_SERVER['HTTP_USER_AGENT'] ?? 'unknown';
    }

    // Step 2: Lookup or create client in the DB
    public function findClient() {
        // Step 1: Check if the client already exists in the database
        $query = "SELECT id 
                  FROM clients 
                  WHERE ip_address = ?";

        $stmt = $this->pdo->prepare($query);

        $stmt->execute([$this->ip]);

        $client = $stmt->fetch();

        if ($client) {
            // Client found: update their last_seen and increment hit_count
            $clientId = $client['id'];
            $updateQuery = "UPDATE clients 
                            SET last_seen = NOW(), hit_count = hit_count + 1 
                            WHERE id = ?";

            $updateStmt = $this->pdo->prepare($updateQuery);
            $updateStmt->execute([$clientId]);
            $this->client_id = $clientId;
        } 
        else {
            // Client not found: insert new client
            $insertQuery = "INSERT INTO clients (ip_address, user_agent) 
                            VALUES (?, ?)";
                            
            $insertStmt = $this->pdo->prepare($insertQuery);
            $insertStmt->execute([$this->ip, $this->userAgent]);
            $this->client_id = $this->pdo->lastInsertId();
        }
    }


    // Step 3: Check credentials
    public function checkCredentials() {
        $stmt = $this->pdo->prepare("SELECT id, password FROM users WHERE username = ?");
        $stmt->execute([$this->username]);
        $user = $stmt->fetch();

        if ($user && $this->password === $user['password']) {
            $this->user_id = $user['id'];
            $this->login_success = true;
        }
    }

    // Step 4: Log the login attempt
    public function recordLoginAttempt() {
        $stmt = $this->pdo->prepare("
            INSERT INTO login_attempts (client_id, user_id, username_attempted, password_attempted, success) 
            VALUES (?, ?, ?, ?, ?)
        ");
        $stmt->execute([
            $this->client_id,
            $this->user_id,
            $this->username,
            $this->password,
            $this->login_success
        ]);
    }

    // Step 5: Start session if successful
    public function startSession() {
        $_SESSION['loggedin'] = true;
        $_SESSION['user'] = $this->username;
    }

    // Utility: Did login succeed?
    public function loginSuccessful() {
        return $this->login_success;
    }
}
