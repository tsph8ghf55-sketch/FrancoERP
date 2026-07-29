<?php
require_once "../config/headers.php";
require_once "../config/database.php";

$data = json_decode(file_get_contents("php://input"), true);

if (empty($data['nombre'])) {
    echo json_encode(["success" => false, "message" => "El nombre es obligatorio"]); exit;
}
if (!isset($data['precio']) || !is_numeric($data['precio'])) {
    echo json_encode(["success" => false, "message" => "El precio debe ser numérico"]); exit;
}
if (!isset($data['stock']) || !is_numeric($data['stock'])) {
    echo json_encode(["success" => false, "message" => "El stock debe ser numérico"]); exit;
}

$stmt = $pdo->prepare("INSERT INTO producto (nombre, descripcion, precio, stock, imagen, categoria)
                        VALUES (:nombre, :descripcion, :precio, :stock, :imagen, :categoria)");
$stmt->execute([
    ":nombre"      => $data['nombre'],
    ":descripcion" => $data['descripcion'] ?? null,
    ":precio"      => $data['precio'],
    ":stock"       => $data['stock'],
    ":imagen"      => $data['imagen'] ?? null,
    ":categoria"   => $data['categoria'] ?? null,
]);

echo json_encode(["success" => true, "message" => "Producto creado correctamente"]);
