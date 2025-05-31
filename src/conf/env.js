import dotenv from "dotenv";
dotenv.config();

export  const env = {
    PORT: process.env.PORT,
    PGUSER: process.env.PGUSER,
    PGPASSWORD: process.env.PGPASSWORD,
    PGHOST: process.env.PGHOST,
    PGPORT: process.env.PGPORT,
    PGDATABASE: process.env.PGDATABASE,
}

export default env;