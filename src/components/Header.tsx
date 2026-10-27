import React from 'react';

interface HeaderProps {
  currentStep: 'welcome' | 'questionnaire' | 'review' | 'report';
  onNavigate: (step: 'welcome' | 'questionnaire' | 'review' | 'report') => void;
  onViewReport: () => void;
  onOpenValidationModal: () => void;
  onExportPDF?: () => void;
  answeredCount: number;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentStep,
  onNavigate,
  onViewReport,
  onOpenValidationModal,
  onExportPDF,
  answeredCount,
  theme,
  onToggleTheme
}) => {
  return (
    <header className="border-b border-neutral-200 dark:border-neutral-800 bg-white/90 dark:bg-[#121316]/90 backdrop-blur-md sticky top-0 z-40 transition-colors print:hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4 sm:gap-8">
        {/* Zone 1: Brand Wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-8 h-8 rounded-lg bg-orange-500/10 dark:bg-orange-600/10 border border-orange-500/30 flex items-center justify-center text-orange-600 dark:text-orange-500 font-black text-sm tracking-tighter">
            IE
          </div>
          <button
            onClick={() => onNavigate('welcome')}
            className="text-left group cursor-pointer focus:outline-none"
          >
            <span className="text-base font-bold text-neutral-900 dark:text-neutral-100 tracking-tight block whitespace-nowrap">
              COMET <span className="text-orange-500 font-light">|</span> Inteligência Emocional
            </span>
          </button>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-neutral-600 dark:text-neutral-400">
          <button
            onClick={() => onNavigate('welcome')}
            className={`transition-colors whitespace-nowrap hover:text-neutral-900 dark:hover:text-neutral-100 cursor-pointer ${
              currentStep === 'welcome' ? 'text-orange-600 dark:text-orange-400 font-semibold' : ''
            }`}
          >
            Início & Instruções
          </button>

          <button
            onClick={() => onNavigate('questionnaire')}
            className={`transition-colors whitespace-nowrap hover:text-neutral-900 dark:hover:text-neutral-100 cursor-pointer ${
              currentStep === 'questionnaire' ? 'text-orange-600 dark:text-orange-400 font-semibold' : ''
            }`}
          >
            Questionário ({answeredCount}/40)
          </button>

          <button
            onClick={() => onNavigate('review')}
            className={`transition-colors whitespace-nowrap hover:text-neutral-900 dark:hover:text-neutral-100 cursor-pointer ${
              currentStep === 'review' ? 'text-orange-600 dark:text-orange-400 font-semibold' : ''
            }`}
          >
            Revisão das Questões
          </button>

          {answeredCount === 40 && (
            <button
              onClick={onViewReport}
              className={`transition-colors whitespace-nowrap hover:text-orange-600 dark:hover:text-orange-300 cursor-pointer flex items-center gap-1.5 font-bold ${
                currentStep === 'report' ? 'text-orange-600 dark:text-orange-400' : 'text-orange-600/90 dark:text-orange-400/90'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
              Relatório Individual
            </button>
          )}

          <button
            onClick={onOpenValidationModal}
            className="transition-colors whitespace-nowrap text-neutral-600 dark:text-neutral-400 hover:text-orange-600 dark:hover:text-orange-300 flex items-center gap-1.5 cursor-pointer"
            title="Verificar conformidade dos 10 testes obrigatórios (Seção 14)"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            Testes do Algoritmo
          </button>
        </nav>

        {/* Zone 3: Actions (Theme Toggle + Primary Action) */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          {/* Theme Toggle Button (Modo Escuro / Modo Claro) */}
          <button
            onClick={onToggleTheme}
            type="button"
            className="flex items-center gap-2 px-2.5 py-1.5 text-xs font-medium text-neutral-700 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-800/80 hover:bg-neutral-200 dark:hover:bg-neutral-700/80 border border-neutral-300 dark:border-neutral-700 rounded-lg transition-all cursor-pointer whitespace-nowrap shrink-0 shadow-xs"
            title={theme === 'dark' ? 'Alternar para Modo Claro' : 'Alternar para Modo Escuro'}
            aria-label={theme === 'dark' ? 'Alternar para Modo Claro' : 'Alternar para Modo Escuro'}
          >
            {theme === 'dark' ? (
              <>
                {/* Sun icon */}
                <svg className="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                <span className="hidden sm:inline font-mono text-[11px]">Modo Claro</span>
              </>
            ) : (
              <>
                {/* Moon icon */}
                <svg className="w-4 h-4 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
                <span className="hidden sm:inline font-mono text-[11px]">Modo Escuro</span>
              </>
            )}
          </button>

          {/* Primary Action Button */}
          {currentStep === 'report' ? (
            <button
              onClick={onExportPDF}
              className="px-3.5 sm:px-4 py-2 text-xs font-semibold text-white bg-orange-600 hover:bg-orange-500 rounded-lg transition-colors shadow-sm whitespace-nowrap shrink-0 flex items-center gap-2 cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span className="hidden xs:inline">Exportar em PDF</span>
              <span className="xs:hidden">PDF</span>
            </button>
          ) : answeredCount === 40 ? (
            <button
              onClick={onViewReport}
              className="px-3.5 sm:px-4 py-2 text-xs font-bold text-white bg-orange-600 hover:bg-orange-500 rounded-lg transition-all shadow-md whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer ring-2 ring-orange-500/40"
            >
              <span>Ver Relatório</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          ) : currentStep === 'welcome' ? (
            <button
              onClick={() => onNavigate('questionnaire')}
              className="px-3.5 sm:px-4 py-2 text-xs font-semibold text-white bg-orange-600 hover:bg-orange-500 rounded-lg transition-colors shadow-sm whitespace-nowrap shrink-0 cursor-pointer"
            >
              {answeredCount > 0 ? 'Continuar Teste' : 'Iniciar Avaliação'}
            </button>
          ) : currentStep === 'questionnaire' ? (
            <button
              onClick={() => onNavigate('review')}
              className="px-3.5 sm:px-4 py-2 text-xs font-semibold text-neutral-800 dark:text-neutral-200 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 border border-neutral-300 dark:border-neutral-700 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Revisar Respostas
            </button>
          ) : (
            <button
              onClick={onViewReport}
              disabled={answeredCount < 40}
              className={`px-3.5 sm:px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                answeredCount === 40
                  ? 'text-white bg-orange-600 hover:bg-orange-500'
                  : 'text-neutral-400 dark:text-neutral-500 bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 cursor-not-allowed'
              }`}
            >
              Ver Relatório
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
