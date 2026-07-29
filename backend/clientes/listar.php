<?php
require_once "../config/headers.php";
require_once "../config/database.php";

$stmt = $pdo->query("SELECT * FROM clientes ORDER BY idclientes ASC");
echo json_encode($stmt->fetchAll());
