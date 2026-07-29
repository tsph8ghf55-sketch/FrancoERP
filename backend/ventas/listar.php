<?php
require_once "../config/headers.php";
require_once "../config/database.php";

$stmt = $pdo->query("
    SELECT p.id_pedido AS id, c.nombre AS cliente, pr.nombre AS producto,
           dp.cantidad, p.total, p.estado, p.fecha_pedido AS fecha
    FROM pedido p
    INNER JOIN clientes c  ON p.id_cliente  = c.idclientes
    INNER JOIN detalle_pedido dp ON dp.id_pedido = p.id_pedido
    INNER JOIN producto pr ON dp.id_producto = pr.id_producto
    ORDER BY p.id_pedido DESC
");
echo json_encode($stmt->fetchAll());
