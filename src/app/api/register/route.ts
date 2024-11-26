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

    const client = await connectToDatabase();
    try {
        const { rows: existingUser } = await client.query(
            "SELECT * FROM public.users WHERE email = $1",
            [email]
        );

        if (existingUser.length > 0) {
            return NextResponse.json(
                { message: Messages.emailExists },
                { status: 400 }
            );
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await client.query(
            "INSERT INTO public.users (name, email, password, status) VALUES ($1, $2, $3, $4) RETURNING *",
            [name, email, hashedPassword, status]
        );

        const redirectUrl =
            "/signin?messages=userSuccessRegister&severity=success";
        const message = Messages.userSuccessRegister;
        return redirectToUrl(redirectUrl, message);
    } catch (error) {
        console.error(Messages.errorCreationUser, error);
        return NextResponse.json(
            { message: Messages.errorCreationUser },
            { status: 500 }
        );
    }
}
