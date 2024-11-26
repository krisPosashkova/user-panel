export interface SignInData {
    email: string;
    password?: string;
}

export interface SignUpData extends SignInData {
    name: string;
}

export interface User extends SignUpData {
    id: number;
    last_login: string;
    status: boolean;
}

export type Order = "asc" | "desc";
export interface TableProps {
    numSelected: number;
    onRequestSort: (
        event: React.MouseEvent<unknown>,
        property: keyof User
    ) => void;
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    order: Order;
    orderBy: string;
    rowCount: number;
}

export interface HeadCell {
    disablePadding: boolean;
    id: keyof User;
    label: string;
    numeric: boolean;
}

export interface TableToolbarProps {
    numSelected: number;
    onDelete: () => void;
    onBlock: () => void;
    onUnblock: () => void;
}

export type ActionType = "delete" | "block" | "unblock";
