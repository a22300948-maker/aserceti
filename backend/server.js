const db = require('./config/db');

(async () => {
    try {
        const connection = await db.getConnection();
        console.log("Conectado a MySQL correctamente");
        connection.release();
    } catch (error) {
        console.error("Error conectando a MySQL:", error);
    }
})();