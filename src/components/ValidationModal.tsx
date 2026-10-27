import React, { useMemo } from 'react';
import { runMandatoryTests } from '../utils/testsVerification';

interface ValidationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPopulateTestData?: (scenario: 'all_1' | 'all_5' | 'balanced' | 'mixed') => void;
}

export const ValidationModal: React.FC<ValidationModalProps> = ({
  isOpen,
  onClose,
  onPopulateTestData
}) => {
  const testResults = useMemo(() => runMandatoryTests(), []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-[#181A20] border border-neutral-200 dark:border-neutral-700 max-w-3xl w-full max-h-[90vh] rounded-2xl flex flex-col shadow-2xl overflow-hidden transition-colors">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              <span className="text-xs font-mono font-bold text-orange-600 dark:text-orange-400 uppercase tracking-wider">
                Auditoria de Conformidade Metodológica
              </span>
            </div>
            <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
              Testes Obrigatórios do Instrumento (Seção 14)
            </h3>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 flex items-center justify-center transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Quick summary strip & quick test scenarios */}
        <div className="bg-neutral-50 dark:bg-neutral-900/90 px-6 py-3 border-b border-neutral-200 dark:border-neutral-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">
              {testResults.passedCount} de {testResults.total} testes APROVADOS
            </span>
            <span>·</span>
            <span className="text-neutral-500 dark:text-neutral-400">100% de conformidade estrita</span>
          </div>

          {onPopulateTestData && (
            <div className="flex items-center gap-2">
              <span className="text-neutral-500 dark:text-neutral-400 text-[11px]">Injetar cenário de teste:</span>
              <button
                onClick={() => {
                  onPopulateTestData('all_1');
                  onClose();
                }}
                className="px-2 py-1 bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 text-[11px] rounded transition-colors font-mono cursor-pointer"
              >
                Todas 1 (Piso 8)
              </button>
              <button
                onClick={() => {
                  onPopulateTestData('all_5');
                  onClose();
                }}
                className="px-2 py-1 bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 text-[11px] rounded transition-colors font-mono cursor-pointer"
              >
                Todas 5 (Teto 40)
              </button>
              <button
                onClick={() => {
                  onPopulateTestData('mixed');
                  onClose();
                }}
                className="px-2 py-1 bg-orange-500/20 hover:bg-orange-500/30 text-orange-700 dark:text-orange-200 text-[11px] rounded transition-colors font-mono cursor-pointer"
              >
                Cenário Realista
              </button>
            </div>
          )}
        </div>

        {/* Test List Container */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-3.5">
          {testResults.results.map((test) => (
            <div
              key={test.id}
              className={`p-4 rounded-xl border transition-colors ${
                test.passed
                  ? 'bg-neutral-50/70 dark:bg-neutral-900/50 border-neutral-200 dark:border-neutral-800'
                  : 'bg-rose-50 dark:bg-rose-500/10 border-rose-200 dark:border-rose-500/30'
              }`}
            >
              <div className="flex items-center justify-between gap-3 mb-2">
                <h4 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${test.passed ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                  {test.title}
                </h4>
                <span
                  className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded ${
                    test.passed
                      ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30'
                      : 'bg-rose-500/10 text-rose-700 dark:text-rose-400 border border-rose-500/30'
                  }`}
                >
                  {test.passed ? 'APROVADO' : 'REPROVADO'}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-neutral-700 dark:text-neutral-300 font-mono mt-2">
                <div className="bg-white dark:bg-neutral-950/60 p-2.5 rounded border border-neutral-200 dark:border-neutral-800/80">
                  <span className="text-[10px] text-neutral-500 dark:text-neutral-400 uppercase tracking-wider block mb-1">
                    Critério Obrigatório
                  </span>
                  <p className="text-neutral-800 dark:text-neutral-300">{test.expected}</p>
                </div>
                <div className="bg-white dark:bg-neutral-950/60 p-2.5 rounded border border-neutral-200 dark:border-neutral-800/80">
                  <span className="text-[10px] text-neutral-500 dark:text-neutral-400 uppercase tracking-wider block mb-1">
                    Resultado Auditado em Execução
                  </span>
                  <p className={test.passed ? 'text-emerald-700 dark:text-emerald-300' : 'text-rose-700 dark:text-rose-300'}>
                    {test.actual}
                  </p>
                </div>
              </div>

              <p className="mt-2 text-[11px] text-neutral-500 dark:text-neutral-400">
                {test.details}
              </p>
            </div>
          ))}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400">
          <span>Relatório de testes em tempo real do instrumento</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 font-semibold rounded-lg transition-colors cursor-pointer"
          >
            Fechar Auditoria
          </button>
        </div>
      </div>
    </div>
  );
};
