<?php

include "db.php";

$userid = $_POST["userid"] ?? '';

if (empty($userid)) {
    echo json_encode([
        "status" => "failed",
        "message" => "User id not set",
        "email" => "Notfound@example.com",
        "username" => "a username",
        "password" => "a password"
    ]);
    exit;
}

$stmt = $conn->prepare("SELECT * FROM users WHERE Userid = ?");
$stmt->bind_param("s", $userid);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
    echo json_encode([
        "status" => "failed",
        "message" => "User id not found",
        "email" => "Notfound@example.com",
        "username" => "a username",
        "password" => "a password"
    ]);
    exit;
} else {
    $data = [];
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }

    echo json_encode([
        "status" => "success",
        "message" => "User found",
        "data" => $data
    ]);
}
?>
