import { useState, useEffect } from "react";
import { useProfileStore } from "@/store/profileStore";
import { Profile } from "@/types/api.types";

const useProfile = () => {
    const { profile: storedProfile, setProfile } = useProfileStore();
    const [profile, setLocalProfile] = useState<Profile | null>(storedProfile);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

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

    useEffect(() => {
        fetchProfile();
    }, []);

    return {
        loading,
        error,
        profile,
    };
};

export default useProfile;
