import * as z from "zod";

export const signInFields = [
    {
        name: "email",
        label: "Email",
        type: "email",
        validation: z.string().min(1, "Email is a required field"),
    },
    {
        name: "password",
        label: "Password",
        type: "password",
        validation: z.string().min(1, "Password is a required field"),
    },
];

export const signUpFields = [
    {
        name: "name",
        label: "Name",
        type: "text",
        validation: z.string().min(2, "At least 2 characters"),
    },
    {
        name: "email",
        label: "Email",
        type: "email",
        validation: z.string().email("Invalid email address"),
    },
    {
        name: "password",
        label: "Password",
        type: "password",
        validation: z.string().min(6, "Password must be at least 6 characters"),
    },
];
