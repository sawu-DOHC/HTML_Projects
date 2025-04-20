<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require '../PHPMailer/src/Exception.php';
require '../PHPMailer/src/PHPMailer.php';
require '../PHPMailer/src/SMTP.php';

header('Content-Type: application/json');

// Form values
$name = $_POST['name_text'] ?? '';
$email = $_POST['email_text'] ?? '';
$phone = $_POST['phone_text'] ?? '';
$service = $_POST['service_name'] ?? '';
$description = $_POST['service_description'] ?? '';
$price = $_POST['service_price'] ?? '';

$mail = new PHPMailer(true);

try {
    // SMTP config for Freehostia
    $mail->isSMTP();
    $mail->Host = 'mbox.freehostia.com';
    $mail->SMTPAuth = true;
    $mail->Username = 'info@sparkforgelabs.com'; // Freehostia email
    $mail->Password = 'gLgRTs863+';    // Use the password you set
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS; // ← because you're using port 465
    $mail->Port = 465;

    // Email details
    $mail->setFrom('info@sparkforgelabs.com', 'Spark Forge Labs');
    $mail->addAddress('samwudohc@gmail.com'); // You receiving it
    $mail->addReplyTo($email);

    $mail->isHTML(false);
    $mail->Subject = "New Registration: $service";
    $mail->Body = "You have a new registration from Spark Forge Labs.\n\n" .
                  "Name: $name\nEmail: $email\nPhone: $phone\n\n" .
                  "Service: $service\nDescription: $description\nPrice: \$$price\n";

    $mail->send();

    echo json_encode([
        'success' => true,
        'message' => 'Email sent!',
        'data' => compact('name', 'email', 'phone', 'service', 'description', 'price')
    ]);
} catch (Exception $e) {
    echo json_encode([
        'success' => false,
        'message' => "Email failed: {$mail->ErrorInfo}"
    ]);
}
?>
