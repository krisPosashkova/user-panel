import React from "react";
import Header from "@/components/Header";
import UserTable from "@/components/Table";
import { Box, Container, Typography, Divider } from "@mui/material";
import Profile from "@/components/Profile";

export default function Home() {
    return (
        <div>
            <Header hasGradient={true} />
            <Container maxWidth="xl">
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 6,
                        mt: 10,
                    }}>
                    <Profile />
                    <Divider component="div" role="presentation"></Divider>
                    <Typography variant="h6" component="h1">
                        List of users
                    </Typography>
                    <UserTable />
                </Box>
            </Container>
        </div>
    );
}
