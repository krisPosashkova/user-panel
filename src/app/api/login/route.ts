import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

// To do: вынести в Messages, доработать

export async function POST(request: Request) {
    try {
        const { email, password } = await request.json();

        if (!email || !password) {
            return NextResponse.json(
                { message: "Email и пароль обязательны" },
                { status: 400 }
            );
        }

        const dbClient = await connectToDatabase();

        const res = await dbClient.query(
            "SELECT id, email, password FROM public.users WHERE email = $1",
            [email]
        );

        if (res.rows.length === 0) {
            return NextResponse.json(
                { message: "Пользователь с таким email не найден" },
                { status: 400 }
            );
        }

        const user = res.rows[0];

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return NextResponse.json(
                { message: "Неверный пароль" },
                { status: 400 }
            );
        }

        const token = jwt.sign(
            { userId: user.id, email: user.email },
            process.env.JWT_SECRET_KEY!,
            { expiresIn: "1h" }
        );

        const cookieStore = await cookies();

        cookieStore.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60,
            path: "/",
        });

        return new NextResponse(
            JSON.stringify({
                message: "Authentication successful",
                redirect: "/",
            }),
            { status: 200 }
        );
    } catch (error) {
        console.error("Ошибка входа:", error);
        return NextResponse.json(
            { message: "Не удалось выполнить вход" },
            { status: 500 }
        );
    }
}
