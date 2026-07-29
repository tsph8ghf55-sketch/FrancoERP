<?php
require_once "../config/headers.php";
require_once "../config/database.php";

$data = json_decode(file_get_contents("php://input"), true);

if (empty($data['nombre'])) {
    echo json_encode(["success" => false, "message" => "El nombre es obligatorio"]); exit;
}
if (empty($data['correo']) || !filter_var($data['correo'], FILTER_VALIDATE_EMAIL)) {
    echo json_encode(["success" => false, "message" => "El correo no es válido"]); exit;
}

$stmt = $pdo->prepare("INSERT INTO clientes (nombre, correo, telefono, fecha_registro)
                        VALUES (:nombre, :correo, :telefono, NOW())");
$stmt->execute([
    ":nombre"   => $data['nombre'],
    ":correo"   => $data['correo'],
    ":telefono" => $data['telefono'] ?? null,
]);

echo json_encode(["success" => true, "message" => "Cliente creado correctamente"]);
