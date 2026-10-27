import React from 'react';
import { PDIItem } from '../types/assessment';

interface PDIPlanProps {
  items: PDIItem[];
  onUpdatePDIItem: (id: string, updates: Partial<PDIItem>) => void;
}

export const PDIPlan: React.FC<PDIPlanProps> = ({ items, onUpdatePDIItem }) => {
  return (
    <div className="space-y-6">
      <div className="p-4 rounded-xl bg-orange-50 dark:bg-orange-500/10 border border-orange-200 dark:border-orange-500/20 text-xs text-neutral-800 dark:text-neutral-300 leading-relaxed shadow-xs dark:shadow-none transition-colors">
        <span className="font-semibold text-orange-600 dark:text-orange-400">Diretriz do PDI:</span> As ações abaixo foram priorizadas a partir dos comportamentos com menor pontuação relativa na sua avaliação. Utilize o campo de evidências e reflexões para registrar seu progresso prático na rotina.
      </div>

      <div className="grid grid-cols-1 gap-6">
        {items.map((item, index) => (
          <div
            key={item.id}
            className={`border rounded-xl p-5 sm:p-6 transition-colors shadow-xs dark:shadow-none ${
              item.concluido
                ? 'bg-neutral-50/80 dark:bg-neutral-900/40 border-neutral-200 dark:border-neutral-800 opacity-90'
                : 'bg-white dark:bg-[#181A20] border-neutral-200 dark:border-neutral-800'
            }`}
          >
            {/* Header: Priority and Dimension */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-4 border-b border-neutral-200 dark:border-neutral-800">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/30">
                  Prioridade 0{index + 1}
                </span>
                <span className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                  {item.dimensionName}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs text-neutral-500 dark:text-neutral-400 font-mono">
                  Revisão sugerida: <strong className="text-neutral-800 dark:text-neutral-200">{item.dataRevisao}</strong>
                </span>

                <label className="inline-flex items-center gap-1.5 text-xs text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200 cursor-pointer ml-2">
                  <input
                    type="checkbox"
                    checked={!!item.concluido}
                    onChange={(e) => onUpdatePDIItem(item.id, { concluido: e.target.checked })}
                    className="w-3.5 h-3.5 rounded border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-orange-500 focus:ring-0 cursor-pointer"
                  />
                  <span>Concluída</span>
                </label>
              </div>
            </div>

            {/* Target Behavior */}
            <div className="mb-4">
              <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400 block mb-1">
                Comportamento-Alvo (Item Avaliado)
              </span>
              <p className="text-sm text-neutral-800 dark:text-neutral-200 font-medium italic">
                “{item.comportamento}”
              </p>
            </div>

            {/* Grid of Strategy Elements */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs mb-5">
              <div className="bg-neutral-50 dark:bg-neutral-900/80 border border-neutral-200 dark:border-neutral-800 p-3 rounded-lg transition-colors">
                <span className="font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider text-[10px] block mb-1">
                  Objetivo Específico
                </span>
                <p className="text-neutral-800 dark:text-neutral-200">{item.objetivo}</p>
              </div>

              <div className="bg-neutral-50 dark:bg-neutral-900/80 border border-neutral-200 dark:border-neutral-800 p-3 rounded-lg transition-colors">
                <span className="font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider text-[10px] block mb-1">
                  Ação Prática Observável
                </span>
                <p className="text-neutral-800 dark:text-neutral-200">{item.acaoPratica}</p>
              </div>

              <div className="bg-neutral-50 dark:bg-neutral-900/80 border border-neutral-200 dark:border-neutral-800 p-3 rounded-lg transition-colors">
                <span className="font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider text-[10px] block mb-1">
                  Frequência & Prazo
                </span>
                <p className="text-neutral-800 dark:text-neutral-200">
                  <span className="font-medium text-orange-600 dark:text-orange-400">{item.frequencia}</span> · Prazo: {item.prazo}
                </p>
              </div>

              <div className="bg-neutral-50 dark:bg-neutral-900/80 border border-neutral-200 dark:border-neutral-800 p-3 rounded-lg transition-colors">
                <span className="font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider text-[10px] block mb-1">
                  Indicador de Progresso
                </span>
                <p className="text-neutral-800 dark:text-neutral-200">{item.indicadorProgresso}</p>
              </div>
            </div>

            {/* Reflection and Evidence Area */}
            <div>
              <label className="block text-xs font-semibold text-neutral-800 dark:text-neutral-300 mb-1.5 flex items-center justify-between">
                <span>Registro de Evidências, Aprendizados e Reflexões:</span>
                <span className="text-[11px] text-neutral-500 dark:text-neutral-400 font-normal">Salvo automaticamente</span>
              </label>
              <textarea
                value={item.evidenciasReflexoes || ''}
                onChange={(e) => onUpdatePDIItem(item.id, { evidenciasReflexoes: e.target.value })}
                placeholder="Ex: No dia 14/11, utilizei a técnica da pausa antes da reunião com o cliente e consegui manter a serenidade quando a cobrança subiu..."
                rows={3}
                className="w-full bg-neutral-50 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700/80 rounded-lg p-3 text-xs sm:text-sm text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 dark:placeholder-neutral-500 focus:outline-none focus:border-orange-500 transition-colors leading-relaxed"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
