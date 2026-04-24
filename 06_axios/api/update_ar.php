<?php
// --- CORS BEÁLLÍTÁSOK ---
// Engedélyezzük, hogy bármilyen weboldalról érkezzen kérés
header("Access-Control-Allow-Origin: *");
// Megadjuk, hogy a POST (adatküldés) és az OPTIONS (biztonsági ellenőrzés) engedélyezett
header("Access-Control-Allow-Methods: POST, OPTIONS");
// Engedélyezzük a Content-Type fejlécet, ami a JSON küldéséhez szükséges
header("Access-Control-Allow-Headers: Content-Type");
// Ha a böngésző csak az OPTIONS "előkérést" küldi (Preflight), itt megállunk
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') exit;
// A kliens által küldött JSON formátumú adatok beolvasása és PHP objektummá alakítása
$data = json_decode(file_get_contents("php://input"));
// Kapcsolódás a MySQL adatbázishoz
$conn = new mysqli('mysql.omega', 'cukiweb1', 'Sutike@21', 'cukiweb1');

// Fontos: az ID alapján keressük meg a sort, amit frissíteni kell
$stmt = $conn->prepare("UPDATE ar SET sutiid = ?, ertek = ?, egyseg = ? WHERE id = ?");
$stmt->bind_param("issi", $data->sutiid, $data->ertek, $data->egyseg, $data->id);
$stmt->execute();
// Az utasítás végrehajtása és az eredmény ellenőrzése
if ($stmt->execute()) {
    // Ha a módosítás sikeres volt, visszaküldjük a sikeres státuszt
    echo json_encode(["status" => "success"]);
} else {
    // Ha hiba történt az adatbázisban, visszaküldjük a hibaüzenetet
    echo json_encode(["status" => "error", "message" => $conn->error]);
}
?>
