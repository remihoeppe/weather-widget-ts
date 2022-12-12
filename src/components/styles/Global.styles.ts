import { createGlobalStyle } from "styled-components";
import { theme } from "./Theme";

export type ThemeProp = {
    theme: typeof theme;
};

const GlobalStyle = createGlobalStyle<ThemeProp>`
  * {
    margin: 0;
    padding: 0;
  }

  body {
    background: ${({ theme }) => theme.colors.body};
    font-family: sans-serif;
    font-size: 1.5em;
  }

`;

export default GlobalStyle;
