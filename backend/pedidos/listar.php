<?php
require_once "../config/headers.php";
require_once "../config/database.php";

$stmt = $pdo->query("
    SELECT p.*, c.nombre AS cliente_nombre, c.correo AS cliente_correo
    FROM pedido p
    INNER JOIN clientes c ON p.id_cliente = c.idclientes
    ORDER BY p.id_pedido ASC
");
echo json_encode($stmt->fetchAll());
