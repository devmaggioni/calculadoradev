import type { ThemeAvailableColors } from '../../styles/theme';
import { Form } from './styles';
import { useState } from 'react';

type Props = {
  theme: ThemeAvailableColors;
  setCurrentComponent: (s: string) => void;
};

export default function Calculator(props: Props) {
  const [checkboxMensalidade, setCheckboxMensalidade] = useState(false);

  function getPrevCalculatorInfo() {
    const info = localStorage.getItem('HoursForm') || null;
    if (!info) return null;
    return JSON.parse(info) as {
      hora: number | null;
      horaExtra: number | null;
      complexidade: string | null;
      diasDeProjeto: number | null;
      horasPorDia: number | null;
      cobrarMensalidade: boolean | null;
      valorMensalidade: number | null;
    };
  }

  const handleCheckboxMensalidade = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setCheckboxMensalidade(e.target.checked);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // evita reload da página

    // cria FormData para pegar os valores
    const formData = new FormData(e.currentTarget);

    // converte para objeto
    const data = {
      hora: formData.get('hora'),
      horaExtra: formData.get('hora-extra'),
      complexidade: formData.get('lista'),
      diasDeProjeto: formData.get('dias-de-projeto'),
      horasPorDia: formData.get('horas-de-projeto'),
      cobrarMensalidade: checkboxMensalidade,
      valorMensalidade: formData.get('mensalidade') || null,
    };

    localStorage.setItem('HoursForm', JSON.stringify(data));
    props.setCurrentComponent('ProjectForm');
  };

  return (
    <>
      <Form theme={props.theme} onSubmit={handleSubmit}>
        <div>
          <h3>
            Insira as informações corretamente para que possamos calcular o
            preço do seu serviço!
          </h3>
          <label htmlFor='hora'>Qual o valor da sua hora?</label>
          <input
            type='number'
            name='hora'
            id='hora'
            defaultValue={getPrevCalculatorInfo()?.hora || 50}
            min={1}
            max={1000}
          />
        </div>

        <div>
          <label htmlFor='hora-extra'>Qual o valor da sua hora EXTRA?</label>
          <input
            type='number'
            name='hora-extra'
            id='hora-extra'
            defaultValue={getPrevCalculatorInfo()?.horaExtra || 100}
            min={1}
            max={1000}
          />
        </div>

        <div>
          <label htmlFor='lista'>Qual a complexidade do projeto?</label>
          <select
            name='lista'
            id='lista'
            required
            defaultValue={getPrevCalculatorInfo()?.complexidade || 'easy'}>
            <option value=''>Selecione...</option>
            <option value='1000'>Fácil – HTML/CSS, landing pages</option>
            <option value='2000'>Médio – React, SEO, libs</option>
            <option value='3000'>
              Difícil – Projetos complexos, APIs, state management
            </option>
          </select>
        </div>

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
            defaultValue={getPrevCalculatorInfo()?.diasDeProjeto || 30}
            required
          />
        </div>

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
            defaultValue={getPrevCalculatorInfo()?.horasPorDia || 4}
            required
          />
        </div>

        <div>
          <label>
            Cobrar mensalidade pela hospedagem
            <input
              type='checkbox'
              checked={checkboxMensalidade}
              onChange={handleCheckboxMensalidade}
            />
          </label>
        </div>

        {checkboxMensalidade && (
          <div>
            <label htmlFor='mensalidade'>Valor da mensalidade</label>
            <input
              type='number'
              name='mensalidade'
              id='mensalidade'
              min={1}
              defaultValue={getPrevCalculatorInfo()?.valorMensalidade || 150}
              required
            />
          </div>
        )}

        <div>
          <button type='submit'>Próximo</button>
        </div>
      </Form>
    </>
  );
}
