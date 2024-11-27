"use client";

import { Typography, Box, Skeleton } from "@mui/material";
import { Profile } from "@/types/api.types";
import { useProfileStore } from "@/store/profileStore";
import { useEffect, useState } from "react";

export default function ProfileClient() {
    const { profile: storedProfile, setProfile } = useProfileStore();
    const [profile, setLocalProfile] = useState<Profile | null>(storedProfile);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!storedProfile) {
            const fetchProfile = async () => {
                try {
                    const response = await fetch(
                        `${process.env.NEXT_PUBLIC_BASE_URL}/api/profile`,
                        {
                            method: "GET",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            cache: "no-store",
                        }
                    );

                    if (!response.ok) {
                        throw new Error("Failed to fetch profile data");
                    }

                    const data = await response.json();
                    setLocalProfile(data);
                    setProfile(data);
                } catch (error) {
                    setError("Failed to load profile data.");
                    console.error(error);
                } finally {
                    setLoading(false);
                }
            };

            fetchProfile();
        } else {
            setLoading(false);
        }
    }, [storedProfile, setProfile]);

    if (loading) {
        return (
            <Box>
                <Typography variant="h6">User Profile</Typography>
                <Skeleton variant="text" width="60%" height={40} />
                <Skeleton variant="text" width="80%" height={40} />
                <Skeleton variant="rectangular" width="100%" height={150} />
            </Box>
        );
    }

    if (error) {
        return <Typography>{error}</Typography>;
    }

    return (
        <Box>
            <Typography variant="h6">User Profile</Typography>
            {profile ? (
                <>
                    <Typography>Name: {profile.name}</Typography>
                    <Typography>Email: {profile.email}</Typography>
                </>
            ) : (
                <Typography>No profile data available.</Typography>
            )}
        </Box>
    );
}
