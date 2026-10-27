import { DimensionId, DimensionInfo, Question } from '../types/assessment';

export const DIMENSIONS: Record<DimensionId, DimensionInfo> = {
  autoconsciencia: {
    id: 'autoconsciencia',
    name: 'Autoconsciência',
    shortName: 'Autoconsciência',
    order: 1,
    questionStart: 1,
    questionEnd: 8,
    metaphor: 'Bússola Emocional',
    description: 'Capacidade de reconhecer os próprios estados emocionais, gatilhos, pontos fortes e limites em tempo real.'
  },
  gestao: {
    id: 'gestao',
    name: 'Gestão das Emoções',
    shortName: 'Gestão Emocional',
    order: 2,
    questionStart: 9,
    questionEnd: 16,
    metaphor: 'Farol na Tempestade',
    description: 'Habilidade de regular impulsos, manter a calma sob pressão e restabelecer o equilíbrio após situações adversas.'
  },
  automotivacao: {
    id: 'automotivacao',
    name: 'Automotivação',
    shortName: 'Automotivação',
    order: 3,
    questionStart: 17,
    questionEnd: 24,
    metaphor: 'Jornada ao Horizonte',
    description: 'Capacidade de direcionar energia para metas significativas, persistir diante de contratempos e buscar aperfeiçoamento contínuo.'
  },
  empatia: {
    id: 'empatia',
    name: 'Empatia',
    shortName: 'Empatia',
    order: 4,
    questionStart: 25,
    questionEnd: 32,
    metaphor: 'Ponte entre Perspectivas',
    description: 'Sensibilidade para sintonizar as emoções e necessidades alheias, compreendendo pontos de vista divergentes.'
  },
  habilidades_sociais: {
    id: 'habilidades_sociais',
    name: 'Habilidades Sociais',
    shortName: 'Habilidades Sociais',
    order: 5,
    questionStart: 33,
    questionEnd: 40,
    metaphor: 'Rede de Conexões',
    description: 'Competência para construir relações construtivas, comunicar com clareza, gerenciar divergências e cooperar em equipe.'
  }
};

export const DIMENSIONS_LIST: DimensionInfo[] = [
  DIMENSIONS.autoconsciencia,
  DIMENSIONS.gestao,
  DIMENSIONS.automotivacao,
  DIMENSIONS.empatia,
  DIMENSIONS.habilidades_sociais
];

export const LIKERT_OPTIONS = [
  { value: 1, label: 'Nunca', description: 'Comportamento não observado na rotina habitual' },
  { value: 2, label: 'Raramente', description: 'Ocorre em ocasiões isoladas ou excepcionais' },
  { value: 3, label: 'Às vezes', description: 'Manifesta-se em parte das situações' },
  { value: 4, label: 'Frequentemente', description: 'Conduta habitual na maioria das situações' },
  { value: 5, label: 'Sempre', description: 'Prática consistente e consolidada no cotidiano' }
] as const;

export const QUESTIONS: Question[] = [
  // Dimensão 1 — Autoconsciência (1-8)
  {
    id: 1,
    dimensionId: 'autoconsciencia',
    text: 'Percebo quando começo a perder a paciência ou fico emocionalmente incomodado.'
  },
  {
    id: 2,
    dimensionId: 'autoconsciencia',
    text: 'Reconheço e consigo identificar as emoções que estou sentindo.'
  },
  {
    id: 3,
    dimensionId: 'autoconsciencia',
    text: 'Consigo identificar os motivos que desencadeiam minhas reações emocionais.'
  },
  {
    id: 4,
    dimensionId: 'autoconsciencia',
    text: 'Percebo como minhas emoções influenciam meu comportamento e minhas decisões.'
  },
  {
    id: 5,
    dimensionId: 'autoconsciencia',
    text: 'Reconheço quando estou agindo de forma impulsiva ou deixando minhas emoções influenciarem meu julgamento.'
  },
  {
    id: 6,
    dimensionId: 'autoconsciencia',
    text: 'Tenho consciência das situações que mais me causam estresse, ansiedade ou frustração.'
  },
  {
    id: 7,
    dimensionId: 'autoconsciencia',
    text: 'Conheço minhas principais forças e limitações e reconheço como elas afetam meu desempenho.'
  },
  {
    id: 8,
    dimensionId: 'autoconsciencia',
    text: 'Consigo reconhecer quando minhas expectativas sobre mim mesmo não correspondem às minhas capacidades ou à realidade da situação.'
  },

  // Dimensão 2 — Gestão das Emoções (9-16)
  {
    id: 9,
    dimensionId: 'gestao',
    text: 'Consigo manter a calma e pensar com clareza mesmo quando estou sob pressão.'
  },
  {
    id: 10,
    dimensionId: 'gestao',
    text: 'Quando fico irritado, consigo controlar meus impulsos antes de reagir.'
  },
  {
    id: 11,
    dimensionId: 'gestao',
    text: 'Consigo recuperar meu equilíbrio emocional depois de uma situação desagradável.'
  },
  {
    id: 12,
    dimensionId: 'gestao',
    text: 'Sou capaz de lidar com frustrações sem permitir que elas comprometam minhas atividades.'
  },
  {
    id: 13,
    dimensionId: 'gestao',
    text: 'Consigo adaptar minha reação emocional de acordo com as exigências de cada situação.'
  },
  {
    id: 14,
    dimensionId: 'gestao',
    text: 'Evito tomar decisões precipitadas quando estou com raiva, ansioso ou frustrado.'
  },
  {
    id: 15,
    dimensionId: 'gestao',
    text: 'Consigo lidar com pessoas e situações difíceis sem perder o controle das minhas atitudes.'
  },
  {
    id: 16,
    dimensionId: 'gestao',
    text: 'Quando algo não acontece como esperado, consigo ajustar minha postura e buscar alternativas sem me deixar dominar pela frustração.'
  },

  // Dimensão 3 — Automotivação (17-24)
  {
    id: 17,
    dimensionId: 'automotivacao',
    text: 'Consigo me motivar a realizar tarefas difíceis, mesmo quando não estou com vontade.'
  },
  {
    id: 18,
    dimensionId: 'automotivacao',
    text: 'Mantenho o foco nas minhas prioridades, mesmo diante de distrações e dificuldades.'
  },
  {
    id: 19,
    dimensionId: 'automotivacao',
    text: 'Persisto em meus objetivos mesmo quando enfrento obstáculos ou resultados negativos.'
  },
  {
    id: 20,
    dimensionId: 'automotivacao',
    text: 'Consigo adiar recompensas imediatas para alcançar objetivos mais importantes no futuro.'
  },
  {
    id: 21,
    dimensionId: 'automotivacao',
    text: 'Tomo a iniciativa para realizar o que precisa ser feito, sem depender constantemente de cobranças externas.'
  },
  {
    id: 22,
    dimensionId: 'automotivacao',
    text: 'Procuro aprender com erros e contratempos, em vez de desistir diante das dificuldades.'
  },
  {
    id: 23,
    dimensionId: 'automotivacao',
    text: 'Consigo manter uma perspectiva positiva e encontrar motivos para continuar avançando em situações desafiadoras.'
  },
  {
    id: 24,
    dimensionId: 'automotivacao',
    text: 'Estabeleço metas desafiadoras para mim e procuro melhorar continuamente meu desempenho.'
  },

  // Dimensão 4 — Empatia (25-32)
  {
    id: 25,
    dimensionId: 'empatia',
    text: 'Consigo perceber quando outra pessoa está incomodada, triste ou preocupada, mesmo que ela não diga diretamente.'
  },
  {
    id: 26,
    dimensionId: 'empatia',
    text: 'Procuro compreender o ponto de vista das outras pessoas antes de formar uma opinião.'
  },
  {
    id: 27,
    dimensionId: 'empatia',
    text: 'Consigo compreender os motivos que levam alguém a agir de maneira diferente da minha.'
  },
  {
    id: 28,
    dimensionId: 'empatia',
    text: 'Demonstro interesse genuíno pelos sentimentos e pelas preocupações das outras pessoas.'
  },
  {
    id: 29,
    dimensionId: 'empatia',
    text: 'Procuro entender as necessidades e expectativas das pessoas com quem convivo ou trabalho.'
  },
  {
    id: 30,
    dimensionId: 'empatia',
    text: 'Percebo quando minhas palavras ou atitudes podem ter afetado emocionalmente outra pessoa.'
  },
  {
    id: 31,
    dimensionId: 'empatia',
    text: 'Consigo respeitar sentimentos e perspectivas diferentes dos meus, mesmo quando não concordo com eles.'
  },
  {
    id: 32,
    dimensionId: 'empatia',
    text: 'Percebo quando alguém precisa de apoio ou compreensão e procuro oferecer ajuda de acordo com a situação.'
  },

  // Dimensão 5 — Habilidades Sociais (33-40)
  {
    id: 33,
    dimensionId: 'habilidades_sociais',
    text: 'Consigo ouvir as pessoas com atenção, sem interromper ou antecipar minhas respostas.'
  },
  {
    id: 34,
    dimensionId: 'habilidades_sociais',
    text: 'Comunico minhas ideias e opiniões de maneira clara, respeitosa e adequada à situação.'
  },
  {
    id: 35,
    dimensionId: 'habilidades_sociais',
    text: 'Consigo construir relacionamentos positivos com pessoas de diferentes perfis e personalidades.'
  },
  {
    id: 36,
    dimensionId: 'habilidades_sociais',
    text: 'Procuro resolver desentendimentos por meio do diálogo e da busca por soluções construtivas.'
  },
  {
    id: 37,
    dimensionId: 'habilidades_sociais',
    text: 'Consigo influenciar e mobilizar pessoas em torno de objetivos comuns.'
  },
  {
    id: 38,
    dimensionId: 'habilidades_sociais',
    text: 'Adapto minha forma de comunicação conforme as necessidades e reações das pessoas com quem interajo.'
  },
  {
    id: 39,
    dimensionId: 'habilidades_sociais',
    text: 'Contribuo para um ambiente de colaboração, confiança e bom relacionamento nos Times com os quais convivo ou trabalho.'
  },
  {
    id: 40,
    dimensionId: 'habilidades_sociais',
    text: 'Consigo dar e receber críticas e feedbacks de maneira construtiva, sem comprometer o relacionamento com as pessoas.'
  }
];
