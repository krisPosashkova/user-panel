"use client";
import { Typography, Box } from "@mui/material";
import { Profile } from "@/types/components/table.types";
import { useProfileStore } from "@/store/profileStore";
import { useEffect } from "react";

interface ProfileClientProps {
    profile: Profile | null;
}

export default function ProfileClient({ profile }: ProfileClientProps) {
    const { profile: storedProfile, setProfile } = useProfileStore();

    useEffect(() => {
        if (profile && !storedProfile) {
            setProfile(profile);
        }
    }, [profile, storedProfile, setProfile]);

    return (
        <Box>
            <Typography variant="h6">User Profile</Typography>
            <Typography>Name: {profile?.name}</Typography>
            <Typography>Email: {profile?.email}</Typography>
        </Box>
    );
}
