<?php
header("Access-Control-Allow-Headers: *");
include 'db.php';

if ($_SERVER['REQUEST_METHOD'] == "GET") {
    $stmt = $conn->prepare("SELECT role, for_up FROM roles");

    $stmt->execute();

    $result = $stmt->get_result()->fetch_all();

    $data = [];

    foreach ($result as $index => $value) {
        $obj = ["role" => $value[0], "for_up" => $value[1]];
        $data[] = $obj;
    }

    print_r(json_encode($data, true));

    $stmt->close();
}
