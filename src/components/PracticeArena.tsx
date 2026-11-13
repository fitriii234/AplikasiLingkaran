import React, { useState } from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  ChevronRight,
  Eye,
  EyeOff,
  Lightbulb,
  RotateCcw,
} from 'lucide-react';
import { PRACTICE_QUESTIONS } from '../data/circleData';
import { PracticeQuestion, ProgressState } from '../types';

interface PracticeArenaProps {
  progress: ProgressState;
  onAnswerQuestion: (
    questionId: string,
    selectedOptionId: string,
    isCorrect: boolean
  ) => void;
  onResetPractice: () => void;
}

export const PracticeArena: React.FC<PracticeArenaProps> = ({
  progress,
  onAnswerQuestion,
  onResetPractice,
}) => {
  const [selectedLevel, setSelectedLevel] = useState<1 | 2 | 3>(1);
  const [currentIdxInLevel, setCurrentIdxInLevel] = useState<number>(0);
  const [highlightClues, setHighlightClues] = useState<boolean>(true);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [showSolution, setShowSolution] = useState<boolean>(false);

  const questionsInLevel = PRACTICE_QUESTIONS.filter(
    (q) => q.level === selectedLevel
  );
  const currentQuestion: PracticeQuestion =
    questionsInLevel[currentIdxInLevel] || questionsInLevel[0];

  const savedAttempt = progress.answeredQuestions[currentQuestion.id];
  const selectedOption = currentQuestion.options.find(
    (o) => o.id === savedAttempt?.selectedOptionId
  );

  const handleSelectLevel = (lvl: 1 | 2 | 3) => {
    setSelectedLevel(lvl);
    setCurrentIdxInLevel(0);
    setShowHint(false);
    setShowSolution(false);
  };

  const handleSelectOption = (optionId: string, isCorrect: boolean) => {
    onAnswerQuestion(currentQuestion.id, optionId, isCorrect);
    if (isCorrect) {
      setShowSolution(true);
    }
  };

  const handleNextQuestion = () => {
    setShowHint(false);
    setShowSolution(false);
    if (currentIdxInLevel < questionsInLevel.length - 1) {
      setCurrentIdxInLevel((idx) => idx + 1);
    } else if (selectedLevel < 3) {
      handleSelectLevel((selectedLevel + 1) as 1 | 2 | 3);
    }
  };

  const totalCorrect = Object.values(progress.answeredQuestions).filter(
    (a) => a.isCorrect
  ).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-slate-900">
            Latihan &amp; Detektif Soal Cerita
          </h1>
          <p className="mt-1 text-sm text-slate-600 max-w-2xl">
            Jika jawabanmu belum tepat, sistem akan langsung menunjukkan di mana letak kesalahannya supaya kamu bisa memperbaikinya.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-sm text-slate-600 tabular-nums">
            Tuntas:{' '}
            <span className="font-mono font-bold text-emerald-700">
              {totalCorrect}/{PRACTICE_QUESTIONS.length}
            </span>
          </div>
          <button
            type="button"
            onClick={() => {
              onResetPractice();
              setCurrentIdxInLevel(0);
              setShowHint(false);
              setShowSolution(false);
            }}
            className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-xs font-medium text-slate-600 inline-flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Ulangi Latihan</span>
          </button>
        </div>
      </div>

      {/* Level Filter Controls */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 bg-slate-200/70 rounded-xl w-fit">
        {(
          [
            { level: 1 as const, label: 'Level 1 · Konsep r, d & π' },
            { level: 2 as const, label: 'Level 2 · Hitung Luas & Keliling' },
            { level: 3 as const, label: 'Level 3 · Detektif Soal Cerita' },
          ]
        ).map((tab) => {
          const levelQuestions = PRACTICE_QUESTIONS.filter(
            (q) => q.level === tab.level
          );
          const levelDone = levelQuestions.filter(
            (q) => progress.answeredQuestions[q.id]?.isCorrect
          ).length;

          return (
            <button
              key={tab.level}
              type="button"
              onClick={() => handleSelectLevel(tab.level)}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                selectedLevel === tab.level
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab.label} ({levelDone}/{levelQuestions.length})
            </button>
          );
        })}
      </div>

      {/* Main Question & Diagnostic Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Question Card + Story Highlighter */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6">
          {/* Question Number Strip */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span className="font-semibold text-sky-700">
                {currentQuestion.levelLabel}
              </span>
              <span aria-hidden="true">·</span>
              <span>{currentQuestion.topicTag}</span>
            </div>

            <div className="flex items-center gap-1.5">
              {questionsInLevel.map((q, idx) => {
                const attempt = progress.answeredQuestions[q.id];
                const isCurrent = idx === currentIdxInLevel;
                return (
                  <button
                    key={q.id}
                    type="button"
                    onClick={() => {
                      setCurrentIdxInLevel(idx);
                      setShowHint(false);
                      setShowSolution(false);
                    }}
                    className={`w-8 h-8 rounded-lg font-mono text-xs font-bold border transition-colors cursor-pointer ${
                      isCurrent
                        ? 'bg-sky-600 border-sky-600 text-white'
                        : attempt?.isCorrect
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                        : attempt
                        ? 'bg-amber-50 border-amber-300 text-amber-800'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Story Highlighter Toolbar (especially for Level 3 story problems) */}
          {currentQuestion.storySegments && (
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-semibold text-slate-800">
                  Alat Bantu Baca Soal Cerita
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setHighlightClues((h) => !h)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold inline-flex items-center gap-1.5 border cursor-pointer whitespace-nowrap ${
                      highlightClues
                        ? 'bg-sky-600 border-sky-600 text-white'
                        : 'bg-white border-slate-300 text-slate-700'
                    }`}
                  >
                    {highlightClues ? (
                      <EyeOff className="w-3.5 h-3.5" />
                    ) : (
                      <Eye className="w-3.5 h-3.5" />
                    )}
                    <span>
                      {highlightClues ? 'Matikan Sorotan' : 'Sorot Kata Kunci'}
                    </span>
                  </button>
                  {currentQuestion.clueHint && (
                    <button
                      type="button"
                      onClick={() => setShowHint((h) => !h)}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-amber-50 border border-amber-300 text-amber-900 inline-flex items-center gap-1 cursor-pointer whitespace-nowrap"
                    >
                      <Lightbulb className="w-3.5 h-3.5" />
                      <span>{showHint ? 'Tutup Petunjuk' : 'Petunjuk'}</span>
                    </button>
                  )}
                </div>
              </div>

              {highlightClues && (
                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-700">
                  <span className="inline-flex items-center gap-1.5">
                    <span className="px-1.5 py-0.5 rounded bg-sky-100 text-sky-900 font-semibold">
                      [Diketahui]
                    </span>
                    <span>Angka &amp; jenis ukuran</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <span className="px-1.5 py-0.5 rounded bg-amber-100 text-amber-900 font-semibold">
                      [Konteks]
                    </span>
                    <span>Situasi benda</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <span className="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-900 font-semibold">
                      [Ditanya]
                    </span>
                    <span>Target jawaban</span>
                  </span>
                </div>
              )}
            </div>
          )}

          {/* Question Text (with optional live keyword highlighting) */}
          <div className="text-base sm:text-lg font-medium text-slate-900 leading-relaxed">
            {currentQuestion.storySegments && highlightClues ? (
              <p>
                {currentQuestion.storySegments.map((seg, idx) => {
                  if (seg.role === 'known') {
                    return (
                      <mark
                        key={idx}
                        className="px-1.5 py-0.5 mx-0.5 rounded bg-sky-100 text-sky-950 font-semibold"
                      >
                        {seg.text}
                        <span className="ml-1 text-[11px] font-mono text-sky-700">
                          [Diketahui]
                        </span>
                      </mark>
                    );
                  }
                  if (seg.role === 'context') {
                    return (
                      <mark
                        key={idx}
                        className="px-1.5 py-0.5 mx-0.5 rounded bg-amber-100 text-amber-950 font-medium"
                      >
                        {seg.text}
                        <span className="ml-1 text-[11px] font-mono text-amber-800">
                          [Konteks]
                        </span>
                      </mark>
                    );
                  }
                  if (seg.role === 'asked') {
                    return (
                      <mark
                        key={idx}
                        className="px-1.5 py-0.5 mx-0.5 rounded bg-emerald-100 text-emerald-950 font-semibold"
                      >
                        {seg.text}
                        <span className="ml-1 text-[11px] font-mono text-emerald-800">
                          [Ditanya]
                        </span>
                      </mark>
                    );
                  }
                  return <span key={idx}>{seg.text}</span>;
                })}
              </p>
            ) : (
              <p>{currentQuestion.questionText}</p>
            )}
          </div>

          {showHint && currentQuestion.clueHint && (
            <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-sm text-amber-950">
              <span className="font-semibold">Petunjuk Detektif: </span>
              {currentQuestion.clueHint}
            </div>
          )}

          {/* Options */}
          <div className="space-y-3">
            {currentQuestion.options.map((option, idx) => {
              const letter = ['A', 'B', 'C', 'D'][idx];
              const isSelected = savedAttempt?.selectedOptionId === option.id;

              let optionStyle =
                'bg-white border-slate-200 hover:border-sky-400 hover:bg-sky-50/40 text-slate-800';
              if (isSelected) {
                optionStyle = option.isCorrect
                  ? 'bg-emerald-50 border-emerald-600 text-emerald-950 ring-1 ring-emerald-600'
                  : 'bg-amber-50 border-amber-600 text-amber-950 ring-1 ring-amber-600';
              }

              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() =>
                    handleSelectOption(option.id, option.isCorrect)
                  }
                  className={`w-full p-4 rounded-xl border text-left transition-colors flex items-center gap-3.5 cursor-pointer ${optionStyle}`}
                >
                  <span
                    className={`w-8 h-8 rounded-lg font-mono text-xs font-bold flex items-center justify-center shrink-0 border ${
                      isSelected
                        ? option.isCorrect
                          ? 'bg-emerald-600 border-emerald-600 text-white'
                          : 'bg-amber-600 border-amber-600 text-white'
                        : 'bg-slate-100 border-slate-200 text-slate-700'
                    }`}
                  >
                    {letter}
                  </span>
                  <span className="text-sm sm:text-base font-medium">
                    {option.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Adaptive Diagnostic Feedback & Step-by-Step Solution */}
        <div className="lg:col-span-5 space-y-5">
          {!selectedOption ? (
            <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-3">
              <h2 className="font-display text-lg font-bold text-slate-900">
                Umpan Balik Cerdas
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Pilih salah satu jawaban di sebelah kiri. Jika kamu masih keliru, aplikasi akan memberitahu letak kesalahan spesifiknya (misalnya lupa membagi diameter atau tertukar rumus).
              </p>
            </div>
          ) : (
            <div
              className={`border rounded-2xl p-6 space-y-4 ${
                selectedOption.isCorrect
                  ? 'bg-emerald-50 border-emerald-300'
                  : 'bg-amber-50 border-amber-300'
              }`}
            >
              <div className="flex items-start gap-3">
                {selectedOption.isCorrect ? (
                  <CheckCircle2 className="w-6 h-6 text-emerald-700 shrink-0 mt-0.5" />
                ) : (
                  <AlertTriangle className="w-6 h-6 text-amber-700 shrink-0 mt-0.5" />
                )}
                <div>
                  <p
                    className={`font-display text-base font-bold ${
                      selectedOption.isCorrect
                        ? 'text-emerald-950'
                        : 'text-amber-950'
                    }`}
                  >
                    {selectedOption.isCorrect
                      ? 'Jawaban Tepat!'
                      : `Belum Tepat · ${selectedOption.misconceptionTag || 'Periksa Langkahnya'}`}
                  </p>
                  <p
                    className={`mt-1.5 text-sm leading-relaxed ${
                      selectedOption.isCorrect
                        ? 'text-emerald-900'
                        : 'text-amber-900'
                    }`}
                  >
                    {selectedOption.diagnosticFeedback}
                  </p>
                </div>
              </div>

              {!selectedOption.isCorrect && (
                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setShowSolution((s) => !s)}
                    className="px-4 py-2 rounded-lg bg-white border border-amber-300 text-amber-950 text-xs font-semibold hover:bg-amber-100/60 cursor-pointer whitespace-nowrap"
                  >
                    {showSolution
                      ? 'Sembunyikan Pembahasan'
                      : 'Lihat Langkah Benarnya'}
                  </button>
                  <span className="text-xs text-amber-800">
                    Atau coba pilih jawaban lain di kiri!
                  </span>
                </div>
              )}
            </div>
          )}

          {/* Step-by-step Solution Box */}
          {(showSolution || selectedOption?.isCorrect) && (
            <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4">
              <h3 className="font-display text-base font-bold text-slate-900">
                Pembahasan Langkah demi Langkah
              </h3>
              <ol className="space-y-2.5">
                {currentQuestion.solutionSteps.map((st, idx) => (
                  <li
                    key={idx}
                    className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 flex items-start gap-2.5"
                  >
                    <span className="w-5 h-5 rounded-full bg-sky-100 text-sky-800 font-mono text-xs font-bold flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <span className="leading-relaxed">{st}</span>
                  </li>
                ))}
              </ol>

              {(currentIdxInLevel < questionsInLevel.length - 1 ||
                selectedLevel < 3) && (
                <button
                  type="button"
                  onClick={handleNextQuestion}
                  className="w-full py-3 px-4 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-sm font-semibold inline-flex items-center justify-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap"
                >
                  <span>
                    {currentIdxInLevel < questionsInLevel.length - 1
                      ? 'Lanjut ke Soal Berikutnya'
                      : `Lanjut ke Level ${selectedLevel + 1}`}
                  </span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
