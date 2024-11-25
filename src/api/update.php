<?php
header("Access-Control-Allow-Headers: *");
include 'db.php';

if ($_SERVER['REQUEST_METHOD'] == "POST") {
    $json = json_decode($_POST['data'], true);
    $id = $json['id'];

    if ($json['status'] == 'balance') {
        $balance = $json['balance'];

        $stmt = $conn->prepare("UPDATE users SET balance=? WHERE id=?");
        $stmt->bind_param('ii', $balance, $id);
        $stmt->execute();
        $stmt->close();
    }
    if ($json['status'] == 'lvl') {
        $lvl = $json['lvl'];

        $stmt = $conn->prepare("UPDATE users SET roleLvl=? WHERE id=?");
        $stmt->bind_param('ii', $lvl, $id);
        $stmt->execute();
        $stmt->close();
    }
    if ($json['status'] == 'hourProfit') {
        $hourProfit = $json['hourProfit'];

        $stmt = $conn->prepare("UPDATE users SET hourProfit=? WHERE id=?");
        $stmt->bind_param('ii', $hourProfit, $id);
        $stmt->execute();
        $stmt->close();
    }
    if ($json['status'] == 'multitapLvl') {
        $multitapLvl = $json['multitapLvl'];

        $stmt = $conn->prepare("UPDATE users SET multitapLvl=? WHERE id=?");
        $stmt->bind_param('ii', $multitapLvl, $id);
        $stmt->execute();
        $stmt->close();
    }
    if ($json['status'] == 'maxEnergyLvl') {
        $maxEnergyLvl = $json['maxEnergyLvl'];

        $stmt = $conn->prepare("UPDATE users SET maxEnergyLvl=? WHERE id=?");
        $stmt->bind_param('ii', $maxEnergyLvl, $id);
        $stmt->execute();
        $stmt->close();
    }
    if ($json['status'] == 'username') {
        $username = $json['username'];

        $check_username_query = "SELECT * FROM users WHERE username = '$username'";
        $check_username_result = $conn->query($check_username_query);

        if ($check_username_result->num_rows > 0) {
            echo json_encode(["status" => "error", "message" => "user already exists"]);
        } else {
            $stmt = $conn->prepare("UPDATE users SET username=? WHERE id=?");
            $stmt->bind_param('si', $username, $id);
            $stmt->execute();
            $stmt->close();
        }
    }
    if ($json['status'] == 'cards') {
        $cards = json_encode($json['cards'], JSON_UNESCAPED_UNICODE);

        $stmt = $conn->prepare("UPDATE users SET cards='$cards' WHERE id=$id");
        $stmt->execute();
        $stmt->close();
    }
    if ($json['status'] == 'tasks') {
        $tasks = json_encode($json['tasks'], JSON_UNESCAPED_UNICODE);

        $stmt = $conn->prepare("UPDATE users SET tasks='$tasks' WHERE id=$id");
        $stmt->execute();
        $stmt->close();
    }
}
