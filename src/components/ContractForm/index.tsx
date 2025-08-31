import type { ThemeAvailableColors } from '../../styles/theme';
import { Form } from './styles';
import { useState, useMemo } from 'react';

// Constantes para chaves do localStorage
const STORAGE_KEYS = {
  CONTRACT_FORM: 'ContractForm',
  CLIENT_IS_CNPJ: 'cliente-iscnpj',
} as const;

// Tipos e interfaces
type Props = {
  theme: ThemeAvailableColors;
  setCurrentComponent: (s: string) => void;
};

/**
 * Interface que define a estrutura dos dados do contrato
 */
export interface ContractFormData {
  nomePrestador: string;
  docPrestador: string;
  profissaoPrestador: string;
  enderecoPrestador: string;
  local: string;
  nomeCliente: string;
  docCliente: string;
  profissaoCliente: string;
  enderecoCliente: string;
  isCnpjClient: boolean;
  cnpjClienteNome: string;
  cnpjCliente: string;
  cnpjClienteEndereco: string;
  pagamento: string;
  descPagamento: string;
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
 * Recupera dados salvos do formulário de contrato
 */
const getStoredContractData = (): ContractFormData | null => {
  const storedData = localStorageUtils.getItem(STORAGE_KEYS.CONTRACT_FORM);

  if (!storedData) {
    return null;
  }

  try {
    const parsedData = JSON.parse(storedData);

    // Retorna dados com valores padrão para garantir consistência
    return {
      nomePrestador: parsedData.nomePrestador || '',
      docPrestador: parsedData.docPrestador || '',
      profissaoPrestador: parsedData.profissaoPrestador || '',
      enderecoPrestador: parsedData.enderecoPrestador || '',
      local: parsedData.local || '',
      nomeCliente: parsedData.nomeCliente || '',
      docCliente: parsedData.docCliente || '',
      profissaoCliente: parsedData.profissaoCliente || '',
      enderecoCliente: parsedData.enderecoCliente || '',
      isCnpjClient: parsedData.isCnpjClient || false,
      cnpjClienteNome: parsedData.cnpjClienteNome || '',
      cnpjCliente: parsedData.cnpjCliente || '',
      cnpjClienteEndereco: parsedData.cnpjClienteEndereco || '',
      pagamento: parsedData.pagamento || '',
      descPagamento: parsedData.descPagamento || '',
    };
  } catch (error) {
    console.warn('Erro ao fazer parse dos dados do contrato:', error);
    return null;
  }
};

/**
 * Verifica se o cliente é pessoa jurídica baseado no localStorage
 */
const getIsClientCnpj = (): boolean => {
  const storedValue = localStorageUtils.getItem(STORAGE_KEYS.CLIENT_IS_CNPJ);
  return storedValue === 'true';
};

/**
 * Componente para coleta de informações do contrato
 */
export default function ContractForm({ theme, setCurrentComponent }: Props) {
  // Memoriza os dados salvos para evitar re-computação desnecessária
  const storedContractData = useMemo(() => getStoredContractData(), []);

  // Estados do componente
  const [isPaymentDescriptionEnabled, setIsPaymentDescriptionEnabled] =
    useState(!!storedContractData?.descPagamento);

  const [isClientCnpj, setIsClientCnpj] = useState(() => getIsClientCnpj());

  /**
   * Manipula mudança no checkbox de pessoa jurídica
   */
  const handleClientTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { checked } = event.target;

    localStorageUtils.setItem(STORAGE_KEYS.CLIENT_IS_CNPJ, String(checked));
    setIsClientCnpj(checked);
  };

  /**
   * Manipula mudança no select de pagamento
   */
  const handlePaymentMethodChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const isCustomPayment = event.target.value === 'outro';
    setIsPaymentDescriptionEnabled(isCustomPayment);
  };

  /**
   * Processa e salva os dados do formulário
   */
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    // Constrói objeto com dados do formulário
    const contractData: ContractFormData = {
      nomePrestador: (formData.get('nome-prestador') as string) || '',
      docPrestador: (formData.get('doc-prestador') as string) || '',
      profissaoPrestador: (formData.get('profissao-prestador') as string) || '',
      enderecoPrestador: (formData.get('endereco-prestador') as string) || '',
      local: (formData.get('local') as string) || '',
      nomeCliente: (formData.get('nome-cliente') as string) || '',
      docCliente: (formData.get('doc-cliente') as string) || '',
      profissaoCliente: (formData.get('profissao-cliente') as string) || '',
      enderecoCliente: (formData.get('endereco-cliente') as string) || '',
      isCnpjClient: !!formData.get('cliente-iscnpj'),
      cnpjClienteNome: (formData.get('cliente-nomecnpj') as string) || '',
      cnpjCliente: (formData.get('cnpj-cliente') as string) || '',
      cnpjClienteEndereco:
        (formData.get('cliente-cnpj-endereco') as string) || '',
      pagamento: (formData.get('pagamento') as string) || '',
      descPagamento: (formData.get('desc-pagamento') as string) || '',
    };

    // Salva dados no localStorage
    const success = localStorageUtils.setItem(
      STORAGE_KEYS.CONTRACT_FORM,
      JSON.stringify(contractData),
    );

    if (success) {
      // Navega para próxima etapa
      setCurrentComponent('ContractPDF');
    } else {
      // Em caso de erro, ainda permite navegar (fallback)
      console.warn('Erro ao salvar dados, mas prosseguindo...');
      setCurrentComponent('ContractPDF');
    }
  };

  return (
    <Form theme={theme} onSubmit={handleSubmit}>
      <h3>
        Bora emitir o contrato! Precisamos das infos para que o contrato fique
        completo:
      </h3>

      {/* Seção: Dados do Prestador */}
      <div>
        <label htmlFor='nome-prestador'>
          Qual seu nome ou nome de sua empresa?
        </label>
        <input
          type='text'
          name='nome-prestador'
          id='nome-prestador'
          required
          placeholder='Não use apelidos ou abreviações'
          defaultValue={storedContractData?.nomePrestador}
        />
      </div>

      <div>
        <label htmlFor='doc-prestador'>Qual seu CPF ou CNPJ?</label>
        <input
          type='text'
          name='doc-prestador'
          id='doc-prestador'
          required
          placeholder='00.000.000-0000-0'
          defaultValue={storedContractData?.docPrestador}
        />
      </div>

      <div>
        <label htmlFor='profissao-prestador'>Qual sua profissão?</label>
        <input
          type='text'
          name='profissao-prestador'
          id='profissao-prestador'
          required
          placeholder='Pedreiro de Software'
          defaultValue={storedContractData?.profissaoPrestador}
        />
      </div>

      <div>
        <label htmlFor='endereco-prestador'>Qual seu endereço?</label>
        <input
          type='text'
          name='endereco-prestador'
          id='endereco-prestador'
          required
          placeholder='Rua Coda Fofo, Bairro Lateral, Florianópolis-SC'
          defaultValue={storedContractData?.enderecoPrestador}
        />
      </div>

      <div>
        <label htmlFor='local'>
          Aonde o Contrato vai ser assinado? (Cidade-Estado)
        </label>
        <input
          type='text'
          name='local'
          id='local'
          required
          placeholder='Florianópolis-SC'
          defaultValue={storedContractData?.local}
        />
      </div>

      {/* Seção: Dados do Cliente */}
      <div>
        <label htmlFor='nome-cliente'>Nome completo do seu cliente</label>
        <input
          type='text'
          name='nome-cliente'
          id='nome-cliente'
          required
          placeholder='Fulano de Tal ME'
          defaultValue={storedContractData?.nomeCliente}
        />
      </div>

      <div>
        <label htmlFor='doc-cliente'>Qual o CPF do seu cliente?</label>
        <input
          type='text'
          name='doc-cliente'
          id='doc-cliente'
          required
          placeholder='000.000.000-00'
          defaultValue={storedContractData?.docCliente}
        />
      </div>

      <div>
        <label htmlFor='profissao-cliente'>
          Qual a profissão do seu cliente?
        </label>
        <input
          type='text'
          name='profissao-cliente'
          id='profissao-cliente'
          required
          placeholder='Empresário'
          defaultValue={storedContractData?.profissaoCliente}
        />
      </div>

      <div>
        <label htmlFor='endereco-cliente'>Qual o endereço do cliente?</label>
        <input
          type='text'
          name='endereco-cliente'
          id='endereco-cliente'
          required
          placeholder='Rua XYZ, Bairro 12, Florianópolis-SC'
          defaultValue={storedContractData?.enderecoCliente}
        />
      </div>

      {/* Checkbox: Cliente é Pessoa Jurídica */}
      <div>
        <label htmlFor='cliente-iscnpj'>
          Cliente é Pessoa Jurídica?
          <input
            type='checkbox'
            id='cliente-iscnpj'
            name='cliente-iscnpj'
            checked={isClientCnpj}
            onChange={handleClientTypeChange}
          />
        </label>
      </div>

      {/* Campos condicionais: Dados da Pessoa Jurídica */}
      {isClientCnpj && (
        <>
          <div>
            <label htmlFor='cliente-nomecnpj'>
              Qual o nome da empresa do seu cliente?
            </label>
            <input
              type='text'
              name='cliente-nomecnpj'
              id='cliente-nomecnpj'
              required
              placeholder='Jubileu Confecções LTDA'
              defaultValue={storedContractData?.cnpjClienteNome}
            />
          </div>

          <div>
            <label htmlFor='cnpj-cliente'>
              Qual o CNPJ da empresa do seu cliente?
            </label>
            <input
              type='text'
              name='cnpj-cliente'
              id='cnpj-cliente'
              required
              placeholder='00.000.000/0000-00'
              defaultValue={storedContractData?.cnpjCliente}
            />
          </div>

          <div>
            <label htmlFor='cliente-cnpj-endereco'>
              Qual o endereço da empresa cliente?
            </label>
            <input
              type='text'
              name='cliente-cnpj-endereco'
              id='cliente-cnpj-endereco'
              required
              placeholder='Rua Tal, Bairro Qualquer, Florianópolis-SC'
              defaultValue={storedContractData?.cnpjClienteEndereco}
            />
          </div>
        </>
      )}

      {/* Seção: Forma de Pagamento */}
      <div>
        <label htmlFor='pagamento'>Como vai ser o pagamento?</label>
        <select
          name='pagamento'
          id='pagamento'
          required
          defaultValue={storedContractData?.pagamento}
          onChange={handlePaymentMethodChange}>
          <option value=''>Selecione...</option>
          <option value='40/60'>40/60</option>
          <option value='50/50'>50/50</option>
          <option value='outro'>outro</option>
        </select>
      </div>

      {/* Campo condicional: Descrição personalizada do pagamento */}
      {isPaymentDescriptionEnabled && (
        <div>
          <label htmlFor='desc-pagamento'>
            Descreva como vai ser o pagamento
          </label>
          <input
            type='text'
            name='desc-pagamento'
            id='desc-pagamento'
            required
            placeholder='Ex: "30% de entrada, e 70% na hora da entrega"'
            defaultValue={storedContractData?.descPagamento}
          />
        </div>
      )}

      <button type='submit'>Próxima etapa</button>
    </Form>
  );
}
