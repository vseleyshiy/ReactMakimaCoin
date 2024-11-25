<?php
header("Access-Control-Allow-Headers: *");
include 'db.php';

if ($_SERVER['REQUEST_METHOD'] == "GET") {
    $stmt = $conn->prepare("SELECT id, name, description, lvl, profit, allProfit, price, img FROM cards");

    $stmt->execute();

    $result = $stmt->get_result();

    $cards = [];

    if ($result->num_rows > 0) {
        $data = $result->fetch_all();

        foreach ($data as $value) {
            $obj = [
                "id" => $value[0],
                "name" => $value[1],
                "description" => $value[2],
                "lvl" => $value[3],
                "profit" => $value[4],
                "allProfit" => $value[5],
                "price" => $value[6],
                "img" => $value[7],
            ];
            $cards[] = $obj;
        }
        echo json_encode($cards, true);
    }

    $stmt->close();
}
