import { createGlobalStyle } from "styled-components";
import "normalize.css";
import "modern-css-reset";

export default createGlobalStyle`
    *, *::before, *::after {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    html,
    body {
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
        overflow: hidden;
    }

    body {
        overflow-y: auto;
        background-color: ${({ theme }) => theme.palette.background.default};
        font-family: var(--font-primary), sans-serif;
        font-size: clamp(1rem, 1.5vw + 0.5rem, 1.5rem);
        font-weight: 400;
        line-height: 1.2;
        color: ${({ theme }) => theme.palette.text.primary}; 
    }

    ul,
    ol {
        list-style-type: none;
        padding-left: 0;
        margin: 0;
    }

    button {
        background-color: transparent;
        border: none;
        user-select: none;
    }

    a {
        text-decoration: none;
        color: inherit;
    }
`;
