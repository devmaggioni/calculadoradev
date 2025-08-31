import styled from 'styled-components';
import type { ThemeAvailableColors } from '../../styles/theme';

export const StyledMain = styled.main<{
  theme: ThemeAvailableColors;
}>`
  padding: 40px 0;
  width: 100%;
  min-height: 95dvh;
  background-color: ${(props) => props.theme.body.bg};
  overflow: hidden;
`;
