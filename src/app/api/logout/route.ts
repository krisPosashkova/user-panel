import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { redirectToUrl } from "@/utils/server";

// To do: вынести в Messages, доработать

export async function POST(request: Request) {
    try {
        const cookieStore = await cookies();
        cookieStore.delete("token");

        const redirectUrl = "/signin";
        const message = "Пользователь вышел из системы";
        return redirectToUrl(redirectUrl, message);
    } catch (error) {
        console.error("Ошибка выхода:", error);
        return NextResponse.json(
            { message: "Не удалось выполнить выход" },
            { status: 500 }
        );
    }
}
