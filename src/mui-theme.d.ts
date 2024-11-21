/* eslint-disable @typescript-eslint/no-unused-vars */
import { ThemeOptions } from "@mui/material/styles";

interface CustomTheme {
    opacity: number;
    order: {
        header?: number;
        footer?: number;
        modal?: number;
    };
    gradient?: string;
    spacer?: number;
    durations: {
        ms300?: number;
    };
}

declare module "@mui/material/styles" {
    interface Theme {
        custom: CustomTheme;
    }

    interface ThemeOptions {
        custom: CustomTheme;
    }
}
