<?php
header('Content-Type: application/json');

$conn = new mysqli("mysql.omega", "cukiweb1", "Sutike@21", "cukiweb1");

if ($conn->connect_error) {
    die(json_encode(["error" => "Adatbázis hiba: " . $conn->connect_error]));
}

$method = $_SERVER['REQUEST_METHOD'];

if ($method == 'GET') {
    $result = $conn->query("SELECT id, sutiid, mentes FROM tartalom");
    $data = $result->fetch_all(MYSQLI_ASSOC);
    echo json_encode($data);
    exit;
}

if ($method == 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $id = $data['id'];
    
    // Ellenőrzés: Létezik-e már az ID?
    $check = $conn->query("SELECT id FROM tartalom WHERE id = '$id'");
    
    if ($check->num_rows > 0) {
        http_response_code(400); // Hibakód küldése
        echo json_encode(["error" => "Ez az ID már létezik!"]);
        exit;
    }

    // Ha nincs hiba, mehet a beszúrás
    $conn->query("INSERT INTO tartalom (id, sutiid, mentes) VALUES ('$id', '{$data['sutiid']}', '{$data['mentes']}')");
    echo json_encode(["success" => "Sikeres hozzáadás"]);
}

if ($method == 'DELETE') {
    $id = $_GET['id']; 
    $conn->query("DELETE FROM tartalom WHERE id = $id");
}
?>