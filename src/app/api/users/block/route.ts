import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { validateRequest } from "@/utils/server";

export async function PATCH(request: Request) {
    const client = await connectToDatabase();

    try {
        const userIds = await validateRequest(client, request);
        if (userIds instanceof NextResponse) return userIds;

        const placeholders = userIds
            .map((_, index) => `$${index + 1}`)
            .join(", ");
        const query = `
            UPDATE public.users 
            SET status = false, updated_at = now() 
            WHERE id IN (${placeholders}) 
            RETURNING *`;

        const result = await client.query(query, userIds);

        if (result.rowCount === 0) {
            return NextResponse.json(
                { message: "Пользователи не найдены" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            {
                message: "Пользователи успешно заблокированы",
                users: result.rows,
            },
            { status: 200 }
        );
    } catch {
        console.error("Ошибка при блокировке пользователей:");
        return NextResponse.json(
            { message: "Ошибка при блокировке пользователей" },
            { status: 500 }
        );
    }
}
