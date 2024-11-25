"use client";

import React from "react";
import {
    Toolbar,
    Typography,
    IconButton,
    Tooltip,
    Button,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import BlockIcon from "@mui/icons-material/Block";
import LockOpenIcon from "@mui/icons-material/LockOpen";

import { TableToolbarProps } from "@/types/components/table.types";

const UserTableToolbar = (props: TableToolbarProps) => {
    const { numSelected, onBlock, onUnblock, onDelete } = props;

    return (
        <Toolbar
            sx={(theme) => ({
                p: 1,
                [theme.breakpoints.between("xs", "md")]: {
                    flexWrap: "wrap",
                    gap: 1,
                },
                ...(numSelected > 0 && {
                    bgcolor: alpha(
                        theme.palette.primary.main,
                        theme.palette.action.activatedOpacity
                    ),
                }),
            })}>
            {numSelected > 0 && (
                <Typography
                    sx={{ flex: "1 1 100%" }}
                    color="inherit"
                    variant="body1"
                    component="div">
                    {numSelected} selected
                </Typography>
            )}
            {numSelected > 0 && (
                <>
                    <Tooltip title="Block">
                        <Button
                            type="button"
                            variant="outlined"
                            sx={(theme) => ({
                                textTransform: "none",
                                gap: "0.25rem",
                                mr: 1,
                                [theme.breakpoints.between("xs", "md")]: {
                                    minWidth: "80px",
                                },
                            })}
                            onClick={onBlock}>
                            <BlockIcon /> Block
                        </Button>
                    </Tooltip>
                    <Tooltip title="Unblock">
                        <IconButton onClick={onUnblock}>
                            <LockOpenIcon />
                        </IconButton>
                    </Tooltip>

                    <Tooltip title="Delete">
                        <IconButton onClick={onDelete}>
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                </>
            )}
        </Toolbar>
    );
};

export default UserTableToolbar;
