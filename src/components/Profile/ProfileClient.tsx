"use client";

import { Typography, Box, Skeleton } from "@mui/material";
import useProfile from "./useProfile";

export default function ProfileClient() {
    const { profile, loading, error } = useProfile();

    if (loading) {
        return (
            <Box>
                <Typography variant="h6">User Profile</Typography>
                <Skeleton variant="text" width="60%" height={20} />
                <Skeleton variant="text" width="60%" height={20} />
            </Box>
        );
    }

    if (error) {
        return <Typography>{error}</Typography>;
    }

    return (
        <Box>
            <Typography variant="h6">User Profile</Typography>
            {profile && (
                <>
                    <Typography>Name: {profile.name}</Typography>
                    <Typography>Email: {profile.email}</Typography>
                </>
            )}
        </Box>
    );
}
