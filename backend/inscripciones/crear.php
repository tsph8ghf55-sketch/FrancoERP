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

// Evitar inscripción duplicada
$check = $pdo->prepare("SELECT id_inscripcion FROM inscripcion_evento WHERE id_usuario = :u AND id_evento = :e");
$check->execute([":u" => $data['id_usuario'], ":e" => $data['id_evento']]);
if ($check->fetch()) {
    echo json_encode(["success" => false, "message" => "El usuario ya está inscrito en este evento"]); exit;
}

$stmt = $pdo->prepare("INSERT INTO inscripcion_evento (id_usuario, id_evento, fecha_inscripcion)
                        VALUES (:id_usuario, :id_evento, NOW())");
$stmt->execute([
    ":id_usuario" => $data['id_usuario'],
    ":id_evento"  => $data['id_evento'],
]);

echo json_encode(["success" => true, "message" => "Inscripción realizada correctamente"]);
