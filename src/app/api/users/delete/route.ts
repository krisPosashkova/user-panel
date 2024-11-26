import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { validateRequest } from "@/utils/server";

export async function DELETE(request: Request) {
    const client = await connectToDatabase();

    try {
        const userIds = await validateRequest(client, request);
        if (userIds instanceof NextResponse) return userIds;

        const result = await client.query(
            "DELETE FROM public.users WHERE id = ANY($1) RETURNING *",
            [userIds]
        );

        if (result.rowCount === 0) {
            return NextResponse.json(
                { message: "Пользователи не найдены" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { message: "Пользователи удалены", users: result.rows },
            { status: 200 }
        );
    } catch (error) {
        console.error("Ошибка при удалении пользователей:", error);
        return NextResponse.json(
            { message: "Ошибка при удалении пользователей" },
            { status: 500 }
        );
    }
}
