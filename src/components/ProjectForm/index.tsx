import type { ThemeAvailableColors } from '../../styles/theme';
import { Form } from './styles';
import { useState, useEffect, useCallback } from 'react';
import { IoMdCloseCircle } from 'react-icons/io';

// Constantes para chaves do localStorage
const STORAGE_KEYS = {
  PROJECT_FORM: 'ProjectForm',
} as const;

// Tipos e interfaces
type Props = {
  theme: ThemeAvailableColors;
  setCurrentComponent: (s: string) => void;
};

/**
 * Interface que define a estrutura dos dados do projeto
 */
interface ProjectData {
  projectName: string;
  projectDesc: string | null;
  features: string[];
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
 * Gera uma chave única baseada em timestamp e índice
 */
const generateUniqueKey = (index: number = 0): string => {
  return `${Date.now()}-${index}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Recupera dados salvos do projeto com validação
 */
const getStoredProjectData = (): ProjectData | null => {
  const storedData = localStorageUtils.getItem(STORAGE_KEYS.PROJECT_FORM);

  if (!storedData) {
    return null;
  }

  try {
    const parsedData = JSON.parse(storedData) as ProjectData;

    // Validação e estruturação dos dados
    return {
      projectName: parsedData.projectName || '',
      projectDesc: parsedData.projectDesc || '',
      features: Array.isArray(parsedData.features) ? parsedData.features : [],
    };
  } catch (error) {
    console.warn('Erro ao fazer parse dos dados do projeto:', error);
    return null;
  }
};

/**
 * Componente para gerenciar informações do projeto
 */
export default function ProjectForm({ theme, setCurrentComponent }: Props) {
  // Estados do componente
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [features, setFeatures] = useState<string[]>(['']);
  const [featureKeys, setFeatureKeys] = useState<string[]>([
    generateUniqueKey(0),
  ]);

  /**
   * Carrega dados salvos do localStorage na inicialização
   */
  useEffect(() => {
    const storedData = getStoredProjectData();

    if (!storedData) return;

    // Carrega dados salvos
    if (storedData.projectName) {
      setProjectName(storedData.projectName);
    }

    if (storedData.projectDesc) {
      setProjectDescription(storedData.projectDesc);
    }

    // Carrega features se existirem, senão mantém o array inicial
    if (storedData.features.length > 0) {
      setFeatures(storedData.features);
      setFeatureKeys(
        storedData.features.map((_, index) => generateUniqueKey(index)),
      );
    }
  }, []);

  /**
   * Adiciona uma nova feature à lista
   */
  const handleAddFeature = useCallback(() => {
    const newFeatures = [...features, ''];
    const newKeys = [...featureKeys, generateUniqueKey(features.length)];

    setFeatures(newFeatures);
    setFeatureKeys(newKeys);
  }, [features, featureKeys]);

  /**
   * Atualiza o valor de uma feature específica
   */
  const handleUpdateFeature = useCallback(
    (index: number, value: string) => {
      const updatedFeatures = [...features];
      updatedFeatures[index] = value;
      setFeatures(updatedFeatures);
    },
    [features],
  );

  /**
   * Remove uma feature da lista
   */
  const handleRemoveFeature = useCallback(
    (event: React.MouseEvent, index: number) => {
      event.preventDefault();
      event.stopPropagation();

      // Não permite remover se for o único item
      if (features.length <= 1) {
        return;
      }

      const filteredFeatures = features.filter((_, i) => i !== index);
      const filteredKeys = featureKeys.filter((_, i) => i !== index);

      setFeatures(filteredFeatures);
      setFeatureKeys(filteredKeys);
    },
    [features, featureKeys],
  );

  /**
   * Processa e salva os dados do formulário
   */
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Filtra features vazias e constrói dados finais
    const filteredFeatures = features
      .map((feature) => feature.trim())
      .filter((feature) => feature !== '');

    const projectData: ProjectData = {
      projectName: projectName.trim(),
      projectDesc: projectDescription.trim() || null,
      features: filteredFeatures,
    };

    // Salva dados no localStorage
    const success = localStorageUtils.setItem(
      STORAGE_KEYS.PROJECT_FORM,
      JSON.stringify(projectData),
    );

    if (success) {
      // Navega para próxima etapa
      setCurrentComponent('ReceiptPDF');
    } else {
      // Em caso de erro, ainda permite navegar (fallback)
      console.warn('Erro ao salvar dados, mas prosseguindo...');
      setCurrentComponent('ReceiptPDF');
    }
  };

  return (
    <Form theme={theme} onSubmit={handleSubmit}>
      {/* Cabeçalho */}
      <div>
        <h3>Complete as informações do Projeto!</h3>
      </div>

      {/* Campo: Nome do projeto */}
      <div>
        <label htmlFor='project-name'>Nome do Projeto</label>
        <input
          required
          type='text'
          name='project-name'
          id='project-name'
          value={projectName}
          onChange={(event) => setProjectName(event.target.value)}
          placeholder='Digite o nome do projeto'
        />
      </div>

      {/* Campo: Descrição do projeto */}
      <div>
        <label htmlFor='project-desc'>Descrição do Projeto</label>
        <input
          type='text'
          name='project-desc'
          id='project-desc'
          value={projectDescription}
          onChange={(event) => setProjectDescription(event.target.value)}
          placeholder='Descrição breve do projeto (opcional)'
        />
      </div>

      {/* Seção: Features do projeto */}
      <div>
        <label>Features do Projeto:</label>
        {features.map((feature, index) => (
          <div
            key={featureKeys[index]}
            style={{
              display: 'flex',
              gap: '8px',
              marginBottom: '4px',
              alignItems: 'center',
            }}>
            <input
              type='text'
              value={feature}
              placeholder={`Feature ${index + 1}`}
              onChange={(event) =>
                handleUpdateFeature(index, event.target.value)
              }
              style={{ flex: 1 }}
              aria-label={`Feature ${index + 1}`}
            />
            <button
              type='button'
              className='remove'
              onClick={(event) => handleRemoveFeature(event, index)}
              disabled={features.length <= 1}
              style={{
                cursor: features.length <= 1 ? 'not-allowed' : 'pointer',
                opacity: features.length <= 1 ? 0.5 : 1,
                pointerEvents: 'auto',
                zIndex: 10,
              }}
              aria-label={`Remover feature ${index + 1}`}
              title={
                features.length <= 1
                  ? 'Pelo menos uma feature é necessária'
                  : 'Remover feature'
              }>
              <IoMdCloseCircle className='icon' />
            </button>
          </div>
        ))}

        {/* Botão para adicionar nova feature */}
        <button
          type='button'
          className='add'
          onClick={handleAddFeature}
          aria-label='Adicionar nova feature'>
          + Adicionar item
        </button>
      </div>

      {/* Botão de submissão */}
      <div>
        <button type='submit'>Próximo</button>
      </div>
    </Form>
  );
}
