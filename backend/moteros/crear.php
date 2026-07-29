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
if (empty($data['telefono'])) {
    echo json_encode(["success" => false, "message" => "El teléfono es obligatorio"]); exit;
}
if (empty($data['password'])) {
    echo json_encode(["success" => false, "message" => "La contraseña es obligatoria"]); exit;
}

$stmt = $pdo->prepare("INSERT INTO moteros (id_tipo, nombre, telefono, correo, password_hash, fecha_registro, foto_perfil, rol)
                        VALUES (:id_tipo, :nombre, :telefono, :correo, :password_hash, NOW(), :foto_perfil, :rol)");
$stmt->execute([
    ":id_tipo"       => $data['id_tipo']      ?? 1,
    ":nombre"        => $data['nombre'],
    ":telefono"      => $data['telefono'],
    ":correo"        => $data['correo'],
    ":password_hash" => password_hash($data['password'], PASSWORD_BCRYPT),
    ":foto_perfil"   => $data['foto_perfil']  ?? null,
    ":rol"           => $data['rol']          ?? 'motero',
]);

echo json_encode(["success" => true, "message" => "Motero creado correctamente"]);
