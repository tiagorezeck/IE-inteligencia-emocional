import React from 'react';
import { DIMENSIONS_LIST, LIKERT_OPTIONS } from '../data/questions';

interface WelcomeScreenProps {
  participantName: string;
  participantRole: string;
  onUpdateParticipant: (name: string, role: string) => void;
  onStart: () => void;
  onViewReport: () => void;
  onReset: () => void;
  answeredCount: number;
  onOpenValidationModal: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  participantName,
  participantRole,
  onUpdateParticipant,
  onStart,
  onViewReport,
  onReset,
  answeredCount,
  onOpenValidationModal
}) => {
  const isComplete = answeredCount === 40;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
      {/* Hero Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-orange-500/10 border border-orange-500/20 text-orange-600 dark:text-orange-400 text-xs font-mono font-medium mb-4">
          <span>INSTITUTO COMET</span>
          <span>·</span>
          <span>AVALIAÇÃO INDIVIDUAL</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-neutral-900 dark:text-neutral-100 tracking-tight text-balance">
          Inteligência Emocional
        </h1>
        <p className="mt-4 text-base sm:text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto font-normal leading-relaxed text-balance">
          Instrumento individual estruturado em 40 questões para mapear a autopercepção em cinco dimensões fundamentais, com diagnóstico aprofundado, mapa visual radar e Plano de Desenvolvimento Individual (PDI).
        </p>
      </div>

      {/* If 40 questions answered, show Prominent Report Ready Banner */}
      {isComplete && (
        <div className="mb-8 p-5 bg-gradient-to-r from-orange-500/15 via-orange-500/5 to-white dark:to-neutral-900 border border-orange-500/40 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm dark:shadow-xl transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-600 text-white flex items-center justify-center font-bold text-lg shrink-0 shadow">
              ✓
            </div>
            <div>
              <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100">
                Seu Teste Está Concluído!
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-300">
                Todas as 40 questões foram respondidas. O relatório com o gráfico radar, diagnósticos e PDI está pronto.
              </p>
            </div>
          </div>

          <button
            onClick={onViewReport}
            className="w-full sm:w-auto px-6 py-2.5 bg-orange-600 hover:bg-orange-500 text-white font-bold text-sm rounded-lg transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer shrink-0"
          >
            <span>Acessar Meu Relatório</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      )}

      {/* Participant Identification Box */}
      <div className="bg-white dark:bg-[#181A20] border border-neutral-200 dark:border-neutral-800 rounded-xl p-6 mb-8 shadow-xs dark:shadow-none transition-colors">
        <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-200 uppercase tracking-wider mb-3">
          Identificação do Participante
        </h3>
        <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-4">
          Insira seus dados para constar no relatório executivo individual e no PDF gerado.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
              Nome Completo
            </label>
            <input
              type="text"
              value={participantName}
              onChange={(e) => onUpdateParticipant(e.target.value, participantRole)}
              placeholder="Ex: Ana Silva"
              className="w-full bg-neutral-50 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded-lg px-3.5 py-2.5 text-sm text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 dark:placeholder-neutral-500 focus:outline-none focus:border-orange-500 transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
              Cargo ou Área de Atuação (Opcional)
            </label>
            <input
              type="text"
              value={participantRole}
              onChange={(e) => onUpdateParticipant(participantName, e.target.value)}
              placeholder="Ex: Gestor de Projetos / Consultor"
              className="w-full bg-neutral-50 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded-lg px-3.5 py-2.5 text-sm text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 dark:placeholder-neutral-500 focus:outline-none focus:border-orange-500 transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Official Guidelines & Instructions */}
      <div className="bg-white dark:bg-[#181A20] border border-neutral-200 dark:border-neutral-800 rounded-xl p-6 sm:p-7 mb-8 shadow-xs dark:shadow-none transition-colors">
        <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-200 uppercase tracking-wider mb-3">
          Orientações de Preenchimento
        </h3>

        <blockquote className="p-4 bg-neutral-50 dark:bg-neutral-900/80 border border-neutral-200 dark:border-neutral-700/60 rounded-lg text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed italic mb-6">
          “Leia cada afirmação e selecione a alternativa que melhor representa seu comportamento habitual. Responda considerando suas atitudes reais, e não como acredita que deveria agir. Não existem respostas certas ou erradas. Procure responder com sinceridade.”
        </blockquote>

        <h4 className="text-xs font-semibold text-neutral-600 dark:text-neutral-400 uppercase tracking-wider mb-3">
          Escala de Avaliação (1 a 5)
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-2.5 mb-6">
          {LIKERT_OPTIONS.map((opt) => (
            <div
              key={opt.value}
              className="bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg p-3 text-center sm:text-left transition-colors"
            >
              <div className="flex sm:flex-col items-center sm:items-start justify-between gap-1 mb-1">
                <span className="w-5 h-5 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-600 dark:text-orange-400 font-mono text-xs font-bold flex items-center justify-center">
                  {opt.value}
                </span>
                <span className="text-xs font-bold text-neutral-900 dark:text-neutral-100">{opt.label}</span>
              </div>
              <p className="text-[11px] text-neutral-500 dark:text-neutral-400 leading-tight hidden sm:block">
                {opt.description}
              </p>
            </div>
          ))}
        </div>

        <h4 className="text-xs font-semibold text-neutral-600 dark:text-neutral-400 uppercase tracking-wider mb-3">
          As 5 Dimensões Avaliadas (8 questões cada · Total: 40)
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {DIMENSIONS_LIST.map((dim) => (
            <div
              key={dim.id}
              className="bg-neutral-50/80 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800 rounded-lg p-3 transition-colors"
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-mono font-bold text-orange-600 dark:text-orange-400">0{dim.order}.</span>
                <span className="text-xs font-semibold text-neutral-900 dark:text-neutral-200">{dim.name}</span>
              </div>
              <p className="text-[11px] text-orange-600 dark:text-orange-400 font-mono mb-1">
                Metáfora: {dim.metaphor}
              </p>
              <p className="text-[11px] text-neutral-600 dark:text-neutral-400 leading-snug">
                {dim.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Action CTA Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 bg-white dark:bg-[#181A20] border border-neutral-200 dark:border-neutral-800 rounded-xl shadow-xs dark:shadow-none transition-colors">
        <div className="text-left w-full sm:w-auto">
          {isComplete ? (
            <div>
              <p className="text-xs text-emerald-600 dark:text-emerald-400 font-mono font-semibold">
                ✓ Avaliação completa
              </p>
              <p className="text-sm text-neutral-800 dark:text-neutral-200">
                Você respondeu a todas as 40 questões.
              </p>
            </div>
          ) : answeredCount > 0 ? (
            <div>
              <p className="text-xs text-orange-600 dark:text-orange-400 font-mono font-semibold">
                Avaliação em andamento
              </p>
              <p className="text-sm text-neutral-700 dark:text-neutral-300">
                Você já respondeu <span className="font-bold text-neutral-900 dark:text-neutral-100">{answeredCount} de 40</span> questões salvas localmente.
              </p>
            </div>
          ) : (
            <div>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 font-mono">
                Tempo estimado: 7 a 10 minutos
              </p>
              <p className="text-sm text-neutral-700 dark:text-neutral-300">
                Questionário com 40 questões de resposta única.
              </p>
            </div>
          )}
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          {answeredCount > 0 && (
            <button
              onClick={onReset}
              className="px-4 py-2.5 text-xs font-medium text-neutral-600 dark:text-neutral-400 hover:text-rose-600 dark:hover:text-rose-400 border border-neutral-300 dark:border-neutral-800 hover:border-rose-300 dark:hover:border-rose-900/40 rounded-lg transition-colors cursor-pointer"
            >
              Reiniciar Respostas
            </button>
          )}

          {isComplete ? (
            <button
              onClick={onViewReport}
              className="w-full sm:w-auto px-6 py-2.5 text-sm font-semibold text-white bg-orange-600 hover:bg-orange-500 rounded-lg transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Ver Relatório de Resultados</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          ) : (
            <button
              onClick={onStart}
              className="w-full sm:w-auto px-6 py-2.5 text-sm font-semibold text-white bg-orange-600 hover:bg-orange-500 rounded-lg transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{answeredCount > 0 ? 'Continuar Avaliação' : 'Iniciar Avaliação'}</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Footer Info & Verification Trigger */}
      <div className="mt-8 text-center text-xs text-neutral-500 dark:text-neutral-400 flex flex-wrap items-center justify-center gap-3">
        <span>Instrumento Individual COMET v1.0</span>
        <span>·</span>
        <span>Inspiração Conceitual em Daniel Goleman</span>
        <span>·</span>
        <button
          onClick={onOpenValidationModal}
          className="text-orange-600 dark:text-orange-400 hover:underline cursor-pointer font-medium"
        >
          Consultar Testes de Conformidade do Algoritmo
        </button>
      </div>
    </div>
  );
};
