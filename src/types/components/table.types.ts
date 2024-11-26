import { User } from "../api.types";
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
