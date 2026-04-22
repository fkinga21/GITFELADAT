<?php
$host = "mysql.nethely.hu"; 
$user = "cukiweb1";
$pass = "Sutike@21";
$dbname = "cukiweb1";

$conn = new mysqli($host, $user, $pass, $dbname);

$conn->set_charset("utf8"); 
?>