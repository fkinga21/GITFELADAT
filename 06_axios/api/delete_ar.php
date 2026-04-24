<?php
// --- CORS BEÁLLÍTÁSOK ---
// Engedélyezi, hogy bármilyen domainről érkezzen kérés
header("Access-Control-Allow-Origin: *");
// Meghatározza, hogy milyen HTTP metódusokat használhat a kliens
header("Access-Control-Allow-Methods: POST, OPTIONS");
// Engedélyezi a Content-Type fejlécet
header("Access-Control-Allow-Headers: Content-Type");
// Az OPTIONS metódus kezelése: A böngészők "előkérést" küldenek, hogy ellenőrizzék a jogosultságokat.
// Ha ilyen érkezik, itt leállítjuk a futást, mert a fenti fejlécek már megadták a választ.
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') exit;
// A beérkező JSON nyers adat beolvasása és PHP objektummá alakítása
$data = json_decode(file_get_contents("php://input"));
// Kapcsolódás az adatbázishoz
$conn = new mysqli('mysql.omega', 'cukiweb1', 'Sutike@21', 'cukiweb1');
// --- BIZTONSÁGOS TÖRLÉS (PREPARED STATEMENT) ---
// Előkészítjük a törlő utasítást. A '?' helyére kerül majd a konkrét ID.
$stmt = $conn->prepare("DELETE FROM ar WHERE id = ?");
// Az adat összekötése: "i" jelentése integer (egész szám), mivel az ID egy szám.
$stmt->bind_param("i", $data->id);
// Az utasítás végrehajtása (törlés az adatbázisból)
$stmt->execute();
// Visszajelzés küldése a kliensnek JSON formátumban
echo json_encode(["status" => "deleted"]);
?>
