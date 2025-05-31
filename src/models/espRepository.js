import { pool } from "../conf/dbConx.js";

export const getInfError = async (req, res) => {
    try {
        const query = 'SELECT * FROM eventserrors ORDER BY fecherror DESC LIMIT 20';
        const result = await pool.query(query);

        return result.rows;

    }catch (error) {
        res.status(500).json({ error: 'Error al obtener la información de los errores' });
    }
}

export const insertEventError = async ({ Encubando, EventType, Temp, Hum, hum_min, hum_max, temp_min, temp_max }) =>  {
    try {
        const query = `
          INSERT INTO EventsErrors
          (Encubando, EventType, Temp, Hum, hum_min, hum_max, temp_min, temp_max)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
          RETURNING *;
        `;
        const values = [Encubando, EventType, Temp, Hum, hum_min, hum_max, temp_min, temp_max];
        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (error) {
        console.log('❌ Error Al Insertar Error:', error);
        throw error; // IMPORTANTE para que el catch del controlador lo capture
    }
}

