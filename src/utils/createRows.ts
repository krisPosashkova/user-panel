import { User } from "@/types/api.types";

export const createRows = (
    usersData: Array<{
        id: number;
        name: string;
        email: string;
        last_login: string;
        status: boolean;
    }>
): User[] => usersData.map((user) => ({ ...user }));
