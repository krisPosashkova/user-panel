"use client";
import { Box } from "@mui/material";
import Link from "next/link";
import styled from "styled-components";

export const CustomLink = styled(Link)(({ theme }) => ({
    color: theme.palette.primary.main,
    textDecoration: "transparent",
    transition: `text-decoration ${theme.custom.durations.ms300}s`,

    "&:hover": {
        textDecoration: "underline",
    },

    "&:focus-visible": {
        textDecoration: "underline",
        outline: "1px solid",
    },
}));

export const CustomHeader = styled(Box)(({ theme }) => ({
    position: "fixed",
    top: 0,
    left: 0,
    color: theme.palette.background.default,
    width: "100%",

    "&.is-gradient-sticky": {
        background: `${theme.custom.gradient}`,
        position: "sticky",
        zIndex: `${theme.custom.order.header}`,
    },

    [theme.breakpoints.between("xs", "md")]: {
        position: "sticky",
        background: `${theme.custom.gradient}`,
        zIndex: `${theme.custom.order.header}`,
    },
}));

export const CusomForm = styled.form(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(3),
    marginTop: theme.spacing(4),
    width: "100%",
    maxWidth: "600px",
}));
