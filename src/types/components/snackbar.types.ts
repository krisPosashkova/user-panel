export interface CustomSnackbarProps {
    severity: "success" | "error" | "warning" | "info";
    message: string;
    open: boolean;
    onClose: () => void;
}
