<?php
require_once "../config/headers.php";
require_once "../config/database.php";

$data = json_decode(file_get_contents("php://input"), true);

if (empty($data['id_viaje'])) {
    echo json_encode(["success" => false, "message" => "El viaje es obligatorio"]); exit;
}
if (empty($data['url'])) {
    echo json_encode(["success" => false, "message" => "La URL es obligatoria"]); exit;
}

$stmt = $pdo->prepare("INSERT INTO imagen (id_viaje, url, descripcion)
                        VALUES (:id_viaje, :url, :descripcion)");
$stmt->execute([
    ":id_viaje"    => $data['id_viaje'],
    ":url"         => $data['url'],
    ":descripcion" => $data['descripcion'] ?? null,
]);

echo json_encode(["success" => true, "message" => "Imagen creada correctamente"]);
