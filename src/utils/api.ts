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

        // console.log(response, "api");

        if (response.redirected) {
            const redirectUrl = response.url;
            if (redirectUrl) {
                window.location.href = redirectUrl;
            }

            return {
                success: false,
                redirect: true,
                message: "Redirect",
            };
        }

        const result: R = await response.json();

        if (response.ok) {
            return {
                success: true,
                data: result,
                message: result.message || "Операция выполнена успешно",
            };
        } else {
            return {
                success: false,
                message: result.message || "Что-то пошло не так",
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
    return apiRequest<SignUpData, { message: string; redirect?: boolean }>(
        "/api/register",
        "POST",
        data
    );
};

export const handleLogin = async (
    data: SignInData
): Promise<ApiResponse<{ message: string }>> => {
    return apiRequest<SignInData, { message: string; redirect?: boolean }>(
        "/api/login",
        "POST",
        data
    );
};

export const handleBlockUsers = async (selectedUsers: number[]) => {
    return apiRequest("/api/users/block", "PATCH", {
        userIds: selectedUsers,
    });
};

export const handleUnblockUsers = async (selectedUsers: number[]) => {
    return apiRequest("/api/users/unblock", "PATCH", {
        userIds: selectedUsers,
    });
};

export const handleDeleteUsers = async (selectedUsers: number[]) => {
    return apiRequest("/api/users/delete", "DELETE", {
        userIds: selectedUsers,
    });
};

export const handleLogout = async () => {
    return apiRequest("/api/logout", "POST");
};
