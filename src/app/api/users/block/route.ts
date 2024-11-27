import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { validateRequest, redirectToUrl } from "@/utils/server";
import { Messages } from "@/constants/messages";

export async function PATCH(request: Request) {
    const client = await connectToDatabase();

    try {
        const validationResponse = await validateRequest(client, request);
        if (validationResponse instanceof NextResponse)
            return validationResponse;

        const { userId, userIds } = validationResponse;

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
                { message: Messages.notFoundUser },
                { status: 404 }
            );
        }

        if (userIds.includes(userId)) {
            const redirectUrl =
                "/signin?messages=warningBlockYourAccount&severity=warning";
            const message = Messages.notAuthorized;
            return redirectToUrl(redirectUrl, message);
        }

        return NextResponse.json(
            {
                message: Messages.successBlockUsers,
                users: result.rows,
            },
            { status: 200 }
        );
    } catch {
        console.error(Messages.errorBlockUsers);
        return NextResponse.json(
            { message: Messages.errorBlockUsers },
            { status: 500 }
        );
    }
}
