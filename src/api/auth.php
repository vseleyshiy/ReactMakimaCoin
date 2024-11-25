<?php
header("Access-Control-Allow-Headers: *");
include 'db.php';

if ($_SERVER['REQUEST_METHOD'] == "POST") {
    $username = htmlspecialchars($_POST['username']);
    $password = htmlspecialchars($_POST['password']);

    $stmt = $conn->prepare("SELECT * FROM users WHERE username=?");

    $stmt->bind_param('s', $username);
    $stmt->execute();
    $result = $stmt->get_result();
    if ($result->num_rows == 1) {
        $row = $result->fetch_assoc();
        if (password_verify($password, $row['password'])) {
            echo json_encode(["status" => "success", "data" => $row]);
        } else {
            echo json_encode(["status" => "error", "message" => "error password"]);
        }
    } else {
        echo json_encode(["status" => "error", "message" => "user not found"]);
    }
    $stmt->close();
}
