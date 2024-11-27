import { Pool } from "pg";
import { Messages } from "@/constants/messages";

let pool: Pool | null = null;

export const connectToDatabase = async (): Promise<Pool> => {
    if (pool) return pool;

    pool = new Pool({
        host: process.env.DATABASE_HOST,
        port: Number(process.env.DATABASE_PORT),
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        ssl: {
            rejectUnauthorized: false,
        },
        max: 10,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 2000,
    });

    try {
        console.log(Messages.successConectsDB);
        return pool;
    } catch (error) {
        console.error(Messages.errorConnectDB, error);
        throw new Error(Messages.errorConnectDB);
    }
};

export const disconnectFromDatabase = async () => {
    if (pool) {
        await pool.end();
        pool = null;
        console.log("Pool end");
    }
};
