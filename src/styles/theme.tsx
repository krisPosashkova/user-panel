import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
    palette: {
        background: {
            default: "#f5f5f5",
            paper: "#eeeeee",
        },
        text: {
            primary: "#202020",
            secondary: "#444444",
        },
        primary: {
            main: "#5356fcf0",
            light: "#8F8FFF",
            dark: "#5b5bb1",
        },
        secondary: {
            main: "#e782a5",
            light: "#ffb3c1",
            dark: "#b36b7e",
        },
        error: {
            main: "#ac0e0e",
        },
    },

    typography: {
        fontFamily: "var(--font-primary)",
        button: {
            fontSize: "clamp(0.875rem, 1.5vw + 0.5rem, 1.125rem)",
            fontWeight: 400,
            lineHeight: 1.2,
        },

        body1: {
            fontSize: "clamp(0.875rem, 1.5vw + 0.5rem, 1.125rem)",
            fontWeight: 400,
            lineHeight: 1.3,
        },

        h1: {
            fontSize: "clamp(1.5rem, 2vw + 1rem, 3.5rem)",
            fontWeight: 700,
            lineHeight: 1.3,
        },
        h2: {
            fontSize: "clamp(1.25rem, 1.5vw + 0.75rem, 2.5rem)",
            fontWeight: 600,
            lineHeight: 1.3,
        },
        h3: {
            fontSize: "clamp(1rem, 1.5vw + 0.75rem, 2rem)",
            fontWeight: 600,
            lineHeight: 1.3,
        },
        h4: {
            fontSize: "clamp(1rem, 1.5vw + 0.5rem, 1.5rem)",
            fontWeight: 600,
            lineHeight: 1.3,
        },

        h6: {
            fontFamily: "var(--font-secondary)",
            fontSize: "clamp(1rem, 1.5vw + 0.5rem, 1.5rem)",
            fontWeight: 600,
            lineHeight: 1.3,
        },
    },

    custom: {
        opacity: 0.7,
        gradient: "linear-gradient(21deg, #e782a5, #5356fcf0)",

        // z-index
        order: {
            header: 10,
        },

        spacer: 0.25,

        // in ms
        durations: {
            ms300: 0.3,
        },
    },
});
