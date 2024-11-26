import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { redirectToUrl } from "@/utils/server";

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
            "SELECT id, email, password, status FROM public.users WHERE email = $1",
            [email]
        );

        if (res.rows.length === 0) {
            return NextResponse.json(
                { message: "Пользователь с таким email не найден" },
                { status: 400 }
            );
        }

        const user = res.rows[0];
        if (user.status === false) {
            return NextResponse.json(
                { message: "Ваш аккаунт заблокирован" },
                { status: 403 }
            );
        }

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

        const updateRes = await dbClient.query(
            "UPDATE public.users SET last_login = now() WHERE id = $1",
            [user.id]
        );

        if (updateRes.rowCount === 0) {
            console.warn(`Failed to update last_login for user ID ${user.id}.`);
        }

        const redirectUrl = "/?messages=userSuccessLogin&severity=success";
        const message = "Пользователь авторизован";
        return redirectToUrl(redirectUrl, message);
    } catch (error) {
        console.error("Ошибка входа:", error);
        return NextResponse.json(
            { message: "Не удалось выполнить вход" },
            { status: 500 }
        );
    }
}
