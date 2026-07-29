<?php
require_once "../config/headers.php";
require_once "../config/database.php";

$data = json_decode(file_get_contents("php://input"), true);

if (empty($data['id_usuario'])) {
    echo json_encode(["success" => false, "message" => "El usuario es obligatorio"]); exit;
}
if (empty($data['id_evento'])) {
    echo json_encode(["success" => false, "message" => "El evento es obligatorio"]); exit;
}
if (empty($data['contenido'])) {
    echo json_encode(["success" => false, "message" => "El contenido es obligatorio"]); exit;
}

$stmt = $pdo->prepare("INSERT INTO comentario (id_usuario, id_evento, contenido, fecha)
                        VALUES (:id_usuario, :id_evento, :contenido, NOW())");
$stmt->execute([
    ":id_usuario" => $data['id_usuario'],
    ":id_evento"  => $data['id_evento'],
    ":contenido"  => $data['contenido'],
]);

echo json_encode(["success" => true, "message" => "Comentario creado correctamente"]);
