import type { ReactNode } from 'react';
import { StyledMain } from './styles';
import type { ThemeAvailableColors } from '../../styles/theme';

// snippets prontos
const theSnippets = {
  red: {
    color: 'red',
  },
  'flex:center': {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
} as const;

// pega as chaves automaticamente
type SnippetsType = keyof typeof theSnippets;

export type Props = {
  theme: ThemeAvailableColors;
  children?: ReactNode;
  snippets?: string; // agora é string separada por vírgula
};

export default function Wrapper(props: Props) {
  if (!props.snippets) return <StyledMain>{props.children}</StyledMain>;

  // transforma a string em array de chaves, removendo espaços extras
  const snippetArray = props.snippets
    .split(',')
    .map((s) => s.trim())
    .filter((s): s is SnippetsType => s in theSnippets);

  // mescla todos os estilos
  const combinedStyle = Object.assign(
    {},
    ...snippetArray.map((key) => theSnippets[key]),
  );

  return (
    <StyledMain theme={props.theme} style={combinedStyle}>
      {props.children}
    </StyledMain>
  );
}
