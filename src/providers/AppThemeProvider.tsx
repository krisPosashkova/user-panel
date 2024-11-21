"use client";

import StyledComponentsRegistry from "@/lib/registry";
import GlobalStyle from "@/styles/global";
import { theme } from "@/styles/theme";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { ThemeProvider as StyledThemeProvider } from "styled-components";

export default function AppThemeProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <StyledComponentsRegistry>
            <MuiThemeProvider theme={theme}>
                <StyledThemeProvider theme={theme}>
                    <>
                        <GlobalStyle />

                        {children}
                    </>
                </StyledThemeProvider>
            </MuiThemeProvider>
        </StyledComponentsRegistry>
    );
}
