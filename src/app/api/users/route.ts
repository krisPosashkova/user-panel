import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";

// To do: вынести в Messages, доработать/попробовать другие подключения при необходимости

export async function GET() {
    const client = await connectToDatabase();

    try {
        const { rows } = await client.query("SELECT * FROM public.users");
        console.log(rows);
        return NextResponse.json(rows, { status: 200 });
    } catch (error) {
        console.error("Ошибка при получении пользователей:", error);
        return NextResponse.json(
            { message: "Ошибка при получении пользователей" },
            { status: 500 }
        );
    }
}
