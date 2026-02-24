const db = require('../config/db');
const bcrypt = require('bcrypt');

exports.login = async (req, res) => {
  try {
    const { usuario, password } = req.body;

    if (!usuario || !password) {
      return res.status(400).json({
        success: false,
        message: "Usuario y contraseña requeridos"
      });
    }

    // 1️⃣ Buscar usuario por registro
    const [rows] = await db.query(
      `SELECT u.id_usuario, u.nombre, u.correo, u.rol, u.password
       FROM usuario u
       JOIN alumno a ON u.id_usuario = a.id_usuario
       WHERE a.Registro = ? AND u.rol = 'Alumno'`,
      [usuario]
    );

    if (rows.length === 0) {
      return res.status(401).json({
        success: false,
        message: "Usuario no encontrado"
      });
    }

    const user = rows[0];

    // 2️⃣ Comparar password con bcrypt
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).json({
        success: false,
        message: "Contraseña incorrecta"
      });
    }

    // 3️⃣ Quitar password antes de enviar respuesta
    delete user.password;

    res.json({
      success: true,
      usuario: user
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error del servidor"
    });
  }
};

exports.CambioPassword = async (req, res) => {
    console.log('Datos recibidos:', req.body);
    const { usuario, nombre, password, semestre, nivel, id_carrera } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    if (!/^\d{8}$/.test(usuario)) {
        return res.json({
            success: false,
            message: 'Usuario inválido'
        });
    }
    try {
      const [existe] = await db.query(
        `SELECT Registro FROM alumno WHERE Registro = ?`,
        [usuario]
      );

      if (existe.length > 0) {
        return res.status(400).json({
          success: false,
          message: "El registro ya existe"
        });
      }
            const [result] = await db.query(
                `INSERT INTO usuario (nombre, password, rol, estado)
                 VALUES (?, ?, ?, ?)`,
                [nombre, hashedPassword, 'Alumno', 'Activo']
            );
    
            const idUsuario = result.insertId;
    
            await db.query(
                `INSERT INTO alumno
                 (Registro, Grado, NivelAca, Estatus_Academico, id_usuario, id_carrera)
                 VALUES (?, ?, ?, ?, ?, ?)`,
                [usuario, semestre, nivel, 'Regular', idUsuario, id_carrera]
            );
            res.json({ success: true });
        } catch (err) {
            console.error(err);
            res.status(500).json({ success: false, message: 'Error al crear alumno' });
        }
};

// Nuevo endpoint para obtener materias de un alumno en la pantalla principal de alumno
exports.obtenerMateriasAlumno = async (req, res) => {
  try {
    const { id_usuario } = req.params;

    console.log("ID USUARIO recibido:", id_usuario);

    const [alumno] = await db.query(
      `SELECT id_carrera, Grado 
       FROM alumno 
       WHERE id_usuario = ?`,
      [id_usuario]
    );

    if (alumno.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Alumno no encontrado"
      });
    }

    const idCarrera = alumno[0].id_carrera;
    const gradoAlumno = alumno[0].Grado;

    console.log("GRADO:", gradoAlumno);
    console.log("CARRERA:", idCarrera);

    const [basicas] = await db.query(
      `SELECT * FROM materia 
       WHERE nivel = ? 
       AND division = 'Ciencias Básicas'`,
      [gradoAlumno]
    );

    const [administrativas] = await db.query(
      `SELECT * FROM materia 
       WHERE nivel = ? 
       AND division = 'Ciencias Administrativas'`,
      [gradoAlumno]
    );

    const [carrera] = await db.query(
      `SELECT * FROM materia 
       WHERE nivel = ? 
       AND id_carrera = ?`,
      [gradoAlumno, idCarrera]
    );

    res.json({
      success: true,
      basicas,
      administrativas,
      carrera
    });
    console.log("Basicas:", basicas.length);
    console.log("Administrativas:", administrativas.length);
    console.log("Carrera:", carrera.length);

  } catch (error) {
    console.error("ERROR DETALLADO:", error);
    res.status(500).json({
      success: false,
      message: "Error del servidor"
    });
  }
};