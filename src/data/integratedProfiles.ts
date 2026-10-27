import { DimensionId, DimensionScore } from '../types/assessment';

export interface IntegratedPairAnalysis {
  id: string;
  title: string;
  dimension1: DimensionId;
  dimension2: DimensionId;
  statusTag: string;
  analysis: string;
  practicalImplication: string;
  developmentLever: string;
}

export function generateIntegratedPairs(scores: Record<DimensionId, DimensionScore>): IntegratedPairAnalysis[] {
  const sAutoconsciencia = scores.autoconsciencia?.score ?? 20;
  const sGestao = scores.gestao?.score ?? 20;
  const sMotivacao = scores.automotivacao?.score ?? 20;
  const sEmpatia = scores.empatia?.score ?? 20;
  const sSociais = scores.habilidades_sociais?.score ?? 20;

  const pairs: IntegratedPairAnalysis[] = [
    // 1. Autoconsciência e Gestão das Emoções
    (() => {
      const isHighAuto = sAutoconsciencia >= 28;
      const isHighGest = sGestao >= 28;
      const isLowAuto = sAutoconsciencia <= 20;
      const isLowGest = sGestao <= 20;

      let statusTag = 'Equilíbrio Dinâmico';
      let analysis = '';
      let practicalImplication = '';
      let developmentLever = '';

      if (isHighAuto && isHighGest) {
        statusTag = 'Centramento e Autodomínio';
        analysis = 'Hipótese: A combinação de alta autoconsciência com alta gestão emocional indica forte coerência interna. Você não apenas percebe seus disparadores e estados emocionais em tempo real, como possui recursos consistentes para regular as respostas antes que se tornem impulsivas.';
        practicalImplication = 'Tendência a manter postura firme e lúcida em reuniões decisivas, servindo como ponto de estabilidade e segurança psicológica para equipes.';
        developmentLever = 'Cuidar para não reprimir reações emocionais válidas a pretexto de manter o controle contínuo.';
      } else if (isHighAuto && !isHighGest) {
        statusTag = 'Percepção sem Regulação Completa';
        analysis = 'Hipótese: Você reconhece com clareza quando está tenso ou prestes a perder a calma, mas a capacidade de conter a reação impulsiva ainda oscila sob pressão severa. Você vê a tempestade se aproximando, mas nem sempre consegue manobrar o barco a tempo.';
        practicalImplication = 'Pode experimentar frustração consigo mesmo após desabafos ou respostas precipitadas das quais já tinha consciência prévia.';
        developmentLever = 'Desenvolver estratégias físicas de interrupção (respiração 4-7-8, pausa de 2 minutos) logo no instante em que a autoconsciência soar o alarme.';
      } else if (!isHighAuto && isHighGest) {
        statusTag = 'Controle Racionalizado';
        analysis = 'Hipótese: Você consegue manter a compostura e evitar explosões visíveis, porém sem uma leitura tão detalhada das raízes da tensão interior. Pode haver contenção forçada sem processamento real da emoção de fundo.';
        practicalImplication = 'Risco de somatização (tensão muscular, enxaqueca, fadiga) decorrente de conter o estresse sem compreender sua origem.';
        developmentLever = 'Investir tempo em identificar quais expectativas e medos estão por trás da necessidade de parecer sempre calmo.';
      } else {
        statusTag = 'Vulnerabilidade à Reatividade';
        analysis = 'Hipótese: Com índices moderados ou baixos em ambas as dimensões, situações estressantes tendem a gerar impacto emocional desestabilizador sem aviso prévio perceptível, provocando desgaste prolongado.';
        practicalImplication = 'Dificuldade em prever quando o estresse acumulado causará esgotamento ou conflitos com terceiros.';
        developmentLever = 'Focar primeiro no registro básico das emoções físicas antes de tentar controlar as condutas exteriores.';
      }

      return {
        id: 'auto_gestao',
        title: 'Autoconsciência & Gestão das Emoções',
        dimension1: 'autoconsciencia',
        dimension2: 'gestao',
        statusTag,
        analysis,
        practicalImplication,
        developmentLever
      };
    })(),

    // 2. Gestão das Emoções e Automotivação
    (() => {
      const isHighGest = sGestao >= 28;
      const isHighMot = sMotivacao >= 28;

      let statusTag = 'Resiliência e Execução Sustentável';
      let analysis = '';
      let practicalImplication = '';
      let developmentLever = '';

      if (isHighGest && isHighMot) {
        statusTag = 'Resiliência de Alto Rendimento';
        analysis = 'Hipótese: A conjunção entre estabilidade sob estresse e forte direcionamento pessoal sugere capacidade destacada de perseverar em projetos longos sem sucumbir ao cansaço ou a frustrações transitórias.';
        practicalImplication = 'Elevada eficácia para conduzir mudanças complexas e superar crises operacionais sem paralisar diante de imprevistos.';
        developmentLever = 'Planejar momentos de descompressão ativa para evitar sobrecarga assintomática.';
      } else if (!isHighGest && isHighMot) {
        statusTag = 'Impulso com Fricção Emocional';
        analysis = 'Hipótese: Grande ambição realizadora e foco em resultados convivem com volatilidade no trato com frustrações ou prazos apertados. O motor é potente, mas as frenagens em pistas molhadas exigem atenção redobrada.';
        practicalImplication = 'Pode alcançar grandes feitos à custa de desgastes emocionais agudos e flutuações de energia ao longo da jornada.';
        developmentLever = 'Aprender a encarar contratempos não como ofensas pessoais, mas como variáveis normais de qualquer processo realizador.';
      } else if (isHighGest && !isHighMot) {
        statusTag = 'Serenidade em Busca de Propósito';
        analysis = 'Hipótese: Você preserva admirável serenidade e raramente perde o controle, mas pode faltar uma centelha interna que o mova voluntariamente além do comodismo ou de rotinas seguras.';
        practicalImplication = 'Excelente capacidade de manter ambientes calmos, mas com tendência a adiar metas que exijam esforço desconfortável.';
        developmentLever = 'Conectar tarefas cotidianas a causas e valores que realmente mobilizem sua curiosidade e entusiasmo.';
      } else {
        statusTag = 'Sensibilidade a Obstáculos';
        analysis = 'Hipótese: Contratempos imediatos podem tanto abalar o equilíbrio anímico quanto diminuir a vontade de persistir no plano delineado.';
        practicalImplication = 'Tentação recorrente de desistir ou trocar de foco quando os primeiros resultados demoram a aparecer.';
        developmentLever = 'Dividir projetos em marcos curtos semanais para celebrar avanços e neutralizar a ansiedade de longo prazo.';
      }

      return {
        id: 'gestao_motivacao',
        title: 'Gestão das Emoções & Automotivação',
        dimension1: 'gestao',
        dimension2: 'automotivacao',
        statusTag,
        analysis,
        practicalImplication,
        developmentLever
      };
    })(),

    // 3. Autoconsciência e Empatia
    (() => {
      const isHighAuto = sAutoconsciencia >= 28;
      const isHighEmp = sEmpatia >= 28;

      let statusTag = 'Inteligência Intrapessoal e Interpessoal';
      let analysis = '';
      let practicalImplication = '';
      let developmentLever = '';

      if (isHighAuto && isHighEmp) {
        statusTag = 'Sintonia Integrada (Eu e o Outro)';
        analysis = 'Hipótese: A autopercepção refinada de si mesmo serve como base sólida para reconhecer e respeitar as emoções alheias, sem confundir o que pertence a você e o que pertence ao interlocutor.';
        practicalImplication = 'Capacidade de oferecer escuta empática profunda sem perder a clareza dos próprios valores e fronteiras éticas.';
        developmentLever = 'Cuidar para não absorver a dor alheia de maneira prejudicial à própria saúde mental.';
      } else if (isHighAuto && !isHighEmp) {
        statusTag = 'Foco no Próprio Eixo';
        analysis = 'Hipótese: Você tem leitura muito clara das suas próprias reações e necessidades, mas pode demonstrar desatenção ou impaciência com os sentimentos e motivações das outras pessoas.';
        practicalImplication = 'Risco de parecer individualista ou pouco receptivo às fragilidades e dores alheias.';
        developmentLever = 'Usar a própria experiência interior para perguntar aos outros com genuína curiosidade como eles estão vivenciando as coisas.';
      } else if (!isHighAuto && isHighEmp) {
        statusTag = 'Empatia Descentrada (Radar Externo)';
        analysis = 'Hipótese: Você é muito sensível às dores e demandas das pessoas ao redor, mas tem dificuldade de perceber quando suas próprias forças e limites já foram ultrapassados.';
        practicalImplication = 'Propensão ao esgotamento por priorizar sistematicamente o bem-estar alheio em detrimento do próprio equilíbrio.';
        developmentLever = 'Desenvolver a habilidade de dizer "não" sereno e monitorar seus próprios sinais de fadiga.';
      } else {
        statusTag = 'Desenvolvimento de Percepção Humana';
        analysis = 'Hipótese: Tanto o diálogo interior quanto a leitura dos sinais não verbais dos outros se encontram em processo inicial de decodificação prática.';
        practicalImplication = 'Possibilidade de desentendimentos e ruídos comunicacionais tanto consigo mesmo quanto em grupos.';
        developmentLever = 'Fazer exercícios diários de observação sem julgamento, tanto do próprio corpo quanto do comportamento alheio.';
      }

      return {
        id: 'auto_empatia',
        title: 'Autoconsciência & Empatia',
        dimension1: 'autoconsciencia',
        dimension2: 'empatia',
        statusTag,
        analysis,
        practicalImplication,
        developmentLever
      };
    })(),

    // 4. Empatia e Habilidades Sociais
    (() => {
      const isHighEmp = sEmpatia >= 28;
      const isHighSoc = sSociais >= 28;

      let statusTag = 'Conexão e Articulação';
      let analysis = '';
      let practicalImplication = '';
      let developmentLever = '';

      if (isHighEmp && isHighSoc) {
        statusTag = 'Liderança Conectiva e Influência Ética';
        analysis = 'Hipótese: A combinação de sensibilidade interpessoal e habilidade relacional constrói pontes sólidas de confiança mútua, diálogo produtivo e mediação pacífica de divergências.';
        practicalImplication = 'Facilidade natural para integrar equipes diversas, gerar consenso construtivo e desatar nós relacionais.';
        developmentLever = 'Manter posicionamentos firmes necessários, mesmo quando isso desagradar pontualmente a algumas pessoas.';
      } else if (isHighEmp && !isHighSoc) {
        statusTag = 'Sensibilidade Reservada';
        analysis = 'Hipótese: Você compreende e se importa verdadeiramente com os sentimentos alheios, mas hesita ou sente desconforto na hora de verbalizar, negociar posições ou articular acordos em grupo.';
        practicalImplication = 'Pode acumular incômodos silenciosos por receio de abrir conversas difíceis ou discordar em público.';
        developmentLever = 'Treinar técnicas assertivas de comunicação para dar voz prática ao seu cuidado humano.';
      } else if (!isHighEmp && isHighSoc) {
        statusTag = 'Habilidade Tática sem Profundidade Afetiva';
        analysis = 'Hipótese: Você possui bom traquejo verbal e sabe como se posicionar e influenciar, mas a escuta das necessidades profundas dos outros pode ser secundária frente a objetivos práticos.';
        practicalImplication = 'Risco de as pessoas perceberem suas atitudes como meramente políticas, instrumentais ou utilitaristas no médio prazo.';
        developmentLever = 'Investir em relações gratuitas, desinteressadas e focadas em construir laços humanos autênticos.';
      } else {
        statusTag = 'Atenção Relacional Prioritária';
        analysis = 'Hipótese: Desafios tanto na escuta quanto na expressão comunicativa podem criar barreiras para o entrosamento e a colaboração nos ambientes profissionais e sociais.';
        practicalImplication = 'Possível isolamento ou desavenças repetitivas geradas por mal-entendidos nas interações do dia a dia.';
        developmentLever = 'Adotar princípios de Comunicação Não Violenta como manual prático de convivência.';
      }

      return {
        id: 'empatia_sociais',
        title: 'Empatia & Habilidades Sociais',
        dimension1: 'empatia',
        dimension2: 'habilidades_sociais',
        statusTag,
        analysis,
        practicalImplication,
        developmentLever
      };
    })(),

    // 5. Automotivação e Habilidades Sociais
    (() => {
      const isHighMot = sMotivacao >= 28;
      const isHighSoc = sSociais >= 28;

      let statusTag = 'Mobilização e Ação Coletiva';
      let analysis = '';
      let practicalImplication = '';
      let developmentLever = '';

      if (isHighMot && isHighSoc) {
        statusTag = 'Mobilização Inspiradora';
        analysis = 'Hipótese: A energia realizadora somada à habilidade interpessoal permite transformar visão individual em esforço compartilhado, mobilizando coletivos com entusiasmo genuíno e clareza de metas.';
        practicalImplication = 'Perfil catalisador para liderança de projetos de alto impacto, formação de parcerias e motivação de equipes desarticuladas.';
        developmentLever = 'Dar autonomia real aos liderados em vez de centralizar a execução pelo excesso de entusiasmo.';
      } else if (isHighMot && !isHighSoc) {
        statusTag = 'Executor Solitário de Alto Foco';
        analysis = 'Hipótese: Você avança com determinação e disciplina para entregar resultados expressivos, mas tende a fazê-lo de forma isolada, encontrando fricção para delegar ou alinhar com pares.';
        practicalImplication = 'Pode sobrecarregar-se e gerar resistências em colegas que não acompanham seu ritmo ou estilo direto.';
        developmentLever = 'Compreender que grandes realizações exigem alianças sustentadas e que "ir junto" muitas vezes supera o "ir rápido sozinho".';
      } else if (!isHighMot && isHighSoc) {
        statusTag = 'Conector de Pessoas em Busca de Meta';
        analysis = 'Hipótese: Facilidade para dialogar, agradar e fazer amigos, porém com menor direcionamento autônomo para executar tarefas difíceis sem apoio e cobrança contínua.';
        practicalImplication = 'Excelente para integrar equipes e manter o bom humor coletivo, mas com risco de dispersão na entrega técnica final.';
        developmentLever = 'Utilizar a própria rede de contatos como parceiros de compromisso (accountability) para manter o foco nas metas.';
      } else {
        statusTag = 'Estruturação de Ritmo e Vínculos';
        analysis = 'Hipótese: O desenvolvimento conjunto de disciplina de ação e de canais de diálogo abrirá novas portas para seu crescimento profissional e pessoal.';
        practicalImplication = 'Dificuldade tanto em tomar a iniciativa quanto em engajar apoio de terceiros para suas ideias.';
        developmentLever = 'Começar pequenos projetos colaborativos com metas claras e de curta duração.';
      }

      return {
        id: 'motivacao_sociais',
        title: 'Automotivação & Habilidades Sociais',
        dimension1: 'automotivacao',
        dimension2: 'habilidades_sociais',
        statusTag,
        analysis,
        practicalImplication,
        developmentLever
      };
    })()
  ];

  return pairs;
}
