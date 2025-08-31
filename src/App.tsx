import { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import {
  lightTheme,
  darkTheme,
  type ThemeAvailableColors,
} from './styles/theme';
import { GlobalStyle } from './styles/GlobalStyle';

import Header from './components/Header/index';
import Main from './components/Wrapper';
import Calculator from './components/Calculator';
import Home from './components/Home';
import Recibo from './components/Recibo';
import ProjectInfo from './components/ProjectInfo';
import Contrato from './components/Contrato';
import InfoContrato from './components/ContratoInfo';

function App() {
  const lsvar = 'current-app-theme';
  const getCurrentThemeFromLS = localStorage.getItem(lsvar) ?? 'dark';
  const [theme, setTheme] = useState(getCurrentThemeFromLS);
  const getCurrentComponentFromLS =
    localStorage.getItem('current-component') || 'home';
  const [currentComponent, setComponent] = useState(getCurrentComponentFromLS);

  function setCurrentComponent(component: string) {
    setComponent(component);
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
      <Header
        items={items}
        theme={defineTheme}
        toggleTheme={toggleTheme}
        currentTheme={theme}
      />
      {renderComponent(
        currentComponent,
        setCurrentComponent,
        defineTheme,
        localStorage,
      )}
    </ThemeProvider>
  );
}

export function renderComponent(
  type: string,
  fun: (s: string) => void,
  theme: ThemeAvailableColors,
  ls: any,
) {
  ls.setItem('current-component', type);
  switch (type) {
    case 'home':
      return <Home setCurrentComponent={fun}></Home>;

    case 'contrato':
      return (
        <Main theme={theme} snippets='flex:center'>
          <Contrato theme={theme} setCurrentComponent={fun}></Contrato>
        </Main>
      );

    case 'info-contrato':
      return (
        <Main theme={theme} snippets='flex:center'>
          <InfoContrato theme={theme} setCurrentComponent={fun}></InfoContrato>
        </Main>
      );

    case 'calculator':
      return (
        <Main theme={theme} snippets='flex:center'>
          <Calculator setCurrentComponent={fun} theme={theme}></Calculator>
        </Main>
      );

    case 'project-info':
      return (
        <Main theme={theme} snippets='flex:center'>
          <ProjectInfo theme={theme} setCurrentComponent={fun}></ProjectInfo>
        </Main>
      );

    case 'recibo':
      return (
        <Main theme={theme} snippets='flex:center'>
          <Recibo theme={theme} setCurrentComponent={fun}></Recibo>;
        </Main>
      );

    default:
      return <></>;
  }
}

export default App;

const items = [
  {
    text: '1',
    url: '/',
  },
  {
    text: '2',
    url: '/',
  },
  {
    text: '3',
    url: '/',
  },
  {
    text: '4',
    url: '/',
  },
  {
    text: '5',
    url: '/',
  },
  {
    text: '6',
    url: '/',
  },
  {
    text: '7',
    url: '/',
  },
];
