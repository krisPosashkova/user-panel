export interface ApiResponseBase {
    message: string;
    redirect?: boolean;
}

export interface SuccessResponse<T> {
    success: true;
    data: T;
    redirect?: boolean;
    message: string;
}

export interface ErrorResponse {
    success: false;
    message: string;
    redirect?: boolean;
}

export type ApiResponse<T> = SuccessResponse<T> | ErrorResponse;

export type ActionType = "delete" | "block" | "unblock";

export interface SignInData {
    email: string;
    password?: string;
}

export interface SignUpData extends SignInData {
    name: string;
}

export interface Profile extends SignUpData {
    isAuth: boolean;
    id: number;
}

export interface User extends SignUpData {
    id: number;
    last_login: string;
    status: boolean;
}
