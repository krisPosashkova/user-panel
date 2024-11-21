import { Theme } from "@mui/material/styles";

export const gridStyles = {
    container: {
        height: "100%",
        overflow: "hidden",
    },
    background: (theme: Theme) => ({
        background: theme.custom.gradient,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
    }),
    content: (theme: Theme) => ({
        overflow: "auto",
        height: "100svh",
        [theme.breakpoints.between("xs", "md")]: {
            height: "calc(100svh - 70px)",
        },
    }),
};

export const containerStyles = {
    root: {
        height: "100%",
        display: "grid",
        gridTemplateRows: " 3fr 1fr",
    },
};

export const mainBoxStyles = {
    root: {
        display: "flex",
        alignItems: "center",
    },
};

export const typographyStyles = {
    root: {
        display: "flex",
        flexWrap: "wrap",
        gap: "clamp(0.2rem, 1.5vw + 0.5rem, 0.5rem)",
        alignItems: "end",
        padding: "2rem 0",
    },
};
