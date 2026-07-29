<?php
require_once "../config/headers.php";
require_once "../config/database.php";

$stmt = $pdo->query("SELECT id_usuario, id_tipo, nombre, telefono, correo,
                            fecha_registro, foto_perfil, rol
                     FROM moteros ORDER BY id_usuario ASC");
echo json_encode($stmt->fetchAll());
