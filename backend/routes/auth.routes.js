const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');


// Rutas
router.post('/login', authController.login);
router.post('/CambioPassword', authController.CambioPassword);
router.get('/materias/:id_usuario', authController.obtenerMateriasAlumno);


module.exports = router;