"use client";

import Header from "@/components/Header";
import { Box, Container, Typography } from "@mui/material";
import Link from "next/link";

export default function Home() {
    return (
        <div>
            <Header hasGradient={true} />
            <Container maxWidth="xl">
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "1rem",
                        mt: 3,
                    }}>
                    <Typography variant="h1" component="h1">
                        Grid Data Table
                    </Typography>
                    <Link href="/signin">Sign in</Link>
                    <Link href="/signup">Sign up</Link>
                </Box>
            </Container>
        </div>
    );
}
