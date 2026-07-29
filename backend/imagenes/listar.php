<?php
require_once "../config/headers.php";
require_once "../config/database.php";

$stmt = $pdo->query("
    SELECT i.*, v.titulo AS viaje_titulo
    FROM imagen i
    INNER JOIN viajes v ON i.id_viaje = v.id_viaje
    ORDER BY i.id_imagen ASC
");
echo json_encode($stmt->fetchAll());
