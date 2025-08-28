import { createGlobalStyle } from "styled-components";
import type { ThemeAvailableColors } from "./theme";

export const GlobalStyle = createGlobalStyle<{ theme: ThemeAvailableColors }>`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: ${(props) => props.theme.scrollbar};
  border-radius: 10px;
}


  body {
    position: relative;
    width: 100%;
    min-height: 100vh;
    font-family: 'Arial', sans-serif;
    background-color: rgba(0,0,0,.3);
    color: white;
    //transition: color, background-color .4s ease-in;
  }

  button {
    cursor: pointer;
    font-family: inherit;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    transition: all 0.3s ease;
  }

  ul, li, ol {
    all:unset;
  }
`;
