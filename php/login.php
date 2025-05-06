<?php
session_start();
header('Content-Type: application/json');

// Incluir archivo de conexión
require_once 'database.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = $_POST['email'] ?? '';
    $password = $_POST['password'] ?? '';

    if (empty($email) || empty($password)) {
        echo json_encode(['success' => false, 'message' => 'Por favor, completa todos los campos.']);
        exit;
    }

    try {
        // Preparar la consulta incluyendo el campo "nombres"
        $stmt = $conn->prepare("SELECT id, email, password, nombres FROM usuarios WHERE email = :email");
        $stmt->bindParam(':email', $email, PDO::PARAM_STR);
        $stmt->execute();
        $usuario = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($usuario && password_verify($password, $usuario['password'])) {
            // Autenticación exitosa
            $_SESSION['user_id'] = $usuario['id'];
            $_SESSION['email'] = $usuario['email'];

            echo json_encode([
                'success' => true,
                'message' => 'Inicio de sesión exitoso.',
                'nombre' => $usuario['nombres'] // Enviar el nombre al frontend
            ]);
        } else {
            echo json_encode(['success' => false, 'message' => 'Correo o contraseña incorrectos.']);
        }
    } catch (PDOException $e) {
        echo json_encode(['success' => false, 'message' => 'Error: ' . $e->getMessage()]);
    }
}
?>
