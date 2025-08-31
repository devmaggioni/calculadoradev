import { keyframes } from 'styled-components';

export const showMenu = keyframes`
  0% {
    filter: blur(1px);
    opacity: 0;
    transform: translateX(300px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const hideMenu = keyframes`
  0% {
    opacity: 1;
    transform: translateX(0);
  }
  100% {
    filter: blur(5px);
    opacity: 0;
    transform: translateX(500px);
  }
`;

export const showAsideMenu = keyframes`
  0% {
    transform: translateX(-310px);
    height: 5px;
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.01);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px); /* suporte Safari */
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1); /* sombra suave */
  }
  100% {
    transform: translateX(0);
  }
`;

export const hideAsideMenu = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-325px);
    height: 5px;
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.01);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px); /* suporte Safari */
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1); /* sombra suave */
  }
`;
