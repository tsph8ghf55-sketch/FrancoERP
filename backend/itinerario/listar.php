<?php
require_once "../config/headers.php";
require_once "../config/database.php";

$stmt = $pdo->query("
    SELECT i.*, v.titulo AS viaje_titulo
    FROM itinerario i
    INNER JOIN viajes v ON i.id_viaje = v.id_viaje
    ORDER BY i.id_viaje ASC, i.orden_recorrido ASC
");
echo json_encode($stmt->fetchAll());
