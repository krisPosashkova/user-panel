import { NextResponse } from "next/server";
import { redirectToUrl, deleteToken } from "@/utils/server";
import { Messages } from "@/constants/messages";

export async function POST() {
    try {
        deleteToken();
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
