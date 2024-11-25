export interface ApiResponseBase {
    message?: string;
    redirect?: string | undefined;
}

export interface SuccessResponse<T> {
    success: true;
    data: T;
    redirect?: string | undefined;
}

export interface ErrorResponse {
    success: false;
    message: string;
    redirect?: string | undefined;
}

export type ApiResponse<T> = SuccessResponse<T> | ErrorResponse;

export interface UserProfile {
    id: string;
    name: string;
    email: string;
    status: string;
}
