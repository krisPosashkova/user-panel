// "use server";
import React from "react";
import { cookies } from "next/headers";
import { Typography, Box } from "@mui/material";

export default async function Profile() {
    const cookie = await cookies();
    const token = cookie.get("token")?.value;
    try {
        const profileFetch = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/profile`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                cache: "no-store",
            }
        );

        if (!profileFetch.ok) {
            throw new Error(
                `Ошибка при получении профиля: ${profileFetch.statusText}`
            );
        }

        const profile = await profileFetch.json();
        console.log(profile);

        return (
            <Box>
                <Typography variant="h6">User Profile</Typography>
                <Typography>Name: {profile.name}</Typography>
                <Typography>Email: {profile.email}</Typography>
                <Typography>
                    Status: {profile.status ? `Active` : `Block`}
                </Typography>
            </Box>
        );
    } catch (error) {
        console.error("Ошибка при загрузке профиля:", error);
        return <p>Не удалось загрузить профиль.</p>;
    }
}
