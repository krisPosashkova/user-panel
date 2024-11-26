import { Typography, Box } from "@mui/material";
import { SignUpData } from "@/types/components/table.types";

interface ProfileClientProps {
    profile: SignUpData | null;
}

export default function ProfileClient({ profile }: ProfileClientProps) {
    return (
        <Box>
            <Typography variant="h6">User Profile</Typography>
            <Typography>Name: {profile?.name}</Typography>
            <Typography>Email: {profile?.email}</Typography>
        </Box>
    );
}
