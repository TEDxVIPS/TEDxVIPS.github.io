<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get form data
    $data = json_decode(file_get_contents('php://input'), true);
    
    $name = isset($data['name']) ? htmlspecialchars($data['name']) : '';
    $email = isset($data['email']) ? filter_var($data['email'], FILTER_SANITIZE_EMAIL) : '';
    $message = isset($data['message']) ? htmlspecialchars($data['message']) : '';
    
    // Validate data
    if (empty($name) || empty($email) || empty($message) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(['success' => false, 'error' => 'Invalid form data']);
        exit;
    }
    
    // Email setup
    $to = 'official.tedxvips@gmail.com'; // Updated email address
    $subject = "TEDx Contact Form: Message from $name";
    
    $email_content = "Name: $name\n";
    $email_content .= "Email: $email\n\n";
    $email_content .= "Message:\n$message\n";
    
    $headers = "From: $email\r\n";
    
    // Send email
    if (mail($to, $subject, $email_content, $headers)) {
        echo json_encode(['success' => true, 'message' => 'Your message has been sent successfully!']);
    } else {
        echo json_encode(['success' => false, 'error' => 'Failed to send message']);
    }
} else {
    echo json_encode(['success' => false, 'error' => 'Invalid request method']);
}
?>
