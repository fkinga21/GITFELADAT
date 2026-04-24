<?php
// Beállítjuk, hogy a böngésző/kliens JSON adatként kezelje a választ
header('Content-Type: application/json');
// Kapcsolódás a MySQL adatbázishoz (szerver, felhasználónév, jelszó, adatbázisnév)
$conn = new mysqli("mysql.omega", "cukiweb1", "Sutike@21", "cukiweb1");
// Kapcsolódási hiba ellenőrzése
if ($conn->connect_error) {
    // Hiba esetén JSON formátumban küldjük vissza a hibaüzenetet és leállítjuk a futást
    die(json_encode(["error" => "Adatbázis hiba: " . $conn->connect_error]));
}
// Megnézzük, milyen típusú kérés érkezett (GET, POST vagy DELETE)
$method = $_SERVER['REQUEST_METHOD'];
// --- ADATOK LEKÉRÉSE (READ) ---
if ($method == 'GET') {
    // Lekérdezzük az összes oszlopot a 'tartalom' táblából
    $result = $conn->query("SELECT id, sutiid, mentes FROM tartalom");
    // Az összes sort asszociatív tömbbe rakjuk
    $data = $result->fetch_all(MYSQLI_ASSOC);
    // JSON-ná alakítva kiírjuk az adatokat
    echo json_encode($data);
    exit;
}
// --- ÚJ ADAT FELVITELE (CREATE) ---
if ($method == 'POST') {
    // A beérkező JSON nyers adatokat beolvassuk és PHP tömbbé alakítjuk
    $data = json_decode(file_get_contents('php://input'), true);
    $id = $data['id'];
    // Ellenőrzés: Megnézzük, hogy az adott ID-val van-e már rögzített adat
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
// --- ADAT TÖRLÉSE (DELETE) ---
if ($method == 'DELETE') {
    // Az URL-ben küldött ID paramétert vesszük át (pl. api.php?id=5)
    $id = $_GET['id']; 
    // Töröljük a megadott azonosítójú sort
    $conn->query("DELETE FROM tartalom WHERE id = $id");
}
?>
