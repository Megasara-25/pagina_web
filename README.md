# EcoCycle - Backend Funcional

Este backend fue creado para la plataforma EcoCycle basado en los requerimientos funcionales extraídos del documento técnico. Incluye:

- Registro e inicio de sesión
- Sistema de mensajería interna
- Registro de reciclaje y asignación de puntos
- Roles de usuario: Regular, Comercio, Reciclador

## ¿Cómo ejecutar?

1. Instalar dependencias:
```bash
npm install
```

2. Iniciar servidor:
```bash
node server.js
```

3. Accede en el navegador a:
```
http://localhost:3000
```

## Rutas disponibles

- POST `/register`
- POST `/login`
- POST `/send-message`
- POST `/recycle`
- GET  `/points`

Incluye sesiones para control de acceso.
