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

export interface UserProfile {
    id: string;
    name: string;
    email: string;
    status: string;
}
