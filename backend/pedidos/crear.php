<?php
require_once "../config/headers.php";
require_once "../config/database.php";

$data = json_decode(file_get_contents("php://input"), true);

if (empty($data['id_cliente'])) {
    echo json_encode(["success" => false, "message" => "El cliente es obligatorio"]); exit;
}
if (!isset($data['total']) || !is_numeric($data['total'])) {
    echo json_encode(["success" => false, "message" => "El total debe ser numérico"]); exit;
}
if (empty($data['estado'])) {
    echo json_encode(["success" => false, "message" => "El estado es obligatorio"]); exit;
}

$stmt = $pdo->prepare("INSERT INTO pedido (id_cliente, fecha_pedido, estado, total)
                        VALUES (:id_cliente, NOW(), :estado, :total)");
$stmt->execute([
    ":id_cliente" => $data['id_cliente'],
    ":estado"     => $data['estado'],
    ":total"      => $data['total'],
]);

echo json_encode(["success" => true, "message" => "Pedido creado correctamente"]);
