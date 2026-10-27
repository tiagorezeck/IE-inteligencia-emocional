export type DimensionId = 'autoconsciencia' | 'gestao' | 'automotivacao' | 'empatia' | 'habilidades_sociais';

export type ClassificationBand = 'Muito baixo' | 'Baixo' | 'Em desenvolvimento' | 'Alto' | 'Muito alto';

export interface DimensionInfo {
  id: DimensionId;
  name: string;
  shortName: string;
  order: number;
  questionStart: number;
  questionEnd: number;
  metaphor: string; // e.g. "Bússola Emocional"
  description: string;
}

export interface Question {
  id: number;
  dimensionId: DimensionId;
  text: string;
}

export type LikertValue = 1 | 2 | 3 | 4 | 5;

export interface DimensionScore {
  dimensionId: DimensionId;
  name: string;
  shortName: string;
  score: number; // 8 to 40
  classification: ClassificationBand;
  metaphor: string;
  percentage: number; // relative to 40 max
}

export interface DimensionInterpretation {
  oQueSugere: string;
  oQuePreservar: string[];
  oQueDesenvolver: string[];
  aplicacoesPraticas: {
    pessoal: string;
    profissional: string;
  };
  recomendacoes: string[];
  perguntaReflexao: string;
}

export interface PDIItem {
  id: string;
  dimensionId: DimensionId;
  dimensionName: string;
  comportamento: string;
  objetivo: string;
  acaoPratica: string;
  frequencia: string;
  prazo: string;
  indicadorProgresso: string;
  evidenciasReflexoes: string;
  dataRevisao: string;
  concluido?: boolean;
}

export interface AssessmentResult {
  id: string;
  version: string;
  participantName: string;
  participantRole?: string;
  completedAt: string;
  answers: Record<number, LikertValue>;
  scores: Record<DimensionId, DimensionScore>;
  pdiItems: PDIItem[];
}
