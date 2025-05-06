<?php
require_once 'database.php';
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nombres = isset($_POST['nombres']) ? trim($_POST['nombres']) : '';
    $correo = isset($_POST['correo']) ? trim($_POST['correo']) : '';
    $password_plano = isset($_POST['clave']) ? $_POST['clave'] : '';

    // Validar datos mínimos
    if (empty($nombres) || empty($correo) || empty($password_plano)) {
        echo json_encode(['success' => false, 'message' => 'Faltan datos obligatorios.']);
        exit;
    }

    // Cifrar la contraseña de forma segura
    $password_hash = password_hash($password_plano, PASSWORD_BCRYPT);

    try {
        // Preparar y ejecutar el INSERT
        $stmt = $conn->prepare("INSERT INTO usuarios (email, password, nombres) VALUES (?, ?, ?)");
        $stmt->execute([$correo, $password_hash, $nombres]);

        echo json_encode(['success' => true, 'message' => 'Registro exitoso.']);
    } catch (PDOException $e) {
        // Manejar errores de SQL, como duplicado de correo, etc.
        echo json_encode(['success' => false, 'message' => 'Error SQL: ' . $e->getMessage()]);
    }
}
?>
