import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { connectToDatabase } from "@/lib/db";
import { redirectToUrl } from "@/utils/server";
import { Messages } from "@/constants/messages";

export async function POST(req: Request) {
    const { name, email, password, status = true } = await req.json();

    if (!name || !email || !password) {
        return NextResponse.json(
            { message: Messages.requiredFields },
            { status: 400 }
        );
    }

    const pool = await connectToDatabase();
    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        await pool.query(
            "INSERT INTO public.users (name, email, password, status) VALUES ($1, $2, $3, $4) RETURNING *",
            [name, email, hashedPassword, status]
        );

        const redirectUrl =
            "/signin?messages=userSuccessRegister&severity=success";
        const message = Messages.userSuccessRegister;
        return redirectToUrl(redirectUrl, message);
    } catch (error) {
        const dbError = error as { code?: string; message?: string };

        if (dbError.code === "23505") {
            return NextResponse.json(
                { message: Messages.emailExists },
                { status: 400 }
            );
        }
        console.error(Messages.errorCreationUser, error);
        return NextResponse.json(
            { message: Messages.errorCreationUser },
            { status: 500 }
        );
    }
}
