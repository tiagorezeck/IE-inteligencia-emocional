import React, { useState } from 'react';
import { LikertValue } from '../types/assessment';
import { QUESTIONS, DIMENSIONS_LIST, LIKERT_OPTIONS } from '../data/questions';

interface ReviewScreenProps {
  answers: Record<number, LikertValue>;
  onSelectQuestion: (index: number) => void;
  onAnswerQuick: (questionId: number, value: LikertValue) => void;
  onConfirmComplete: () => void;
  onBackToQuestions: () => void;
}

export const ReviewScreen: React.FC<ReviewScreenProps> = ({
  answers,
  onSelectQuestion,
  onAnswerQuick,
  onConfirmComplete,
  onBackToQuestions
}) => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const totalQuestions = QUESTIONS.length;
  const answeredCount = Object.keys(answers).length;
  const isComplete = answeredCount === totalQuestions;
  const pendingCount = totalQuestions - answeredCount;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
      {/* Title & Status Banner */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-200 dark:border-neutral-800">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-neutral-100 tracking-tight">
              Revisão das 40 Questões
            </h1>
            <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
              Confira suas respostas antes de concluir a avaliação. Nenhuma pontuação é exibida nesta fase para garantir a neutralidade da análise.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onBackToQuestions}
              className="px-4 py-2 text-xs font-semibold text-neutral-700 dark:text-neutral-300 border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors cursor-pointer"
            >
              Voltar ao Teste
            </button>
            <button
              onClick={() => {
                if (isComplete) setShowConfirmModal(true);
              }}
              disabled={!isComplete}
              className={`px-5 py-2 text-xs font-semibold rounded-lg transition-all shadow-xs cursor-pointer ${
                isComplete
                  ? 'bg-orange-600 hover:bg-orange-500 text-white'
                  : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-400 dark:text-neutral-500 border border-neutral-200 dark:border-neutral-800 cursor-not-allowed'
              }`}
            >
              {isComplete ? 'Concluir e Gerar Relatório' : `Pendentes: ${pendingCount}`}
            </button>
          </div>
        </div>

        {/* Progress Alert */}
        {!isComplete ? (
          <div className="mt-6 p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-800 dark:text-amber-300 text-xs sm:text-sm flex items-start gap-3">
            <svg className="w-5 h-5 shrink-0 text-amber-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <div>
              <p className="font-semibold text-amber-900 dark:text-amber-200">
                Atenção: existem {pendingCount} {pendingCount === 1 ? 'questão pendente' : 'questões pendentes'}.
              </p>
              <p className="text-amber-700 dark:text-amber-300/80 mt-0.5 text-xs">
                Por exigência metodológica do instrumento COMET, todas as 40 questões devem ser preenchidas para calcular as 5 dimensões e gerar o relatório individual.
              </p>
            </div>
          </div>
        ) : (
          <div className="mt-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-800 dark:text-emerald-300 text-xs sm:text-sm flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span className="font-semibold text-neutral-900 dark:text-neutral-100">Todas as 40 questões foram respondidas com sucesso!</span>
            </div>
            <button
              onClick={onConfirmComplete}
              className="w-full sm:w-auto px-5 py-2 bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs rounded-lg transition-colors cursor-pointer shadow flex items-center justify-center gap-1.5"
            >
              <span>Ver Relatório Imediatamente</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* Grouped by Dimension */}
      <div className="space-y-8">
        {DIMENSIONS_LIST.map((dim) => {
          const dimQuestions = QUESTIONS.slice(dim.questionStart - 1, dim.questionEnd);
          const dimAnswered = dimQuestions.filter(q => answers[q.id] !== undefined).length;

          return (
            <div key={dim.id} className="bg-white dark:bg-[#181A20] border border-neutral-200 dark:border-neutral-800 rounded-xl p-5 sm:p-6 shadow-xs dark:shadow-none transition-colors">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 mb-4 border-b border-neutral-200 dark:border-neutral-800">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-orange-600 dark:text-orange-400">0{dim.order}.</span>
                    <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">{dim.name}</h3>
                    <span className="text-xs text-neutral-500 dark:text-neutral-400">({dim.metaphor})</span>
                  </div>
                </div>
                <div className="text-xs font-mono text-neutral-500 dark:text-neutral-400">
                  <span className={dimAnswered === 8 ? 'text-emerald-600 dark:text-emerald-400 font-bold' : 'text-amber-600 dark:text-amber-400 font-bold'}>
                    {dimAnswered} de 8
                  </span> respondidas
                </div>
              </div>

              {/* Questions List */}
              <div className="space-y-3">
                {dimQuestions.map((q) => {
                  const val = answers[q.id];
                  const qIndex = q.id - 1;

                  return (
                    <div
                      key={q.id}
                      className={`p-3.5 rounded-lg border transition-colors ${
                        val !== undefined
                          ? 'bg-neutral-50/70 dark:bg-neutral-900/60 border-neutral-200 dark:border-neutral-800/80'
                          : 'bg-rose-50 dark:bg-rose-500/5 border-rose-200 dark:border-rose-500/30'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                        <div className="flex items-start gap-3">
                          <button
                            onClick={() => onSelectQuestion(qIndex)}
                            className="w-6 h-6 rounded font-mono text-xs font-bold shrink-0 mt-0.5 flex items-center justify-center bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-orange-600 hover:text-white transition-colors cursor-pointer"
                            title="Ir para esta questão"
                          >
                            {q.id}
                          </button>
                          <p className="text-xs sm:text-sm text-neutral-800 dark:text-neutral-200 leading-relaxed">
                            {q.text}
                          </p>
                        </div>

                        {/* Quick Likert Selector directly on review screen */}
                        <div className="flex items-center gap-1 sm:shrink-0 self-end sm:self-center">
                          {LIKERT_OPTIONS.map((opt) => {
                            const isSelected = val === opt.value;
                            return (
                              <button
                                key={opt.value}
                                onClick={() => onAnswerQuick(q.id, opt.value as LikertValue)}
                                title={`${opt.value}: ${opt.label}`}
                                className={`w-7 h-7 rounded text-xs font-mono font-bold transition-all cursor-pointer ${
                                  isSelected
                                    ? 'bg-orange-500 text-white shadow-xs ring-1 ring-orange-400'
                                    : 'bg-neutral-200/80 dark:bg-neutral-800/90 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-300 dark:hover:bg-neutral-700 hover:text-neutral-900 dark:hover:text-neutral-200'
                                }`}
                              >
                                {opt.value}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Selected text feedback */}
                      <div className="mt-2 text-[11px] font-mono flex items-center gap-2 pl-9">
                        {val !== undefined ? (
                          <span className="text-neutral-500 dark:text-neutral-400">
                            Selecionado: <span className="text-orange-600 dark:text-orange-400 font-semibold">{val} - {LIKERT_OPTIONS[val - 1]?.label}</span>
                          </span>
                        ) : (
                          <span className="text-rose-600 dark:text-rose-400 font-medium">
                            Ainda não respondida · Clique em uma opção acima (1 a 5)
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Final Action Bar */}
      <div className="mt-8 p-6 bg-white dark:bg-[#181A20] border border-neutral-200 dark:border-neutral-800 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs dark:shadow-none transition-colors">
        <div>
          <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-200">
            {isComplete ? 'Tudo pronto para a apuração' : 'Preenchimento incompleto'}
          </p>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            {isComplete
              ? 'Seus dados serão processados para gerar as pontuações nas 5 dimensões e o PDI.'
              : `Restam ${pendingCount} questões para habilitar a geração do relatório.`}
          </p>
        </div>

        <button
          onClick={() => {
            if (isComplete) setShowConfirmModal(true);
          }}
          disabled={!isComplete}
          className={`w-full sm:w-auto px-6 py-3 rounded-lg text-sm font-semibold transition-all shadow-md cursor-pointer ${
            isComplete
              ? 'bg-orange-600 hover:bg-orange-500 text-white'
              : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-400 dark:text-neutral-500 cursor-not-allowed border border-neutral-200 dark:border-neutral-700/50'
          }`}
        >
          Finalizar Avaliação e Ver Relatório
        </button>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#181A20] border border-neutral-200 dark:border-neutral-700 max-w-md w-full rounded-2xl p-6 shadow-2xl transition-colors">
            <div className="w-10 h-10 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-600 dark:text-orange-400 flex items-center justify-center mb-4">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>

            <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100">
              Confirmar Conclusão da Avaliação
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
              Você respondeu a todas as 40 questões do Teste de Inteligência Emocional COMET. Deseja consolidar suas respostas e gerar o relatório individual com radar, interpretações e PDI agora?
            </p>

            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="px-4 py-2 text-xs font-semibold text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200 border border-neutral-300 dark:border-neutral-700 rounded-lg transition-colors cursor-pointer"
              >
                Continuar Revisando
              </button>
              <button
                onClick={() => {
                  setShowConfirmModal(false);
                  onConfirmComplete();
                }}
                className="px-5 py-2 text-xs font-semibold bg-orange-600 hover:bg-orange-500 text-white rounded-lg transition-colors shadow-sm cursor-pointer"
              >
                Sim, Gerar Relatório
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
