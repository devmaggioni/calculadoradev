import {
  Document,
  Page,
  Text,
  View,
  PDFDownloadLink,
} from '@react-pdf/renderer';
import type { ThemeAvailableColors } from '../../styles/theme';
import { pdfStyles, componentStyles } from './styles';

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
      <View style={pdfStyles.contractorSection}>
        <Text style={pdfStyles.contractorInfo}>
          <Text style={pdfStyles.bold}>CONTRATANTE:</Text> {d?.nomeCliente}
        </Text>
        <Text style={pdfStyles.contractorInfo}>
          <Text style={pdfStyles.bold}>CNPJ/CPF:</Text> {d?.docCliente}
        </Text>
        <Text style={pdfStyles.contractorInfo}>
          <Text style={pdfStyles.bold}>Profissão:</Text> {d?.profissaoCliente}
        </Text>
        <Text style={pdfStyles.contractorInfo}>
          <Text style={pdfStyles.bold}>Endereço:</Text> {d?.enderecoCliente}
        </Text>
        {d?.isCnpjClient && (
          <>
            <Text style={pdfStyles.contractorInfo}>
              <Text style={pdfStyles.bold}>Empresa:</Text> {d.cnpjClienteNome}
            </Text>
            <Text style={pdfStyles.contractorInfo}>
              <Text style={pdfStyles.bold}>CNPJ:</Text> {d.cnpjCliente}
            </Text>
            <Text style={pdfStyles.contractorInfo}>
              <Text style={pdfStyles.bold}>Endereço da Empresa:</Text>{' '}
              {d.cnpjClienteEndereco}
            </Text>
          </>
        )}
      </View>
      {/* CONTRATADO */}
      <View style={pdfStyles.contractorSection}>
        <Text style={pdfStyles.contractorInfo}>
          <Text style={pdfStyles.bold}>CONTRATADO:</Text> {d?.nomePrestador}
        </Text>
        <Text style={pdfStyles.contractorInfo}>
          <Text style={pdfStyles.bold}>CNPJ/CPF:</Text> {d?.docPrestador}
        </Text>
        <Text style={pdfStyles.contractorInfo}>
          <Text style={pdfStyles.bold}>Profissão:</Text> {d?.profissaoPrestador}
        </Text>
        <Text style={pdfStyles.contractorInfo}>
          <Text style={pdfStyles.bold}>Endereço:</Text> {d?.enderecoPrestador}
        </Text>
      </View>
    </>
  );
};

// Componente para definições
const Definitions = () => (
  <>
    <Text style={pdfStyles.subtitle}>DEFINIÇÕES</Text>
    <View style={pdfStyles.definitionItem}>
      <Text style={pdfStyles.paragraph}>
        <Text style={pdfStyles.bold}>Bug/Defeito:</Text> Falha no software que
        impede funcionalidade especificada de executar conforme documentado,
        causa erro de sistema, travamento, compromete segurança, ou apresenta
        incompatibilidade com ambientes especificados.
      </Text>
    </View>
    <View style={pdfStyles.definitionItem}>
      <Text style={pdfStyles.paragraph}>
        <Text style={pdfStyles.bold}>Consumidor Final (B2C):</Text> Pessoa
        física que contrata para uso pessoal, não relacionado à atividade
        comercial.
      </Text>
    </View>
    <View style={pdfStyles.definitionItem}>
      <Text style={pdfStyles.paragraph}>
        <Text style={pdfStyles.bold}>Pessoa Jurídica/Empresário (B2B):</Text>{' '}
        Pessoa jurídica ou física que contrata para atividade comercial,
        empresarial ou profissional.
      </Text>
    </View>
    <View style={pdfStyles.definitionItem}>
      <Text style={pdfStyles.paragraph}>
        <Text style={pdfStyles.bold}>Chamado:</Text> Conjunto de problemas
        relacionados a um único incidente reportado simultaneamente pelo
        CONTRATANTE, devidamente documentado.
      </Text>
    </View>
  </>
);

// CLÁUSULA 1 — OBJETO E ESCOPO
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

  return (
    <>
      <Text style={pdfStyles.clauseTitle}>CLÁUSULA 1 — OBJETO E ESCOPO</Text>
      <Text style={pdfStyles.paragraph}>
        1.1 O presente Contrato tem por objeto a prestação, pelo CONTRATADO ao
        CONTRATANTE, de serviços de desenvolvimento de software conforme
        especificado abaixo.
      </Text>
      <Text style={pdfStyles.paragraph}>
        1.2 <Text style={pdfStyles.bold}>ESPECIFICAÇÕES DO PROJETO:</Text>
      </Text>
      <Text style={pdfStyles.listItem}>
        • <Text style={pdfStyles.bold}>Nome do Projeto:</Text>
        {project!.projectName}
      </Text>
      <Text style={pdfStyles.listItem}>
        • <Text style={pdfStyles.bold}>Valor Total:</Text> {valorTotalFormatado}
      </Text>
      <Text style={pdfStyles.listItem}>
        • <Text style={pdfStyles.bold}>Prazo:</Text> {calculator.diasDeProjeto}{' '}
        dias úteis
      </Text>
      <Text style={pdfStyles.listItem}>
        • <Text style={pdfStyles.bold}>Valor/Hora para Extras:</Text>{' '}
        {valorHorasExtras}
      </Text>
      <Text style={pdfStyles.listItem}>
        • <Text style={pdfStyles.bold}>Horas Previstas:</Text>{' '}
        {calculator.diasDeProjeto * calculator.horasPorDia} horas
      </Text>
      <Text style={pdfStyles.paragraph}>
        1.3 <Text style={pdfStyles.bold}>FUNCIONALIDADES INCLUÍDAS:</Text>
      </Text>
      {(project.features as []) &&
        project.features.map((item: string, index: number) => {
          return (
            <Text key={index} style={pdfStyles.listItem}>
              • <Text style={pdfStyles.bold}>{index}:</Text> {item}
            </Text>
          );
        })}
      <Text style={pdfStyles.paragraph}>
        1.4 <Text style={pdfStyles.bold}>ESCOPO DEFINIDO:</Text> O escopo do
        projeto compreende exclusivamente as funcionalidades listadas acima.
        Solicitações adicionais serão tratadas como serviços extras mediante
        novo orçamento.
      </Text>
      <Text style={pdfStyles.paragraph}>
        1.5 <Text style={pdfStyles.bold}>LIMITE DE REVISÕES:</Text> O escopo
        inclui até 2 (duas) rodadas de revisões por entrega. Para entregas
        parciais: prazo de análise de até 3 dias úteis; para entrega final: até
        5 dias úteis. Revisões adicionais serão cobradas conforme valor/hora
        especificado.
      </Text>
    </>
  );
};

// CLÁUSULA 2 — PRAZO, ENTREGA E ACEITE
const Clause2 = () => {
  return (
    <>
      <Text style={pdfStyles.clauseTitle}>
        CLÁUSULA 2 — PRAZO, ENTREGA E ACEITE
      </Text>
      <Text style={pdfStyles.paragraph}>
        2.1 O prazo de entrega é contado a partir do pagamento da primeira
        parcela e da disponibilização de todos os materiais necessários pelo
        CONTRATANTE, podendo ser prorrogado por alterações de escopo, atraso no
        envio de materiais ou circunstâncias de força maior.
      </Text>
      <Text style={pdfStyles.paragraph}>
        2.2 <Text style={pdfStyles.bold}>FORNECIMENTO DE MATERIAIS:</Text> O
        CONTRATANTE compromete-se a fornecer todos os materiais necessários
        (logos, textos, credenciais, especificações) em até 5 dias úteis após
        assinatura. O atraso superior a 7 dias poderá suspender o cronograma até
        regularização. Após 20 dias de suspensão, qualquer das partes poderá
        rescindir o contrato.
      </Text>
      <Text style={pdfStyles.paragraph}>
        2.3 <Text style={pdfStyles.bold}>ENTREGA INCLUIRÁ:</Text> (a) software
        funcional conforme especificado; (b) documentação básica de uso; (c)
        código-fonte quando acordado; (d) estrutura de banco de dados.
      </Text>
      <Text style={pdfStyles.paragraph}>
        2.4 <Text style={pdfStyles.bold}>PROCESSO DE ACEITE:</Text> Após
        notificação de entrega, o CONTRATANTE terá 7 dias úteis para análise e
        manifestação. Eventuais rejeições devem ser fundamentadas e específicas,
        indicando os pontos não atendidos com base nas especificações
        contratuais. Não havendo manifestação no prazo, considera-se aceite
        tácito.
      </Text>
    </>
  );
};

// CLÁUSULA 3 — PREÇO E PAGAMENTO
const Clause3 = () => {
  const d = getDataFromLC(localStorage, 'info-contrato');
  return (
    <>
      <Text style={pdfStyles.clauseTitle}>CLÁUSULA 3 — PREÇO E PAGAMENTO</Text>
      <Text style={pdfStyles.paragraph}>
        3.1 <Text style={pdfStyles.bold}>FORMA DE PAGAMENTO:</Text>
      </Text>
      <Text style={pdfStyles.listItem}>
        •{' '}
        <Text style={pdfStyles.bold}>
          A forma de pagamento se dará da seguinte forma:
        </Text>
        {(d!.pagamento === '40/60' &&
          '40% de entrada, e 60% na hora da entrega.') ||
          (d!.pagamento === '50/50' &&
            '50% de entrada, e 50% na hora da entrega.') ||
          d!.descPagamento}
      </Text>
      <Text style={pdfStyles.listItem}>
        • <Text style={pdfStyles.bold}>Projetos superiores a 45 dias:</Text>{' '}
        Parcelamento conforme cronograma acordado, com parcelas vinculadas a
        entregas de marcos do projeto
      </Text>
      <Text style={pdfStyles.paragraph}>
        3.2 <Text style={pdfStyles.bold}>ATRASO DE PAGAMENTO:</Text> Juros de 1%
        ao mês, multa de 2% sobre o valor em atraso, mais correção monetária
        pelo IPCA.
      </Text>
      <Text style={pdfStyles.paragraph}>
        3.3 <Text style={pdfStyles.bold}>REAJUSTE:</Text> Para projetos com
        duração superior a 90 dias, aplicação de reajuste pelo IPCA nas parcelas
        vincendas após o terceiro mês.
      </Text>
    </>
  );
};

// CLÁUSULA 4 — GARANTIA E SUPORTE
const Clause4 = () => {
  return (
    <>
      <Text style={pdfStyles.clauseTitle}>CLÁUSULA 4 — GARANTIA E SUPORTE</Text>
      <Text style={pdfStyles.paragraph}>
        4.1 <Text style={pdfStyles.bold}>GARANTIA TÉCNICA:</Text> 60 dias
        corridos após aceite final, limitada à correção de defeitos de
        funcionamento conforme especificações originais do projeto.
      </Text>
      <Text style={pdfStyles.paragraph}>
        4.2 <Text style={pdfStyles.bold}>EXCLUSÕES DA GARANTIA:</Text>{' '}
        Modificações realizadas por terceiros, instalação em ambiente
        inadequado, uso fora das especificações originais ou problemas
        decorrentes de atualizações de terceiros.
      </Text>
      <Text style={pdfStyles.paragraph}>
        4.3 <Text style={pdfStyles.bold}>SUPORTE GRATUITO:</Text> Limitado a
        correções de bugs comprovados, até 2 horas por chamado, máximo de 2
        chamados por mês durante o período de garantia.
      </Text>
      <Text style={pdfStyles.paragraph}>
        4.4 <Text style={pdfStyles.bold}>PRAZO DE ATENDIMENTO:</Text> Resposta
        em até 48 horas úteis; correções urgentes em até 5 dias úteis; demais
        correções em até 10 dias úteis.
      </Text>
    </>
  );
};

// CLÁUSULA 5 — PROPRIEDADE INTELECTUAL
const Clause5 = () => {
  return (
    <>
      <Text style={pdfStyles.clauseTitle}>
        CLÁUSULA 5 — PROPRIEDADE INTELECTUAL
      </Text>
      <Text style={pdfStyles.paragraph}>
        5.1 <Text style={pdfStyles.bold}>DIREITOS AUTORAIS:</Text> O CONTRATADO
        mantém os direitos autorais sobre o código desenvolvido, concedendo ao
        CONTRATANTE licença de uso conforme Lei nº 9.609/1998. Cessão de
        direitos patrimoniais mediante negociação específica.
      </Text>
      <Text style={pdfStyles.paragraph}>
        5.2 <Text style={pdfStyles.bold}>LICENÇA DE USO:</Text> Concede-se ao
        CONTRATANTE licença não exclusiva para uso interno do sistema, incluindo
        modificações necessárias para adequação ao negócio. Vedada a revenda ou
        sublicenciamento comercial.
      </Text>
      <Text style={pdfStyles.paragraph}>
        5.3 <Text style={pdfStyles.bold}>CÓDIGO-FONTE:</Text> Quando acordada
        sua entrega, será disponibilizado após quitação integral do projeto,
        podendo ser fornecido em etapas conforme pagamentos.
      </Text>
      <Text style={pdfStyles.paragraph}>
        5.4 <Text style={pdfStyles.bold}>COMPONENTES DE TERCEIROS:</Text>{' '}
        Bibliotecas, frameworks e códigos desenvolvidos pelo CONTRATADO para
        outros projetos permanecem de sua propriedade, mesmo quando integrados
        ao projeto atual.
      </Text>
    </>
  );
};

// CLÁUSULA 6 — PROTEÇÃO DE DADOS (LGPD)
const Clause6 = () => {
  return (
    <>
      <Text style={pdfStyles.clauseTitle}>
        CLÁUSULA 6 — PROTEÇÃO DE DADOS (LGPD)
      </Text>
      <Text style={pdfStyles.paragraph}>
        6.1 O CONTRATANTE é o Controlador dos dados pessoais que serão
        processados pelo sistema; o CONTRATADO atua como Operador quando houver
        acesso a dados pessoais durante o desenvolvimento.
      </Text>
      <Text style={pdfStyles.paragraph}>
        6.2 <Text style={pdfStyles.bold}>COMPROMISSOS DO CONTRATADO:</Text>{' '}
        Implementar medidas de segurança adequadas ao projeto, comunicar
        eventuais incidentes em até 48 horas, tratar dados apenas conforme
        necessário ao desenvolvimento e eliminar dados de teste após entrega.
      </Text>
      <Text style={pdfStyles.paragraph}>
        6.3 <Text style={pdfStyles.bold}>RESPONSABILIDADES:</Text> O CONTRATANTE
        responde pela conformidade legal do tratamento de dados no sistema. O
        CONTRATADO responde pela implementação adequada das medidas de segurança
        acordadas, excluindo-se eventos externos não previsíveis.
      </Text>
    </>
  );
};

// CLÁUSULA 7 — RESCISÃO
const Clause7 = () => {
  return (
    <>
      <Text style={pdfStyles.clauseTitle}>CLÁUSULA 7 — RESCISÃO</Text>
      <Text style={pdfStyles.paragraph}>
        7.1 <Text style={pdfStyles.bold}>CONSUMIDOR PESSOA FÍSICA:</Text>{' '}
        Direito de arrependimento em 7 dias corridos conforme CDC, com devolução
        proporcional descontando-se horas efetivamente trabalhadas e custos
        administrativos.
      </Text>
      <Text style={pdfStyles.paragraph}>
        7.2 <Text style={pdfStyles.bold}>PESSOA JURÍDICA:</Text> Rescisão
        antecipada mediante acordo entre as partes, com pagamento proporcional
        dos trabalhos executados e multa compensatória de 10% sobre o valor
        remanescente.
      </Text>
      <Text style={pdfStyles.paragraph}>
        7.3 <Text style={pdfStyles.bold}>RESCISÃO POR JUSTA CAUSA:</Text>{' '}
        Qualquer das partes pode rescindir por descumprimento contratual grave,
        mediante notificação e prazo de 5 dias para regularização. Em caso de
        conduta inadequada comprovada, rescisão imediata com multa de 15%.
      </Text>
    </>
  );
};

// CLÁUSULA 8 — LIMITAÇÃO DE RESPONSABILIDADE
const Clause8 = () => {
  return (
    <>
      <Text style={pdfStyles.clauseTitle}>
        CLÁUSULA 8 — LIMITAÇÃO DE RESPONSABILIDADE
      </Text>
      <Text style={pdfStyles.paragraph}>
        8.1 A responsabilidade do CONTRATADO limita-se aos danos diretos
        comprovadamente decorrentes de falha técnica em sua prestação de
        serviços.
      </Text>
      <Text style={pdfStyles.paragraph}>
        8.2 <Text style={pdfStyles.bold}>LIMITE FINANCEIRO:</Text> A
        responsabilidade máxima do CONTRATADO fica limitada ao valor total do
        contrato, exceto em casos de dolo ou violação de confidencialidade.
      </Text>
      <Text style={pdfStyles.paragraph}>
        8.3 <Text style={pdfStyles.bold}>EXCLUSÕES:</Text> Danos indiretos,
        lucros cessantes, perda de oportunidade, eventos de força maior, falhas
        de terceiros, alterações não autorizadas no código, problemas de
        infraestrutura externa.
      </Text>
    </>
  );
};

// CLÁUSULA 9 — SERVIÇOS ADICIONAIS
const Clause9 = () => {
  return (
    <>
      <Text style={pdfStyles.clauseTitle}>
        CLÁUSULA 9 — SERVIÇOS ADICIONAIS
      </Text>
      <Text style={pdfStyles.paragraph}>
        9.1 Alterações no escopo original serão orçadas separadamente mediante
        aprovação por escrito de ambas as partes.
      </Text>
      <Text style={pdfStyles.paragraph}>
        9.2 <Text style={pdfStyles.bold}>DEMANDAS ESPECIAIS:</Text>
      </Text>
      <Text style={pdfStyles.listItem}>
        • <Text style={pdfStyles.bold}>Urgente</Text> (prazo reduzido em até
        50%): acréscimo de 30%
      </Text>
      <Text style={pdfStyles.listItem}>
        • <Text style={pdfStyles.bold}>Emergencial</Text> (fora do horário
        comercial): acréscimo de 50%
      </Text>
      <Text style={pdfStyles.listItem}>
        • <Text style={pdfStyles.bold}>Crítico</Text> (final de
        semana/feriados): acréscimo de 80%
      </Text>
    </>
  );
};

// CLÁUSULA 10 — MODALIDADE E AUTONOMIA
const Clause10 = () => {
  return (
    <>
      <Text style={pdfStyles.clauseTitle}>
        CLÁUSULA 10 — MODALIDADE E AUTONOMIA
      </Text>
      <Text style={pdfStyles.paragraph}>
        10.1 Prestação de serviços autônoma, preferencialmente remota, sem
        vínculo empregatício. Horário de atendimento comercial: 9h às 18h
        (horário de Brasília).
      </Text>
      <Text style={pdfStyles.paragraph}>
        10.2 <Text style={pdfStyles.bold}>DEDICAÇÃO AO PROJETO:</Text> Para
        projetos com duração superior a 60 dias, estimativa de dedicação de até
        6 horas diárias, respeitando outros compromissos profissionais do
        CONTRATADO.
      </Text>
      <Text style={pdfStyles.paragraph}>
        10.3 O CONTRATADO mantém autonomia técnica e metodológica na execução
        dos serviços, podendo atender outros clientes concomitantemente.
      </Text>
    </>
  );
};

// CLÁUSULA 11 — HOSPEDAGEM E INFRAESTRUTURA
const Clause11 = () => {
  const d = getDataFromLC(localStorage, 'calculator');
  const valorMensalidade =
    d!.valorMensalidade &&
    parseFloat(d!.valorMensalidade).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  return (
    <>
      <Text style={pdfStyles.clauseTitle}>
        CLÁUSULA 11 — HOSPEDAGEM E INFRAESTRUTURA
      </Text>
      <Text style={pdfStyles.paragraph}>
        {(!d!.cobrarMensalidade &&
          '11.1 A hospedagem, domínio, certificados SSL e infraestrutura necessária são de responsabilidade do CONTRATANTE, salvo contratação expressa de serviços de gerenciamento.') ||
          `11.1 Os serviços de hospedagem, domínio, SSL e infraestrutura serão gerenciados pelo CONTRATADO pelo valor mensal de ${valorMensalidade}, com reajuste anual de 5%. O serviço pode ser cancelado por qualquer das partes mediante aviso de 30 dias, com migração dos dados quando solicitado.
          `}
      </Text>
      <Text style={pdfStyles.paragraph}>
        11.2 O CONTRATADO não se responsabiliza por indisponibilidades ou perda
        de dados decorrentes de falhas em provedores externos, salvo quando
        contratado especificamente para gerenciar a infraestrutura.
      </Text>
    </>
  );
};

// CLÁUSULA 12 — CONFIDENCIALIDADE
const Clause12 = () => {
  return (
    <>
      <Text style={pdfStyles.clauseTitle}>CLÁUSULA 12 — CONFIDENCIALIDADE</Text>
      <Text style={pdfStyles.paragraph}>
        12.1 As partes comprometem-se a manter sigilo sobre informações
        confidenciais trocadas durante o projeto, pelo prazo de 2 anos após o
        encerramento do contrato.
      </Text>
      <Text style={pdfStyles.paragraph}>
        12.2 O CONTRATADO poderá incluir o projeto em seu portfólio
        profissional, preservando informações confidenciais e dados sensíveis do
        CONTRATANTE.
      </Text>
    </>
  );
};

// CLÁUSULA 13 — TERCEIROS E DEPENDÊNCIAS
const Clause13 = () => {
  return (
    <>
      <Text style={pdfStyles.clauseTitle}>
        CLÁUSULA 13 — TERCEIROS E DEPENDÊNCIAS
      </Text>
      <Text style={pdfStyles.paragraph}>
        13.1 O CONTRATADO informará sobre componentes de terceiros utilizados e
        suas respectivas licenças quando relevante ao projeto.
      </Text>
      <Text style={pdfStyles.paragraph}>
        13.2 Alterações em APIs, bibliotecas ou serviços externos após a entrega
        não constituem defeito do sistema. Adaptações necessárias serão tratadas
        como serviços adicionais mediante novo orçamento.
      </Text>
    </>
  );
};

// CLÁUSULA 14 — COBRANÇA E MEDIDAS LEGAIS
const Clause14 = () => {
  return (
    <>
      <Text style={pdfStyles.clauseTitle}>
        CLÁUSULA 14 — COBRANÇA E MEDIDAS LEGAIS
      </Text>
      <Text style={pdfStyles.paragraph}>
        14.1 Em caso de inadimplência, será enviada notificação com prazo de 10
        dias para regularização, seguida de tentativa de acordo amigável antes
        de medidas judiciais.
      </Text>
      <Text style={pdfStyles.paragraph}>
        14.2 <Text style={pdfStyles.bold}>HONORÁRIOS ADVOCATÍCIOS:</Text> Em
        caso de cobrança judicial, o devedor arcará com honorários advocatícios
        de 20% sobre o valor da causa.
      </Text>
    </>
  );
};

// CLÁUSULA 15 — ESPECIFICAÇÕES TÉCNICAS
const Clause15 = () => {
  return (
    <>
      <Text style={pdfStyles.clauseTitle}>
        CLÁUSULA 15 — ESPECIFICAÇÕES TÉCNICAS
      </Text>
      <Text style={pdfStyles.paragraph}>
        15.1 <Text style={pdfStyles.bold}>REQUISITOS BÁSICOS:</Text>
        Domínio e hospedagem adequada ao projeto, conexão à internet estável -
        fornecidos pelo CONTRATANTE ou conforme acordo específico.
      </Text>
      <Text style={pdfStyles.paragraph}>
        15.2 <Text style={pdfStyles.bold}>ITENS DE ENTREGA:</Text> Sistema
        funcional, documentação de uso, código-fonte quando acordado e estrutura
        de dados conforme especificado na cláusula 2.3.
      </Text>
    </>
  );
};

// CLÁUSULA 16 — DISPOSIÇÕES FINAIS
const Clause16 = () => {
  return (
    <>
      <Text style={pdfStyles.clauseTitle}>
        CLÁUSULA 16 — DISPOSIÇÕES FINAIS
      </Text>
      <Text style={pdfStyles.paragraph}>
        16.1 <Text style={pdfStyles.bold}>VIGÊNCIA:</Text> O contrato permanece
        válido até o cumprimento de todas as obrigações por ambas as partes.
      </Text>
      <Text style={pdfStyles.paragraph}>
        16.2 <Text style={pdfStyles.bold}>CLÁUSULAS PERMANENTES:</Text>{' '}
        Propriedade intelectual, confidencialidade, limitação de
        responsabilidade e proteção de dados permanecem válidas após
        encerramento.
      </Text>
      <Text style={pdfStyles.paragraph}>
        16.3 <Text style={pdfStyles.bold}>COMUNICAÇÕES:</Text> Preferencialmente
        por e-mail com confirmação de recebimento ou por meio físico com
        comprovante de entrega.
      </Text>
      <Text style={pdfStyles.paragraph}>
        16.4 <Text style={pdfStyles.bold}>ASSINATURA ELETRÔNICA:</Text>{' '}
        Reconhecida como válida conforme legislação vigente (Lei nº
        14.063/2020).
      </Text>
      <Text style={pdfStyles.paragraph}>
        16.5 <Text style={pdfStyles.bold}>LEGISLAÇÃO APLICÁVEL:</Text> Direito
        brasileiro.
      </Text>
      <Text style={pdfStyles.paragraph}>
        16.6 <Text style={pdfStyles.bold}>FORO:</Text> Comarca da sede do
        CONTRATANTE ou CONTRATADO, conforme a situação, para dirimir eventuais
        controvérsias, vedado à qualquer outro.
      </Text>
    </>
  );
};

// Componente para assinatura
const SignatureSection = () => {
  const d = getDataFromLC(localStorage, 'info-contrato');
  return (
    <>
      <Text style={pdfStyles.paragraph}>
        Por estarem justas e contratadas, as partes assinam o presente contrato
        em duas vias de igual teor e forma.
      </Text>
      <Text style={pdfStyles.paragraph}>
        {d!.local}, ______ de ____________________________ de ______________.
      </Text>
      <View style={pdfStyles.signatureSection}>
        <View style={pdfStyles.signatureBox}>
          <Text>CONTRATANTE</Text>
        </View>
        <View style={pdfStyles.signatureBox}>
          <Text>CONTRATADO</Text>
        </View>
      </View>
    </>
  );
};

// Documento principal - fluxo contínuo sem quebras forçadas
const ContractDocument = () => (
  <Document>
    <Page size='A4' style={pdfStyles.page}>
      <Text style={pdfStyles.title}>
        Contrato de Desenvolvimento de Software
      </Text>
      <ContractorInfo />
      <Definitions />
      <Clause1 />
      <Clause2 />
      <Clause3 />
      <Clause4 />
      <Clause5 />
      <Clause6 />
      <Clause7 />
      <Clause8 />
      <Clause9 />
      <Clause10 />
      <Clause11 />
      <Clause12 />
      <Clause13 />
      <Clause14 />
      <Clause15 />
      <Clause16 />
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
    <div style={componentStyles.container}>
      <header style={componentStyles.header}>
        <h1
          style={{
            ...componentStyles.headerTitle,
            color: props.theme.body.text,
          }}>
          Contrato de Desenvolvimento de Software
        </h1>
        <p
          style={{
            ...componentStyles.headerSubtitle,
            color: props.theme.body.text,
          }}>
          Documento profissional com proteções jurídicas completas
        </p>
      </header>

      <div style={componentStyles.buttonsSection}>
        <button
          className='back-button'
          onClick={() => props.setCurrentComponent('info-contrato')}>
          {'<-- voltar'}
        </button>
        <PDFDownloadLink
          document={<ContractDocument />}
          fileName='contrato-desenvolvimento-software.pdf'>
          {({ loading }) => (
            <button
              style={componentStyles.downloadButton(loading)}
              disabled={loading}>
              {loading ? '📄 Gerando PDF...' : '📄 Baixar Modelo'}
            </button>
          )}
        </PDFDownloadLink>
      </div>

      <div style={componentStyles.featuresGrid}>
        <div style={componentStyles.featureCard('#3498db')}>
          <h3 style={componentStyles.featureTitle}>📋 Escopo Detalhado</h3>
          <p style={componentStyles.featureDescription}>
            Especificações técnicas completas, funcionalidades incluídas e
            exclusões expressas para evitar conflitos.
          </p>
        </div>

        <div style={componentStyles.featureCard('#27ae60')}>
          <h3 style={componentStyles.featureTitle}>🛡️ Proteção Legal</h3>
          <p style={componentStyles.featureDescription}>
            Cláusulas de limitação de responsabilidade, propriedade intelectual
            e proteção contra comportamento agressivo.
          </p>
        </div>

        <div style={componentStyles.featureCard('#e74c3c')}>
          <h3 style={componentStyles.featureTitle}>⚖️ LGPD Compliance</h3>
          <p style={componentStyles.featureDescription}>
            Adequação completa à Lei Geral de Proteção de Dados com
            responsabilidades bem definidas.
          </p>
        </div>

        <div style={componentStyles.featureCard('#f39c12')}>
          <h3 style={componentStyles.featureTitle}>💰 Gestão Financeira</h3>
          <p style={componentStyles.featureDescription}>
            Formas de pagamento flexíveis, tratamento de inadimplência e
            cobrança de serviços extras.
          </p>
        </div>
      </div>

      <div style={componentStyles.warningBox}>
        <strong style={componentStyles.warningTitle}>
          ⚠️ Lembrete Importante!!!
        </strong>
        <p style={componentStyles.warningText}>
          LEIA O CONTRATO ANTES DE ASSINAR! Edite conforme suas necessidades.
          Recomendamos a análise de um advogado especializado antes de fechar
          negócios. Não nos responsabilizamos por mal uso ou erros ocasionados
          por falta de conferência, esse documento é apenas um modelo, e deve
          ser lapidado por você.
        </p>
      </div>
    </div>
  );
}
