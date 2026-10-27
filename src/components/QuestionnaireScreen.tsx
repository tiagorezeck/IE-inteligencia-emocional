import React, { useEffect } from 'react';
import { LikertValue } from '../types/assessment';
import { QUESTIONS, DIMENSIONS, LIKERT_OPTIONS } from '../data/questions';

interface QuestionnaireScreenProps {
  currentIndex: number;
  answers: Record<number, LikertValue>;
  onAnswer: (questionId: number, value: LikertValue) => void;
  onNext: () => void;
  onPrev: () => void;
  onGoToReview: () => void;
  onViewReport: () => void;
}

export const QuestionnaireScreen: React.FC<QuestionnaireScreenProps> = ({
  currentIndex,
  answers,
  onAnswer,
  onNext,
  onPrev,
  onGoToReview,
  onViewReport
}) => {
  const currentQuestion = QUESTIONS[currentIndex];
  const dimension = DIMENSIONS[currentQuestion.dimensionId];
  const selectedValue = answers[currentQuestion.id];
  const answeredCount = Object.keys(answers).length;
  const progressPercent = Math.round((answeredCount / QUESTIONS.length) * 100);
  const isAllAnswered = answeredCount === QUESTIONS.length;

  // Optional keyboard support (1 to 5, ArrowLeft, ArrowRight)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['1', '2', '3', '4', '5'].includes(e.key)) {
        onAnswer(currentQuestion.id, parseInt(e.key, 10) as LikertValue);
      } else if (e.key === 'ArrowRight' && currentIndex < QUESTIONS.length - 1) {
        onNext();
      } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
        onPrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, currentQuestion.id, onAnswer, onNext, onPrev]);

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 sm:py-12">
      {/* If all 40 are answered, display celebratory Banner */}
      {isAllAnswered && (
        <div className="mb-6 p-4 rounded-xl bg-gradient-to-r from-orange-500/15 via-emerald-500/10 to-neutral-50 dark:to-neutral-900 border border-orange-500/40 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs dark:shadow-lg transition-colors">
          <div className="flex items-center gap-2.5">
            <span className="w-6 h-6 rounded-full bg-emerald-500 text-white font-black text-xs flex items-center justify-center">
              ✓
            </span>
            <span className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
              Todas as 40 questões foram respondidas!
            </span>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              onClick={onGoToReview}
              className="px-3.5 py-1.5 text-xs font-medium text-neutral-700 dark:text-neutral-300 border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors cursor-pointer"
            >
              Revisar Respostas
            </button>
            <button
              onClick={onViewReport}
              className="px-4 py-1.5 text-xs font-bold bg-orange-600 hover:bg-orange-500 text-white rounded-lg transition-colors shadow flex items-center gap-1.5 cursor-pointer"
            >
              <span>Ver Relatório Agora</span>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Top Progress Bar and Meta Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-xs font-mono text-neutral-500 dark:text-neutral-400 mb-2">
          <div className="flex items-center gap-2">
            <span className="text-orange-600 dark:text-orange-400 font-bold">Questão {currentIndex + 1} de {QUESTIONS.length}</span>
            <span>·</span>
            <span>Dimensão {dimension.order} de 5</span>
          </div>
          <div className="tabular-nums font-semibold">
            {answeredCount} / {QUESTIONS.length} respondidas ({progressPercent}%)
          </div>
        </div>

        {/* Linear progress track */}
        <div className="h-2 w-full bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-orange-600 to-orange-400 transition-all duration-300 rounded-full"
            style={{ width: `${((currentIndex + 1) / QUESTIONS.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-white dark:bg-[#181A20] border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 sm:p-8 shadow-xs dark:shadow-xl mb-6 transition-colors">
        {/* Dimension Kicker */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-4 border-b border-neutral-200 dark:border-neutral-800/80">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-orange-600 dark:text-orange-400">
              0{dimension.order}. {dimension.name}
            </span>
            <span className="text-neutral-400 dark:text-neutral-600">·</span>
            <span className="text-xs text-neutral-500 dark:text-neutral-400 italic">
              {dimension.metaphor}
            </span>
          </div>
          <span className="text-[11px] font-mono text-neutral-400 dark:text-neutral-500">
            Questão {currentQuestion.id}
          </span>
        </div>

        {/* Question Statement */}
        <div className="min-h-[90px] flex items-center mb-8">
          <h2 className="text-xl sm:text-2xl font-semibold text-neutral-900 dark:text-neutral-100 leading-snug tracking-tight">
            {currentQuestion.text}
          </h2>
        </div>

        {/* Likert Scale Options (1 to 5) */}
        <div className="space-y-3">
          {LIKERT_OPTIONS.map((opt) => {
            const isSelected = selectedValue === opt.value;
            return (
              <button
                key={opt.value}
                onClick={() => onAnswer(currentQuestion.id, opt.value as LikertValue)}
                className={`w-full flex items-center justify-between p-4 rounded-xl border text-left transition-all cursor-pointer group ${
                  isSelected
                    ? 'bg-orange-50 dark:bg-orange-500/10 border-orange-500/80 text-neutral-900 dark:text-neutral-100 ring-1 ring-orange-500/40'
                    : 'bg-neutral-50/70 dark:bg-neutral-900/60 border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-900'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <div
                    className={`w-7 h-7 rounded-lg font-mono text-xs font-bold flex items-center justify-center transition-colors ${
                      isSelected
                        ? 'bg-orange-500 text-white shadow-xs'
                        : 'bg-neutral-200 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-neutral-200'
                    }`}
                  >
                    {opt.value}
                  </div>
                  <div>
                    <span className="text-sm sm:text-base font-semibold block text-neutral-900 dark:text-neutral-100">
                      {opt.label}
                    </span>
                    <span className="text-xs text-neutral-500 dark:text-neutral-400 hidden sm:block">
                      {opt.description}
                    </span>
                  </div>
                </div>

                <div className="shrink-0 ml-3">
                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                      isSelected
                        ? 'border-orange-500 bg-orange-500 text-white'
                        : 'border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900'
                    }`}
                  >
                    {isSelected && (
                      <div className="w-2 h-2 rounded-full bg-white" />
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <p className="mt-4 text-[11px] text-neutral-500 dark:text-neutral-400 text-center font-mono">
          Dica: Você também pode usar as teclas 1 a 5 ou setas no teclado.
        </p>
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={onPrev}
          disabled={currentIndex === 0}
          className={`px-4 py-2.5 rounded-lg border text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer ${
            currentIndex === 0
              ? 'opacity-40 border-neutral-200 dark:border-neutral-800 text-neutral-400 dark:text-neutral-600 cursor-not-allowed'
              : 'border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-neutral-100'
          }`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
          <span>Anterior</span>
        </button>

        <button
          onClick={onGoToReview}
          className="text-xs text-neutral-500 dark:text-neutral-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors font-medium underline-offset-4 hover:underline cursor-pointer"
        >
          Ver Grade de Questões ({answeredCount}/40)
        </button>

        {isAllAnswered ? (
          <button
            onClick={onViewReport}
            className="px-5 py-2.5 rounded-lg bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold flex items-center gap-2 transition-all shadow-md cursor-pointer ring-2 ring-orange-500/50"
          >
            <span>Ver Relatório</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        ) : currentIndex < QUESTIONS.length - 1 ? (
          <button
            onClick={onNext}
            className="px-5 py-2.5 rounded-lg bg-orange-600 hover:bg-orange-500 text-white text-xs font-semibold flex items-center gap-2 transition-colors shadow-sm cursor-pointer"
          >
            <span>Próxima</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        ) : (
          <button
            onClick={onGoToReview}
            className="px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-2 transition-colors shadow-sm cursor-pointer"
          >
            <span>Revisar e Finalizar</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};
