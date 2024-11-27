import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    DialogContentText,
    Button,
} from "@mui/material";

interface CustomDialogProps {
    showWarning: boolean;
    title: string;
    content: string;
    setShowWarning: (show: boolean) => void;
    confirmAction: () => void;
}

export default function CustomDialog({
    showWarning,
    title,
    content,
    setShowWarning,
    confirmAction,
}: CustomDialogProps) {
    return (
        <Dialog open={showWarning} onClose={() => setShowWarning(false)}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <DialogContentText>{content}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setShowWarning(false)} color="secondary">
                    Cancel
                </Button>
                <Button onClick={confirmAction} color="primary">
                    Proceed
                </Button>
            </DialogActions>
        </Dialog>
    );
}
