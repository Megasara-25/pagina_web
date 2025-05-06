
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const db = new sqlite3.Database('./database/eco.db');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(session({
    secret: 'clave_secreta_segura',
    resave: false,
    saveUninitialized: false
}));

// Registro de usuario
app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    const hashed = await bcrypt.hash(password, 10);
    db.run('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, hashed], function(err) {
        if (err) return res.status(500).send('Error al registrar');
        res.redirect('/login.html');
    });
});

// Inicio de sesión
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    db.get('SELECT * FROM users WHERE email = ?', [email], async (err, user) => {
        if (err || !user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).send('Credenciales inválidas');
        }
        req.session.userId = user.id;
        res.redirect('/dashboard.html');
    });
});

// Envío de mensaje
app.post('/send-message', (req, res) => {
    const { to, content } = req.body;
    const from = req.session.userId;
    db.run('INSERT INTO messages (sender_id, receiver_id, content) VALUES (?, ?, ?)', [from, to, content], function(err) {
        if (err) return res.status(500).send('Error enviando mensaje');
        res.send('Mensaje enviado');
    });
});

// Registrar reciclaje
app.post('/recycle', (req, res) => {
    const { material, quantity } = req.body;
    const userId = req.session.userId;
    const points = quantity * 10;
    db.run('INSERT INTO recycling (user_id, material, quantity, points) VALUES (?, ?, ?, ?)', [userId, material, quantity, points], function(err) {
        if (err) return res.status(500).send('Error registrando reciclaje');
        res.send('Reciclaje registrado');
    });
});

// Consultar puntos
app.get('/points', (req, res) => {
    const userId = req.session.userId;
    db.get('SELECT SUM(points) as total FROM recycling WHERE user_id = ?', [userId], (err, row) => {
        if (err) return res.status(500).send('Error consultando puntos');
        res.json({ points: row.total || 0 });
    });
});

app.listen(3000, () => console.log('Servidor activo en http://localhost:3000'));
