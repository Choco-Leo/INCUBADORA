import PG from "pg";
import { env } from "./env.js";

const { Pool } = PG;

export const pool = new Pool({

    user: env.PGUSER,
    host: env.PGHOST,
    database: env.PGDATABASE,
    password: env.PGPASSWORD,

})

export default pool;