import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { Client } from "pg";
import jwt, { JwtPayload } from "jsonwebtoken";
import { Messages } from "@/constants/messages";

interface DecodedToken extends JwtPayload {
    userId: number;
    email: string;
}

export function redirectToUrl(url: string, message: string) {
    return NextResponse.json(
        { message },
        {
            status: 302,
            headers: {
                Location: url,
            },
        }
    );
}

export async function getTokenOrRedirect(): Promise<string | NextResponse> {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
        const redirectUrl = "/signin";
        const message = Messages.notAuthorized;
        return redirectToUrl(redirectUrl, message);
    }

    return token;
}

export function decodeToken(token: string): DecodedToken | null {
    try {
        const decoded = jwt.decode(token) as DecodedToken | null;

        if (!decoded) {
            return null;
        }

        return decoded;
    } catch (error) {
        console.error(Messages.errorDecoded, error);
        return null;
    }
}

export async function checkUserStatus(client: Client, userId: number) {
    const userRes = await client.query(
        "SELECT status FROM public.users WHERE id = $1",
        [userId]
    );

    if (userRes.rows.length === 0 || userRes.rows[0].status === false) {
        const redirectUrl = "/signin?messages=userBlock&severity=error";
        const message = Messages.notAuthorized;

        return redirectToUrl(redirectUrl, message);
    }

    return null;
}

export async function getDecodedToken(): Promise<DecodedToken | NextResponse> {
    const token = await getTokenOrRedirect();
    if (typeof token !== "string") return token;

    const decoded = decodeToken(token);
    if (!decoded) {
        return NextResponse.json(
            { message: Messages.errorDecoded },
            { status: 400 }
        );
    }

    return decoded;
}

export async function validateRequest(client: Client, request: Request) {
    const { userIds } = await request.json();
    if (!userIds || !Array.isArray(userIds) || userIds.length === 0) {
        return NextResponse.json(
            { message: "Не указаны ID пользователей" },
            { status: 400 }
        );
    }

    const decoded = await getDecodedToken();
    if (decoded instanceof NextResponse) return decoded;

    const userId = decoded.userId;

    const redirectResponse = await checkUserStatus(client, userId);
    if (redirectResponse) {
        return redirectResponse;
    }

    return userIds;
}
