import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { validateRequest } from "@/utils/server";
import { Messages } from "@/constants/messages";

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
                { message: Messages.notFoundUser },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { message: Messages.succesDeleteUsers, users: result.rows },
            { status: 200 }
        );
    } catch (error) {
        console.error(Messages.errorDeleteUser, error);
        return NextResponse.json(
            { message: Messages.errorDeleteUser },
            { status: 500 }
        );
    }
}
