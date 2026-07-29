<?php
require_once "../config/headers.php";
require_once "../config/database.php";

$stmt = $pdo->query("
    SELECT c.*, m.nombre AS motero_nombre, e.nombre AS evento_nombre
    FROM comentario c
    INNER JOIN moteros m ON c.id_usuario = m.id_usuario
    INNER JOIN evento  e ON c.id_evento  = e.id_evento
    ORDER BY c.id_comentario ASC
");
echo json_encode($stmt->fetchAll());
