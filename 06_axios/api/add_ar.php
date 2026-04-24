<?php
// CORS beállítások: Engedélyezzük, hogy más domainről (pl. frontend felőlről) is elérhető legyen az API
header("Access-Control-Allow-Origin: *");
// Engedélyezzük a Content-Type fejlécet a kérésekben
header("Access-Control-Allow-Headers: Content-Type");
// A beérkező nyers JSON adatok beolvasása a PHP bemeneti csatornájáról
$json = file_get_contents("php://input");
// A JSON string átalakítása PHP objektummá
$data = json_decode($json);
// Ha az adatbázisba nem ír, írassuk ki, mit kapott a PHP:
if (!$data) {
    echo json_encode(["status" => "error", "message" => "Nem érkezett adat", "received" => $json]);
    exit;
}
// Kapcsolódás az adatbázishoz (szerver, felhasználó, jelszó, adatbázis név)
$conn = new mysqli('mysql.omega', 'cukiweb1', 'Sutike@21', 'cukiweb1');
// Csatlakozási hiba ellenőrzése
if ($conn->connect_error) {
    echo json_encode(["status" => "error", "message" => "DB hiba: " . $conn->connect_error]);
    exit;
}
// --- BIZTONSÁGOS BESZÚRÁS (PREPARED STATEMENT) ---
// Előkészítjük az SQL utasítást. A '?' jelek a későbbi adatok helyét jelölik (placeholder)
$stmt = $conn->prepare("INSERT INTO ar (id, sutiid, ertek, egyseg) VALUES (?, ?, ?, ?)");
// Az adatok összekötése a kérdőjelekkel: 
// "iiss" jelentése: integer (id), integer (sutiid), string (ertek), string (egyseg)
$stmt->bind_param("iiss", $data->id, $data->sutiid, $data->ertek, $data->egyseg);
// Az adatok összekötése a kérdőjelekkel: 
// "iiss" jelentése: integer (id), integer (sutiid), string (ertek), string (egyseg)
if ($stmt->execute()) {
    // Ha sikerült a mentés, siker üzenetet küldünk
    echo json_encode(["status" => "success"]);
} else {
    // Ha az adatbázis PRIMARY KEY hiba miatt visszadobja (duplikált ID), az ide fut be
    if ($conn->errno == 1062) {
        echo json_encode(["status" => "error", "message" => "Ez az ID már létezik!"]);
    } else {
        // Minden egyéb adatbázis hiba esetén
        echo json_encode(["status" => "error", "message" => "Adatbázis hiba: " . $conn->error]);
    }
}
?>
