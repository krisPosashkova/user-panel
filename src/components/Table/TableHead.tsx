"use client";

import React from "react";
import {
    TableHead,
    TableRow,
    TableCell,
    TableSortLabel,
    Checkbox,
    Box,
} from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import { TableProps, HeadCell } from "@/types/components/table.types";
import { User } from "@/types/api.types";

const headCells: readonly HeadCell[] = [
    { id: "name", numeric: false, disablePadding: true, label: "Name" },
    { id: "email", numeric: false, disablePadding: false, label: "Email" },
    {
        id: "last_login",
        numeric: false,
        disablePadding: false,
        label: "Last Login",
    },
    { id: "status", numeric: false, disablePadding: false, label: "Status" },
];

const UserTableHead = (props: TableProps) => {
    const {
        onSelectAllClick,
        order,
        orderBy,
        numSelected,
        rowCount,
        onRequestSort,
    } = props;
    const createSortHandler =
        (property: keyof User) => (event: React.MouseEvent<unknown>) => {
            onRequestSort(event, property);
        };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        color="primary"
                        indeterminate={
                            numSelected > 0 && numSelected < rowCount
                        }
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{
                            "aria-label": "select all users",
                        }}
                    />
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? "right" : "left"}
                        padding={headCell.disablePadding ? "none" : "normal"}
                        sortDirection={orderBy === headCell.id ? order : false}
                        sx={{
                            fontWeight: "700",
                        }}>
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : "asc"}
                            onClick={createSortHandler(headCell.id)}>
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === "desc"
                                        ? "sorted descending"
                                        : "sorted ascending"}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
};

export default UserTableHead;
