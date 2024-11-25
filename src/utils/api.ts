import { SignUpData, SignInData } from "@/types/components/table.types";
import { ApiResponse, ApiResponseBase } from "@/types/api.types";

export const apiRequest = async <T, R extends ApiResponseBase>(
    url: string,
    method: string,
    data?: T
): Promise<ApiResponse<R>> => {
    try {
        const response = await fetch(url, {
            method,
            headers: {
                "Content-Type": "application/json",
            },
            body: data ? JSON.stringify(data) : undefined,
        });

        const result: R = await response.json();

        if (response.ok) {
            return {
                success: true,
                data: result,
                ...(result.redirect ? { redirect: result.redirect } : {}),
            };
        } else {
            return {
                success: false,
                message: result.message || "Что-то пошло не так",
                ...(result.redirect ? { redirect: result.redirect } : {}),
            };
        }
    } catch (error) {
        console.error("Ошибка при отправке данных:", error);
        return { success: false, message: "Ошибка сервера" };
    }
};

export const handleRegister = async (
    data: SignUpData
): Promise<ApiResponse<{ message: string }>> => {
    return apiRequest<
        SignUpData,
        { message: string; redirect?: string | undefined }
    >("/api/register", "POST", data);
};
export const handleLogin = async (
    data: SignInData
): Promise<ApiResponse<{ message: string }>> => {
    return apiRequest<
        SignInData,
        { message: string; redirect?: string | undefined }
    >("/api/login", "POST", data);
};
