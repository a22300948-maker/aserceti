const db = require('../config/db');

exports.login = async (req, res) => {

    try {

        const { usuario, password } = req.body;

        const [rows] = await db.query(
            `SELECT u.id_usuario, u.nombre, u.correo, u.rol
             FROM usuario u
             JOIN alumno a ON u.id_usuario = a.id_usuario
             WHERE a.Registro = ? AND u.password = ? AND u.rol = 'Alumno'`,
            [usuario, password]
        );

        if (rows.length === 0) {
            return res.status(401).json({
                message: "Usuario no encontrado"
            });
        }

        // Aquí podrías validar password

        res.json({
            message: "Login correcto",
            usuario: rows[0]
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Error del servidor"
        });
    }
};