import type { ThemeAvailableColors } from './styles/theme';
import Main from './components/Wrapper';
import Calculator from './components/Calculator';
import Home from './components/Home';
import Recibo from './components/Recibo';
import ProjectInfo from './components/ProjectInfo';
import Contrato from './components/Contrato';
import InfoContrato from './components/ContratoInfo';

export default function renderComponent(
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
