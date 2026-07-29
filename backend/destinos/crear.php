<?php
require_once "../config/headers.php";
require_once "../config/database.php";

$data = json_decode(file_get_contents("php://input"), true);

if (empty($data['nombre'])) {
    echo json_encode(["success" => false, "message" => "El nombre es obligatorio"]); exit;
}
if (empty($data['pais'])) {
    echo json_encode(["success" => false, "message" => "El país es obligatorio"]); exit;
}
if (empty($data['ciudad'])) {
    echo json_encode(["success" => false, "message" => "La ciudad es obligatoria"]); exit;
}

$stmt = $pdo->prepare("INSERT INTO destino (nombre, pais, ciudad, descripcion, imagen, categoria, fecha_recomendacion)
                        VALUES (:nombre, :pais, :ciudad, :descripcion, :imagen, :categoria, :fecha_recomendacion)");
$stmt->execute([
    ":nombre"              => $data['nombre'],
    ":pais"                => $data['pais'],
    ":ciudad"              => $data['ciudad'],
    ":descripcion"         => $data['descripcion']         ?? null,
    ":imagen"              => $data['imagen']              ?? null,
    ":categoria"           => $data['categoria']           ?? null,
    ":fecha_recomendacion" => $data['fecha_recomendacion'] ?? null,
]);

echo json_encode(["success" => true, "message" => "Destino creado correctamente"]);
