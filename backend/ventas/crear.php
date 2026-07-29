<?php
require_once "../config/headers.php";
require_once "../config/database.php";

$data = json_decode(file_get_contents("php://input"), true);

if (empty($data['id_cliente'])) {
    echo json_encode(["success" => false, "message" => "El cliente es obligatorio"]); exit;
}
if (empty($data['id_producto'])) {
    echo json_encode(["success" => false, "message" => "El producto es obligatorio"]); exit;
}
if (empty($data['cantidad']) || !is_numeric($data['cantidad'])) {
    echo json_encode(["success" => false, "message" => "La cantidad debe ser numérica"]); exit;
}
if (!isset($data['total']) || !is_numeric($data['total'])) {
    echo json_encode(["success" => false, "message" => "El total debe ser numérico"]); exit;
}

try {
    $pdo->beginTransaction();

    $stmt = $pdo->prepare("INSERT INTO pedido (id_cliente, fecha_pedido, estado, total)
                            VALUES (:id_cliente, NOW(), 'completado', :total)");
    $stmt->execute([":id_cliente" => $data['id_cliente'], ":total" => $data['total']]);
    $idPedido = $pdo->lastInsertId();

    $stmt2 = $pdo->prepare("INSERT INTO detalle_pedido (id_pedido, id_producto, cantidad, estado)
                             VALUES (:id_pedido, :id_producto, :cantidad, 'entregado')");
    $stmt2->execute([
        ":id_pedido"   => $idPedido,
        ":id_producto" => $data['id_producto'],
        ":cantidad"    => $data['cantidad'],
    ]);

    $pdo->commit();
    echo json_encode(["success" => true, "message" => "Venta registrada correctamente"]);
} catch (Exception $e) {
    $pdo->rollBack();
    echo json_encode(["success" => false, "message" => "Error al registrar venta"]);
}
