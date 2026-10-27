import { DimensionId, ClassificationBand, DimensionScore, LikertValue } from '../types/assessment';
import { DIMENSIONS_LIST } from '../data/questions';

export const SCORE_BANDS: {
  min: number;
  max: number;
  label: ClassificationBand;
  description: string;
  colorClass: string;
  badgeBg: string;
  hex: string;
}[] = [
  {
    min: 8,
    max: 14,
    label: 'Muito baixo',
    description: 'Área com desafios significativos de autopercepção ou regulação',
    colorClass: 'text-rose-400',
    badgeBg: 'bg-rose-500/10 text-rose-300 border-rose-500/20',
    hex: '#F43F5E'
  },
  {
    min: 15,
    max: 20,
    label: 'Baixo',
    description: 'Competência com manifestação ocasional ou inconsistente',
    colorClass: 'text-amber-400',
    badgeBg: 'bg-amber-500/10 text-amber-300 border-amber-500/20',
    hex: '#F59E0B'
  },
  {
    min: 21,
    max: 27,
    label: 'Em desenvolvimento',
    description: 'Habilidade em fase de consolidação e maturação no dia a dia',
    colorClass: 'text-sky-400',
    badgeBg: 'bg-sky-500/10 text-sky-300 border-sky-500/20',
    hex: '#38BDF8'
  },
  {
    min: 28,
    max: 34,
    label: 'Alto',
    description: 'Comportamento consistente e bem integrado à rotina habitual',
    colorClass: 'text-emerald-400',
    badgeBg: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20',
    hex: '#34D399'
  },
  {
    min: 35,
    max: 40,
    label: 'Muito alto',
    description: 'Força comportamental expressiva e sólida na autopercepção',
    colorClass: 'text-orange-400',
    badgeBg: 'bg-orange-500/10 text-orange-300 border-orange-500/20',
    hex: '#FB923C'
  }
];

export function getClassificationBand(score: number): ClassificationBand {
  if (score <= 14) return 'Muito baixo';
  if (score <= 20) return 'Baixo';
  if (score <= 27) return 'Em desenvolvimento';
  if (score <= 34) return 'Alto';
  return 'Muito alto';
}

export function getBandMetadata(classification: ClassificationBand) {
  return SCORE_BANDS.find(b => b.label === classification) || SCORE_BANDS[2];
}

export function calculateDimensionScores(answers: Record<number, LikertValue>): Record<DimensionId, DimensionScore> {
  const result: Partial<Record<DimensionId, DimensionScore>> = {};

  for (const dim of DIMENSIONS_LIST) {
    let sum = 0;
    for (let qId = dim.questionStart; qId <= dim.questionEnd; qId++) {
      const val = answers[qId] ?? 1;
      sum += val;
    }

    const classification = getClassificationBand(sum);
    result[dim.id] = {
      dimensionId: dim.id,
      name: dim.name,
      shortName: dim.shortName,
      score: sum,
      classification,
      metaphor: dim.metaphor,
      percentage: Math.round((sum / 40) * 100)
    };
  }

  return result as Record<DimensionId, DimensionScore>;
}

export function compareDimensionsDescriptive(scores: Record<DimensionId, DimensionScore>): {
  highest: DimensionScore[];
  lowest: DimensionScore[];
  summaryText: string;
} {
  const list = Object.values(scores).sort((a, b) => b.score - a.score);
  const maxScore = list[0].score;
  const minScore = list[list.length - 1].score;

  const highest = list.filter(s => s.score === maxScore || s.score >= maxScore - 2);
  const lowest = list.filter(s => s.score === minScore || s.score <= minScore + 2);

  const highestNames = highest.map(h => h.name).join(' e ');
  const lowestNames = lowest.map(l => l.name).join(' e ');

  let summaryText = '';
  if (maxScore - minScore <= 4) {
    summaryText = `O seu perfil apresenta uma distribuição homogênea entre as cinco dimensões avaliadas, sem grandes discrepâncias entre autopercepção interna e habilidades relacionais externas. Suas pontuações variam de ${minScore} a ${maxScore} pontos.`;
  } else {
    summaryText = `O seu perfil apresenta maior ênfase percebida em ${highestNames} (${maxScore} pontos), enquanto ${lowestNames} desponta como a principal frente de atenção e oportunidade para investimento consciente no seu desenvolvimento (${minScore} pontos).`;
  }

  return {
    highest,
    lowest,
    summaryText
  };
}
