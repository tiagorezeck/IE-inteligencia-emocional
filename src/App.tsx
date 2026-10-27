import React, { useState, useEffect } from 'react';
import { LikertValue, AssessmentResult, PDIItem } from './types/assessment';
import { QUESTIONS } from './data/questions';
import { calculateDimensionScores } from './utils/scoring';
import { generateInitialPDI } from './utils/insights';
import {
  loadAssessmentState,
  saveAssessmentState,
  savePDIReflections,
  resetAssessmentState
} from './utils/storage';
import { Header } from './components/Header';
import { WelcomeScreen } from './components/WelcomeScreen';
import { QuestionnaireScreen } from './components/QuestionnaireScreen';
import { ReviewScreen } from './components/ReviewScreen';
import { ReportScreen } from './components/ReportScreen';
import { ValidationModal } from './components/ValidationModal';

export default function App() {
  const [currentStep, setCurrentStep] = useState<'welcome' | 'questionnaire' | 'review' | 'report'>('welcome');
  const [participantName, setParticipantName] = useState<string>('');
  const [participantRole, setParticipantRole] = useState<string>('');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<number, LikertValue>>({});
  const [completedResult, setCompletedResult] = useState<AssessmentResult | null>(null);
  const [showValidationModal, setShowValidationModal] = useState<boolean>(false);

  // Theme state ('dark' | 'light'), default to Instituto COMET's signature dark aesthetic
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    try {
      const savedTheme = localStorage.getItem('comet_theme');
      if (savedTheme === 'light' || savedTheme === 'dark') return savedTheme;
    } catch (e) {}
    return 'dark';
  });

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    }
    try {
      localStorage.setItem('comet_theme', theme);
    } catch (e) {}
  }, [theme]);

  // Helper to generate and save completed result
  const generateAndSaveResult = (currentAnswers: Record<number, LikertValue>, name?: string, role?: string): AssessmentResult => {
    const scores = calculateDimensionScores(currentAnswers);
    const initialPdi = generateInitialPDI(currentAnswers, scores);

    const newResult: AssessmentResult = {
      id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `comet-${Date.now()}`,
      version: '1.0',
      participantName: (name !== undefined ? name : participantName).trim(),
      participantRole: (role !== undefined ? role : participantRole).trim(),
      completedAt: new Date().toISOString(),
      answers: currentAnswers,
      scores,
      pdiItems: initialPdi
    };

    setCompletedResult(newResult);
    saveAssessmentState({
      isCompleted: true,
      result: newResult,
      answers: currentAnswers
    });
    return newResult;
  };

  // Initialize from LocalStorage
  useEffect(() => {
    const saved = loadAssessmentState();
    if (saved) {
      const name = saved.participantName || '';
      const role = saved.participantRole || '';
      const ans = saved.answers || {};
      const count = Object.keys(ans).length;

      setParticipantName(name);
      setParticipantRole(role);
      setAnswers(ans);
      setCurrentQuestionIndex(saved.currentQuestionIndex || 0);

      if (saved.result) {
        setCompletedResult(saved.result);
        setCurrentStep('report');
      } else if (count === 40) {
        // If all 40 questions are answered, generate the result and directly display the report
        generateAndSaveResult(ans, name, role);
        setCurrentStep('report');
      } else if (count > 0) {
        setCurrentStep('welcome');
      }
    }
  }, []);

  // Update participant data
  const handleUpdateParticipant = (name: string, role: string) => {
    setParticipantName(name);
    setParticipantRole(role);
    saveAssessmentState({ participantName: name, participantRole: role });
    if (completedResult) {
      const updated = {
        ...completedResult,
        participantName: name.trim(),
        participantRole: role.trim()
      };
      setCompletedResult(updated);
      saveAssessmentState({ result: updated });
    }
  };

  // Answer a question
  const handleAnswer = (questionId: number, value: LikertValue) => {
    const nextAnswers = { ...answers, [questionId]: value };
    setAnswers(nextAnswers);
    const answeredCount = Object.keys(nextAnswers).length;

    saveAssessmentState({
      answers: nextAnswers,
      currentQuestionIndex
    });

    // Automatically advance to next question if not at the end
    if (currentQuestionIndex < QUESTIONS.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else if (answeredCount === QUESTIONS.length) {
      // Completed the 40th question! Automatically generate result
      generateAndSaveResult(nextAnswers);
    }
  };

  // Quick answer from review screen
  const handleAnswerQuick = (questionId: number, value: LikertValue) => {
    const nextAnswers = { ...answers, [questionId]: value };
    setAnswers(nextAnswers);
    saveAssessmentState({ answers: nextAnswers });
    if (Object.keys(nextAnswers).length === 40) {
      generateAndSaveResult(nextAnswers);
    }
  };

  // Start / Continue Assessment
  const handleStart = () => {
    const answeredCount = Object.keys(answers).length;
    if (answeredCount === 40) {
      if (!completedResult) {
        generateAndSaveResult(answers);
      }
      setCurrentStep('report');
      return;
    }

    // Find first unanswered question
    let targetIndex = currentQuestionIndex;
    for (let i = 0; i < QUESTIONS.length; i++) {
      if (answers[QUESTIONS[i].id] === undefined) {
        targetIndex = i;
        break;
      }
    }
    setCurrentQuestionIndex(targetIndex);
    setCurrentStep('questionnaire');
  };

  // Directly view report
  const handleViewReport = () => {
    if (!completedResult) {
      generateAndSaveResult(answers);
    }
    setCurrentStep('report');
  };

  // Reset Assessment
  const handleReset = () => {
    if (window.confirm('Deseja realmente reiniciar todas as respostas desta avaliação?')) {
      resetAssessmentState();
      setAnswers({});
      setCurrentQuestionIndex(0);
      setCompletedResult(null);
      setCurrentStep('welcome');
    }
  };

  // Retake test from report
  const handleRetake = () => {
    if (window.confirm('Deseja iniciar um novo teste? Suas respostas anteriores serão substituídas.')) {
      resetAssessmentState();
      setAnswers({});
      setCurrentQuestionIndex(0);
      setCompletedResult(null);
      setCurrentStep('welcome');
    }
  };

  // Finalize and calculate assessment from review
  const handleConfirmComplete = () => {
    generateAndSaveResult(answers);
    setCurrentStep('report');
  };

  // Update PDI item reflection or completion
  const handleUpdatePDIItem = (id: string, updates: Partial<PDIItem>) => {
    if (!completedResult) return;
    const updatedItems = completedResult.pdiItems.map((item) =>
      item.id === id ? { ...item, ...updates } : item
    );
    const updatedResult = { ...completedResult, pdiItems: updatedItems };
    setCompletedResult(updatedResult);
    savePDIReflections(updatedItems);
  };

  // Quick populate for testing Section 14 criteria
  const handlePopulateTestData = (scenario: 'all_1' | 'all_5' | 'balanced' | 'mixed') => {
    const mockAnswers: Record<number, LikertValue> = {};

    if (scenario === 'all_1') {
      for (let i = 1; i <= 40; i++) mockAnswers[i] = 1;
    } else if (scenario === 'all_5') {
      for (let i = 1; i <= 40; i++) mockAnswers[i] = 5;
    } else if (scenario === 'mixed') {
      [4, 4, 3, 4, 3, 4, 3, 3].forEach((v, idx) => { mockAnswers[idx + 1] = v as LikertValue; });
      [3, 3, 3, 3, 3, 3, 3, 3].forEach((v, idx) => { mockAnswers[idx + 9] = v as LikertValue; });
      [5, 4, 5, 4, 5, 4, 4, 4].forEach((v, idx) => { mockAnswers[idx + 17] = v as LikertValue; });
      [2, 2, 3, 2, 2, 3, 2, 2].forEach((v, idx) => { mockAnswers[idx + 25] = v as LikertValue; });
      [4, 4, 4, 4, 4, 4, 4, 3].forEach((v, idx) => { mockAnswers[idx + 33] = v as LikertValue; });
    }

    setAnswers(mockAnswers);
    saveAssessmentState({ answers: mockAnswers });
    generateAndSaveResult(mockAnswers);
    setCurrentStep('report');
  };

  const answeredCount = Object.keys(answers).length;

  // Active result guarantee: if user navigates to report and has answered 40 questions, result is always ready
  const activeResult = completedResult || (answeredCount === 40 ? generateAndSaveResult(answers) : null);

  return (
    <div className="min-h-screen bg-[#F8F9FA] dark:bg-[#121316] text-[#111827] dark:text-[#F3F4F6] font-sans selection:bg-orange-500/30 selection:text-orange-900 dark:selection:text-orange-200 transition-colors duration-200">
      {/* Top Header */}
      <Header
        currentStep={currentStep}
        onNavigate={(step) => {
          if (step === 'report') {
            if (answeredCount === 40) {
              handleViewReport();
            }
            return;
          }
          setCurrentStep(step);
        }}
        onViewReport={handleViewReport}
        onOpenValidationModal={() => setShowValidationModal(true)}
        onExportPDF={() => window.print()}
        answeredCount={answeredCount}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      {/* Main Screen Content */}
      <main className="pb-16 print:pb-0">
        {currentStep === 'welcome' && (
          <WelcomeScreen
            participantName={participantName}
            participantRole={participantRole}
            onUpdateParticipant={handleUpdateParticipant}
            onStart={handleStart}
            onViewReport={handleViewReport}
            onReset={handleReset}
            answeredCount={answeredCount}
            onOpenValidationModal={() => setShowValidationModal(true)}
          />
        )}

        {currentStep === 'questionnaire' && (
          <QuestionnaireScreen
            currentIndex={currentQuestionIndex}
            answers={answers}
            onAnswer={handleAnswer}
            onNext={() => {
              if (currentQuestionIndex < QUESTIONS.length - 1) {
                setCurrentQuestionIndex((prev) => prev + 1);
              }
            }}
            onPrev={() => {
              if (currentQuestionIndex > 0) {
                setCurrentQuestionIndex((prev) => prev - 1);
              }
            }}
            onGoToReview={() => setCurrentStep('review')}
            onViewReport={handleViewReport}
          />
        )}

        {currentStep === 'review' && (
          <ReviewScreen
            answers={answers}
            onSelectQuestion={(idx) => {
              setCurrentQuestionIndex(idx);
              setCurrentStep('questionnaire');
            }}
            onAnswerQuick={handleAnswerQuick}
            onConfirmComplete={handleConfirmComplete}
            onBackToQuestions={() => setCurrentStep('questionnaire')}
          />
        )}

        {currentStep === 'report' && activeResult && (
          <ReportScreen
            result={activeResult}
            onUpdatePDIItem={handleUpdatePDIItem}
            onRetake={handleRetake}
            onReviewAnswers={() => setCurrentStep('review')}
            onOpenValidationModal={() => setShowValidationModal(true)}
            theme={theme}
          />
        )}
      </main>

      {/* Mandatory Validation Tests Modal (Section 14) */}
      <ValidationModal
        isOpen={showValidationModal}
        onClose={() => setShowValidationModal(false)}
        onPopulateTestData={handlePopulateTestData}
      />
    </div>
  );
}
