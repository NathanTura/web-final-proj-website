<?php
include 'db.php';

$EmailAddress = $_POST['Email'] ?? '';
$Username = $_POST['Uname'] ?? '';
$Password = $_POST['password'] ?? '';
$Cpassword = $_POST['confirmpassword'] ?? '';

if (empty($EmailAddress) || empty($Password) || empty($Cpassword) || empty($Username)) {
    echo json_encode([
        "status" => "error",
        "message" => "All fields are required."
    ]);
    exit;
}

if ($Password !== $Cpassword) {
    echo json_encode([
        "status" => "error",
        "message" => "Passwords do not match."
    ]);
    exit;
}

$stmt = $conn->prepare("SELECT * FROM users WHERE EmailAddress = ?");
$stmt->bind_param("s", $EmailAddress);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
 
    $stmt = $conn->prepare("INSERT INTO users (EmailAddress, Username ,  Password, Cpassword) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("ssss", $EmailAddress, $Username, $Password, $Cpassword);

    if ($stmt->execute()) {
  
        $newUserId = $conn->insert_id;

        echo json_encode([
            "status" => "success",
            "message" => "User created",
            "id" => $newUserId,
            "username" => $Username
        ]);
    } else {
        echo json_encode([
            "status" => "error",
            "message" => "Couldn't create account: " . $stmt->error
        ]);
    }
} else {
    echo json_encode([
        "status" => "error",
        "message" => "User already exists"
    ]);
}

$conn->close();
?>
