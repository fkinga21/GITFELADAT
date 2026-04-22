<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);
header('Content-Type: application/json'); 
include 'db.php';
$result = $conn->query("SELECT * FROM ar"); 
$adatok = array();

while($row = $result->fetch_assoc()) {
    $adatok[] = $row;
}
echo json_encode($adatok);
?>