import { NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import { connectToDatabase } from "@/lib/db";
import { headers } from "next/headers";

// To do: вынести в Messages, доработать

export async function GET() {
    try {
        const headersValue = await headers();
        const authorizationHeader = headersValue.get("Authorization");
        const token = authorizationHeader?.split("Bearer ")[1];

        if (!token) {
            return NextResponse.json(
                { message: "Не авторизован" },
                { status: 401 }
            );
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET_KEY!
        ) as JwtPayload;

        if (!decoded || typeof decoded !== "object" || !decoded.email) {
            return NextResponse.json(
                { message: "Недействительный токен" },
                { status: 401 }
            );
        }

        const dbClient = await connectToDatabase();
        const res = await dbClient.query(
            "SELECT id, name, email, status FROM public.users WHERE email = $1",
            [decoded.email]
        );

        if (res.rows.length === 0) {
            return NextResponse.json(
                { message: "Пользователь не найден" },
                { status: 404 }
            );
        }

        return NextResponse.json(res.rows[0], { status: 200 });
    } catch (error) {
        console.error("Ошибка:", error);
        return NextResponse.json(
            { message: "Ошибка сервера" },
            { status: 500 }
        );
    }
}
