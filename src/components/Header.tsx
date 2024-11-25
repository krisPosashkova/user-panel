import React from "react";
import { Typography, Container } from "@mui/material";
import Link from "next/link";
import { CustomHeader } from "@/styles/components";

interface HeaderProps {
    hasGradient?: boolean;
}

const Header: React.FC<HeaderProps> = ({ hasGradient = false }) => {
    return (
        <CustomHeader className={hasGradient ? "is-gradient-sticky" : ""}>
            <Container maxWidth="xl">
                <Typography
                    variant="h6"
                    component="div"
                    sx={{
                        padding: "1rem 0",
                        display: "flex",
                        alignItems: "center",
                        height: "70px",
                    }}>
                    <Link href={"/"}>USER PANEL</Link>
                    {/* {isAuthenticated && (
                        <Button
                            onClick={handleLogout}
                            sx={{
                                marginLeft: "auto",
                                color: "Background",
                                borderColor: "Background",
                            }}
                            variant="outlined">
                            Log out
                        </Button>
                    )} */}
                </Typography>
            </Container>
        </CustomHeader>
    );
};

export default Header;
