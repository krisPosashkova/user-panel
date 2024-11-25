"use client";
import { useState, useCallback, useEffect } from "react";
import { CustomSnackbarProps } from "@/types/components/snackbar.types";
import { useSearchParams } from "next/navigation";
import { Messages } from "@/constants/messages";

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
        if (searchParams.has("successRegister")) {
            handleSnackbar("success", Messages.userRegister.success);

            const newSearchParams = new URLSearchParams(
                searchParams.toString()
            );
            newSearchParams.delete("successRegister");
            window.history.replaceState(
                null,
                "",
                `${window.location.pathname}?${newSearchParams.toString()}`
            );
        }
    }, [searchParams, handleSnackbar]);

    return { snackbarState, handleSnackbar };
}
