import React, { useState } from 'react';
import {
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
} from 'lucide-react';
import { LESSON_CHAPTERS } from '../data/circleData';

interface SelfPacedLessonsProps {
  completedLessons: string[];
  onCompleteLesson: (chapterId: string) => void;
  onGoToPractice: () => void;
}

export const SelfPacedLessons: React.FC<SelfPacedLessonsProps> = ({
  completedLessons,
  onCompleteLesson,
  onGoToPractice,
}) => {
  const [activeChapterIdx, setActiveChapterIdx] = useState(0);
  const [activeStepIdx, setActiveStepIdx] = useState(0);
  const [revealedExampleSteps, setRevealedExampleSteps] = useState(1);

  const chapter = LESSON_CHAPTERS[activeChapterIdx];
  const step = chapter.steps[activeStepIdx];
  const isChapterDone = completedLessons.includes(chapter.id);

  const handleSelectChapter = (idx: number) => {
    setActiveChapterIdx(idx);
    setActiveStepIdx(0);
    setRevealedExampleSteps(1);
  };

  const handleNextStep = () => {
    if (activeStepIdx < chapter.steps.length - 1) {
      setActiveStepIdx(activeStepIdx + 1);
      setRevealedExampleSteps(1);
    } else {
      onCompleteLesson(chapter.id);
      if (activeChapterIdx < LESSON_CHAPTERS.length - 1) {
        setActiveChapterIdx(activeChapterIdx + 1);
        setActiveStepIdx(0);
        setRevealedExampleSteps(1);
      }
    }
  };

  const handlePrevStep = () => {
    if (activeStepIdx > 0) {
      setActiveStepIdx(activeStepIdx - 1);
      setRevealedExampleSteps(1);
    } else if (activeChapterIdx > 0) {
      const prevChap = LESSON_CHAPTERS[activeChapterIdx - 1];
      setActiveChapterIdx(activeChapterIdx - 1);
      setActiveStepIdx(prevChap.steps.length - 1);
      setRevealedExampleSteps(1);
    }
  };

  const handleRepeatStep = () => {
    setRevealedExampleSteps(1);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-slate-900">
            Materi Tempo Mandiri
          </h1>
          <p className="mt-1 text-sm text-slate-600 max-w-2xl">
            Atur kecepatan belajarmu sendiri. Ulangi langkah contoh soal kapan saja kalau masih butuh waktu mencerna.
          </p>
        </div>
        <div className="text-sm font-medium text-slate-600 tabular-nums">
          Selesai: <span className="font-mono font-bold text-emerald-700">{completedLessons.length}/{LESSON_CHAPTERS.length}</span> bab
        </div>
      </div>

      {/* Chapter Selector Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {LESSON_CHAPTERS.map((chap, idx) => {
          const isCurrent = idx === activeChapterIdx;
          const isDone = completedLessons.includes(chap.id);
          return (
            <button
              key={chap.id}
              type="button"
              onClick={() => handleSelectChapter(idx)}
              className={`p-4 rounded-xl border text-left transition-colors cursor-pointer ${
                isCurrent
                  ? 'bg-white border-sky-600 ring-1 ring-sky-600'
                  : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="font-mono font-semibold text-slate-400">
                  Bab {chap.number}
                </span>
                {isDone && (
                  <span className="inline-flex items-center gap-1 font-medium text-emerald-700">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Selesai</span>
                  </span>
                )}
              </div>
              <p className="font-display text-sm font-bold text-slate-900">
                {chap.title}
              </p>
            </button>
          );
        })}
      </div>

      {/* Main Self-Paced Content Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left: Core Explanation + Visual Concept */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 flex flex-col justify-between space-y-6">
          <div className="space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-slate-100">
              <span className="text-xs font-medium text-sky-700">
                Bab {chapter.number} · Bagian {activeStepIdx + 1} dari {chapter.steps.length}
              </span>
              <span className="text-xs text-slate-500">
                Fokus: {chapter.targetIssue}
              </span>
            </div>

            <h2 className="font-display text-2xl font-bold text-slate-900">
              {step.title}
            </h2>

            <p className="text-base text-slate-700 leading-relaxed">
              {step.explanation}
            </p>

            {/* Visual Helper Diagram matching visualFocus */}
            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200">
              {step.visualFocus === 'd-vs-r' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                  <div className="flex justify-center">
                    <svg viewBox="0 0 200 130" className="w-48 h-32">
                      <circle cx="100" cy="65" r="52" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2.5" />
                      <line x1="48" y1="65" x2="152" y2="65" stroke="#059669" strokeWidth="3" strokeDasharray="5 3" />
                      <line x1="100" y1="65" x2="137" y2="28" stroke="#d97706" strokeWidth="3.5" strokeLinecap="round" />
                      <circle cx="100" cy="65" r="4" fill="#0f172a" />
                      <text x="100" y="83" textAnchor="middle" className="fill-emerald-700 text-[11px] font-mono font-bold">d = 14 cm</text>
                      <text x="132" y="42" textAnchor="start" className="fill-amber-700 text-[11px] font-mono font-bold">r = 7</text>
                    </svg>
                  </div>
                  <div className="space-y-2 text-sm">
                    <p className="font-mono font-semibold text-emerald-800">d = 2 × r (Penuh)</p>
                    <p className="font-mono font-semibold text-amber-800">r = d ÷ 2 (Setengah)</p>
                    <p className="text-xs text-slate-600">
                      Jika soal menyebut diameter, selalu bagi 2 dulu sebelum masuk rumus luas!
                    </p>
                  </div>
                </div>
              )}

              {step.visualFocus === 'pi-choice' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-white border border-emerald-200">
                    <p className="font-mono text-lg font-bold text-emerald-700">π = 22/7</p>
                    <p className="mt-1 text-xs text-slate-600">
                      Jika r atau d <strong>kelipatan 7</strong>: 7, 14, 21, 28, 35, 42...
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-white border border-sky-200">
                    <p className="font-mono text-lg font-bold text-sky-700">π = 3,14</p>
                    <p className="mt-1 text-xs text-slate-600">
                      Jika r atau d <strong>bukan kelipatan 7</strong>: 5, 10, 12, 15, 20...
                    </p>
                  </div>
                </div>
              )}

              {step.visualFocus === 'perimeter-vs-area' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-white border border-emerald-200 flex items-center gap-3">
                    <svg viewBox="0 0 60 60" className="w-12 h-12 shrink-0">
                      <circle cx="30" cy="30" r="22" fill="none" stroke="#059669" strokeWidth="5" />
                    </svg>
                    <div>
                      <p className="text-sm font-bold text-emerald-800">Keliling (Tepi)</p>
                      <p className="font-mono text-xs text-slate-700">K = 2 × π × r atau π × d</p>
                    </div>
                  </div>
                  <div className="p-4 rounded-lg bg-white border border-sky-200 flex items-center gap-3">
                    <svg viewBox="0 0 60 60" className="w-12 h-12 shrink-0">
                      <circle cx="30" cy="30" r="22" fill="#7dd3fc" stroke="#0284c7" strokeWidth="2" />
                    </svg>
                    <div>
                      <p className="text-sm font-bold text-sky-800">Luas (Isi Dalam)</p>
                      <p className="font-mono text-xs text-slate-700">L = π × r × r (π × r²)</p>
                    </div>
                  </div>
                </div>
              )}

              {step.visualFocus === 'story-clue' && (
                <div className="space-y-2.5 text-xs sm:text-sm">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-sky-100 text-sky-900 font-semibold">[Diketahui]</span>
                    <span className="text-slate-700">Cek angkanya: jari-jari (r) atau diameter (d)?</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-900 font-semibold">[Konteks Benda]</span>
                    <span className="text-slate-700">Roda berputar / pagar = Keliling; Stiker penuh / taplak = Luas.</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-900 font-semibold">[Ditanya]</span>
                    <span className="text-slate-700">Pastikan satuan akhir (cm untuk Keliling, cm² untuk Luas).</span>
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 rounded-xl bg-sky-50 border border-sky-200 text-sm text-sky-950">
              <span className="font-semibold">Inti Materi: </span>
              {step.keyTakeaway}
            </div>
          </div>

          {/* Self-Pacing Footer Controls */}
          <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
            <button
              type="button"
              onClick={handlePrevStep}
              disabled={activeChapterIdx === 0 && activeStepIdx === 0}
              className="px-4 py-2.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed text-sm font-medium text-slate-700 inline-flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Sebelumnya</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleRepeatStep}
                className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-medium inline-flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Ulangi Langkah</span>
              </button>

              <button
                type="button"
                onClick={handleNextStep}
                className="px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-sm font-semibold inline-flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
              >
                <span>
                  {activeChapterIdx === LESSON_CHAPTERS.length - 1 &&
                  activeStepIdx === chapter.steps.length - 1
                    ? 'Tandai Semua Selesai'
                    : 'Langkah Selanjutnya'}
                </span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Right: Step-by-step Worked Example with Self-Pacing */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-display text-lg font-bold text-slate-900">
                Contoh Pengerjaan Pelan-Pelan
              </h3>
              <span className="font-mono text-xs text-slate-500 tabular-nums">
                {revealedExampleSteps}/{step.quickExample.steps.length}
              </span>
            </div>

            <p className="text-sm font-semibold text-slate-800 bg-slate-50 border border-slate-200 rounded-xl p-4">
              {step.quickExample.prompt}
            </p>

            <div className="space-y-3">
              {step.quickExample.steps.slice(0, revealedExampleSteps).map((st, i) => (
                <div
                  key={i}
                  className="p-3.5 rounded-xl bg-white border border-slate-200 text-sm text-slate-700 flex items-start gap-3"
                >
                  <span className="w-6 h-6 rounded-full bg-sky-100 text-sky-800 font-mono text-xs font-bold flex items-center justify-center shrink-0">
                    {i + 1}
                  </span>
                  <span className="leading-relaxed">{st}</span>
                </div>
              ))}
            </div>

            {revealedExampleSteps >= step.quickExample.steps.length && (
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
                <span className="text-xs font-semibold text-emerald-800">
                  Hasil Akhir
                </span>
                <span className="font-mono text-base font-bold text-emerald-900">
                  {step.quickExample.result}
                </span>
              </div>
            )}
          </div>

          <div className="space-y-3 pt-4 border-t border-slate-100">
            {revealedExampleSteps < step.quickExample.steps.length ? (
              <button
                type="button"
                onClick={() => setRevealedExampleSteps((s) => s + 1)}
                className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold transition-colors cursor-pointer whitespace-nowrap"
              >
                Tampilkan Langkah Berikutnya
              </button>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => {
                    onCompleteLesson(chapter.id);
                  }}
                  disabled={isChapterDone}
                  className={`py-2.5 px-4 rounded-xl text-sm font-semibold transition-colors whitespace-nowrap ${
                    isChapterDone
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200 cursor-default'
                      : 'bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer'
                  }`}
                >
                  {isChapterDone ? 'Bab Sudah Selesai' : 'Tandai Bab Paham'}
                </button>
                <button
                  type="button"
                  onClick={onGoToPractice}
                  className="py-2.5 px-4 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-sm font-semibold transition-colors cursor-pointer whitespace-nowrap"
                >
                  Coba Latihan Soal
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
