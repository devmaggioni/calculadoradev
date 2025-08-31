import styled, { keyframes } from 'styled-components';
import type { ThemeAvailableColors } from '../../styles/theme';

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
`;

const shimmer = keyframes`
  0% { background-position: -200px 0; }
  100% { background-position: calc(200px + 100%) 0; }
`;

// Main Container
export const Container = styled.div<{
  theme: ThemeAvailableColors;
}>`
  min-height: 100vh;
  background: ${(props) => props.theme.body.bg};
  color: white;
  font-family:
    'Inter',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  overflow-x: hidden;
`;

// Header
export const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  padding: 1rem 2rem;
  background: rgba(10, 10, 10, 0.8);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

export const Nav = styled.nav`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

// Hero Section
export const HeroSection = styled.section`
  min-height: 100dvh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6rem 2rem 2rem;
  position: relative;

  @media (max-width: 768px) {
    min-height: 10vh;
    padding: 8rem 1rem 2rem;
    text-align: center;
  }
`;

export const HeroContent = styled.div`
  max-width: 1200px;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
`;

export const HeroText = styled.div`
  animation: ${fadeIn} 1s ease-out;
`;

export const HeroTitle = styled.h1<{
  theme: ThemeAvailableColors;
}>`
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 1.5rem;
  color: ${(props) => props.theme.body.title};

  .gradient {
    background: linear-gradient(135deg, #3b82f6, #8b5cf6, #ec4899);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`;

export const HeroSubtitle = styled.p<{
  theme: ThemeAvailableColors;
}>`
  font-size: 1.25rem;
  color: ${(props) => props.theme.body.text};
  line-height: 1.6;
  margin-bottom: 2rem;
  max-width: 500px;

  @media (max-width: 768px) {
    font-size: 1.1rem;
    max-width: none;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
  }
`;

export const PrimaryButton = styled.button`
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  border: none;
  color: white;
  padding: 1rem 2rem;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    transition: left 0.5s;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 20px 40px rgba(59, 130, 246, 0.3);

    &::before {
      left: 100%;
    }
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 1.2rem 2rem;
  }
`;

export const SecondaryButton = styled.button`
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  padding: 1rem 2rem;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 1.2rem 2rem;
  }
`;

// Hero Visual
export const HeroVisual = styled.div`
  position: relative;
  animation: ${fadeIn} 1s ease-out 0.3s both;

  @media (max-width: 768px) {
    order: -1;
  }
`;

export const MockupCard = styled.div`
  @media screen and (max-width: 750px) {
    display: none;
  }
  background: linear-gradient(
    135deg,
    rgba(59, 130, 246, 0.1),
    rgba(139, 92, 246, 0.1)
  );
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 2rem;
  backdrop-filter: blur(12px);
  animation: ${float} 6s ease-in-out infinite;

  h3 {
    color: #3b82f6;
    margin-bottom: 1rem;
    font-size: 1.2rem;
  }

  .price {
    font-size: 2rem;
    font-weight: 700;
    color: #10b981;
    margin: 0.5rem 0;
  }

  .details {
    color: #94a3b8;
    font-size: 0.9rem;
    line-height: 1.5;
  }
`;

// Features Section
export const FeaturesSection = styled.section<{
  theme: ThemeAvailableColors;
}>`
  padding: 6rem 2rem;
  background: ${(props) => props.theme.body.bg};
  color: ${(props) => props.theme.body.text};
`;

export const FeaturesContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
`;

export const SectionTitle = styled.h2`
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 700;
  margin-bottom: 1rem;

  .gradient {
    background: linear-gradient(135deg, #3b82f6, #8b5cf6);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`;

export const SectionSubtitle = styled.p`
  font-size: 1.2rem;
  color: #94a3b8;
  margin-bottom: 4rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

export const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 3rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

export const FeatureCard = styled.div<{
  theme: ThemeAvailableColors;
}>`
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 2rem;
  text-align: left;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(59, 130, 246, 0.3);
    transform: translateY(-5px);
  }

  .icon {
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, #3b82f6, #8b5cf6);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
  }

  h3 {
    font-size: 1.3rem;
    font-weight: 600;
    margin-bottom: 1rem;
    color: ${(props) => props.theme.body.text};
  }

  p {
    color: ${(props) => props.theme.body.text};
    line-height: 1.6;
  }
`;

// Stats Section
export const StatsSection = styled.section`
  padding: 4rem 2rem;
  background: rgba(59, 130, 246, 0.05);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

export const StatsGrid = styled.div`
  max-width: 800px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  text-align: center;
`;

export const StatItem = styled.div`
  .number {
    font-size: 2.5rem;
    font-weight: 800;
    background: linear-gradient(135deg, #3b82f6, #8b5cf6);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .label {
    color: #94a3b8;
    margin-top: 0.5rem;
  }
`;

// CTA Section
export const CTASection = styled.section`
  padding: 6rem 2rem;
  text-align: center;
  background: linear-gradient(
    135deg,
    rgba(59, 130, 246, 0.1),
    rgba(139, 92, 246, 0.1)
  );
`;

export const CTAContent = styled.div<{
  theme: ThemeAvailableColors;
}>`
  max-width: 600px;
  margin: 0 auto;

  h2 {
    font-size: clamp(2rem, 4vw, 2.5rem);
    font-weight: 700;
    margin-bottom: 1rem;
    color: ${(props) => props.theme.body.text};
  }

  p {
    font-size: 1.2rem;
    color: ${(props) => props.theme.body.text};
    margin-bottom: 2rem;
  }
`;
