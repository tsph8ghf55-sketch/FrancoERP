<?php
require_once "../config/headers.php";
require_once "../config/database.php";

$data = json_decode(file_get_contents("php://input"), true);

if (empty($data['id_destino'])) {
    echo json_encode(["success" => false, "message" => "El destino es obligatorio"]); exit;
}
if (empty($data['titulo'])) {
    echo json_encode(["success" => false, "message" => "El título es obligatorio"]); exit;
}
if (empty($data['fecha_viaje'])) {
    echo json_encode(["success" => false, "message" => "La fecha del viaje es obligatoria"]); exit;
}

$stmt = $pdo->prepare("INSERT INTO viajes (id_destino, titulo, descripcion, fecha_viaje, fecha_publicacion)
                        VALUES (:id_destino, :titulo, :descripcion, :fecha_viaje, NOW())");
$stmt->execute([
    ":id_destino"  => $data['id_destino'],
    ":titulo"      => $data['titulo'],
    ":descripcion" => $data['descripcion'] ?? null,
    ":fecha_viaje" => $data['fecha_viaje'],
]);

echo json_encode(["success" => true, "message" => "Viaje creado correctamente"]);
