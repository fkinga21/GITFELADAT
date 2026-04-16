<?php
$host = "localhost"; 
$dbname = "adatbazis_neve";
$user = "felhasznalonev";
$pass = "jelszo";

try {
    $conn = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $user, $pass);
} catch(PDOException $e) {
    die("Hiba: " . $e->getMessage());
}
?>