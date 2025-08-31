import type { ThemeAvailableColors } from '../../styles/theme';
import { Form } from './styles';
import { useState, useMemo } from 'react';

type Props = {
  theme: ThemeAvailableColors;
  setCurrentComponent: (s: string) => void;
};

export interface InfoContratoData {
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

export default function InfoContrato(props: Props) {
  const lcData = useMemo(getLCData, []);

  const [checkboxPag, setCheckboxPag] = useState(!!lcData?.descPagamento);
  const [checkboxClientePJ, setCheckboxClientePJ] = useState(
    localStorage.getItem('cliente-iscnpj') === 'true',
  );

  function getLCData() {
    const data = localStorage.getItem('info-contrato');
    if (!data) return null;
    const d = JSON.parse(data);
    return {
      nomePrestador: d.nomePrestador || '',
      docPrestador: d.docPrestador || '',
      profissaoPrestador: d.profissaoPrestador || '',
      enderecoPrestador: d.enderecoPrestador || '',
      local: d.local || '',
      nomeCliente: d.nomeCliente || '',
      docCliente: d.docCliente || '',
      profissaoCliente: d.profissaoCliente || '',
      enderecoCliente: d.enderecoCliente || '',
      isCnpjClient: d.isCnpjClient || false,
      cnpjClienteNome: d.cnpjClienteNome || '',
      cnpjCliente: d.cnpjCliente || '',
      cnpjClienteEndereco: d.cnpjClienteEndereco || '',
      pagamento: d.pagamento || '',
      descPagamento: d.descPagamento || '',
    };
  }

  const handleCheckBoxClient = (e: React.ChangeEvent<HTMLInputElement>) => {
    localStorage.setItem('cliente-iscnpj', String(e.target.checked));
    setCheckboxClientePJ(e.target.checked);
  };

  const handleCheckboxPag = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCheckboxPag(e.target.value === 'outro');
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = {
      nomePrestador: formData.get('nome-prestador') || '',
      docPrestador: formData.get('doc-prestador') || '',
      profissaoPrestador: formData.get('profissao-prestador') || '',
      enderecoPrestador: formData.get('endereco-prestador') || '',
      local: formData.get('local') || '',
      nomeCliente: formData.get('nome-cliente') || '',
      docCliente: formData.get('doc-cliente') || '',
      profissaoCliente: formData.get('profissao-cliente') || '',
      enderecoCliente: formData.get('endereco-cliente') || '',
      isCnpjClient: !!formData.get('cliente-iscnpj'),
      cnpjClienteNome: formData.get('cliente-nomecnpj') || '',
      cnpjCliente: formData.get('cnpj-cliente') || '',
      cnpjClienteEndereco: formData.get('cliente-cnpj-endereco') || '',
      pagamento: formData.get('pagamento') || '',
      descPagamento: formData.get('desc-pagamento') || '',
    };

    localStorage.setItem('info-contrato', JSON.stringify(data));
    //alert(JSON.stringify(data));
    props.setCurrentComponent('contrato');
  };

  return (
    <Form theme={props.theme} onSubmit={handleSubmit}>
      <h3>
        Bora emitir o contrato! Precisamos das infos para que o contrato fique
        completo:
      </h3>

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
          defaultValue={lcData?.nomePrestador}
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
          defaultValue={lcData?.docPrestador}
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
          defaultValue={lcData?.profissaoPrestador}
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
          defaultValue={lcData?.enderecoPrestador}
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
          defaultValue={lcData?.local}
        />
      </div>

      <div>
        <label htmlFor='nome-cliente'>Nome completo do seu cliente</label>
        <input
          type='text'
          name='nome-cliente'
          id='nome-cliente'
          required
          placeholder='Fulano de Tal ME'
          defaultValue={lcData?.nomeCliente}
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
          defaultValue={lcData?.docCliente}
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
          defaultValue={lcData?.profissaoCliente}
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
          defaultValue={lcData?.enderecoCliente}
        />
      </div>

      <div>
        <label htmlFor='cliente-iscnpj'>
          Cliente é Pessoa Jurídica?
          <input
            type='checkbox'
            id='cliente-iscnpj'
            name='cliente-iscnpj'
            checked={checkboxClientePJ}
            onChange={handleCheckBoxClient}
          />
        </label>
      </div>

      {checkboxClientePJ && (
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
              defaultValue={lcData?.cnpjClienteNome}
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
              defaultValue={lcData?.cnpjCliente}
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
              defaultValue={lcData?.cnpjClienteEndereco}
            />
          </div>
        </>
      )}

      <div>
        <label htmlFor='pagamento'>Como vai ser o pagamento?</label>
        <select
          name='pagamento'
          id='pagamento'
          required
          defaultValue={lcData?.pagamento}
          onChange={handleCheckboxPag}>
          <option value=''>Selecione...</option>
          <option value='40/60'>40/60</option>
          <option value='50/50'>50/50</option>
          <option value='outro'>outro</option>
        </select>
      </div>

      {checkboxPag && (
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
            defaultValue={lcData?.descPagamento}
          />
        </div>
      )}

      <button type='submit'>Próxima etapa</button>
      <button
        onClick={() => props.setCurrentComponent('recibo')}
        className='back-button'>
        {'<-- voltar'}
      </button>
    </Form>
  );
}
