import { drizzle } from "drizzle-orm/mysql2";
import * as mysql  from "mysql2/promise";

// Create the connection
const poolConnection = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
})

const db = drizzle(poolConnection)

export default db