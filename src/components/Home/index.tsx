import type { ThemeAvailableColors } from '../../styles/theme';
import {
  Container,
  HeroSection,
  HeroContent,
  HeroText,
  HeroTitle,
  HeroSubtitle,
  ButtonGroup,
  PrimaryButton,
  CTAContent,
  HeroVisual,
  MockupCard,
  FeaturesSection,
  FeaturesContainer,
  SectionTitle,
  SectionSubtitle,
  FeaturesGrid,
  FeatureCard,
  StatsSection,
  StatsGrid,
  StatItem,
  CTASection,
} from './styles';

type Props = {
  theme: ThemeAvailableColors;
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
      title: 'Modelos de contratos',
      description:
        'Baixe um modelo de contrato antes de fechar negócio! Pode te livrar de encrenca!',
    },
  ];

  return (
    <Container theme={props.theme}>
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
                Começar Agora - É Grátis
              </PrimaryButton>
              {/**<SecondaryButton>Ver Demo</SecondaryButton> */}
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
