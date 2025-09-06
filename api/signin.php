<?php
header('Content-Type: application/json');
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

include "db.php";

$login = $_POST['login'] ?? '';
$password = $_POST['password'] ?? '';

if (empty($login) || empty($password)) {
    echo json_encode([
        "status" => "failed",
        "message" => "Email/Username and password are required"
    ]);
    exit;
}

$stmt = $conn->prepare("select * from users where EmailAddress = ? or Username = ?");

if (!$stmt) {
    echo json_encode([
        "status" => "failed",
        "message" => "Database error: " . $conn->error
    ]);
    exit;
}

$stmt->bind_param("ss", $login, $login);

$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
    echo json_encode([
        "status" => "failed",
        "message" => "User not found"
    ]);
    exit;
}


$user = $result->fetch_assoc();

if ($user['Password'] === $password) {
    echo json_encode([
        "status" => "success",
        "message" => "Login successful",
        "id" => $user['userid'],
        "username" => $user['Username'], 
    ]);
} else {
    echo json_encode([
        "status" => "failed",
        "message" => "Incorrect password"
    ]);
}
?>
