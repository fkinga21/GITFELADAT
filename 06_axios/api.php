<?php
header("Access-Control-Allow-Origin: *"); // Fontos a React miatt!
header("Content-Type: application/json");

$conn = new mysqli('mysql.omega', 'cukiweb1', 'Sutike@21', 'cukiweb1');

// CRUD: Olvasás (Read)
$sql = "SELECT * FROM ar";
$result = $conn->query($sql);
$data = [];
while($row = $result->fetch_assoc()) { $data[] = $row; }
echo json_encode($data);
?>