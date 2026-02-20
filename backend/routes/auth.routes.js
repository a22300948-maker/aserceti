const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Login simple
router.post('/login', async (req, res) => {
  const { usuario, password } = req.body;

  console.log('Intento de login con usuario:', usuario);

  if (!usuario || !password) {
    return res.status(400).json({
      success: false,
      message: 'Usuario y contraseña requeridos'
    });
  }

  try {
    console.log('Ejecutando consulta SQL con:', { usuario, password });

    const [results] = await db.query(
      `SELECT u.id_usuario, u.nombre, u.correo, u.rol
       FROM usuario u
       JOIN alumno a ON u.id_usuario = a.id_usuario
       WHERE a.Registro = ? AND u.password = ? AND u.rol = 'Alumno'`,
      [usuario, password]
    );

    console.log('✓ Consulta ejecutada exitosamente');
    console.log('Resultados encontrados:', results.length);

    if (results.length === 0) {
      return res.status(401).json({
        success: false,
        message: 'Usuario o contraseña incorrectos'
      });
    }

    console.log('Login exitoso para:', usuario);

    return res.json({
      success: true,
      usuario: results[0]
    });

  } catch (err) {
    console.error('Error en login:', err.message);
    console.error('Stack:', err.stack);

    return res.status(500).json({
      success: false,
      message: 'Error en el servidor',
      error: err.message
    });
  }
});

module.exports = router;