<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') exit;

$data = json_decode(file_get_contents("php://input"));
$conn = new mysqli('mysql.omega', 'cukiweb1', 'Sutike@21', 'cukiweb1');

// Fontos: az ID alapján keressük meg a sort, amit frissíteni kell
$stmt = $conn->prepare("UPDATE ar SET sutiid = ?, ertek = ?, egyseg = ? WHERE id = ?");
$stmt->bind_param("issi", $data->sutiid, $data->ertek, $data->egyseg, $data->id);
$stmt->execute();

if ($stmt->execute()) {
    echo json_encode(["status" => "success"]);
} else {
    echo json_encode(["status" => "error", "message" => $conn->error]);
}
?>