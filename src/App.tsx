import { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './styles/theme';
import { GlobalStyle } from './styles/GlobalStyle';

import Header from './components/Header/index';
import rcom from './renderComponent';
import ChangeDefaultValues from './components/ChangeDefaultValues';
export const renderComponent = rcom;

// Import React Router
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  const lsvar = 'current-app-theme';
  const getCurrentThemeFromLS = localStorage.getItem(lsvar) ?? 'dark';
  const [theme, setTheme] = useState(getCurrentThemeFromLS);
  const getCurrentComponentFromLS =
    localStorage.getItem('current-component') || 'home';
  const [currentComponent, setComponent] = useState(getCurrentComponentFromLS);

  function setCurrentComponent(component: string) {
    setComponent(component);
    window.scrollTo({
      top: 0, // posição do topo
      behavior: 'smooth', // animação suave
    });
  }

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light';
      localStorage.setItem(lsvar, newTheme);
      return newTheme;
    });
  };

  const defineTheme = theme === 'light' ? lightTheme : darkTheme;

  return (
    <ThemeProvider theme={defineTheme}>
      <GlobalStyle theme={defineTheme} />
      <Router>
        <Header
          setCurrentComponent={setCurrentComponent}
          items={items}
          theme={defineTheme}
          toggleTheme={toggleTheme}
          currentTheme={theme}
        />
        <Routes>
          {/* Rota principal */}
          <Route
            path='/'
            element={renderComponent(
              currentComponent,
              setCurrentComponent,
              defineTheme,
              localStorage,
            )}
          />

          {/* Rota config */}
          <Route
            path='/config'
            element={<ChangeDefaultValues theme={defineTheme} />}
          />

          {/* Rota 404 */}
          <Route path='*' element={<h1>Not Found</h1>} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;

const items = [
  {
    text: 'HOME',
    url: '/',
  },
  {
    text: 'config',
    url: '/config',
  },
];
