<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");

$json = file_get_contents("php://input");
$data = json_decode($json);

// Ha az adatbázisba nem ír, írassuk ki, mit kapott a PHP:
if (!$data) {
    echo json_encode(["status" => "error", "message" => "Nem érkezett adat", "received" => $json]);
    exit;
}

$conn = new mysqli('mysql.omega', 'cukiweb1', 'Sutike@21', 'cukiweb1');
if ($conn->connect_error) {
    echo json_encode(["status" => "error", "message" => "DB hiba: " . $conn->connect_error]);
    exit;
}

$stmt = $conn->prepare("INSERT INTO ar (id, sutiid, ertek, egyseg) VALUES (?, ?, ?, ?)");
$stmt->bind_param("iiss", $data->id, $data->sutiid, $data->ertek, $data->egyseg);

if ($stmt->execute()) {
    echo json_encode(["status" => "success"]);
} else {
    // Ha az adatbázis PRIMARY KEY hiba miatt visszadobja (duplikált ID), az ide fut be
    if ($conn->errno == 1062) {
        echo json_encode(["status" => "error", "message" => "Ez az ID már létezik!"]);
    } else {
        echo json_encode(["status" => "error", "message" => "Adatbázis hiba: " . $conn->error]);
    }
}
?>
