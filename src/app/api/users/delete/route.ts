import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { validateRequest, redirectToUrl, deleteToken } from "@/utils/server";
import { Messages } from "@/constants/messages";

export async function DELETE(request: Request) {
    const pool = await connectToDatabase();

    try {
        const validationResponse = await validateRequest(pool, request);
        if (validationResponse instanceof NextResponse)
            return validationResponse;

        const { userId, userIds } = validationResponse;

        const result = await pool.query(
            "DELETE FROM public.users WHERE id = ANY($1) RETURNING *",
            [userIds]
        );

        if (result.rowCount === 0) {
            return NextResponse.json(
                { message: Messages.notFoundUser },
                { status: 404 }
            );
        }

        if (userIds.includes(userId)) {
            deleteToken();
            const redirectUrl =
                "/signup?messages=infoDeleteYourAccount&severity=info";
            const message = Messages.notAuthorized;
            return redirectToUrl(redirectUrl, message);
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
