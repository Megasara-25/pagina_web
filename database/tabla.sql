create database ecocycle_db;

use ecocycle_db;

-- Tabla de usuarios
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    nombre VARCHAR(100),
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    puntos INT DEFAULT 0,
    nivel VARCHAR(50) DEFAULT 'Tortuga'
);

-- Tabla de mensajes de contacto
CREATE TABLE mensajes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    mensaje TEXT NOT NULL,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    estado VARCHAR(20) DEFAULT 'pendiente'
);

-- Tabla de puntos de reciclaje
CREATE TABLE puntos_reciclaje (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT,
    material VARCHAR(50) NOT NULL,
    cantidad FLOAT NOT NULL,
    puntos_ganados INT NOT NULL,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

