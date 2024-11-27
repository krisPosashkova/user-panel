// "use client";
import React from "react";
import Header from "@/components/Header";
import UserTable from "@/components/Table";
import { Box, Container, Typography, Divider } from "@mui/material";
import { Suspense } from "react";
import ProfileClient from "@/components/Profile/ProfileClient";

export default async function Home() {
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
                    <Suspense>
                        <ProfileClient />
                        <Divider component="div" role="presentation"></Divider>
                        <Typography variant="h6" component="h1">
                            List of users
                        </Typography>
                        <UserTable />
                    </Suspense>
                </Box>
            </Container>
        </div>
    );
}
