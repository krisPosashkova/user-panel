import { useState, useEffect } from "react";
import { Order } from "@/types/components/table.types";
import { ActionType } from "@/types/api.types";
import { User } from "@/types/api.types";
import { getComparator } from "@/utils/sorting";
import { createRows } from "@/utils/createRows";
import {
    handleBlockUsers as blockUser,
    handleDeleteUsers as deteteUser,
    handleUnblockUsers as unblockUser,
} from "@/utils/api";
import { useSnackbarState } from "@/hooks/useSnackbarState";
import { useProfileStore } from "@/store/profileStore";
const useTable = () => {
    const { profile } = useProfileStore();
    const currentUserId = profile?.id;
    const [order, setOrder] = useState<Order>("asc");
    const [orderBy, setOrderBy] = useState<keyof User>("name");
    const [selected, setSelected] = useState<readonly number[]>([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [rows, setRows] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [loadingUsers, setLoadingUsers] = useState<Record<number, boolean>>(
        {}
    );
    const { snackbarState, handleSnackbar } = useSnackbarState();
    const [showWarning, setShowWarning] = useState(false);
    const [isConfirm, setIsConfirm] = useState(false);
    const [actionType, setActionType] = useState<ActionType>();
    const [selectedForAction, setSelectedForAction] = useState<number[]>([]);

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch("/api/users", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`);
                }

                const data: User[] = await response.json();
                console.log(data);
                setRows(createRows(data));
            } catch (err: unknown) {
                setError(err instanceof Error ? err.message : "Unknown error");
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const handleRequestSort = (
        event: React.MouseEvent<unknown>,
        property: keyof User
    ) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };

    const handleSelectAllClick = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        if (event.target.checked) {
            const newSelected = rows.map((n) => n.id);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event: React.MouseEvent<unknown>, id: number) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected: readonly number[] = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1)
            );
        }
        setSelected(newSelected);
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const actionHandlers = {
        delete: async (selected: number[]) => {
            const response = await deteteUser(selected);
            if (response?.success) {
                setRows((prevRows) =>
                    prevRows.filter((row) => !selected.includes(row.id))
                );
            }
            return response;
        },
        block: async (selected: number[]) => {
            const response = await blockUser(selected);
            if (response?.success) {
                setRows((prevRows) =>
                    prevRows.map((row) =>
                        selected.includes(row.id)
                            ? { ...row, status: false }
                            : row
                    )
                );
            }
            return response;
        },
        unblock: async (selected: number[]) => {
            const response = await unblockUser(selected);
            if (response?.success) {
                setRows((prevRows) =>
                    prevRows.map((row) =>
                        selected.includes(row.id)
                            ? { ...row, status: true }
                            : row
                    )
                );
            }
            return response;
        },
    };

    const handleAction = async (selected: number[], action: ActionType) => {
        if (isSelected(currentUserId) && !isConfirm) {
            setActionType(action);
            setSelectedForAction(selected);
            setShowWarning(true);
            return;
        }

        setLoadingUsers((prevState) => ({
            ...prevState,
            ...selected.reduce(
                (acc, userId) => ({ ...acc, [userId]: true }),
                {}
            ),
        }));

        try {
            const response = await actionHandlers[action]?.(selected);

            if (response && response.success) {
                setSelected([]);
                handleSnackbar(
                    "success",
                    response.message || `${action} completed successfully`
                );
            } else {
                if (response?.redirect) return;

                handleSnackbar(
                    "error",
                    response?.message || `Error when ${action}`
                );
            }
        } catch (err) {
            handleSnackbar(
                "error",
                err instanceof Error ? err.message : "Unknown error"
            );
        } finally {
            setLoadingUsers((prevState) => ({
                ...prevState,
                ...selected.reduce(
                    (acc, userId) => ({ ...acc, [userId]: false }),
                    {}
                ),
            }));

            setIsConfirm(false);
        }
    };

    const handleDeleteUsers = (selected: number[]) =>
        handleAction(selected, "delete");
    const handleBlockUsers = (selected: number[]) =>
        handleAction(selected, "block");
    const handleUnblockUsers = (selected: number[]) =>
        handleAction(selected, "unblock");

    const confirmAction = () => {
        if (actionType && selectedForAction.length) {
            setIsConfirm(true);
            setShowWarning(false);
        }
    };

    useEffect(() => {
        if (isConfirm) {
            handleAction(selectedForAction, actionType as ActionType);
            setIsConfirm(false);
        }
    }, [isConfirm, actionType, selectedForAction]);

    const isSelected = (id: number | undefined) =>
        id !== undefined && selected.includes(id);

    const emptyRows =
        rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    const sortedRows = [...rows].sort(getComparator(order, orderBy));

    return {
        emptyRows,
        sortedRows,
        selected,
        order,
        orderBy,
        page,
        rows,
        rowsPerPage,
        loading,
        error,
        snackbarState,
        loadingUsers,
        showWarning,
        setShowWarning,
        isSelected,
        confirmAction,
        handleBlockUsers,
        handleChangePage,
        handleChangeRowsPerPage,
        handleClick,
        handleDeleteUsers,
        handleRequestSort,
        handleSelectAllClick,
        handleUnblockUsers,
    };
};

export default useTable;
