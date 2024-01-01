import { createTheme } from "@vanilla-extract/css";
export const [theme, vars] = createTheme({
    color: {
        primary: "#ff9900",
        secondary: "#009999",
        accent: "#ee0044",
        text: {
            medium: "#191919",
            small: "#ddd",
        },
    },
    shadow: {
        primary: "rgba(149, 157, 165, 0.2) 0px 8px 24px"
    },
    backgroundColor: {
        primary: "#fff"
    },
    space: {
        x05: "4px",
        x1: "8px",
        x2: "16px",
        x3: "24px",
        x4: "32px",
        x5: "40px",
        x6: "48px",
        x8: "64px",
        x16: "128px",
        x32: "256px",
        x64: "512px",
    },
    radius: {
        x05: "4px",
        x1: "8px",
        x2: "16px",
        x3: "24px",
        x4: "32px",
        x8: "64px",
        x16: "128px"
    },
    font: {
        primary: "ui-monospace, Menlo, Monaco, 'Cascadia Mono', 'Segoe UI Mono', 'Roboto Mono', 'Oxygen Mono', 'Ubuntu Monospace', 'Source Code Pro', 'Fira Mono', 'Droid Sans Mono', 'Courier New', monospace"
    },
    border: {
        primary: "1px solid #ededed",
        black: "1px solid #393939",
        gray: '1px solid #bdbdbd'
    },
    fontSize: {
        middle: "14px",
        title: {
            big: "48px",
            large: "40px",
            medium: "36px",
            small: "32px",
            tiny: "24px"
        },
        huge: "40px",
        big: "32px",
        large: "24px",
        regular: "16px",
        //middle: "16px",
        medium: "14px",
        small: "12px",
        tiny: "10px",
    }
})