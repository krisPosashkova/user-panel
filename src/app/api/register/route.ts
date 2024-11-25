import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { connectToDatabase } from "@/lib/db";

// To do: вынести в Messages, доработать/попробовать другие подключения при необходимости

export async function POST(req: Request) {
    const { name, email, password, status = true } = await req.json();

    if (!name || !email || !password) {
        return NextResponse.json(
            { message: "Please provide all required fields." },
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
                { message: "Email already exists." },
                { status: 400 }
            );
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await client.query(
            "INSERT INTO public.users (name, email, password, status) VALUES ($1, $2, $3, $4) RETURNING *",
            [name, email, hashedPassword, status]
        );

        return NextResponse.json(
            {
                redirect: "/signin?successRegister=true",
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error creating user.", error);
        return NextResponse.json(
            { message: "Error creating user." },
            { status: 500 }
        );
    }
}
