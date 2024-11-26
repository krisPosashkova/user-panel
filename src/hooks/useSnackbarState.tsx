"use client";
import { useState, useCallback, useEffect } from "react";
import { CustomSnackbarProps } from "@/types/components/snackbar.types";
import { useSearchParams } from "next/navigation";
import { Messages, isValidMessagesKey } from "@/constants/messages";

export function useSnackbarState() {
    const searchParams = useSearchParams();
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

    useEffect(() => {
        const severity = searchParams.get(
            "severity"
        ) as CustomSnackbarProps["severity"];
        const messagesKey = searchParams.get("messages");

        if (severity && messagesKey && isValidMessagesKey(messagesKey)) {
            const message = Messages[messagesKey];

            if (typeof message === "string") {
                handleSnackbar(severity, message);
            } else {
                console.error("Expected string, got object or other type.");
            }
        }

        const newSearchParams = new URLSearchParams(searchParams.toString());
        newSearchParams.delete("severity");
        newSearchParams.delete("messages");

        const updatedUrl =
            newSearchParams.toString() === ""
                ? window.location.pathname // Если параметры пусты, оставляем только путь
                : `${window.location.pathname}?${newSearchParams.toString()}`;

        window.history.replaceState(null, "", updatedUrl);
    }, [searchParams, handleSnackbar]);

    return { snackbarState, handleSnackbar };
}
