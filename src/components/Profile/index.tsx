import React from "react";
import { cookies } from "next/headers";
import ProfileDetails from "./ProfileDetails";
import { Messages } from "@/constants/messages";

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

        return <ProfileDetails profile={profile} />;
    } catch (error) {
        console.error(Messages.profile.error, error);
        return <p>{Messages?.profile?.error}</p>;
    }
}
