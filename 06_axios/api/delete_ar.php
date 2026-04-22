<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') exit;

$data = json_decode(file_get_contents("php://input"));
$conn = new mysqli('mysql.omega', 'cukiweb1', 'Sutike@21', 'cukiweb1');

$stmt = $conn->prepare("DELETE FROM ar WHERE id = ?");
$stmt->bind_param("i", $data->id);
$stmt->execute();
echo json_encode(["status" => "deleted"]);
?>