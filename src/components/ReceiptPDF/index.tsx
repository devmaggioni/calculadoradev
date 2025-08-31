import { useRef, useMemo, useState } from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import type { ThemeAvailableColors } from '../../styles/theme';
import { Container } from './styles';
import formatToBR from '../../utils/formatToBR';
import getCurrentDifPrice from '../../utils/getCurrentDifPrice';

const sanitizeFileName = (name: string) => {
  return name
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // remove acentos
    .replace(/[^a-zA-Z0-9-_]/g, '_'); // substitui caracteres inválidos
};

// Constantes para chaves do localStorage e configurações
const STORAGE_KEYS = {
  HOURS_FORM: 'HoursForm',
  PROJECT_FORM: 'ProjectForm',
} as const;

const PDF_CONFIG = {
  SCALE: 2,
  PIXELS_TO_MM: 0.264583, // Conversão de pixels para milímetros
  ORIENTATION: 'p' as const,
  UNIT: 'mm' as const,
} as const;

// Tipos e interfaces
type Props = {
  setCurrentComponent: (s: string) => void;
  theme: ThemeAvailableColors;
};

/**
 * Interface que define a estrutura dos dados do calculador
 */
interface CalculatorData {
  hora: number;
  horaExtra: number;
  complexidade: string;
  diasDeProjeto: number;
  horasPorDia: number;
  cobrarMensalidade: boolean;
  valorMensalidade: number;
}

/**
 * Interface que define a estrutura dos dados do projeto
 */
interface ProjectData {
  projectName: string;
  projectDesc: string | null;
  features: string[];
}

/**
 * Interface para os cálculos de valores do projeto
 */
interface ProjectCalculations {
  totalHours: number;
  priceForHours: number;
  priceForComplexity: number;
  totalDevelopmentValue: number;
}

/**
 * Utilitário para gerenciar dados do localStorage de forma segura
 */
const localStorageUtils = {
  /**
   * Obtém e faz parse de dados JSON do localStorage
   */
  getData: <T = any,>(key: string): T | null => {
    try {
      const data = localStorage?.getItem(key);
      if (!data) return null;

      return JSON.parse(data) as T;
    } catch (error) {
      console.warn(
        `Erro ao acessar dados do localStorage para chave "${key}":`,
        error,
      );
      return null;
    }
  },
};

/**
 * Obtém dados do calculador com tratamento de erro
 */
const getCalculatorData = (): CalculatorData | null => {
  return localStorageUtils.getData<CalculatorData>(STORAGE_KEYS.HOURS_FORM);
};

/**
 * Obtém dados do projeto com tratamento de erro
 */
const getProjectData = (): ProjectData | null => {
  return localStorageUtils.getData<ProjectData>(STORAGE_KEYS.PROJECT_FORM);
};

/**
 * Obtém o preço baseado no nível de complexidade
 */
const getComplexityPrice = (complexity: string): number => {
  return getCurrentDifPrice(complexity, localStorage);
};

/**
 * Calcula todos os valores relacionados ao projeto
 */
const calculateProjectValues = (
  calculatorData: CalculatorData | null,
): ProjectCalculations => {
  if (!calculatorData) {
    return {
      totalHours: 0,
      priceForHours: 0,
      priceForComplexity: 0,
      totalDevelopmentValue: 0,
    };
  }

  const totalHours = calculatorData.horasPorDia * calculatorData.diasDeProjeto;
  const priceForHours = calculatorData.hora * totalHours;
  const priceForComplexity = getComplexityPrice(calculatorData.complexidade);
  const totalDevelopmentValue = priceForHours + priceForComplexity;

  return {
    totalHours,
    priceForHours,
    priceForComplexity,
    totalDevelopmentValue,
  };
};

/**
 * Gera o PDF do orçamento
 */
const generateBudgetPDF = async (
  element: HTMLDivElement,
  projectName: string,
): Promise<void> => {
  try {
    // Captura o elemento com html2canvas
    const canvas = await html2canvas(element, {
      scale: PDF_CONFIG.SCALE,
      useCORS: true,
      logging: false,
      scrollY: -window.scrollY, // garante captura do topo
      windowWidth: element.scrollWidth,
      windowHeight: element.scrollHeight,
    });

    const imageData = canvas.toDataURL('image/png');

    // Calcula dimensões do PDF baseadas no canvas
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    const pdfWidth = canvasWidth * PDF_CONFIG.PIXELS_TO_MM;
    const pdfHeight = canvasHeight * PDF_CONFIG.PIXELS_TO_MM;

    // Cria o PDF com tamanho dinâmico
    const pdf = new jsPDF({
      orientation: PDF_CONFIG.ORIENTATION,
      unit: PDF_CONFIG.UNIT,
      format: [pdfWidth, pdfHeight],
    });

    // Adiciona a imagem ao PDF
    pdf.addImage(imageData, 'PNG', 0, 0, pdfWidth, pdfHeight);

    // Salva o arquivo
    const fileName = `orçamento-do-projeto-${sanitizeFileName(projectName)}.pdf`;
    setTimeout(() => {
      pdf.save(fileName);
    }, 200);
  } catch (error) {
    console.error('Erro ao gerar PDF:', error);
    // Poderia mostrar uma notificação de erro ao usuário aqui
    alert('Erro ao gerar o PDF. Tente novamente.');
  }
};

/**
 * Componente principal para exibição do orçamento
 */
export default function Recibo({ setCurrentComponent, theme }: Props) {
  const componentRef = useRef<HTMLDivElement>(null);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  // Obtém dados necessários usando memoização
  const calculatorData = useMemo(() => getCalculatorData(), []);
  const projectData = useMemo(() => getProjectData(), []);

  // Calcula valores do projeto
  const calculations = useMemo(
    () => calculateProjectValues(calculatorData),
    [calculatorData],
  );

  /**
   * Manipula a geração do PDF
   */
  const handleGeneratePDF = async () => {
    if (!componentRef.current || !projectData) {
      console.warn(
        'Elemento de referência ou dados do projeto não disponíveis',
      );
      return;
    }

    try {
      setIsGeneratingPDF(true);
      await generateBudgetPDF(componentRef.current, projectData.projectName);
    } catch (error) {
      console.error('Erro durante a geração do PDF:', error);
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  /**
   * Renderiza as informações do projeto
   */
  const renderProjectInfo = () => {
    if (!projectData) {
      return (
        <div>
          <strong>Erro:</strong>
          <p>Dados do projeto não encontrados</p>
        </div>
      );
    }

    return (
      <>
        <div>
          <strong>Projeto:</strong>
          <p>{projectData.projectName}</p>
        </div>

        {projectData.projectDesc && (
          <div>
            <strong>Descrição:</strong>
            <p>{projectData.projectDesc}</p>
          </div>
        )}

        {projectData.features && projectData.features.length > 0 && (
          <div>
            <strong>Features:</strong>
            <p>{projectData.features.join(', ')}</p>
          </div>
        )}
      </>
    );
  };

  /**
   * Renderiza a seção de valores do desenvolvimento
   */
  const renderValuesSection = () => {
    if (!calculatorData) {
      return (
        <div className='values'>
          <div>
            <strong>Erro:</strong>
            <p>Dados do calculador não encontrados</p>
          </div>
        </div>
      );
    }

    return (
      <div className='values'>
        <div>
          <strong>- Mão de obra ({calculations.totalHours} horas):</strong>
          <p>{formatToBR(calculations.priceForHours)}</p>
        </div>

        <div>
          <strong>
            <span>- Planejamento</span>
            <span>- Desenvolvimento</span>
            <span>- Testes</span>
          </strong>
          <p>{formatToBR(calculations.priceForComplexity)}</p>
        </div>

        <div className='total'>
          <strong>Valor Total do Desenvolvimento:</strong>
          <p>{formatToBR(calculations.totalDevelopmentValue)}</p>
        </div>
      </div>
    );
  };

  /**
   * Renderiza os custos adicionais (hospedagem)
   */
  const renderAdditionalCosts = () => {
    if (
      !calculatorData?.cobrarMensalidade ||
      !calculatorData?.valorMensalidade
    ) {
      return null;
    }

    return (
      <div>
        <strong>Adicionais (hospedagem):</strong>
        <p>{formatToBR(calculatorData.valorMensalidade)} cobrado mensalmente</p>
      </div>
    );
  };

  return (
    <Container theme={theme}>
      {/* Container do conteúdo principal */}
      <div className='content-wrapper'>
        <div ref={componentRef} className='content'>
          <h2>Orçamento:</h2>

          {/* Informações do projeto */}
          {renderProjectInfo()}

          {/* Seção de valores */}
          {renderValuesSection()}

          {/* Custos adicionais */}
          {renderAdditionalCosts()}
        </div>
      </div>

      {/* Container dos botões de ação */}
      <div className='actions-container'>
        <button
          className='action-button'
          onClick={handleGeneratePDF}
          disabled={!projectData || isGeneratingPDF}
          title={
            !projectData
              ? 'Dados do projeto não disponíveis'
              : isGeneratingPDF
                ? 'Gerando PDF...'
                : 'Gerar PDF do orçamento'
          }>
          {isGeneratingPDF ? '⏳ Salvando...' : '📄 Salvar Orçamento em PDF'}
        </button>
        <button
          className='action-button secondary'
          onClick={() => setCurrentComponent('ContractForm')}
          disabled={isGeneratingPDF}>
          📋 Emitir Contrato
        </button>
      </div>
    </Container>
  );
}
