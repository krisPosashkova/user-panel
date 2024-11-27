"use client";
import { useState, useCallback, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CustomSnackbarProps } from "@/types/components/snackbar.types";
import { Messages, isValidMessagesKey } from "@/constants/messages";

export function useSnackbarState() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [snackbarState, setSnackbarState] = useState<CustomSnackbarProps>({
        severity: "info",
        message: "",
        open: false,
        onClose: () => setSnackbarState((prev) => ({ ...prev, open: false })),
    });

    const handleSnackbar = useCallback(
        (severity: CustomSnackbarProps["severity"], message: string) => {
            setSnackbarState({
                severity,
                message,
                open: true,
                onClose: () =>
                    setSnackbarState((prev) => ({ ...prev, open: false })),
            });
        },
        []
    );

    const updateParams = () => {
        const newSearchParams = new URLSearchParams(searchParams.toString());
        newSearchParams.delete("severity");
        newSearchParams.delete("messages");

        const updatedUrl =
            newSearchParams.toString() === ""
                ? window.location.pathname
                : `${window.location.pathname}?${newSearchParams.toString()}`;

        router.replace(updatedUrl);
    };

    useEffect(() => {
        const severity = searchParams.get(
            "severity"
        ) as CustomSnackbarProps["severity"];
        const messagesKey = searchParams.get("messages");

        if (severity && messagesKey && isValidMessagesKey(messagesKey)) {
            const message = Messages[messagesKey];
            if (typeof message === "string") {
                handleSnackbar(severity, message);
                updateParams();
            } else {
                console.error("Expected string, got object or other type.");
            }
        }
    }, [searchParams, handleSnackbar, router]);

    return { snackbarState, handleSnackbar };
}
