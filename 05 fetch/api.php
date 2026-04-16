<?php
header("Content-Type: application/json");
include 'db_config.php';

$method = $_SERVER['REQUEST_METHOD'];

switch($method) {
    case 'GET': // Olvasás
        $stmt = $conn->query("SELECT * FROM tartalom");
        echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
        break;

    case 'POST': // Létrehozás
        $data = json_decode(file_get_contents("php://input"));
        $stmt = $conn->prepare("INSERT INTO tartalom (sutiid, mentes) VALUES (?, ?)");
        $stmt->execute([$data->sutiid, $data->mentes]);
        echo json_encode(["status" => "success"]);
        break;

    case 'DELETE': // Törlés
        $id = $_GET['id'];
        $stmt = $conn->prepare("DELETE FROM tartalom WHERE id = ?");
        $stmt->execute([$id]);
        echo json_encode(["status" => "deleted"]);
        break;
}
?>