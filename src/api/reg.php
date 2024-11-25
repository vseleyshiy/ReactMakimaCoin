<?php
header("Access-Control-Allow-Headers: *");
include 'db.php';

if ($_SERVER['REQUEST_METHOD'] == "POST") {
    $username = htmlspecialchars($_POST['username']);
    $password1 = htmlspecialchars($_POST['password1']);
    $password2 = htmlspecialchars($_POST['password2']);

    if ($password1 == $password2) {
        $check_username_query = "SELECT * FROM users WHERE username = '$username'";
        $check_username_result = $conn->query($check_username_query);

        if ($check_username_result->num_rows > 0) {
            echo json_encode(["status" => "error", "message" => "user already exists"]);
        } else {
            $hashed_password = password_hash($password1, PASSWORD_DEFAULT);
            $stmt = $conn->prepare("INSERT INTO users (username, password) VALUES (?, ?)");

            $stmt->bind_param('ss', $username, $hashed_password);
            if ($stmt->execute()) {
                echo json_encode(["status" => "success"]);
            } else {
                echo json_encode(["status" => "error"]);
            }
            $stmt->close();
        }
    }
}
