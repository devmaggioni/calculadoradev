import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

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
const Container = styled.div`
  min-height: 100vh;
  background: #0a0a0a;
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
const Header = styled.header`
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

const Nav = styled.nav`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

// Hero Section
const HeroSection = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6rem 2rem 2rem;
  position: relative;

  @media (max-width: 768px) {
    padding: 8rem 1rem 2rem;
    text-align: center;
  }
`;

const HeroContent = styled.div`
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

const HeroText = styled.div`
  animation: ${fadeIn} 1s ease-out;
`;

const HeroTitle = styled.h1`
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 1.5rem;

  .gradient {
    background: linear-gradient(135deg, #3b82f6, #8b5cf6, #ec4899);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.25rem;
  color: #94a3b8;
  line-height: 1.6;
  margin-bottom: 2rem;
  max-width: 500px;

  @media (max-width: 768px) {
    font-size: 1.1rem;
    max-width: none;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
  }
`;

const PrimaryButton = styled.button`
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

const SecondaryButton = styled.button`
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
const HeroVisual = styled.div`
  position: relative;
  animation: ${fadeIn} 1s ease-out 0.3s both;

  @media (max-width: 768px) {
    order: -1;
  }
`;

const MockupCard = styled.div`
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
const FeaturesSection = styled.section`
  padding: 6rem 2rem;
  background: linear-gradient(180deg, #0a0a0a 0%, #111111 100%);
`;

const FeaturesContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
`;

const SectionTitle = styled.h2`
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

const SectionSubtitle = styled.p`
  font-size: 1.2rem;
  color: #94a3b8;
  margin-bottom: 4rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 3rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const FeatureCard = styled.div`
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
    color: white;
  }

  p {
    color: #94a3b8;
    line-height: 1.6;
  }
`;

// Stats Section
const StatsSection = styled.section`
  padding: 4rem 2rem;
  background: rgba(59, 130, 246, 0.05);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const StatsGrid = styled.div`
  max-width: 800px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  text-align: center;
`;

const StatItem = styled.div`
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
const CTASection = styled.section`
  padding: 6rem 2rem;
  text-align: center;
  background: linear-gradient(
    135deg,
    rgba(59, 130, 246, 0.1),
    rgba(139, 92, 246, 0.1)
  );
`;

const CTAContent = styled.div`
  max-width: 600px;
  margin: 0 auto;

  h2 {
    font-size: clamp(2rem, 4vw, 2.5rem);
    font-weight: 700;
    margin-bottom: 1rem;
  }

  p {
    font-size: 1.2rem;
    color: #94a3b8;
    margin-bottom: 2rem;
  }
`;

type Props = {
  setCurrentComponent: (s: string) => void;
};

export default function Home(props: Props) {
  const features = [
    {
      icon: '🧮',
      title: 'Calculadora Inteligente',
      description:
        'Calcule preços justos baseados em complexidade, horas e valor de mercado. Nunca mais trabalhe de graça.',
    },
    {
      icon: '📄',
      title: 'Orçamentos Profissionais',
      description:
        'Gere propostas elegantes em PDF que impressionam clientes e aumentam sua taxa de aprovação.',
    },
    {
      icon: '✍️',
      title: 'Contratos Digitais',
      description:
        'Crie contratos completos com assinatura digital integrada. Tudo organizado e profissional.',
    },
  ];

  return (
    <Container>
      <Header>
        <Nav>
          <Logo>PriceCraft</Logo>
        </Nav>
      </Header>

      <HeroSection>
        <HeroContent>
          <HeroText>
            <HeroTitle>
              Pare de cobrar <span className='gradient'>menos</span> do que vale
              seu trabalho
            </HeroTitle>
            <HeroSubtitle>
              A plataforma definitiva para calcular preços justos, gerar
              orçamentos profissionais e fechar mais contratos.
            </HeroSubtitle>
            <ButtonGroup>
              <PrimaryButton
                onClick={() => props.setCurrentComponent('calculator')}>
                Começar Grátis
              </PrimaryButton>
              <SecondaryButton>Ver Demo</SecondaryButton>
            </ButtonGroup>
          </HeroText>

          <HeroVisual>
            <MockupCard>
              <h3>{'<<SEU PROJETO>>'}</h3>
              <div className='price'>R$ 15.750</div>
              <div className='details'>
                • 120 horas de desenvolvimento
                <br />
                • Complexidade média
                <br />
                • Inclui planejamento e testes
                <br />• Contrato digital incluído
              </div>
            </MockupCard>
          </HeroVisual>
        </HeroContent>
      </HeroSection>

      <StatsSection>
        <StatsGrid>
          <StatItem>
            <div className='number'>156%</div>
            <div className='label'>Aumento médio nos preços</div>
          </StatItem>
          <StatItem>
            <div className='number'>2.3x</div>
            <div className='label'>Mais contratos fechados</div>
          </StatItem>
          <StatItem>
            <div className='number'>95%</div>
            <div className='label'>Taxa de aprovação</div>
          </StatItem>
        </StatsGrid>
      </StatsSection>

      <FeaturesSection>
        <FeaturesContainer>
          <SectionTitle>
            Tudo que você precisa para{' '}
            <span className='gradient'>precificar</span> como um profissional
          </SectionTitle>
          <SectionSubtitle>
            Ferramentas poderosas que transformam a forma como você vende seus
            serviços
          </SectionSubtitle>

          <FeaturesGrid>
            {features.map((feature, index) => (
              <FeatureCard key={index}>
                <div className='icon'>{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </FeatureCard>
            ))}
          </FeaturesGrid>
        </FeaturesContainer>
      </FeaturesSection>

      <CTASection>
        <CTAContent>
          <h2>Pronto para valorizar seu trabalho?</h2>
          <p>
            Junte-se a milhares de desenvolvedores que já descobriram como
            cobrar o que realmente valem.
          </p>
          <PrimaryButton
            onClick={() => props.setCurrentComponent('calculator')}>
            Começar Agora - É Grátis
          </PrimaryButton>
        </CTAContent>
      </CTASection>
    </Container>
  );
}
