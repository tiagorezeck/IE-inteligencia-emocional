import React from 'react';
import { AssessmentResult, PDIItem } from '../types/assessment';
import { DIMENSIONS_LIST } from '../data/questions';
import { INTERPRETATIONS, METAPHORS } from '../data/interpretations';
import { compareDimensionsDescriptive, getBandMetadata } from '../utils/scoring';
import { generateIntegratedPairs } from '../data/integratedProfiles';
import { computeStrengthsAndOpportunities } from '../utils/insights';
import { RadarChart } from './RadarChart';
import { ScoreGauge } from './ScoreGauge';
import { PDIPlan } from './PDIPlan';

interface ReportScreenProps {
  result: AssessmentResult;
  onUpdatePDIItem: (id: string, updates: Partial<PDIItem>) => void;
  onRetake: () => void;
  onReviewAnswers: () => void;
  onOpenValidationModal: () => void;
  theme?: 'dark' | 'light';
}

export const ReportScreen: React.FC<ReportScreenProps> = ({
  result,
  onUpdatePDIItem,
  onRetake,
  onReviewAnswers,
  onOpenValidationModal,
  theme = 'dark'
}) => {
  const { participantName, participantRole, completedAt, scores, answers, pdiItems } = result;

  const comparison = compareDimensionsDescriptive(scores);
  const integratedPairs = generateIntegratedPairs(scores);
  const insights = computeStrengthsAndOpportunities(answers, scores);

  const formattedDate = new Date(completedAt).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 sm:py-12 print:px-0 print:py-0 print:max-w-none">
      {/* Top Action Bar (hidden in print) */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 border-b border-neutral-200 dark:border-neutral-800 print:hidden">
        <div>
          <span className="text-xs font-mono font-bold text-orange-600 dark:text-orange-400">
            RELATÓRIO INDIVIDUAL CONCLUÍDO
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-neutral-100 tracking-tight">
            Diagnóstico de Inteligência Emocional
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={onReviewAnswers}
            className="px-3.5 py-2 text-xs font-semibold text-neutral-700 dark:text-neutral-300 border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors cursor-pointer"
          >
            Revisar Respostas
          </button>

          <button
            onClick={onRetake}
            className="px-3.5 py-2 text-xs font-semibold text-neutral-600 dark:text-neutral-400 hover:text-rose-600 dark:hover:text-rose-400 border border-neutral-300 dark:border-neutral-800 hover:border-rose-300 dark:hover:border-rose-900/40 rounded-lg transition-colors cursor-pointer"
          >
            Refazer Teste
          </button>

          <button
            onClick={handlePrint}
            className="px-5 py-2 text-xs font-bold text-white bg-orange-600 hover:bg-orange-500 rounded-lg transition-colors shadow-sm flex items-center gap-2 cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            <span>Exportar Relatório em PDF</span>
          </button>
        </div>
      </div>

      {/* ======================================================== */}
      {/* SEÇÃO 1: CAPA E IDENTIFICAÇÃO                            */}
      {/* ======================================================== */}
      <section className="bg-white dark:bg-[#181A20] border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 sm:p-10 mb-10 shadow-xs dark:shadow-lg print:border-neutral-300 print:bg-white print:text-neutral-900 print:mb-8 break-inside-avoid transition-colors">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-neutral-200 dark:border-neutral-800 print:border-neutral-200">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-orange-500"></span>
              <span className="text-xs font-mono font-bold tracking-wider text-orange-600 dark:text-orange-400 print:text-orange-600">
                INSTITUTO COMET
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-neutral-100 print:text-neutral-900 tracking-tight">
              Relatório Executivo de Inteligência Emocional
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 print:text-neutral-600 mt-1">
              Avaliação Individual nas Cinco Dimensões com Inspiração Conceitual em Daniel Goleman
            </p>
          </div>

          <div className="text-left sm:text-right font-mono text-xs text-neutral-500 dark:text-neutral-400 print:text-neutral-600">
            <div>Data: <strong className="text-neutral-900 dark:text-neutral-200 print:text-neutral-900">{formattedDate}</strong></div>
            <div>Versão: <strong className="text-neutral-900 dark:text-neutral-200 print:text-neutral-900">COMET IE v1.0</strong></div>
            <div>ID: <strong className="text-neutral-900 dark:text-neutral-200 print:text-neutral-900">{result.id.slice(0, 8)}</strong></div>
          </div>
        </div>

        {/* Participant Identification Data */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="bg-neutral-50 dark:bg-neutral-900/60 print:bg-neutral-50 border border-neutral-200 dark:border-neutral-800 print:border-neutral-200 p-3.5 rounded-xl transition-colors">
            <span className="font-mono text-[10px] uppercase text-neutral-500 dark:text-neutral-400 block mb-0.5">
              Participante Avaliado
            </span>
            <span className="text-sm font-bold text-neutral-900 dark:text-neutral-100 print:text-neutral-900">
              {participantName ? participantName : 'Não informado'}
            </span>
          </div>

          <div className="bg-neutral-50 dark:bg-neutral-900/60 print:bg-neutral-50 border border-neutral-200 dark:border-neutral-800 print:border-neutral-200 p-3.5 rounded-xl transition-colors">
            <span className="font-mono text-[10px] uppercase text-neutral-500 dark:text-neutral-400 block mb-0.5">
              Cargo / Área Informada
            </span>
            <span className="text-sm font-semibold text-neutral-800 dark:text-neutral-200 print:text-neutral-800">
              {participantRole ? participantRole : 'Não informado'}
            </span>
          </div>

          <div className="bg-neutral-50 dark:bg-neutral-900/60 print:bg-neutral-50 border border-neutral-200 dark:border-neutral-800 print:border-neutral-200 p-3.5 rounded-xl transition-colors">
            <span className="font-mono text-[10px] uppercase text-neutral-500 dark:text-neutral-400 block mb-0.5">
              Escopo do Instrumento
            </span>
            <span className="text-sm font-semibold text-orange-600 dark:text-orange-400 print:text-orange-600">
              40 Questões · 5 Dimensões
            </span>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* SEÇÃO 2: RESUMO EXECUTIVO                                */}
      {/* ======================================================== */}
      <section className="mb-10 print:mb-8 break-inside-avoid">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-mono font-bold text-orange-600 dark:text-orange-400">01.</span>
          <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 print:text-neutral-900">
            Resumo Executivo
          </h3>
        </div>

        <div className="bg-white dark:bg-[#181A20] border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 print:border-neutral-300 print:bg-white print:text-neutral-900 shadow-xs dark:shadow-none transition-colors">
          <p className="text-sm sm:text-base text-neutral-700 dark:text-neutral-300 print:text-neutral-700 leading-relaxed mb-6">
            {comparison.summaryText}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            {/* Competências Percebidas */}
            <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 print:bg-neutral-50 print:border-neutral-200">
              <span className="font-bold text-emerald-700 dark:text-emerald-400 print:text-emerald-700 block mb-1 uppercase tracking-wider text-[11px]">
                Competências em Destaque
              </span>
              <p className="text-neutral-700 dark:text-neutral-300 print:text-neutral-700 leading-relaxed">
                {comparison.highest.map(h => `${h.name} (${h.score} pts - ${h.classification})`).join(', ')}.
                Comportamentos consolidados que servem como recursos estruturantes no dia a dia.
              </p>
            </div>

            {/* Áreas de Atenção */}
            <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 print:bg-neutral-50 print:border-neutral-200">
              <span className="font-bold text-amber-700 dark:text-amber-400 print:text-amber-700 block mb-1 uppercase tracking-wider text-[11px]">
                Áreas de Maior Atenção
              </span>
              <p className="text-neutral-700 dark:text-neutral-300 print:text-neutral-700 leading-relaxed">
                {comparison.lowest.map(l => `${l.name} (${l.score} pts - ${l.classification})`).join(', ')}.
                Aspectos com maior oscilação sob estresse que demandam estratégias conscientes de regulação.
              </p>
            </div>

            {/* Oportunidades de Desenvolvimento */}
            <div className="p-4 rounded-xl bg-sky-50 dark:bg-sky-500/10 border border-sky-200 dark:border-sky-500/20 print:bg-neutral-50 print:border-neutral-200">
              <span className="font-bold text-sky-700 dark:text-sky-400 print:text-sky-700 block mb-1 uppercase tracking-wider text-[11px]">
                Alavancas de Evolução
              </span>
              <p className="text-neutral-700 dark:text-neutral-300 print:text-neutral-700 leading-relaxed">
                Priorização de micro-hábitos e treino deliberado nos comportamentos mapeados no PDI, integrando a autopercepção à ação comunicativa.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* SEÇÃO 3: MAPA VISUAL (RADAR + RÉGUAS)                    */}
      {/* ======================================================== */}
      <section className="mb-10 print:mb-8">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-mono font-bold text-orange-600 dark:text-orange-400">02.</span>
          <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 print:text-neutral-900">
            Mapa Visual das Cinco Dimensões
          </h3>
        </div>

        <div className="bg-white dark:bg-[#181A20] border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 sm:p-8 print:border-neutral-300 print:bg-white print:text-neutral-900 shadow-xs dark:shadow-none transition-colors">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Radar SVG */}
            <div className="lg:col-span-5 flex justify-center py-2">
              <RadarChart scores={scores} size={360} theme={theme} />
            </div>

            {/* Réguas de Pontuação com as 5 faixas e marcadores */}
            <div className="lg:col-span-7 space-y-3.5">
              {DIMENSIONS_LIST.map((dim) => {
                const s = scores[dim.id];
                return <ScoreGauge key={dim.id} scoreItem={s} />;
              })}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-neutral-200 dark:border-neutral-800/80 text-xs text-neutral-600 dark:text-neutral-400 print:text-neutral-600 flex flex-wrap items-center justify-between gap-2">
            <div>
              <strong>Critério Metodológico:</strong> Cada dimensão varia estritamente entre 8 (todas as respostas = 1) e 40 pontos (todas as respostas = 5).
            </div>
            <div className="font-mono text-orange-600 dark:text-orange-400 print:text-orange-600 font-semibold">
              Sem nota geral somada · Análise descritiva individualizada
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* SEÇÃO 4: ANÁLISE DAS CINCO DIMENSÕES                     */}
      {/* ======================================================== */}
      <section className="mb-10 print:mb-8">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-mono font-bold text-orange-600 dark:text-orange-400">03.</span>
          <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 print:text-neutral-900">
            Análise Aprofundada das Cinco Dimensões
          </h3>
        </div>

        <div className="space-y-6">
          {DIMENSIONS_LIST.map((dim) => {
            const s = scores[dim.id];
            const interp = INTERPRETATIONS[dim.id]?.[s.classification];
            const meta = METAPHORS[dim.id];
            const bandMeta = getBandMetadata(s.classification);

            return (
              <div
                key={dim.id}
                className="bg-white dark:bg-[#181A20] border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 sm:p-8 print:border-neutral-300 print:bg-white print:text-neutral-900 shadow-xs dark:shadow-none break-inside-avoid transition-colors"
              >
                {/* Header of Dimension */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-5 border-b border-neutral-200 dark:border-neutral-800 print:border-neutral-200">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-mono font-bold text-orange-600 dark:text-orange-400">
                        Dimensão 0{dim.order}
                      </span>
                      <span className="text-neutral-400 dark:text-neutral-600">·</span>
                      <span className="text-xs text-neutral-700 dark:text-neutral-300 font-medium italic">
                        {meta.name} ({meta.tag})
                      </span>
                    </div>
                    <h4 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 print:text-neutral-900">
                      {dim.name}
                    </h4>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className={`text-xs px-2.5 py-1 rounded-md border font-semibold ${bandMeta.badgeBg}`}>
                      {s.classification}
                    </span>
                    <span className="text-xl font-bold font-mono text-neutral-900 dark:text-neutral-100 print:text-neutral-900 tabular-nums">
                      {s.score} <span className="text-xs font-normal text-neutral-500 dark:text-neutral-400 print:text-neutral-600">/ 40</span>
                    </span>
                  </div>
                </div>

                {/* Metaphor Educational Callout */}
                <div className="p-3.5 rounded-xl bg-neutral-50 dark:bg-neutral-900/80 print:bg-neutral-50 border border-neutral-200 dark:border-neutral-800 print:border-neutral-200 text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed mb-5">
                  <span className="font-semibold text-orange-600 dark:text-orange-400 print:text-orange-600">Metáfora Educativa ({meta.name}):</span> {meta.explanation}
                </div>

                {/* 1. O que o resultado sugere */}
                <div className="mb-5">
                  <h5 className="text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400 print:text-neutral-600 mb-1.5 font-bold">
                    O que o resultado sugere
                  </h5>
                  <p className="text-sm text-neutral-800 dark:text-neutral-200 print:text-neutral-800 leading-relaxed">
                    {interp?.oQueSugere}
                  </p>
                </div>

                {/* Grid: O que preservar & O que desenvolver */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5 text-xs">
                  <div className="p-4 rounded-xl bg-emerald-50/70 dark:bg-emerald-500/5 border border-emerald-200 dark:border-emerald-500/20 print:bg-neutral-50 print:border-neutral-200">
                    <h6 className="font-bold text-emerald-700 dark:text-emerald-400 print:text-emerald-700 uppercase tracking-wider mb-2 text-[11px] flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      O que preservar
                    </h6>
                    <ul className="space-y-1.5 text-neutral-700 dark:text-neutral-300 print:text-neutral-700">
                      {interp?.oQuePreservar.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-emerald-600 dark:text-emerald-400 shrink-0">✓</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 rounded-xl bg-amber-50/70 dark:bg-amber-500/5 border border-amber-200 dark:border-amber-500/20 print:bg-neutral-50 print:border-neutral-200">
                    <h6 className="font-bold text-amber-700 dark:text-amber-400 print:text-amber-700 uppercase tracking-wider mb-2 text-[11px] flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                      O que desenvolver
                    </h6>
                    <ul className="space-y-1.5 text-neutral-700 dark:text-neutral-300 print:text-neutral-700">
                      {interp?.oQueDesenvolver.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-amber-600 dark:text-amber-400 shrink-0">→</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Aplicações Práticas (Pessoal e Profissional) */}
                <div className="mb-5 bg-neutral-50 dark:bg-neutral-900/60 print:bg-neutral-50 border border-neutral-200 dark:border-neutral-800 print:border-neutral-200 p-4 rounded-xl text-xs">
                  <h6 className="font-bold text-neutral-800 dark:text-neutral-300 print:text-neutral-800 uppercase tracking-wider text-[11px] mb-2.5">
                    Aplicações Práticas no Cotidiano
                  </h6>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <span className="font-semibold text-orange-600 dark:text-orange-400 print:text-orange-600 block mb-1">
                        Vida Pessoal & Relações:
                      </span>
                      <p className="text-neutral-700 dark:text-neutral-300 print:text-neutral-700 leading-relaxed">
                        {interp?.aplicacoesPraticas.pessoal}
                      </p>
                    </div>
                    <div>
                      <span className="font-semibold text-orange-600 dark:text-orange-400 print:text-orange-600 block mb-1">
                        Ambiente Profissional & Liderança:
                      </span>
                      <p className="text-neutral-700 dark:text-neutral-300 print:text-neutral-700 leading-relaxed">
                        {interp?.aplicacoesPraticas.profissional}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Recomendações de desenvolvimento */}
                <div className="mb-5 text-xs">
                  <h6 className="font-bold text-neutral-800 dark:text-neutral-300 print:text-neutral-800 uppercase tracking-wider text-[11px] mb-2">
                    Recomendações Práticas de Desenvolvimento
                  </h6>
                  <div className="space-y-1.5">
                    {interp?.recomendacoes.map((rec, rIdx) => (
                      <div key={rIdx} className="flex items-start gap-2 text-neutral-700 dark:text-neutral-300 print:text-neutral-700">
                        <span className="font-mono text-orange-600 dark:text-orange-400 font-bold shrink-0">{rIdx + 1}.</span>
                        <span>{rec}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pergunta de Reflexão */}
                <div className="p-4 rounded-xl bg-orange-50 dark:bg-orange-500/10 border border-orange-200 dark:border-orange-500/30 print:bg-neutral-50 print:border-neutral-300">
                  <span className="font-mono text-[10px] uppercase font-bold text-orange-600 dark:text-orange-400 print:text-orange-600 block mb-1">
                    Pergunta para sua Reflexão Estratégica
                  </span>
                  <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 print:text-neutral-900 italic">
                    “{interp?.perguntaReflexao}”
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ======================================================== */}
      {/* SEÇÃO 5: PERFIL INTEGRADO (COMBINAÇÕES PRÁTICAS)         */}
      {/* ======================================================== */}
      <section className="mb-10 print:mb-8">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-mono font-bold text-orange-600 dark:text-orange-400">04.</span>
          <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 print:text-neutral-900">
            Perfil Integrado (Combinações Entre Dimensões)
          </h3>
        </div>

        <div className="bg-white dark:bg-[#181A20] border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 sm:p-8 print:border-neutral-300 print:bg-white print:text-neutral-900 shadow-xs dark:shadow-none transition-colors">
          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 print:text-neutral-600 mb-6 leading-relaxed">
            A Inteligência Emocional opera em dinâmica sistêmica. A interação entre o mundo intrapessoal (Autoconsciência, Gestão e Motivação) e o mundo interpessoal (Empatia e Habilidades Sociais) molda seu comportamento em situações concretas. As análises abaixo são hipóteses de trabalho para guiar sua reflexão.
          </p>

          <div className="space-y-4">
            {integratedPairs.map((pair) => (
              <div
                key={pair.id}
                className="bg-neutral-50/70 dark:bg-neutral-900/60 print:bg-neutral-50 border border-neutral-200 dark:border-neutral-800 print:border-neutral-200 rounded-xl p-5 break-inside-avoid transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-3 border-b border-neutral-200 dark:border-neutral-800 print:border-neutral-200">
                  <h5 className="text-sm font-bold text-neutral-900 dark:text-neutral-100 print:text-neutral-900">
                    {pair.title}
                  </h5>
                  <span className="text-[11px] font-mono font-semibold px-2.5 py-0.5 rounded bg-neutral-200/80 dark:bg-neutral-800 print:bg-neutral-200 text-orange-700 dark:text-orange-400 print:text-orange-700 w-fit">
                    {pair.statusTag}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-neutral-800 dark:text-neutral-200 print:text-neutral-800 leading-relaxed mb-3">
                  {pair.analysis}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-2 border-t border-neutral-200 dark:border-neutral-800/60 print:border-neutral-200">
                  <div>
                    <strong className="text-neutral-500 dark:text-neutral-400 print:text-neutral-600 block mb-0.5">Implicação Prática Observada:</strong>
                    <span className="text-neutral-700 dark:text-neutral-300 print:text-neutral-700">{pair.practicalImplication}</span>
                  </div>
                  <div>
                    <strong className="text-orange-600 dark:text-orange-400 print:text-orange-600 block mb-0.5">Alavanca de Desenvolvimento:</strong>
                    <span className="text-neutral-700 dark:text-neutral-300 print:text-neutral-700">{pair.developmentLever}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* SEÇÃO 6: MAPA DE FORÇAS E OPORTUNIDADES                  */}
      {/* ======================================================== */}
      <section className="mb-10 print:mb-8 break-inside-avoid">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-mono font-bold text-orange-600 dark:text-orange-400">05.</span>
          <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 print:text-neutral-900">
            Mapa de Forças e Oportunidades
          </h3>
        </div>

        <div className="bg-white dark:bg-[#181A20] border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 sm:p-8 print:border-neutral-300 print:bg-white print:text-neutral-900 shadow-xs dark:shadow-none transition-colors">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Forças Comportamentais Reais */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <h4 className="text-sm font-bold text-emerald-700 dark:text-emerald-400 print:text-emerald-700 uppercase tracking-wider text-xs">
                  Competências Percebidas (Forças Reais)
                </h4>
              </div>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 print:text-neutral-600">
                Itens com maior pontuação direta assinalada nas suas respostas:
              </p>

              <div className="space-y-2.5">
                {insights.strengths.map((st) => (
                  <div
                    key={st.questionId}
                    className="p-3.5 rounded-lg bg-emerald-50/70 dark:bg-emerald-500/5 border border-emerald-200 dark:border-emerald-500/20 print:bg-neutral-50 print:border-neutral-200 text-xs"
                  >
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="font-mono text-[10px] text-emerald-700 dark:text-emerald-400 print:text-emerald-700 font-semibold">
                        Questão {st.questionId} · {st.dimensionName}
                      </span>
                      <span className="font-mono text-[10px] font-bold px-1.5 py-0.2 rounded bg-emerald-100 dark:bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 print:text-emerald-800">
                        Nota {st.score}/5
                      </span>
                    </div>
                    <p className="text-neutral-900 dark:text-neutral-200 print:text-neutral-800 font-medium italic mb-1">
                      “{st.text}”
                    </p>
                    <p className="text-neutral-600 dark:text-neutral-400 print:text-neutral-600 text-[11px]">
                      {st.observation}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Oportunidades Prioritárias */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                <h4 className="text-sm font-bold text-amber-700 dark:text-amber-400 print:text-amber-700 uppercase tracking-wider text-xs">
                  Oportunidades de Desenvolvimento
                </h4>
              </div>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 print:text-neutral-600">
                Itens com menor pontuação que representam espaço imediato para expansão:
              </p>

              <div className="space-y-2.5">
                {insights.opportunities.map((op) => (
                  <div
                    key={op.questionId}
                    className="p-3.5 rounded-lg bg-amber-50/70 dark:bg-amber-500/5 border border-amber-200 dark:border-amber-500/20 print:bg-neutral-50 print:border-neutral-200 text-xs"
                  >
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="font-mono text-[10px] text-amber-700 dark:text-amber-400 print:text-amber-700 font-semibold">
                        Questão {op.questionId} · {op.dimensionName}
                      </span>
                      <span className="font-mono text-[10px] font-bold px-1.5 py-0.2 rounded bg-amber-100 dark:bg-amber-500/10 text-amber-800 dark:text-amber-300 print:text-amber-800">
                        Nota {op.score}/5
                      </span>
                    </div>
                    <p className="text-neutral-900 dark:text-neutral-200 print:text-neutral-800 font-medium italic mb-1">
                      “{op.text}”
                    </p>
                    <p className="text-neutral-600 dark:text-neutral-400 print:text-neutral-600 text-[11px]">
                      {op.observation}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Comportamentos para Observar no Cotidiano */}
          <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-900/80 print:bg-neutral-50 border border-neutral-200 dark:border-neutral-800 print:border-neutral-200">
            <h5 className="text-xs font-bold uppercase tracking-wider text-neutral-800 dark:text-neutral-300 print:text-neutral-800 mb-2">
              Comportamentos para Observar Atentamente no Cotidiano:
            </h5>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-neutral-700 dark:text-neutral-300 print:text-neutral-700">
              {insights.dailyBehaviorsToObserve.map((obs, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <span className="text-orange-600 dark:text-orange-400 shrink-0 font-bold">•</span>
                  <span>{obs}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* SEÇÃO 7: PLANO DE DESENVOLVIMENTO INDIVIDUAL (PDI)       */}
      {/* ======================================================== */}
      <section className="mb-10 print:mb-8">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-mono font-bold text-orange-600 dark:text-orange-400">06.</span>
          <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 print:text-neutral-900">
            Plano de Desenvolvimento Individual (PDI)
          </h3>
        </div>

        <PDIPlan items={pdiItems} onUpdatePDIItem={onUpdatePDIItem} />
      </section>

      {/* ======================================================== */}
      {/* SEÇÃO 8: METODOLOGIA E LIMITAÇÕES                        */}
      {/* ======================================================== */}
      <section className="mb-12 print:mb-8 break-inside-avoid">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-mono font-bold text-orange-600 dark:text-orange-400">07.</span>
          <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 print:text-neutral-900">
            Metodologia e Limitações do Instrumento
          </h3>
        </div>

        <div className="bg-white dark:bg-[#181A20] border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 sm:p-8 print:border-neutral-300 print:bg-white print:text-neutral-900 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 print:text-neutral-700 leading-relaxed space-y-4 shadow-xs dark:shadow-none transition-colors">
          <p>
            <strong>Natureza de Autoavaliação:</strong> O Teste de Inteligência Emocional COMET é um instrumento estruturado de autorrelato. Ele reflete a autopercepção habitual do respondente sobre suas condutas em momentos típicos e de pressão. Não constitui, em hipótese alguma, diagnóstico clínico, avaliação psiquiátrica ou instrumento psicométrico fechado com validação estatística populacional definitiva.
          </p>

          <p>
            <strong>Estrutura e Escala:</strong> O questionário é composto por 40 questões formuladas com base em abordagens de Inteligência Emocional associadas a Daniel Goleman, distribuídas em 5 dimensões com 8 questões cada. Cada questão utiliza uma escala Likert de 1 (Nunca) a 5 (Sempre).
          </p>

          <p>
            <strong>Cálculo e Classificação:</strong> A pontuação de cada dimensão é obtida pela soma direta de suas oito respostas, resultando em um intervalo estrito de 8 a 40 pontos. Os parâmetros interpretativos adotados são: <em>8 a 14 pontos (Muito baixo)</em>, <em>15 a 20 pontos (Baixo)</em>, <em>21 a 27 pontos (Em desenvolvimento)</em>, <em>28 a 34 pontos (Alto)</em> e <em>35 a 40 pontos (Muito alto)</em>.
          </p>

          <p>
            <strong>Interpretação Ética dos Resultados:</strong> Uma pontuação baixa indica uma oportunidade de atenção e treino intencional, e nunca um defeito pessoal permanente. Da mesma forma, uma pontuação alta evidencia uma competência percebida com consistência, sem implicar infalibilidade em todas as situações da vida. Os resultados devem ser utilizados como mapa de autodesenvolvimento e reflexão contínua.
          </p>

          <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800 print:border-neutral-200 flex flex-wrap items-center justify-between gap-3 text-xs text-neutral-500 dark:text-neutral-400 print:text-neutral-600">
            <span>© Instituto COMET · Todos os direitos reservados</span>
            <button
              onClick={onOpenValidationModal}
              className="text-orange-600 dark:text-orange-400 print:text-orange-700 hover:underline cursor-pointer font-medium"
            >
              Auditar Testes Matemáticos Obrigatórios (Seção 14)
            </button>
          </div>
        </div>
      </section>

      {/* Bottom Floating Export Bar (hidden in print) */}
      <div className="p-5 bg-white dark:bg-[#181A20] border border-neutral-200 dark:border-neutral-800 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 print:hidden shadow-xs dark:shadow-none transition-colors">
        <div>
          <h4 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
            Deseja salvar ou imprimir este relatório?
          </h4>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            O documento está formatado para exportação em PDF limpo e profissional sem quebras visuais inadequadas.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onRetake}
            className="px-4 py-2 text-xs font-semibold text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200 border border-neutral-300 dark:border-neutral-800 rounded-lg transition-colors cursor-pointer"
          >
            Refazer Avaliação
          </button>
          <button
            onClick={handlePrint}
            className="px-6 py-2.5 text-xs font-bold text-white bg-orange-600 hover:bg-orange-500 rounded-lg transition-colors shadow-sm flex items-center gap-2 cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span>Exportar em PDF</span>
          </button>
        </div>
      </div>
    </div>
  );
};
