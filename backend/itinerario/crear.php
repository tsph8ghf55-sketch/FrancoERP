<?php
require_once "../config/headers.php";
require_once "../config/database.php";

$data = json_decode(file_get_contents("php://input"), true);

if (empty($data['id_viaje'])) {
    echo json_encode(["success" => false, "message" => "El viaje es obligatorio"]); exit;
}
if (empty($data['lugar'])) {
    echo json_encode(["success" => false, "message" => "El lugar es obligatorio"]); exit;
}
if (empty($data['fecha'])) {
    echo json_encode(["success" => false, "message" => "La fecha es obligatoria"]); exit;
}
if (!isset($data['orden_recorrido']) || !is_numeric($data['orden_recorrido'])) {
    echo json_encode(["success" => false, "message" => "El orden de recorrido es obligatorio"]); exit;
}

$stmt = $pdo->prepare("INSERT INTO itinerario (id_viaje, lugar, descripcion, fecha, orden_recorrido)
                        VALUES (:id_viaje, :lugar, :descripcion, :fecha, :orden_recorrido)");
$stmt->execute([
    ":id_viaje"        => $data['id_viaje'],
    ":lugar"           => $data['lugar'],
    ":descripcion"     => $data['descripcion']    ?? null,
    ":fecha"           => $data['fecha'],
    ":orden_recorrido" => $data['orden_recorrido'],
]);

echo json_encode(["success" => true, "message" => "Itinerario creado correctamente"]);
