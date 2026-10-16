import pg from "pg";
import "dotenv/config";

export const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    // RDS requires an encrypted connection; local Postgres.app doesn't
    ssl: process.env.DB_SSL === "true" ? { rejectUnauthorized: false } : false,
});