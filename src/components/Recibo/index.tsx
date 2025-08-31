import { useRef } from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import type { ThemeAvailableColors } from '../../styles/theme';
import { Container } from './styles';

// Types
type Props = {
  setCurrentComponent: (s: string) => void;
  theme: ThemeAvailableColors;
};

type CalculatorInfo = {
  hora: number;
  horaExtra: number;
  complexidade: string;
  diasDeProjeto: number;
  horasPorDia: number;
  cobrarMensalidade: boolean;
  valorMensalidade: number;
};

type ProjectInfo = {
  projectName: string;
  projectDesc: string | null;
  features: string[];
};

// Utility functions
const getCalculatorInfo = (): CalculatorInfo | null => {
  const info = localStorage.getItem('calculator');
  if (!info) return null;
  return JSON.parse(info) as CalculatorInfo;
};

const getProjectInfo = (): ProjectInfo | null => {
  const info = localStorage.getItem('project');
  if (!info) return null;
  return JSON.parse(info) as ProjectInfo;
};

const getPriceForLevel = (level: string): number => {
  const priceMap: Record<string, number> = {
    easy: 1000,
    medium: 2000,
    hard: 3000,
  };
  return priceMap[level] || 0;
};

// Main component
export default function Recibo(props: Props) {
  const componentRef = useRef<HTMLDivElement>(null);

  // Data calculations
  const calculatorInfo = getCalculatorInfo();
  const projectInfo = getProjectInfo();

  const priceForLevel = calculatorInfo
    ? getPriceForLevel(calculatorInfo.complexidade)
    : 0;

  const totalHours = calculatorInfo
    ? calculatorInfo.horasPorDia * calculatorInfo.diasDeProjeto
    : 0;

  const priceForHours = calculatorInfo ? calculatorInfo.hora * totalHours : 0;

  const totalDevelopmentValue = priceForLevel + priceForHours;

  // PDF generation handler
  const handleGeneratePDF = async () => {
    if (!componentRef.current || !projectInfo) return;

    try {
      // Captura o componente com html2canvas
      const canvas = await html2canvas(componentRef.current, {
        scale: 2,
        useCORS: true,
      });

      const imgData = canvas.toDataURL('image/png');

      // Calcula dimensões reais do componente
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;

      // Converte pixels do canvas para mm (jsPDF usa mm)
      const pdfWidth = imgWidth * 0.264583; // 1px ≈ 0.264583 mm
      const pdfHeight = imgHeight * 0.264583;

      // Cria o PDF com altura dinâmica
      const pdf = new jsPDF({
        orientation: 'p',
        unit: 'mm',
        format: [pdfWidth, pdfHeight], // página única do tamanho exato do componente
      });

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`orçamento-do-projeto-${projectInfo.projectName}.pdf`);
    } catch (error) {
      console.error('Erro ao gerar PDF:', error);
    }
  };

  // Render project information section
  const renderProjectInfo = () => (
    <>
      <div>
        <strong>Projeto:</strong>
        <p>{projectInfo?.projectName}</p>
      </div>

      {projectInfo?.projectDesc && (
        <div>
          <strong>Descrição:</strong>
          <p>{projectInfo.projectDesc}</p>
        </div>
      )}

      {projectInfo?.features && projectInfo.features.length > 0 && (
        <div>
          <strong>Features:</strong>
          <p>{projectInfo.features.join(', ')}</p>
        </div>
      )}
    </>
  );

  // Render values section
  const renderValuesSection = () => {
    if (!calculatorInfo) return null;

    return (
      <div className='values'>
        <div>
          <strong>- Mão de obra ({totalHours} horas):</strong>
          <p>R$ {priceForHours}</p>
        </div>

        <div>
          <strong>
            <span>- Planejamento</span>
            <span>- Desenvolvimento</span>
            <span>- Testes</span>
          </strong>
          <p>R$ {priceForLevel}</p>
        </div>

        <div className='total'>
          <strong>Valor Total pelo Desenvolvimento:</strong>
          <p>R$ {totalDevelopmentValue}</p>
        </div>
      </div>
    );
  };

  // Render additional costs section
  const renderAdditionalCosts = () => {
    if (!calculatorInfo?.valorMensalidade) return null;

    return (
      <div>
        <strong>Adicionais (hospedagem):</strong>
        <p>R$ {calculatorInfo.valorMensalidade} cobrado mensalmente</p>
      </div>
    );
  };

  return (
    <Container theme={props.theme}>
      {/* Container do conteúdo principal */}
      <div className='content-wrapper'>
        <div ref={componentRef} className='content'>
          <h2>Orçamento:</h2>

          {/* Project Information */}
          {renderProjectInfo()}

          {/* Values Section */}
          {renderValuesSection()}

          {/* Additional Costs */}
          {renderAdditionalCosts()}
        </div>
      </div>

      {/* Container dos botões - posicionado à direita */}
      <div className='actions-container'>
        <button
          className='back-button'
          onClick={() => props.setCurrentComponent('project-info')}>
          {'<-- Voltar'}
        </button>
        <button className='action-button' onClick={handleGeneratePDF}>
          📄 Salvar Orçamento em PDF
        </button>
        <button
          className='action-button secondary'
          onClick={() => props.setCurrentComponent('info-contrato')}>
          📋 Emitir Contrato
        </button>
      </div>
    </Container>
  );
}
