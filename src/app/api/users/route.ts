import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { Messages } from "@/constants/messages";

export async function GET() {
    const client = await connectToDatabase();

    try {
        const { rows } = await client.query("SELECT * FROM public.users");
        console.log(rows);
        return NextResponse.json(rows, { status: 200 });
    } catch (error) {
        console.error(Messages.errorGetListUsers, error);
        return NextResponse.json(
            { message: Messages.errorGetListUsers },
            { status: 500 }
        );
    }
}
