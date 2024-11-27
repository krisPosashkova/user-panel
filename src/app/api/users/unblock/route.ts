import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { validateRequest } from "@/utils/server";
import { Messages } from "@/constants/messages";

export async function PATCH(request: Request) {
    const client = await connectToDatabase();

    try {
        const validationResponse = await validateRequest(client, request);
        if (validationResponse instanceof NextResponse)
            return validationResponse;

        const { userIds } = validationResponse;

        const placeholders = userIds
            .map((_, index) => `$${index + 1}`)
            .join(", ");
        const query = `
            UPDATE public.users 
            SET status = true, updated_at = now() 
            WHERE id IN (${placeholders}) 
            RETURNING *`;

        const result = await client.query(query, userIds);

        if (result.rowCount === 0) {
            return NextResponse.json(
                { message: Messages.notFoundUser },
                { status: 404 }
            );
        }

        return NextResponse.json(
            {
                message: Messages.successUnblockUser,
                users: result.rows,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error(Messages.errorUnblockUser, error);
        return NextResponse.json(
            { message: Messages.errorUnblockUser },
            { status: 500 }
        );
    }
}
