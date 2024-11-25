import React from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { CustomSnackbarProps } from "@/types/components/snackbar.types";

function CustomSnackbars({
    severity,
    message,
    open,
    onClose,
}: CustomSnackbarProps) {
    const handleClose = () => {
        onClose();
    };

    return (
        <Snackbar
            open={open}
            autoHideDuration={3000}
            onClose={handleClose}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}>
            <Alert
                onClose={handleClose}
                severity={severity}
                variant="filled"
                sx={{ width: "100%" }}>
                {message}
            </Alert>
        </Snackbar>
    );
}

export default CustomSnackbars;
