import React from 'react';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFDownloadLink,
} from '@react-pdf/renderer';
import type { ThemeAvailableColors } from '../../styles/theme';

type LCData = {
  nomePrestador: string;
  docPrestador: string;
  local: string;
  nomeCliente: string;
  docCliente: string;
  pagamento: string;
  descPagamento: string | null;
};

function getDataFromLC(lc: any, name: string) {
  const data = lc.getItem(name);
  if (!data) return null;
  return JSON.parse(data) as any;
}

// Componente para informações das partes
const ContractorInfo = () => {
  const d = getDataFromLC(localStorage, 'info-contrato');

  return (
    <>
      {/* CONTRATANTE */}
      <View style={styles.contractorSection}>
        <Text style={styles.contractorInfo}>
          <Text style={styles.bold}>CONTRATANTE:</Text> {d?.nomeCliente}
        </Text>
        <Text style={styles.contractorInfo}>
          <Text style={styles.bold}>CNPJ/CPF:</Text> {d?.docCliente}
        </Text>
        <Text style={styles.contractorInfo}>
          <Text style={styles.bold}>Profissão:</Text> {d?.profissaoCliente}
        </Text>
        <Text style={styles.contractorInfo}>
          <Text style={styles.bold}>Endereço:</Text> {d?.enderecoCliente}
        </Text>
        {d?.isCnpjClient && (
          <>
            <Text style={styles.contractorInfo}>
              <Text style={styles.bold}>Empresa:</Text> {d.cnpjClienteNome}
            </Text>
            <Text style={styles.contractorInfo}>
              <Text style={styles.bold}>CNPJ:</Text> {d.cnpjCliente}
            </Text>
            <Text style={styles.contractorInfo}>
              <Text style={styles.bold}>Endereço da Empresa:</Text>{' '}
              {d.cnpjClienteEndereco}
            </Text>
          </>
        )}
      </View>

      {/* CONTRATADO */}
      <View style={styles.contractorSection}>
        <Text style={styles.contractorInfo}>
          <Text style={styles.bold}>CONTRATADO:</Text> {d?.nomePrestador}
        </Text>
        <Text style={styles.contractorInfo}>
          <Text style={styles.bold}>CNPJ/CPF:</Text> {d?.docPrestador}
        </Text>
        <Text style={styles.contractorInfo}>
          <Text style={styles.bold}>Profissão:</Text> {d?.profissaoPrestador}
        </Text>
        <Text style={styles.contractorInfo}>
          <Text style={styles.bold}>Endereço:</Text> {d?.enderecoPrestador}
        </Text>
      </View>
    </>
  );
};

// Componente para definições
const Definitions = () => (
  <>
    <Text style={styles.subtitle}>DEFINIÇÕES</Text>

    <View style={styles.definitionItem}>
      <Text style={styles.paragraph}>
        <Text style={styles.bold}>Bug/Defeito:</Text> Falha no software que
        impede funcionalidade especificada de executar conforme documentado,
        causa erro de sistema, travamento, compromete segurança, ou apresenta
        incompatibilidade com ambientes especificados.
      </Text>
    </View>

    <View style={styles.definitionItem}>
      <Text style={styles.paragraph}>
        <Text style={styles.bold}>Consumidor Final (B2C):</Text> Pessoa física
        que contrata para uso pessoal, não relacionado à atividade comercial.
      </Text>
    </View>

    <View style={styles.definitionItem}>
      <Text style={styles.paragraph}>
        <Text style={styles.bold}>Pessoa Jurídica/Empresário (B2B):</Text>{' '}
        Pessoa jurídica ou física que contrata para atividade comercial,
        empresarial ou profissional.
      </Text>
    </View>

    <View style={styles.definitionItem}>
      <Text style={styles.paragraph}>
        <Text style={styles.bold}>Chamado:</Text> Conjunto de problemas
        relacionados a um único incidente reportado simultaneamente pelo
        CONTRATANTE, devidamente documentado.
      </Text>
    </View>
  </>
);

// Componente para Cláusula 1
const Clause1 = () => {
  const project = getDataFromLC(localStorage, 'project');
  const calculator = getDataFromLC(localStorage, 'calculator');

  const getValorTotal =
    parseFloat(calculator.hora) *
      (parseFloat(calculator.horasPorDia) *
        parseFloat(calculator.diasDeProjeto)) +
    parseFloat(calculator.complexidade);
  const valorTotalFormatado = getValorTotal.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  const valorHorasExtras = parseFloat(calculator.horaExtra).toLocaleString(
    'pt-BR',
    {
      style: 'currency',
      currency: 'BRL',
    },
  );

  //alert(JSON.stringify(project));
  return (
    <>
      <Text style={styles.clauseTitle}>CLÁUSULA 1 — OBJETO E ESCOPO</Text>

      <Text style={styles.paragraph}>
        1.1 O presente Contrato tem por objeto a prestação, pelo CONTRATADO ao
        CONTRATANTE, de serviços de desenvolvimento de software conforme
        especificado abaixo.
      </Text>

      <Text style={styles.paragraph}>
        1.2 <Text style={styles.bold}>ESPECIFICAÇÕES DO PROJETO:</Text>
      </Text>
      <Text style={styles.listItem}>
        • <Text style={styles.bold}>Nome do Projeto:</Text>
        {project!.projectName}
      </Text>
      <Text style={styles.listItem}>
        • <Text style={styles.bold}>Valor Total:</Text> {valorTotalFormatado}
      </Text>
      <Text style={styles.listItem}>
        • <Text style={styles.bold}>Prazo:</Text> {calculator.diasDeProjeto}{' '}
        dias úteis
      </Text>
      <Text style={styles.listItem}>
        • <Text style={styles.bold}>Valor/Hora para Extras:</Text>{' '}
        {valorHorasExtras}
      </Text>
      <Text style={styles.listItem}>
        • <Text style={styles.bold}>Horas Previstas:</Text>{' '}
        {calculator.diasDeProjeto * calculator.horasPorDia} horas
      </Text>

      <Text style={styles.paragraph}>
        1.3 <Text style={styles.bold}>FUNCIONALIDADES INCLUÍDAS:</Text>
      </Text>
      {(project.features as []) &&
        project.features.map((item: string, index: number) => {
          return (
            <Text key={index} style={styles.listItem}>
              • <Text style={styles.bold}>{index}:</Text> {item}
            </Text>
          );
        })}

      <Text style={styles.paragraph}>
        1.4 <Text style={styles.bold}>EXCLUSÕES EXPRESSAS:</Text> Tudo oque não
        foi expressamente citado acima, não faz parte do projeto.
      </Text>

      <Text style={styles.paragraph}>
        1.5 <Text style={styles.bold}>LIMITE DE REVISÕES:</Text> O escopo inclui
        até 2 (duas) rodadas de revisões. Para entregas parciais: até 3 dias
        úteis; para entrega final: até 7 dias úteis. Revisões adicionais serão
        cobradas conforme valor/hora especificado.
      </Text>
    </>
  );
};

// Componentes para outras cláusulas (2-5)
const ClausesGroup1 = () => {
  const d = getDataFromLC(localStorage, 'info-contrato');
  //alert(JSON.stringify(d));
  return (
    <>
      <Text style={styles.clauseTitle}>
        CLÁUSULA 2 — PRAZO, ENTREGA E ACEITE
      </Text>
      <Text style={styles.paragraph}>
        2.1 O prazo de entrega é contado do pagamento da primeira parcela e da
        disponibilização integral dos materiais pelo CONTRATANTE, podendo ser
        prorrogado por alterações substanciais de escopo, atraso no envio de
        materiais superior a 3 dias úteis, ou caso fortuito/força maior.
      </Text>
      <Text style={styles.paragraph}>
        2.2 <Text style={styles.bold}>FORNECIMENTO DE MATERIAIS:</Text> O
        CONTRATANTE terá 5 dias úteis após assinatura para fornecer todos os
        materiais necessários (logos, textos, credenciais, especificações). Após
        1ª notificação com 3 dias adicionais, haverá suspensão automática do
        cronograma. Após 15 dias de suspensão, o CONTRATADO poderá rescindir com
        retenção de 10% do valor para custos administrativos.
      </Text>
      <Text style={styles.paragraph}>
        2.3 <Text style={styles.bold}>ENTREGA TÉCNICA INCLUIRÁ:</Text> (a)
        software funcional; (b) documentação técnica; (c) código-fonte conforme
        condições acordadas; (d) banco de dados estruturado.
      </Text>
      <Text style={styles.paragraph}>
        2.4 <Text style={styles.bold}>PROCESSO DE ACEITE:</Text> Após
        notificação de entrega, o CONTRATANTE terá 7 dias úteis para
        manifestação formal. Rejeições devem ser fundamentadas e específicas,
        indicando itens não atendidos, evidências técnicas e referência objetiva
        ao especificado. Não havendo manifestação fundamentada, considera-se
        aceite tácito.
      </Text>

      <Text style={styles.clauseTitle}>CLÁUSULA 3 — PREÇO E PAGAMENTO</Text>
      <Text style={styles.paragraph}>
        3.1 <Text style={styles.bold}>FORMA DE PAGAMENTO:</Text>
      </Text>
      <Text style={styles.listItem}>
        •{' '}
        <Text style={styles.bold}>
          A forma de pagamento se dará da seguinte forma:
        </Text>
        {(d!.pagamento === '40/60' &&
          '40% de entrada, e 60% na hora da entrega.') ||
          (d!.pagamento === '50/50' &&
            '50% de entrada, e 50% na hora da entrega.') ||
          d!.descPagamento}
      </Text>
      <Text style={styles.listItem}>
        • <Text style={styles.bold}>Projetos superiores a 45 dias:</Text> Mínimo
        30% entrada, demais parcelas vinculadas a milestones com aceite formal
      </Text>
      <Text style={styles.paragraph}>
        3.2 <Text style={styles.bold}>INADIMPLÊNCIA:</Text> Juros de 1% ao mês,
        multa de 2%, correção monetária pelo IPCA/IBGE.
      </Text>
      <Text style={styles.paragraph}>
        3.3 <Text style={styles.bold}>REAJUSTE:</Text> Para projetos superiores
        a 60 dias, reajuste mensal pelo IPCA/IBGE aplicado automaticamente na
        emissão da nota fiscal.
      </Text>

      <Text style={styles.clauseTitle}>CLÁUSULA 4 — GARANTIA E SUPORTE</Text>
      <Text style={styles.paragraph}>
        4.1 <Text style={styles.bold}>GARANTIA TÉCNICA:</Text> 60 dias corridos
        após aceite, limitada à correção de bugs conforme definição contratual e
        aplicável ao software originalmente entregue.
      </Text>
      <Text style={styles.paragraph}>
        4.2 <Text style={styles.bold}>INVALIDAÇÃO DA GARANTIA:</Text> Alterações
        no código por terceiros sem autorização, instalação em ambiente
        inadequado, uso diverso das especificações originais.
      </Text>
      <Text style={styles.paragraph}>
        4.3 <Text style={styles.bold}>CORREÇÕES GRATUITAS:</Text> Limitadas a 2
        horas de trabalho por chamado, máximo 3 chamados gratuitos por mês.
        Chamados devem ser abertos em até 5 dias úteis após descoberta do
        defeito.
      </Text>
      <Text style={styles.paragraph}>
        4.4 <Text style={styles.bold}>SLA:</Text> Resposta em 48 horas úteis;
        correções críticas em 5 dias úteis; correções menores em 10 dias úteis.
      </Text>

      <Text style={styles.clauseTitle}>
        CLÁUSULA 5 — PROPRIEDADE INTELECTUAL
      </Text>
      <Text style={styles.paragraph}>
        5.1 <Text style={styles.bold}>TITULARIDADE:</Text> O CONTRATADO detém os
        direitos autorais do software nas condições da Lei nº 9.609/1998. Cessão
        de direitos patrimoniais mediante pagamento adicional e cláusula
        expressa.
      </Text>
      <Text style={styles.paragraph}>
        5.2 <Text style={styles.bold}>LICENÇA:</Text> Concede-se ao CONTRATANTE
        licença não exclusiva, intransferível, para uso interno e backup.
        Veda-se sublicenciamento, comercialização e engenharia reversa.
      </Text>
      <Text style={styles.paragraph}>
        5.3 <Text style={styles.bold}>CÓDIGO-FONTE:</Text> Entrega opcional.
        Pode ser entregue criptografado com chave liberada após quitação
        integral ou nas hipóteses de inadimplência do CONTRATADO por mais de 30
        dias.
      </Text>
      <Text style={styles.paragraph}>
        5.4 <Text style={styles.bold}>COMPONENTES REUTILIZÁVEIS:</Text>{' '}
        Bibliotecas, frameworks e códigos de autoria do CONTRATADO permanecem de
        sua propriedade, mesmo quando integrados ao código disponibilizado.
      </Text>
    </>
  );
};

// Componentes para cláusulas 6-10
const ClausesGroup2 = () => (
  <>
    <Text style={styles.clauseTitle}>
      CLÁUSULA 6 — PROTEÇÃO DE DADOS (LGPD)
    </Text>
    <Text style={styles.paragraph}>
      6.1 O CONTRATANTE é o Controlador dos dados pessoais; o CONTRATADO atua
      como Operador quando aplicável.
    </Text>
    <Text style={styles.paragraph}>
      6.2 <Text style={styles.bold}>OBRIGAÇÕES DO CONTRATADO:</Text> Implementar
      medidas técnicas adequadas, notificar incidentes em 24 horas, processar
      dados apenas conforme instruções, eliminar/devolver dados após término do
      contrato.
    </Text>
    <Text style={styles.paragraph}>
      6.3 <Text style={styles.bold}>RESPONSABILIDADE:</Text> O CONTRATANTE
      responde pela legalidade do tratamento e obtenção de bases legais. O
      CONTRATADO responde por falhas técnicas, excluindo-se ataques externos,
      danos por inadimplência do CONTRATANTE e danos indiretos não dolosos.
    </Text>

    <Text style={styles.clauseTitle}>CLÁUSULA 7 — RESCISÃO (B2B/B2C)</Text>
    <Text style={styles.paragraph}>
      7.1 <Text style={styles.bold}>CONSUMIDOR FINAL (B2C):</Text> Direito de
      arrependimento em 7 dias corridos do aceite, com devolução proporcional
      observando retenção administrativa e horas trabalhadas.
    </Text>
    <Text style={styles.paragraph}>
      7.2 <Text style={styles.bold}>PESSOA JURÍDICA (B2B):</Text> Ausência de
      direito de arrependimento. Rescisão imotivada sujeita a multa de 15% sobre
      valor não executado e aviso prévio de 5 dias úteis.
    </Text>
    <Text style={styles.paragraph}>
      7.3 <Text style={styles.bold}>RESCISÃO POR COMPORTAMENTO TÓXICO:</Text> O
      CONTRATADO pode rescindir imediatamente com multa compensatória de 20% em
      caso de ameaças, pressão psicológica, demandas abusivas, desrespeito grave
      ou tentativa de burlar cláusulas contratuais.
    </Text>

    <Text style={styles.clauseTitle}>
      CLÁUSULA 8 — LIMITAÇÃO DE RESPONSABILIDADE
    </Text>
    <Text style={styles.paragraph}>
      8.1 A responsabilidade do CONTRATADO por danos diretos fica limitada aos
      prejuízos comprovadamente causados por dolo ou culpa grave.
    </Text>
    <Text style={styles.paragraph}>
      8.2 <Text style={styles.bold}>CAP FINANCEIRO:</Text> Exceto dolo, violação
      de confidencialidade ou proteção de dados, a responsabilidade máxima será
      limitada ao valor total pago nos 12 meses anteriores ao evento.
    </Text>
    <Text style={styles.paragraph}>
      8.3 <Text style={styles.bold}>EXCLUSÕES:</Text> Danos indiretos, lucros
      cessantes, perda de oportunidade, caso fortuito/força maior, atos de
      terceiros, alterações não autorizadas, uso indevido, falhas de
      infraestrutura externa.
    </Text>

    <Text style={styles.clauseTitle}>CLÁUSULA 9 — SERVIÇOS ADICIONAIS</Text>
    <Text style={styles.paragraph}>
      9.1 Alterações substanciais serão orçadas separadamente com aprovação
      escrita.
    </Text>
    <Text style={styles.paragraph}>
      9.2 <Text style={styles.bold}>SOLICITAÇÕES ESPECIAIS:</Text>
    </Text>
    <Text style={styles.listItem}>
      • <Text style={styles.bold}>Urgente</Text> (prazo &lt; 5 dias, horário
      comercial): acréscimo de 50%
    </Text>
    <Text style={styles.listItem}>
      • <Text style={styles.bold}>Emergencial</Text> (fora do horário, fins de
      semana): acréscimo de 100%
    </Text>
    <Text style={styles.listItem}>
      • <Text style={styles.bold}>Crítico</Text> (madrugada, &lt; 24h):
      acréscimo de 150%
    </Text>

    <Text style={styles.clauseTitle}>CLÁUSULA 10 — MODALIDADE E AUTONOMIA</Text>
    <Text style={styles.paragraph}>
      10.1 Prestação remota sem vínculo empregatício; horário comercial 9h–18h
      (Brasília).
    </Text>
    <Text style={styles.paragraph}>
      10.2 <Text style={styles.bold}>LIMITE DE DEDICAÇÃO:</Text> Para projetos
      superiores a 60 dias, máximo 40 horas mensais, salvo acordo específico.
      NÃO constitui dedicação exclusiva.
    </Text>
    <Text style={styles.paragraph}>
      10.3 O CONTRATADO mantém autonomia metodológica e pode atender outros
      clientes.
    </Text>
  </>
);

// Componentes para cláusulas finais (11-16)
const ClausesGroup3 = () => (
  <>
    <Text style={styles.clauseTitle}>
      CLÁUSULA 11 — HOSPEDAGEM E INFRAESTRUTURA
    </Text>
    <Text style={styles.paragraph}>
      11.1 Hospedagem, domínio, SSL, banco de dados e infraestrutura são
      responsabilidade do CONTRATANTE, salvo contratação expressa de serviços de
      gerenciamento.
    </Text>
    <Text style={styles.paragraph}>
      11.2 O CONTRATADO não responde por indisponibilidade, performance ou perda
      de dados por falhas em provedores externos sem contrato específico de
      infraestrutura.
    </Text>

    <Text style={styles.clauseTitle}>CLÁUSULA 12 — CONFIDENCIALIDADE</Text>
    <Text style={styles.paragraph}>
      12.1 Sigilo recíproco sobre informações técnicas, comerciais e dados de
      usuários, por prazo indeterminado enquanto as informações permanecerem
      confidenciais.
    </Text>
    <Text style={styles.paragraph}>
      12.2 O CONTRATADO pode incluir o projeto em materiais promocionais,
      resguardando informações confidenciais e dados pessoais.
    </Text>

    <Text style={styles.clauseTitle}>
      CLÁUSULA 13 — TERCEIROS E DEPENDÊNCIAS
    </Text>
    <Text style={styles.paragraph}>
      13.1 O CONTRATADO informará componentes com licenças restritivas e
      eventuais riscos.
    </Text>
    <Text style={styles.paragraph}>
      13.2 Mudanças em APIs, bibliotecas ou serviços externos após entrega não
      constituem defeito. Adaptações necessárias serão orçadas como serviço
      adicional.
    </Text>

    <Text style={styles.clauseTitle}>
      CLÁUSULA 14 — COBRANÇA E MEDIDAS LEGAIS
    </Text>
    <Text style={styles.paragraph}>
      14.1 Em caso de inadimplência: notificação extrajudicial com 10 dias,
      tentativa de conciliação, medidas legais.
    </Text>
    <Text style={styles.paragraph}>
      14.2 <Text style={styles.bold}>HONORÁRIOS ADVOCATÍCIOS:</Text> 20% em caso
      de cobrança judicial.
    </Text>

    <Text style={styles.clauseTitle}>
      CLÁUSULA 15 — ESPECIFICAÇÕES TÉCNICAS
    </Text>
    <Text style={styles.paragraph}>
      15.1 <Text style={styles.bold}>TECNOLOGIAS:</Text> [Especificar backend,
      frontend, banco de dados conforme projeto]
    </Text>
    <Text style={styles.paragraph}>
      15.2 <Text style={styles.bold}>REQUISITOS MÍNIMOS:</Text>
    </Text>
    <Text style={styles.listItem}>
      • <Text style={styles.bold}>Servidor:</Text> [Especificar requisitos de
      PHP, banco, servidor web]
    </Text>
    <Text style={styles.listItem}>
      • <Text style={styles.bold}>Navegadores:</Text> Chrome 100+, Firefox 95+,
      Safari 14+, Edge 100+
    </Text>
    <Text style={styles.listItem}>
      • <Text style={styles.bold}>Performance:</Text> Carregamento máximo 3
      segundos, listagens 2 segundos
    </Text>
    <Text style={styles.paragraph}>
      15.3 <Text style={styles.bold}>ENTREGA INCLUIRÁ:</Text> Código-fonte,
      banco estruturado, manual de instalação, manual do usuário, dados de
      teste, ambiente de homologação por 30 dias.
    </Text>

    <Text style={styles.clauseTitle}>CLÁUSULA 16 — DISPOSIÇÕES FINAIS</Text>
    <Text style={styles.paragraph}>
      16.1 <Text style={styles.bold}>VIGÊNCIA:</Text> Até cumprimento integral
      das obrigações.
    </Text>
    <Text style={styles.paragraph}>
      16.2 <Text style={styles.bold}>CLÁUSULAS SOBREVIVENTES:</Text> Propriedade
      intelectual, confidencialidade, limitação de responsabilidade, proteção de
      dados.
    </Text>
    <Text style={styles.paragraph}>
      16.3 <Text style={styles.bold}>COMUNICAÇÕES:</Text> Por e-mail com
      confirmação de leitura ou correio registrado.
    </Text>
    <Text style={styles.paragraph}>
      16.4 <Text style={styles.bold}>ASSINATURA ELETRÔNICA:</Text> Válida
      conforme Lei nº 14.063/2020 e MP 2.200-2/2001.
    </Text>
    <Text style={styles.paragraph}>
      16.5 <Text style={styles.bold}>LEGISLAÇÃO:</Text> Brasileira aplicável.
    </Text>
    <Text style={styles.paragraph}>
      16.6 <Text style={styles.bold}>FORO:</Text> Comarca do CONTRATANTE ou
      cidade-sede do CONTRATADO, conforme a situação, com renúncia a qualquer
      outro.
    </Text>
  </>
);

// Componente para assinatura
const SignatureSection = () => {
  const d = getDataFromLC(localStorage, 'info-contrato');
  //alert(JSON.stringify(d));
  return (
    <>
      <Text style={styles.paragraph}>
        Por estarem justas e contratadas, as partes assinam o presente contrato
        em duas vias de igual teor e forma.
      </Text>
      <Text style={styles.paragraph}>
        {d!.local}, ______ de ____________________________ de ______________.
      </Text>
      <View style={styles.signatureSection}>
        <View style={styles.signatureBox}>
          <Text>CONTRATANTE</Text>
        </View>
        <View style={styles.signatureBox}>
          <Text>CONTRATADO</Text>
        </View>
      </View>
    </>
  );
};

// Documento principal - fluxo contínuo sem quebras forçadas
const ContractDocument = () => (
  <Document>
    <Page size='A4' style={styles.page}>
      <Text style={styles.title}>Contrato de Desenvolvimento de Software</Text>
      <ContractorInfo />
      <Definitions />
      <Clause1 />
      <ClausesGroup1 />
      <ClausesGroup2 />
      <ClausesGroup3 />
      <SignatureSection />
    </Page>
  </Document>
);

// Interface principal
type Props = {
  setCurrentComponent: (s: string) => void;
  theme: ThemeAvailableColors;
};
export default function Contrato(props: Props) {
  return (
    <div
      style={{
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
        maxWidth: '1200px',
        margin: '0 auto',
      }}>
      <header style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h1
          style={{
            color: props.theme.body.text,
            marginBottom: '10px',
            fontSize: '2.2rem',
          }}>
          Contrato de Desenvolvimento de Software
        </h1>
        <p
          style={{
            color: props.theme.body.text,
            fontSize: '1.1rem',
            margin: 0,
          }}>
          Documento profissional com proteções jurídicas completas
        </p>
      </header>

      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <button
          className='back-button'
          onClick={() => props.setCurrentComponent('info-contrato')}>
          {'<-- voltar'}
        </button>
        <PDFDownloadLink
          document={<ContractDocument />}
          fileName='contrato-desenvolvimento-software.pdf'>
          {({ blob, url, loading, error }) => (
            <button
              style={{
                padding: '18px 36px',
                backgroundColor: loading ? '#bdc3c7' : '#3498db',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                cursor: loading ? 'not-allowed' : 'pointer',
                fontSize: '18px',
                fontWeight: '600',
                transition: 'all 0.3s ease',
                boxShadow: loading
                  ? 'none'
                  : '0 4px 15px rgba(52, 152, 219, 0.3)',
                transform: loading ? 'scale(0.98)' : 'scale(1)',
              }}
              disabled={loading}>
              {loading ? '📄 Gerando PDF...' : '📄 Baixar Contrato Completo'}
            </button>
          )}
        </PDFDownloadLink>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '25px',
          marginBottom: '30px',
        }}>
        <div
          style={{
            backgroundColor: '#ecf0f1',
            padding: '25px',
            borderRadius: '12px',
            borderLeft: '5px solid #3498db',
          }}>
          <h3 style={{ color: '#2c3e50', marginTop: 0, marginBottom: '15px' }}>
            📋 Escopo Detalhado
          </h3>
          <p
            style={{
              color: '#34495e',
              fontSize: '14px',
              lineHeight: '1.6',
              margin: 0,
            }}>
            Especificações técnicas completas, funcionalidades incluídas e
            exclusões expressas para evitar conflitos.
          </p>
        </div>

        <div
          style={{
            backgroundColor: '#ecf0f1',
            padding: '25px',
            borderRadius: '12px',
            borderLeft: '5px solid #27ae60',
          }}>
          <h3 style={{ color: '#2c3e50', marginTop: 0, marginBottom: '15px' }}>
            🛡️ Proteção Legal
          </h3>
          <p
            style={{
              color: '#34495e',
              fontSize: '14px',
              lineHeight: '1.6',
              margin: 0,
            }}>
            Cláusulas de limitação de responsabilidade, propriedade intelectual
            e proteção contra comportamento tóxico.
          </p>
        </div>

        <div
          style={{
            backgroundColor: '#ecf0f1',
            padding: '25px',
            borderRadius: '12px',
            borderLeft: '5px solid #e74c3c',
          }}>
          <h3 style={{ color: '#2c3e50', marginTop: 0, marginBottom: '15px' }}>
            ⚖️ LGPD Compliance
          </h3>
          <p
            style={{
              color: '#34495e',
              fontSize: '14px',
              lineHeight: '1.6',
              margin: 0,
            }}>
            Adequação completa à Lei Geral de Proteção de Dados com
            responsabilidades bem definidas.
          </p>
        </div>

        <div
          style={{
            backgroundColor: '#ecf0f1',
            padding: '25px',
            borderRadius: '12px',
            borderLeft: '5px solid #f39c12',
          }}>
          <h3 style={{ color: '#2c3e50', marginTop: 0, marginBottom: '15px' }}>
            💰 Gestão Financeira
          </h3>
          <p
            style={{
              color: '#34495e',
              fontSize: '14px',
              lineHeight: '1.6',
              margin: 0,
            }}>
            Formas de pagamento flexíveis, tratamento de inadimplência e
            cobrança de serviços extras.
          </p>
        </div>
      </div>

      <div
        style={{
          backgroundColor: '#fff9e6',
          padding: '20px',
          borderRadius: '10px',
          border: '2px solid #f1c40f',
          textAlign: 'center',
        }}>
        <strong style={{ color: '#d68910', fontSize: '16px' }}>
          ⚠️ Lembrete Importante
        </strong>
        <p style={{ color: '#d68910', fontSize: '14px', margin: '10px 0 0 0' }}>
          Personalize os campos entre [colchetes] com as informações específicas
          do seu projeto antes de finalizar o documento.
        </p>
      </div>
    </div>
  );
}

// Estilos organizados
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 25,
    fontSize: 10,
    lineHeight: 1.4,
    fontFamily: 'Helvetica',
  },
  title: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 25,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  subtitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  clauseTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    textTransform: 'uppercase',
  },
  paragraph: {
    marginBottom: 8,
    textAlign: 'justify',
  },
  listItem: {
    marginLeft: 15,
    marginBottom: 5,
    textAlign: 'justify',
  },
  bold: {
    fontWeight: 'bold',
  },
  contractorInfo: {
    marginBottom: 6,
  },
  signatureSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 40,
    paddingTop: 30,
  },
  signatureBox: {
    width: '40%',
    textAlign: 'center',
    borderTopWidth: 1,
    borderTopColor: '#000000',
    paddingTop: 5,
  },
  definitionItem: {
    marginBottom: 10,
  },
  contractorSection: {
    marginTop: 10,
    marginBottom: 15,
  },
});
