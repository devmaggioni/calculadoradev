import type { ThemeAvailableColors } from '../../styles/theme';
import { Form } from './styles';
import { useState, useMemo } from 'react';

// Constantes para chaves do localStorage
const STORAGE_KEYS = {
  HOURS_FORM: 'HoursForm',
} as const;

// Valores padrão para o formulário
const DEFAULT_VALUES = {
  HOUR_VALUE: 50,
  EXTRA_HOUR_VALUE: 100,
  PROJECT_DAYS: 30,
  HOURS_PER_DAY: 4,
  MONTHLY_VALUE: 150,
  COMPLEXITY: 'easy',
} as const;

// Tipos e interfaces
type Props = {
  theme: ThemeAvailableColors;
  setCurrentComponent: (s: string) => void;
};

/**
 * Interface que define a estrutura dos dados do calculador
 */
interface HoursFormData {
  hora: number;
  horaExtra: number;
  complexidade: string;
  diasDeProjeto: number;
  horasPorDia: number;
  cobrarMensalidade: boolean;
  valorMensalidade: number | null;
}

/**
 * Utilitário para gerenciar dados do localStorage de forma segura
 */
const localStorageUtils = {
  /**
   * Obtém dados do localStorage com tratamento de erro
   */
  getItem: (key: string): string | null => {
    try {
      return localStorage?.getItem(key) || null;
    } catch (error) {
      console.warn(`Erro ao acessar localStorage para chave "${key}":`, error);
      return null;
    }
  },

  /**
   * Salva dados no localStorage com tratamento de erro
   */
  setItem: (key: string, value: string): boolean => {
    try {
      localStorage?.setItem(key, value);
      return true;
    } catch (error) {
      console.warn(
        `Erro ao salvar no localStorage para chave "${key}":`,
        error,
      );
      return false;
    }
  },
};

/**
 * Recupera dados salvos do calculador com validação e valores padrão
 */
const getStoredHoursFormData = (): HoursFormData | null => {
  const storedData = localStorageUtils.getItem(STORAGE_KEYS.HOURS_FORM);

  if (!storedData) {
    return null;
  }

  try {
    const parsedData = JSON.parse(storedData);

    // Retorna dados com validação e valores padrão
    return {
      hora: Number(parsedData.hora) || DEFAULT_VALUES.HOUR_VALUE,
      horaExtra:
        Number(parsedData.horaExtra) || DEFAULT_VALUES.EXTRA_HOUR_VALUE,
      complexidade: parsedData.complexidade || DEFAULT_VALUES.COMPLEXITY,
      diasDeProjeto:
        Number(parsedData.diasDeProjeto) || DEFAULT_VALUES.PROJECT_DAYS,
      horasPorDia:
        Number(parsedData.horasPorDia) || DEFAULT_VALUES.HOURS_PER_DAY,
      cobrarMensalidade: Boolean(parsedData.cobrarMensalidade),
      valorMensalidade: parsedData.valorMensalidade
        ? Number(parsedData.valorMensalidade)
        : null,
    };
  } catch (error) {
    console.warn('Erro ao fazer parse dos dados do calculador:', error);
    return null;
  }
};

/**
 * Componente calculador para precificação de projetos
 */
export default function HoursForm({ theme, setCurrentComponent }: Props) {
  // Memoriza os dados salvos para evitar re-computação desnecessária
  const storedData = useMemo(() => getStoredHoursFormData(), []);

  // Estado para controlar a exibição do campo de mensalidade
  const [isMonthlyFeeEnabled, setIsMonthlyFeeEnabled] = useState(
    () => storedData?.cobrarMensalidade || false,
  );

  /**
   * Manipula mudança no checkbox de cobrança de mensalidade
   */
  const handleMonthlyFeeToggle = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setIsMonthlyFeeEnabled(event.target.checked);
  };

  /**
   * Processa e salva os dados do formulário
   */
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    // Constrói objeto com dados do formulário
    const HoursFormData = {
      hora: formData.get('hora') as string,
      horaExtra: formData.get('hora-extra') as string,
      complexidade: formData.get('lista') as string,
      diasDeProjeto: formData.get('dias-de-projeto') as string,
      horasPorDia: formData.get('horas-de-projeto') as string,
      cobrarMensalidade: isMonthlyFeeEnabled,
      valorMensalidade: isMonthlyFeeEnabled
        ? (formData.get('mensalidade') as string)
        : null,
    };

    // Salva dados no localStorage
    const success = localStorageUtils.setItem(
      STORAGE_KEYS.HOURS_FORM,
      JSON.stringify(HoursFormData),
    );

    if (success) {
      // Navega para próxima etapa
      setCurrentComponent('ProjectForm');
    } else {
      // Em caso de erro, ainda permite navegar (fallback)
      console.warn('Erro ao salvar dados, mas prosseguindo...');
      setCurrentComponent('ProjectForm');
    }
  };

  return (
    <Form theme={theme} onSubmit={handleSubmit}>
      <div>
        <h3>
          Insira as informações corretamente para que possamos calcular o preço
          do seu serviço!
        </h3>

        {/* Campo: Valor da hora */}
        <label htmlFor='hora'>Qual o valor da sua hora?</label>
        <input
          type='number'
          name='hora'
          id='hora'
          defaultValue={storedData?.hora || DEFAULT_VALUES.HOUR_VALUE}
          min={1}
          max={1000}
          required
        />
      </div>

      {/* Campo: Valor da hora extra */}
      <div>
        <label htmlFor='hora-extra'>Qual o valor da sua hora EXTRA?</label>
        <input
          type='number'
          name='hora-extra'
          id='hora-extra'
          defaultValue={
            storedData?.horaExtra || DEFAULT_VALUES.EXTRA_HOUR_VALUE
          }
          min={1}
          max={1000}
          required
        />
      </div>

      {/* Campo: Complexidade do projeto */}
      <div>
        <label htmlFor='lista'>Qual a complexidade do projeto?</label>
        <select
          name='lista'
          id='lista'
          required
          defaultValue={storedData?.complexidade || DEFAULT_VALUES.COMPLEXITY}>
          <option value=''>Selecione...</option>
          <option value='easy'>Fácil – HTML/CSS, landing pages</option>
          <option value='medium'>Médio – React, SEO, libs</option>
          <option value='hard'>
            Difícil – Projetos complexos, APIs, state management
          </option>
        </select>
      </div>

      {/* Campo: Duração do projeto */}
      <div>
        <label htmlFor='dias-de-projeto'>
          Quantos dias o projeto deve durar?
        </label>
        <input
          type='number'
          name='dias-de-projeto'
          id='dias-de-projeto'
          min={1}
          max={700}
          defaultValue={
            storedData?.diasDeProjeto || DEFAULT_VALUES.PROJECT_DAYS
          }
          required
        />
      </div>

      {/* Campo: Horas por dia */}
      <div>
        <label htmlFor='horas-de-projeto'>
          Quantas horas por dia vai dedicar ao projeto?
        </label>
        <input
          type='number'
          name='horas-de-projeto'
          id='horas-de-projeto'
          min={1}
          max={12}
          defaultValue={storedData?.horasPorDia || DEFAULT_VALUES.HOURS_PER_DAY}
          required
        />
      </div>

      {/* Checkbox: Cobrança de mensalidade */}
      <div>
        <label htmlFor='cobrar-mensalidade'>
          Cobrar mensalidade pela hospedagem
          <input
            type='checkbox'
            id='cobrar-mensalidade'
            name='cobrar-mensalidade'
            checked={isMonthlyFeeEnabled}
            onChange={handleMonthlyFeeToggle}
          />
        </label>
      </div>

      {/* Campo condicional: Valor da mensalidade */}
      {isMonthlyFeeEnabled && (
        <div>
          <label htmlFor='mensalidade'>Valor da mensalidade</label>
          <input
            type='number'
            name='mensalidade'
            id='mensalidade'
            min={1}
            defaultValue={
              storedData?.valorMensalidade || DEFAULT_VALUES.MONTHLY_VALUE
            }
            required
          />
        </div>
      )}

      {/* Botão de submissão */}
      <div>
        <button type='submit'>Próximo</button>
      </div>
    </Form>
  );
}
