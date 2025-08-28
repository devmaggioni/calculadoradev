import { useState } from "react";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./styles/theme";
import { GlobalStyle } from "./styles/GlobalStyle";

import Header from "./components/Header";

function App() {
  const lsvar = "current-app-theme";
  const getCurrentThemeFromLS = localStorage.getItem(lsvar) ?? "dark";
  const [theme, setTheme] = useState(getCurrentThemeFromLS);

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === "light" ? "dark" : "light";
      localStorage.setItem(lsvar, newTheme);
      return newTheme;
    });
  };

  const defineTheme = theme === "light" ? lightTheme : darkTheme;

  return (
    <ThemeProvider theme={defineTheme}>
      <Header
        items={items}
        theme={defineTheme}
        toggleTheme={toggleTheme}
        currentTheme={theme}
      ></Header>
      <GlobalStyle theme={defineTheme} />
      <div style={{ padding: "2rem" }}>
        <h1>Hello Worlds</h1>
        <p>Este é um exemplo de tema com Styled Components.</p>
        <button onClick={toggleTheme}>Mudar Tema</button>
      </div>
    </ThemeProvider>
  );
}

export default App;

const items = [
  {
    text: "1",
    url: "/",
  },
  {
    text: "2",
    url: "/",
  },
  {
    text: "3",
    url: "/",
  },
  {
    text: "4",
    url: "/",
  },
  {
    text: "5",
    url: "/",
  },
  {
    text: "6",
    url: "/",
  },
  {
    text: "7",
    url: "/",
  },
];
