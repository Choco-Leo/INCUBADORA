import pool from "../conf/dbConx.js";

const generarSQLTablaEventosTH = async () => {
    try {
      await pool.query(`
        DROP TABLE IF EXISTS EventsErrors;
        CREATE TABLE IF NOT EXISTS EventsErrors(
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            Encubando Text NOT NULL,
            fechError TIMESTAMP NOT NULL DEFAULT NOW(),
            EventType VARCHAR(20) NOT NULL,
            Temp NUMERIC(5,2),
            Hum NUMERIC(5,2),
            hum_min NUMERIC(6,2),
            hum_max NUMERIC(6,2),
            temp_min NUMERIC(6,2),
            temp_max NUMERIC(6,2)
        ); 
      `);
  
      console.log('✅ Migracion Exitosa');
    } catch (error) {
      console.error('❌ Error en Migracion:', error);
    }
  };
  
  generarSQLTablaEventosTH();