import styled, { keyframes, css } from 'styled-components';

// animações
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const float = keyframes`
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(10deg);
  }
`;

// ocupa tela toda
export const BackgroundWrapper = styled.div`
  font-family:
    'Inter',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    Oxygen,
    Ubuntu,
    Cantarell,
    sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #333;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative; /* para shapes ficarem absolutos dentro */
  overflow: hidden;
`;

// caixa de conteúdo centralizada
export const Container = styled.div`
  text-align: center;
  padding: 2rem;
  max-width: 600px;
  animation: ${fadeInUp} 0.8s ease-out;
  z-index: 2;
`;

export const ErrorNumber = styled.div`
  font-size: clamp(8rem, 15vw, 12rem);
  font-weight: 800;
  color: rgba(255, 255, 255, 0.1);
  line-height: 1;
  margin-bottom: -2rem;
  position: relative;
  z-index: 1;
`;

export const ErrorTitle = styled.h1`
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 700;
  color: white;
  margin-bottom: 1rem;
  position: relative;
  z-index: 2;
`;

export const ErrorMessage = styled.p`
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 2.5rem;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 2rem;
  }
`;

export const HomeButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  text-decoration: none;
  border-radius: 50px;
  border: 2px solid rgba(255, 255, 255, 0.2);
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.4);
    transform: translateY(-2px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 768px) {
    padding: 0.8rem 1.5rem;
    font-size: 0.9rem;
  }
`;

export const FloatingShapes = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 0;
`;

type ShapeProps = { variant: 1 | 2 | 3 | 4 };

export const Shape = styled.div<ShapeProps>`
  position: absolute;
  background: rgba(255, 255, 255, 0.1);
  animation: ${float} 6s ease-in-out infinite;

  ${({ variant }) =>
    variant === 1 &&
    css`
      width: 80px;
      height: 80px;
      top: 20%;
      left: 10%;
      border-radius: 50%;
      animation-delay: 0s;
    `}

  ${({ variant }) =>
    variant === 2 &&
    css`
      width: 120px;
      height: 120px;
      top: 60%;
      right: 10%;
      border-radius: 20px;
      animation-delay: 2s;
    `}

  ${({ variant }) =>
    variant === 3 &&
    css`
      width: 60px;
      height: 60px;
      top: 10%;
      right: 20%;
      border-radius: 50%;
      animation-delay: 4s;
    `}

  ${({ variant }) =>
    variant === 4 &&
    css`
      width: 100px;
      height: 100px;
      bottom: 20%;
      left: 20%;
      border-radius: 15px;
      animation-delay: 1s;
    `}
`;
