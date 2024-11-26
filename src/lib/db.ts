import { Messages } from "@/constants/messages";
import { Client } from "pg";

let client: Client | null = null;

export const connectToDatabase = async (): Promise<Client> => {
    if (client) return client;

    client = new Client({
        host: process.env.DATABASE_HOST,
        port: Number(process.env.DATABASE_PORT),
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        ssl: {
            rejectUnauthorized: false,
        },
    });

    try {
        await client.connect();
        console.log(Messages.successConectsDB);
        return client;
    } catch (error) {
        console.error(Messages.errorConnectDB, error);
        throw new Error(Messages.errorConnectDB);
    }
};

export const disconnectFromDatabase = async () => {
    if (client) {
        await client.end();
        client = null;
        console.log("Соединение с базой данных закрыто");
    }
};
