<?php
require_once "../config/headers.php";
require_once "../config/database.php";

$data = json_decode(file_get_contents("php://input"), true);

if (empty($data['id_usuario'])) {
    echo json_encode(["success" => false, "message" => "El usuario es obligatorio"]); exit;
}
if (empty($data['id_viaje'])) {
    echo json_encode(["success" => false, "message" => "El viaje es obligatorio"]); exit;
}
if (empty($data['nombre'])) {
    echo json_encode(["success" => false, "message" => "El nombre es obligatorio"]); exit;
}
if (empty($data['descripcion'])) {
    echo json_encode(["success" => false, "message" => "La descripción es obligatoria"]); exit;
}
if (empty($data['fecha'])) {
    echo json_encode(["success" => false, "message" => "La fecha es obligatoria"]); exit;
}
if (empty($data['capacidad']) || !is_numeric($data['capacidad'])) {
    echo json_encode(["success" => false, "message" => "La capacidad debe ser numérica"]); exit;
}

$stmt = $pdo->prepare("INSERT INTO evento (id_usuario, id_viaje, nombre, descripcion, fecha, imagen, capacidad)
                        VALUES (:id_usuario, :id_viaje, :nombre, :descripcion, :fecha, :imagen, :capacidad)");
$stmt->execute([
    ":id_usuario"  => $data['id_usuario'],
    ":id_viaje"    => $data['id_viaje'],
    ":nombre"      => $data['nombre'],
    ":descripcion" => $data['descripcion'],
    ":fecha"       => $data['fecha'],
    ":imagen"      => $data['imagen']    ?? null,
    ":capacidad"   => $data['capacidad'],
]);

echo json_encode(["success" => true, "message" => "Evento creado correctamente"]);
