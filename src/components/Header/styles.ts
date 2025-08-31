import styled from 'styled-components';
import type { ThemeAvailableColors } from '../../styles/theme';
import { HEADER_HEIGHT } from './constants';

export const Container = styled.header<{
  theme: ThemeAvailableColors;
}>`
  .add-margin {
    height: ${HEADER_HEIGHT}px;
  }

  .wrapper {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: ${HEADER_HEIGHT}px;
    background-color: ${(props) => props.theme.header.bg};
    box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.3);
    display: flex;
    align-items: center;
    z-index: 999;
  }

  .align-right {
    display: flex;
    justify-content: center;
    gap: 10px;
    align-items: center;
    margin-left: auto;
    margin-right: 30px;
  }

  .align-left {
    position: absolute;
    left: 30px;
    top: 50%;
    transform: translateY(-50%);

    img {
      width: 50px;
      cursor: pointer;
      border-radius: 40px;
    }
  }
`;
