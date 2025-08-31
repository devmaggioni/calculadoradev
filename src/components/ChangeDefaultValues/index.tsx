import { useState, useEffect } from 'react';
import type { ThemeAvailableColors } from '../../styles/theme';
import { Form } from './styles';
import getCurrentDifPrice from '../../utils/getCurrentDifPrice';

// Tipos e interfaces
type Props = {
  theme: ThemeAvailableColors;
};

export default function ChangeDefaultValues({ theme }: Props) {
  const [values, setValues] = useState({
    easy: '',
    medium: '',
    hard: '',
  });

  // Carrega os valores salvos no localStorage quando o componente monta
  useEffect(() => {
    const easyValue = getCurrentDifPrice('easy', localStorage);
    const mediumValue = getCurrentDifPrice('medium', localStorage);
    const hardValue = getCurrentDifPrice('hard', localStorage);

    setValues({
      easy: easyValue.toString(),
      medium: mediumValue.toString(),
      hard: hardValue.toString(),
    });
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Salva os valores no localStorage
    localStorage.setItem('c_easy', values.easy);
    localStorage.setItem('c_medium', values.medium);
    localStorage.setItem('c_hard', values.hard);

    // Opcional: mostrar mensagem de sucesso ou fazer algo após salvar
    console.log('Valores salvos com sucesso!');
  };

  return (
    <Form theme={theme} onSubmit={handleSubmit}>
      <h3>Alterar valores padrão de cálculo</h3>
      <div>
        <label htmlFor='easy'>Valor fixo projetos "fáceis"</label>
        <input
          type='number'
          name='easy'
          id='easy'
          min={1}
          required
          value={values.easy}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor='medium'>Valor fixo projetos "médios"</label>
        <input
          type='number'
          name='medium'
          id='medium'
          min={1}
          required
          value={values.medium}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor='hard'>Valor fixo projetos "difíceis"</label>
        <input
          type='number'
          name='hard'
          id='hard'
          min={1}
          required
          value={values.hard}
          onChange={handleInputChange}
        />
      </div>
      <button type='submit'>Salvar Alterações</button>
    </Form>
  );
}
