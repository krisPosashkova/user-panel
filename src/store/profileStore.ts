import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Profile } from "@/types/api.types";

interface ProfileState {
    profile: Profile | null;
    setProfile: (profile: Profile) => void;
    clearProfile: () => void;
}

export const useProfileStore = create<ProfileState>()(
    persist(
        (set) => ({
            profile: null,
            setProfile: (profile) => set({ profile }),
            clearProfile: () => set({ profile: null }),
        }),
        {
            name: "profile-storage",
        }
    )
);
