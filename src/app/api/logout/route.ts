import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { redirectToUrl } from "@/utils/server";
import { Messages } from "@/constants/messages";

export async function POST() {
    try {
        const cookieStore = await cookies();
        cookieStore.delete("token");

        const redirectUrl = "/signin";
        const message = Messages.userLoggedOut;
        return redirectToUrl(redirectUrl, message);
    } catch (error) {
        console.error(Messages.userErrorLoggedOut, error);
        return NextResponse.json(
            { message: Messages.userErrorLoggedOut },
            { status: 500 }
        );
    }
}
