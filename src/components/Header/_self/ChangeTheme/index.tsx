import type { ChangeThemeProps } from '../../types.ts';
import { Container } from './styles';

export default function ChangeTheme(props: ChangeThemeProps) {
  const isLightTheme = props.currentTheme === 'light';

  return (
    <Container $mobileBreakPoint={props.mobileBreakPoint}>
      <input
        checked={isLightTheme}
        onChange={props.toggleTheme}
        type='checkbox'
        aria-label='Toggle theme'
      />
      <span className='slider'></span>
    </Container>
  );
}
