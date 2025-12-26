CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(64) NOT NULL UNIQUE,
    password VARCHAR(128) NOT NULL,
    email VARCHAR(128),
    role ENUM('admin', 'user', 'staff') DEFAULT 'user',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    notes TEXT
);

INSERT INTO users (username, password, email, role, notes) VALUES
('admin', 'admin123', 'admin@corp.local', 'admin', 'Default admin account (trap)'),
('j.smith', 'password1', 'john.smith@corp.local', 'user', 'Regular user'),
('t.jenkins', 'letmein', 'tina.jenkins@corp.local', 'user', 'Looks like a reused password'),
('m.morris', 'Welcome123', 'michael.morris@corp.local', 'staff', 'Likely to be targeted'),
('sysadmin', 'P@ssw0rd!', 'sysadmin@corp.local', 'admin', 'Attractive target - honeypot'),
('guest', 'guest', 'guest@corp.local', 'user', 'Common default account'),
('backup-admin', 'backup2023', 'backup@corp.local', 'admin', 'Looks sensitive'),
('hr_admin', 'HR2023!', 'hr.admin@corp.local', 'staff', 'HR role - bait'),
('cfo', 'money$$$', 'finance@corp.local', 'staff', 'Simulated executive account'),
('webmaster', 'rootaccess', 'webmaster@corp.local', 'admin', 'Highly privileged trap account');

CREATE TABLE clients (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ip_address VARCHAR(45) NOT NULL,
    user_agent TEXT,
    first_seen DATETIME DEFAULT CURRENT_TIMESTAMP,
    last_seen DATETIME DEFAULT CURRENT_TIMESTAMP,
    hit_count INT DEFAULT 1
);

CREATE TABLE endpoints (
    id INT AUTO_INCREMENT PRIMARY KEY,
    path VARCHAR(128) NOT NULL,
    attack_type ENUM('brute_force', 'xss', 'sqli', 'csrf', 'email_injection', 'session_hijack') NOT NULL,
    description TEXT
);

CREATE TABLE attack_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    client_id INT,
    endpoint_id INT,
    method VARCHAR(8),
    status_code INT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    raw_request TEXT,
    FOREIGN KEY (client_id) REFERENCES clients(id),
    FOREIGN KEY (endpoint_id) REFERENCES endpoints(id)
);

CREATE TABLE login_attempts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    client_id INT,
    user_id INT NULL,
    username_attempted VARCHAR(64),
    password_attempted VARCHAR(128),
    success BOOLEAN DEFAULT FALSE,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (client_id) REFERENCES clients(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);
