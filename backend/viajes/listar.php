<?php
require_once "../config/headers.php";
require_once "../config/database.php";

$stmt = $pdo->query("
    SELECT v.*, d.nombre AS destino_nombre, d.pais, d.ciudad
    FROM viajes v
    INNER JOIN destino d ON v.id_destino = d.id_destino
    ORDER BY v.id_viaje ASC
");
echo json_encode($stmt->fetchAll());
