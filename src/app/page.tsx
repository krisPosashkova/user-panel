import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import UserTable from "@/components/Table";
import { Box, Container, Typography } from "@mui/material";
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
                    <Typography variant="h1" component="h1">
                        List of users
                    </Typography>
                    <UserTable />
                </Box>
            </Container>
        </div>
    );
}
