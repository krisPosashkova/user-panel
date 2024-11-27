import { NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import { connectToDatabase } from "@/lib/db";
import { Messages } from "@/constants/messages";
import { getTokenOrRedirect } from "@/utils/server";

export async function GET() {
    try {
        const token = await getTokenOrRedirect();
        if (typeof token !== "string") return token;

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET_KEY!
        ) as JwtPayload;

        if (!decoded || typeof decoded !== "object" || !decoded.email) {
            return NextResponse.json(
                { message: Messages.invalidToken },
                { status: 401 }
            );
        }

        const dbClient = await connectToDatabase();
        const res = await dbClient.query(
            "SELECT id, name, email FROM public.users WHERE email = $1",
            [decoded.email]
        );

        if (res.rows.length === 0) {
            return NextResponse.json(
                { message: Messages.notFoundUser },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { ...res.rows[0], isAuth: true },
            { status: 200 }
        );
    } catch (error) {
        console.error(Messages.errorServer, error);
        return NextResponse.json(
            { message: Messages.errorServer },
            { status: 500 }
        );
    }
}
