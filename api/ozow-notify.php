<?php
// api/ozow-notify.php
// This file handles Ozow payment notifications

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

// Get raw POST data
$rawData = file_get_contents('php://input');
$notificationData = [];

// Parse data (Ozow sends both form data and JSON)
if ($rawData) {
    $notificationData = json_decode($rawData, true);
    if (!$notificationData) {
        parse_str($rawData, $notificationData);
    }
}

// If no data, try $_POST
if (empty($notificationData)) {
    $notificationData = $_POST;
}

// Log received data for debugging
error_log('Ozow Notification Received: ' . print_r($notificationData, true));

// Validate required fields
if (!isset($notificationData['TransactionId']) || !isset($notificationData['HashCheck'])) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Missing required fields']);
    exit;
}

// For production, you should use a Supabase Edge Function instead of this PHP file
// This file serves as a placeholder/fallback

// If you have a Supabase Edge Function set up, forward the request
$supabaseFunctionUrl = getenv('SUPABASE_OZOW_WEBHOOK_URL');
if ($supabaseFunctionUrl) {
    $ch = curl_init($supabaseFunctionUrl);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($notificationData));
    curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    
    http_response_code($httpCode);
    echo $response;
    exit;
}

// If no Supabase function, return success (but you should still verify in your database)
// In production, you should always verify the hash and update the database
http_response_code(200);
echo json_encode(['status' => 'success', 'message' => 'Notification received']);
?>