<?php
header("Access-Control-Allow-Headers: *");
include 'db.php';

if ($_SERVER['REQUEST_METHOD'] == "GET") {
    $stmt = $conn->prepare("SELECT id, name, description, reward, img, link FROM tasks");

    $stmt->execute();

    $result = $stmt->get_result()->fetch_all();

    $data = [];

    foreach ($result as $value) {
        $obj = [
            "id" => $value[0],
            "name" => $value[1],
            "description" => $value[2],
            "reward" => $value[3],
            "img" => $value[4],
            "link" => $value[5],
            "execute" => false,
        ];
        $data[] = $obj;
    }

    print_r(json_encode($data, true));

    $stmt->close();
}
