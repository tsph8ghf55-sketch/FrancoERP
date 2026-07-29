<?php
require_once "../config/headers.php";
require_once "../config/database.php";

$stmt = $pdo->query("SELECT * FROM destino ORDER BY id_destino ASC");
echo json_encode($stmt->fetchAll());
