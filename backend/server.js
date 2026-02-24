const db = require('./config/db');
const express = require('express');
const cors = require('cors');

const app = express();
const session = require('express-session');

app.use(session({
  secret: 'mi_secreto_super_seguro',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false
  }
}));
app.use(cors({
    origin: 'http://localhost:4200',
    credentials: true
}));
app.use(express.json());


const authRoutes = require('./routes/auth.routes');

(async () => {
    try {
        const connection = await db.getConnection();
        console.log("Conectado a MySQL correctamente");
        connection.release();
    } catch (error) {
        console.error("Error conectando a MySQL:", error);
    }
})();

// Registrar rutas de autenticación
app.use('/api/auth', authRoutes);

app.listen(3000, () => {
    console.log('Servidor corriendo en puerto 3000');
});