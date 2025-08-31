import type { ThemeAvailableColors } from '../../styles/theme';
import { Form } from './styles';
import { useState, useEffect } from 'react';
import { IoMdCloseCircle } from 'react-icons/io';

type Props = {
  theme: ThemeAvailableColors;
  setCurrentComponent: (s: string) => void;
};

type ProjectData = {
  projectName: string;
  projectDesc: string | null;
  features: string[];
};

export default function ProjectInfo(props: Props) {
  const [projectName, setProjectName] = useState('');
  const [projectDesc, setProjectDesc] = useState('');
  const [features, setFeatures] = useState<string[]>(['']);

  // Carrega do localStorage
  useEffect(() => {
    const saved = localStorage.getItem('project');
    if (!saved) return;

    try {
      const data: ProjectData = JSON.parse(saved);
      if (data.projectName) setProjectName(data.projectName);
      if (data.projectDesc) setProjectDesc(data.projectDesc);
      if (Array.isArray(data.features) && data.features.length > 0)
        setFeatures(data.features);
    } catch (err) {
      console.error('Erro ao ler project do localStorage', err);
    }
  }, []);

  const adicionarItem = () => setFeatures([...features, '']);

  const atualizarItem = (index: number, valor: string) => {
    const novaLista = [...features];
    novaLista[index] = valor;
    setFeatures(novaLista);
  };

  const removerItem = (index: number) => {
    const novaLista = features.filter((_, i) => i !== index);
    setFeatures(novaLista.length > 0 ? novaLista : ['']);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data: ProjectData = {
      projectName: projectName.trim(),
      projectDesc: projectDesc.trim() || null,
      features: features.filter((f) => f.trim() !== ''),
    };

    localStorage.setItem('project', JSON.stringify(data));

    props.setCurrentComponent('recibo');
  };

  const backToPrevComponent = () => props.setCurrentComponent('calculator');

  return (
    <Form theme={props.theme} onSubmit={handleSubmit}>
      <div>
        <label htmlFor='project-name'>Nome do Projeto</label>
        <input
          required
          type='text'
          name='project-name'
          id='project-name'
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor='project-desc'>Descrição do Projeto</label>
        <input
          type='text'
          name='project-desc'
          id='project-desc'
          value={projectDesc}
          onChange={(e) => setProjectDesc(e.target.value)}
        />
      </div>

      <div>
        <label>Features do Projeto:</label>
        {features.map((item, index) => (
          <div
            key={index}
            style={{ display: 'flex', gap: '8px', marginBottom: '4px' }}>
            <input
              type='text'
              value={item}
              placeholder={`Item ${index + 1}`}
              onChange={(e) => atualizarItem(index, e.target.value)}
              style={{ flex: 1 }}
            />
            <button
              type='button'
              className='remove'
              onClick={() => removerItem(index)}>
              <IoMdCloseCircle className='icon' />
            </button>
          </div>
        ))}
        <button type='button' className='add' onClick={adicionarItem}>
          + Adicionar item
        </button>
      </div>

      <div>
        <button type='submit'>Próximo</button>
        <button className='back-button' onClick={backToPrevComponent}>
          {'<-- '} Voltar
        </button>
      </div>
    </Form>
  );
}
