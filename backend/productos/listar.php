<?php
require_once "../config/headers.php";
require_once "../config/database.php";

$stmt = $pdo->query("SELECT * FROM producto ORDER BY id_producto ASC");
echo json_encode($stmt->fetchAll());
