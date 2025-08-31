import type { ThemeAvailableColors } from './styles/theme';
import Main from './components/Wrapper';
import Calculator from './components/HoursForm';
import Home from './components/Home';
import Recibo from './components/ReceiptPDF';
import ProjectInfo from './components/ProjectForm';
import Contrato from './components/ContractPDF';
import InfoContrato from './components/ContractForm';
import { FaArrowCircleLeft } from 'react-icons/fa';

function BackButton(props: {
  setCurrentComponent: (s: string) => void;
  to: string;
}) {
  return (
    <button
      className='back-button'
      onClick={() => props.setCurrentComponent(props.to)}>
      <FaArrowCircleLeft className='icon' /> voltar
    </button>
  );
}

export default function renderComponent(
  type: string,
  setCurrentComponent: (s: string) => void,
  theme: ThemeAvailableColors,
  ls: any,
) {
  ls.setItem('current-component', type);
  switch (type) {
    case 'home':
      return (
        <Home theme={theme} setCurrentComponent={setCurrentComponent}></Home>
      );

    case 'ContractPDF':
      return (
        <>
          <BackButton
            setCurrentComponent={setCurrentComponent}
            to={'ContractForm'}
          />
          <Main theme={theme} snippets='flex:center'>
            <Contrato
              theme={theme}
              setCurrentComponent={setCurrentComponent}></Contrato>
          </Main>
        </>
      );

    case 'ContractForm':
      return (
        <>
          <BackButton
            setCurrentComponent={setCurrentComponent}
            to={'ReceiptPDF'}
          />
          <Main theme={theme} snippets='flex:center'>
            <InfoContrato
              theme={theme}
              setCurrentComponent={setCurrentComponent}></InfoContrato>
          </Main>
        </>
      );

    case 'HoursForm':
      return (
        <>
          <BackButton setCurrentComponent={setCurrentComponent} to={'home'} />
          <Main theme={theme} snippets='flex:center'>
            <Calculator
              setCurrentComponent={setCurrentComponent}
              theme={theme}></Calculator>
          </Main>
        </>
      );

    case 'ProjectForm':
      return (
        <>
          <BackButton
            setCurrentComponent={setCurrentComponent}
            to={'HoursForm'}
          />
          <Main theme={theme} snippets='flex:center'>
            <ProjectInfo
              theme={theme}
              setCurrentComponent={setCurrentComponent}></ProjectInfo>
          </Main>
        </>
      );

    case 'ReceiptPDF':
      return (
        <>
          <BackButton
            setCurrentComponent={setCurrentComponent}
            to={'ProjectForm'}
          />
          <Main theme={theme} snippets='flex:center'>
            <Recibo
              theme={theme}
              setCurrentComponent={setCurrentComponent}></Recibo>
          </Main>
        </>
      );

    default:
      return <></>;
  }
}
