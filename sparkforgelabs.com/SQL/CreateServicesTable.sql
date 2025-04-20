CREATE TABLE services (
    service_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    duration VARCHAR(50),
    style VARCHAR(50),
    price DECIMAL(10, 2) NOT NULL
);


INSERT INTO services (name, description, duration, style, price) VALUES
('One-Time Welding Workshop',
 'A fun, fast-paced intro to welding. Great for first-timers who want to experience MIG, TIG, and STICK without committing to a full course.',
 '2 Hours',
 '1 day',
 80.00),

('Welding Skills Course',
 'A comprehensive workshop covering MIG, TIG, and STICK welding. Learn safety, theory, and hands-on practice in one complete package.',
 '8 Hours',
 '4 day (2hrs each)',
 320.00),

('Open Studio Time',
 'Independent welding time in the shop. Available to returning students who’ve completed at least one course. Equipment included.',
 '2 Hours',
 '1 day',
 150.00);
