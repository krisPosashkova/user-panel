import { useState, useEffect } from "react";
import { User, Order } from "@/types/components/table.types";
import { getComparator } from "@/utils/sorting";
import { createRows } from "@/utils/createRows";

const useTable = () => {
    const [order, setOrder] = useState<Order>("asc");
    const [orderBy, setOrderBy] = useState<keyof User>("name");
    const [selected, setSelected] = useState<readonly number[]>([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [rows, setRows] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

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
                    throw new Error(`Ошибка: ${response.statusText}`);
                }

                const data: User[] = await response.json();
                console.log(data);
                setRows(createRows(data));
            } catch (err: unknown) {
                setError(
                    err instanceof Error
                        ? err.message
                        : "Неизвестная ошибка при загрузке данных."
                );
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

    const handleDeleteUsers = (selected: (string | number)[]) => {
        console.log("Deleting users:", selected);
    };

    const handleBlockUsers = (selected: (string | number)[]) => {
        console.log("Blocking users:", selected);
    };

    const handleUnblockUsers = (selected: (string | number)[]) => {
        console.log("Unblocking users:", selected);
    };

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
