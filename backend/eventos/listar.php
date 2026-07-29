<?php
require_once "../config/headers.php";
require_once "../config/database.php";

$stmt = $pdo->query("
    SELECT e.*, m.nombre AS motero_nombre, v.titulo AS viaje_titulo
    FROM evento e
    INNER JOIN moteros m ON e.id_usuario = m.id_usuario
    INNER JOIN viajes  v ON e.id_viaje   = v.id_viaje
    ORDER BY e.id_evento ASC
");
echo json_encode($stmt->fetchAll());
