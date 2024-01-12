type theme = {
    colorPrimary: string
    colorSecondary: string
    colorAccent: string
    backgroundColor: string
    backgroundColorHover: string
    backgroundColorLight: string
    backgroundColorLightHover: string
    border: string
    textColor: string
    textColorTitle: string
    textColorMini: string
    textColorLight: string
    headerShadow: string
    codeBackgroundColor: string
    codeInlineBackgroundColor: string
    codeDiffAddBackgroundColor: string
    codeDiffAddBackgroundColorLight: string
    codeDiffRemoveBackgroundColor: string
    codeDiffRemoveBackgroundColorLight: string
    mathColor: string
    menuTableColor: string
    menuCircleColor: string
    menuCircleColorLight: string
    //tagBackgroundColor: string
}
const light: theme = {
    colorPrimary: "#0070f3",
    colorSecondary: "#0070f3",
    colorAccent: "#0070f3",
    backgroundColor: "#fff",
    backgroundColorHover: "#eee",
    backgroundColorLight: "#f8f8f8",
    backgroundColorLightHover: "#f5f5f5",
    border: "0px solid #eee",
    textColor: "#222",
    textColorTitle: "#252525",
    textColorMini: "#444",
    textColorLight: "#444",
    headerShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
    
    //codeBackgroundColor: "#282c34",
    //codeInlineBackgroundColor: "#282c34",
    //codeDiffAddBackgroundColor: "#3fb9504d",
    //codeDiffAddBackgroundColorLight: "#2ea04326",
    //codeDiffRemoveBackgroundColor: "#f851494d",
    //codeDiffRemoveBackgroundColorLight: "#f8514926",
    codeBackgroundColor: "#fff",
    codeInlineBackgroundColor: "#282c34",
    codeDiffAddBackgroundColor: "#ccffd8",
    codeDiffAddBackgroundColorLight: "#e6ffec",
    codeDiffRemoveBackgroundColor: "#ffd7d5",
    codeDiffRemoveBackgroundColorLight: "#ffebe9",
    mathColor: "#222",
    menuTableColor: "#eee",
    menuCircleColor: "#0070f3",
    menuCircleColorLight: "#334559",
    //tagBackgroundColor: "#e2e8f0",
}
const dark: theme = {
    colorPrimary: "#0070f3",
    colorSecondary: "#0070f3",
    colorAccent: "#0070f3",
    backgroundColor: "#222",
    backgroundColorHover: "#333",
    backgroundColorLight: "#292929",
    backgroundColorLightHover: "#333",
    border: "1px solid #eee",
    textColorTitle: "#fafafa",
    textColorMini: "#eee",
    textColor: "#fff",
    textColorLight: "#eee",
    headerShadow: "rgb(1 4 8 / 75%) 0px 8px 24px",
    codeBackgroundColor: "#282c34",
    codeInlineBackgroundColor: "#282c34",
    codeDiffAddBackgroundColor: "#3fb9504d",
    codeDiffAddBackgroundColorLight: "#2ea04326",
    codeDiffRemoveBackgroundColor: "#f851494d",
    codeDiffRemoveBackgroundColorLight: "#f8514926",
    mathColor: "#eee",
    menuTableColor: "#345173",
    menuCircleColor: "#0070f3",
    menuCircleColorLight: "#004da3",
    //tagBackgroundColor: "#292929",
}

const CssVariables = {
    light: light,
    dark: dark,
}
export default CssVariables