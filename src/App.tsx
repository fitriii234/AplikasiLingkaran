/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useCallback, useEffect, useState } from 'react';
import { CircleLab } from './components/CircleLab';
import { DashboardHome } from './components/DashboardHome';
import { LoginScreen } from './components/LoginScreen';
import { PracticeArena } from './components/PracticeArena';
import { SelfPacedLessons } from './components/SelfPacedLessons';
import { StepByStepCalculator } from './components/StepByStepCalculator';
import { TopNav } from './components/TopNav';
import { ModuleId, ProgressState, StudentProfile } from './types';

const STUDENT_STORAGE_KEY = 'lingkarpintar_student_v1';
const PROGRESS_STORAGE_KEY = 'lingkarpintar_progress_v1';

const DEFAULT_PROGRESS: ProgressState = {
  completedLessons: [],
  answeredQuestions: {},
  exploredLabModes: [],
};

export default function App() {
  const [student, setStudent] = useState<StudentProfile | null>(() => {
    try {
      const saved = localStorage.getItem(STUDENT_STORAGE_KEY);
      return saved ? (JSON.parse(saved) as StudentProfile) : null;
    } catch {
      return null;
    }
  });

  const [progress, setProgress] = useState<ProgressState>(() => {
    try {
      const saved = localStorage.getItem(PROGRESS_STORAGE_KEY);
      return saved ? (JSON.parse(saved) as ProgressState) : DEFAULT_PROGRESS;
    } catch {
      return DEFAULT_PROGRESS;
    }
  });

  const [activeModule, setActiveModule] = useState<ModuleId>('home');

  useEffect(() => {
    if (student) {
      localStorage.setItem(STUDENT_STORAGE_KEY, JSON.stringify(student));
    } else {
      localStorage.removeItem(STUDENT_STORAGE_KEY);
    }
  }, [student]);

  useEffect(() => {
    localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  const handleLogin = (profile: StudentProfile) => {
    setStudent(profile);
    setActiveModule('home');
  };

  const handleLogout = () => {
    setStudent(null);
    setActiveModule('home');
  };

  const handleExploreLabMode = useCallback((mode: string) => {
    setProgress((prev) => {
      if (prev.exploredLabModes.includes(mode)) return prev;
      return {
        ...prev,
        exploredLabModes: [...prev.exploredLabModes, mode],
      };
    });
  }, []);

  const handleCompleteLesson = (chapterId: string) => {
    setProgress((prev) => {
      if (prev.completedLessons.includes(chapterId)) return prev;
      return {
        ...prev,
        completedLessons: [...prev.completedLessons, chapterId],
      };
    });
  };

  const handleAnswerQuestion = (
    questionId: string,
    selectedOptionId: string,
    isCorrect: boolean
  ) => {
    setProgress((prev) => {
      const prevAttempt = prev.answeredQuestions[questionId];
      return {
        ...prev,
        answeredQuestions: {
          ...prev.answeredQuestions,
          [questionId]: {
            selectedOptionId,
            isCorrect,
            attempts: (prevAttempt?.attempts || 0) + 1,
          },
        },
      };
    });
  };

  const handleResetPractice = () => {
    setProgress((prev) => ({
      ...prev,
      answeredQuestions: {},
    }));
  };

  if (!student) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      <TopNav
        activeModule={activeModule}
        onSelectModule={setActiveModule}
        student={student}
        onLogout={handleLogout}
      />

      <main className="flex-1">
        {activeModule === 'home' && (
          <DashboardHome
            student={student}
            progress={progress}
            onNavigate={setActiveModule}
          />
        )}
        {activeModule === 'lab' && (
          <CircleLab
            onExploreMode={handleExploreLabMode}
            onGoToCalculator={() => setActiveModule('calculator')}
          />
        )}
        {activeModule === 'lessons' && (
          <SelfPacedLessons
            completedLessons={progress.completedLessons}
            onCompleteLesson={handleCompleteLesson}
            onGoToPractice={() => setActiveModule('practice')}
          />
        )}
        {activeModule === 'calculator' && <StepByStepCalculator />}
        {activeModule === 'practice' && (
          <PracticeArena
            progress={progress}
            onAnswerQuestion={handleAnswerQuestion}
            onResetPractice={handleResetPractice}
          />
        )}
      </main>

      <footer className="border-t border-slate-200 bg-white mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
          <span>
            LingkarPintar · Media Belajar Lingkaran SMP (Siswa: {student.fullName} · {student.gradeClass})
          </span>
          <span>
            Dikembangkan oleh Siti Fitriani · Pendidikan Matematika 3B
          </span>
        </div>
      </footer>
    </div>
  );
}
