import { AssessmentResult, LikertValue, PDIItem } from '../types/assessment';

const STORAGE_KEY = 'comet_ie_assessment_state';

export interface SavedAssessmentState {
  version: string;
  participantName: string;
  participantRole: string;
  currentQuestionIndex: number;
  answers: Record<number, LikertValue>;
  isCompleted: boolean;
  result?: AssessmentResult;
  lastUpdated: string;
}

const DEFAULT_STATE: SavedAssessmentState = {
  version: '1.0',
  participantName: '',
  participantRole: '',
  currentQuestionIndex: 0,
  answers: {},
  isCompleted: false,
  lastUpdated: new Date().toISOString()
};

export function loadAssessmentState(): SavedAssessmentState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_STATE;
    const parsed = JSON.parse(raw);
    return {
      ...DEFAULT_STATE,
      ...parsed,
      answers: parsed.answers || {}
    };
  } catch (e) {
    console.error('Falha ao ler dados locais de avaliação:', e);
    return DEFAULT_STATE;
  }
}

export function saveAssessmentState(state: Partial<SavedAssessmentState>): void {
  try {
    const current = loadAssessmentState();
    const updated: SavedAssessmentState = {
      ...current,
      ...state,
      lastUpdated: new Date().toISOString()
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Falha ao salvar dados locais de avaliação:', e);
  }
}

export function savePDIReflections(pdiItems: PDIItem[]): void {
  try {
    const current = loadAssessmentState();
    if (current.result) {
      current.result.pdiItems = pdiItems;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
    }
  } catch (e) {
    console.error('Falha ao atualizar reflexões do PDI:', e);
  }
}

export function resetAssessmentState(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.error('Falha ao resetar estado local:', e);
  }
}
