<?php
require_once "../config/headers.php";
require_once "../config/database.php";

$stmt = $pdo->query("
    SELECT ie.*, m.nombre AS motero_nombre, e.nombre AS evento_nombre
    FROM inscripcion_evento ie
    INNER JOIN moteros m ON ie.id_usuario = m.id_usuario
    INNER JOIN evento  e ON ie.id_evento  = e.id_evento
    ORDER BY ie.id_inscripcion ASC
");
echo json_encode($stmt->fetchAll());
