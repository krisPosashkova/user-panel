import { Client } from "pg";

let client: Client | null = null;

// To do: вынести в Messages, доработать/попробовать другие подключения при необходимости

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
        console.log("Подключение к базе данных успешно!");
        return client;
    } catch (error) {
        console.error("Ошибка при подключении к базе данных:", error);
        throw new Error("Не удалось подключиться к базе данных");
    }
};

export const disconnectFromDatabase = async () => {
    if (client) {
        await client.end();
        client = null;
        console.log("Соединение с базой данных закрыто");
    }
};
