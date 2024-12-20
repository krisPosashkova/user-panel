import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { redirectToUrl } from "@/utils/server";
import { Messages } from "@/constants/messages";

export async function POST(request: Request) {
    try {
        const { email, password } = await request.json();

        if (!email || !password) {
            return NextResponse.json(
                { message: Messages.requiredEmailPassword },
                { status: 400 }
            );
        }

        const pool = await connectToDatabase();

        const res = await pool.query(
            "SELECT id, email, password, status FROM public.users WHERE email = $1",
            [email]
        );

        if (res.rows.length === 0) {
            return NextResponse.json(
                { message: Messages.notFoundEmailUser },
                { status: 400 }
            );
        }

        const user = res.rows[0];
        if (user.status === false) {
            return NextResponse.json(
                { message: Messages.userBlock },
                { status: 403 }
            );
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return NextResponse.json(
                { message: Messages.invalidPassword },
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

        const updateRes = await pool.query(
            "UPDATE public.users SET last_login = now() WHERE id = $1",
            [user.id]
        );

        if (updateRes.rowCount === 0) {
            console.warn(`Failed to update last_login for user ID ${user.id}.`);
        }

        const redirectUrl = "/?messages=userSuccessLogin&severity=success";
        const message = Messages.userSuccessLogin;
        return redirectToUrl(redirectUrl, message);
    } catch (error) {
        console.error(Messages.userErrorLogin, error);
        return NextResponse.json(
            { message: Messages.userErrorLogin },
            { status: 500 }
        );
    }
}
