import type { HamburguerProps } from '../../types.ts';
import { Container } from './styles';

export default function Hamburguer(props: HamburguerProps) {
  const getStrokeColor = () => {
    if (props.menuIsOpen) {
      return props.theme.hamburguer.close;
    }
    return props.theme.hamburguer.open;
  };

  return (
    <Container mobileBreakPoint={props.mobileBreakPoint}>
      <label className='hamburger'>
        <input
          checked={props.menuIsOpen}
          type='checkbox'
          onChange={props.handleMenu}
          aria-label='Toggle menu'
        />
        <svg viewBox='0 0 32 32'>
          <path
            stroke={getStrokeColor()}
            className='line line-top-bottom'
            d='M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22'
          />
          <path stroke={getStrokeColor()} className='line' d='M7 16 27 16' />
        </svg>
      </label>
    </Container>
  );
}
