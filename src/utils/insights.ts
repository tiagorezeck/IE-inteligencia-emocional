import { DimensionId, DimensionScore, LikertValue, PDIItem } from '../types/assessment';
import { QUESTIONS, DIMENSIONS } from '../data/questions';

export interface StrengthsAndOpportunities {
  strengths: {
    questionId: number;
    text: string;
    dimensionName: string;
    score: number;
    observation: string;
  }[];
  opportunities: {
    questionId: number;
    text: string;
    dimensionName: string;
    score: number;
    observation: string;
  }[];
  dailyBehaviorsToObserve: string[];
}

export function computeStrengthsAndOpportunities(
  answers: Record<number, LikertValue>,
  scores: Record<DimensionId, DimensionScore>
): StrengthsAndOpportunities {
  // Sort questions by user response score
  const questionEntries = Object.entries(answers).map(([qIdStr, val]) => {
    const qId = Number(qIdStr);
    const qObj = QUESTIONS.find(q => q.id === qId);
    return {
      questionId: qId,
      text: qObj ? qObj.text : '',
      dimensionId: qObj ? qObj.dimensionId : 'autoconsciencia',
      dimensionName: qObj ? DIMENSIONS[qObj.dimensionId].name : '',
      score: val
    };
  });

  // Top scored questions (answers 4 or 5)
  const sortedDesc = [...questionEntries].sort((a, b) => b.score - a.score);
  // Lowest scored questions (answers 1, 2 or 3)
  const sortedAsc = [...questionEntries].sort((a, b) => a.score - b.score);

  const strengths = sortedDesc.slice(0, 4).map(item => ({
    ...item,
    observation: item.score === 5 
      ? 'Comportamento relatado como constante no cotidiano, servindo de recurso e âncora pessoal.'
      : 'Atitude frequente e consistente, com impacto positivo regular nas relações e decisões.'
  }));

  const opportunities = sortedAsc.slice(0, 4).map(item => ({
    ...item,
    observation: item.score === 1
      ? 'Conduta raramente observada na rotina; oportunidade primária de sensibilização e treino.'
      : item.score === 2
      ? 'Comportamento ainda incipiente; pequenos ajustes intencionais podem gerar ganhos rápidos.'
      : 'Manifestação pontual; requer continuidade para se consolidar como hábito confiável.'
  }));

  // Observações para o cotidiano com base nas dimensões de menor pontuação
  const sortedDims = Object.values(scores).sort((a, b) => a.score - b.score);
  const lowestDim = sortedDims[0];
  const secondLowest = sortedDims[1];

  const dailyBehaviorsToObserve: string[] = [
    `Monitore na rotina como você reage no exato instante em que situações ligadas a ${lowestDim?.name || 'suas emoções'} fogem do planejado.`,
    `Observe suas escolhas de comunicação e pausa ao lidar com desafios práticos em ${secondLowest?.name || 'suas interações'}.`,
    `Aproveite as situações em que sua força percebida se manifesta para modelar novas condutas nas áreas que deseja expandir.`,
    `Dedique atenção especial aos momentos de fadiga no final do dia, quando a autovigilância emocional tende a declinar.`
  ];

  return {
    strengths,
    opportunities,
    dailyBehaviorsToObserve
  };
}

export function generateInitialPDI(
  answers: Record<number, LikertValue>,
  scores: Record<DimensionId, DimensionScore>
): PDIItem[] {
  // Identify up to 3 priority items based on lowest scored questions and lower dimensions
  const questionEntries = Object.entries(answers).map(([qIdStr, val]) => {
    const qId = Number(qIdStr);
    const qObj = QUESTIONS.find(q => q.id === qId);
    return {
      questionId: qId,
      text: qObj ? qObj.text : '',
      dimensionId: qObj ? qObj.dimensionId : ('autoconsciencia' as DimensionId),
      dimensionName: qObj ? DIMENSIONS[qObj.dimensionId].name : '',
      score: val
    };
  });

  // Filter those with score <= 3, sorted ascending
  const candidates = questionEntries
    .filter(item => item.score <= 3)
    .sort((a, b) => a.score - b.score);

  // If all are > 3 (very high profile), pick the 3 lowest anyway
  const priorityCandidates = candidates.length >= 3
    ? candidates.slice(0, 3)
    : questionEntries.sort((a, b) => a.score - b.score).slice(0, 3);

  const today = new Date();
  const formatFutureDate = (days: number) => {
    const d = new Date(today.getTime() + days * 24 * 60 * 60 * 1000);
    return d.toLocaleDateString('pt-BR');
  };

  const actionTemplates: Record<DimensionId, {
    objetivo: string;
    acao: string;
    frequencia: string;
    prazo: string;
    indicador: string;
  }> = {
    autoconsciencia: {
      objetivo: 'Aumentar a precisão no reconhecimento dos próprios gatilhos emocionais e sinais corporais de estresse.',
      acao: 'Realizar um check-in de 60 segundos três vezes ao dia (manhã, tarde e noite), anotando o estado emocional predominante e sensações físicas.',
      frequencia: 'Diária (3 vezes ao dia)',
      prazo: '30 dias',
      indicador: 'Registro contínuo de pelo menos 20 dias no mês com identificação clara de pelo menos 3 gatilhos recorrentes.'
    },
    gestao: {
      objetivo: 'Dominar o impulso de reação sob pressão e acelerar a recuperação após desentendimentos.',
      acao: 'Aplicar a técnica da "pausa de 10 respirações lentas" antes de responder a mensagens tensas ou conversas que provoquem irritação.',
      frequencia: 'Sempre que houver estímulo de estresse ou contrariedade',
      prazo: '45 dias',
      indicador: 'Zero episódios de respostas impulsivas agressivas na semana e redução do tempo de estresse pós-conflito para menos de 15 minutos.'
    },
    automotivacao: {
      objetivo: 'Sustentar o foco nas prioridades estratégicas e vencer a procrastinação de tarefas complexas.',
      acao: 'Definir a meta principal inegociável do dia na véspera e executá-la no primeiro bloco de trabalho da manhã (método Pomodoro de 25 min).',
      frequencia: 'De segunda a sexta-feira',
      prazo: '30 dias',
      indicador: 'Conclusão da prioridade matinal em pelo menos 4 dos 5 dias úteis de cada semana.'
    },
    empatia: {
      objetivo: 'Aprimorar a escuta ativa e a compreensão das necessidades alheias antes de julgar.',
      acao: 'Em pelo menos uma conversa diária, praticar a paráfrase empática ("entendi que sua maior preocupação é...") antes de expor a própria opinião.',
      frequencia: 'Diária (ao menos 1 interação)',
      prazo: '60 dias',
      indicador: 'Feedback positivo de colegas ou familiares sobre sentir-se mais compreendido e diminuição de mal-entendidos.'
    },
    habilidades_sociais: {
      objetivo: 'Comunicar divergências de maneira construtiva e fortalecer redes de cooperação mútua.',
      acao: 'Adotar a estrutura da Comunicação Não Violenta (Fato neutro + Sentimento + Necessidade + Pedido claro) em diálogos de alinhamento.',
      frequencia: 'Semanal em alinhamentos e reuniões',
      prazo: '45 dias',
      indicador: 'Resolução consensual de desentendimentos sem acúmulo de rusgas ou necessidade de intervenção de terceiros.'
    }
  };

  return priorityCandidates.map((item, index) => {
    const tmpl = actionTemplates[item.dimensionId];
    return {
      id: `pdi-${index + 1}-${item.dimensionId}`,
      dimensionId: item.dimensionId,
      dimensionName: item.dimensionName,
      comportamento: item.text,
      objetivo: tmpl.objetivo,
      acaoPratica: tmpl.acao,
      frequencia: tmpl.frequencia,
      prazo: tmpl.prazo,
      indicadorProgresso: tmpl.indicador,
      evidenciasReflexoes: '',
      dataRevisao: formatFutureDate(30 + index * 15),
      concluido: false
    };
  });
}
