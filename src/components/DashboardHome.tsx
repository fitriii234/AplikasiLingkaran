import React, { useState } from 'react';
import {
  ArrowRight,
  BookOpen,
  Calculator,
  CheckCircle2,
  Compass,
  HelpCircle,
  Target,
} from 'lucide-react';
import { LESSON_CHAPTERS, PRACTICE_QUESTIONS } from '../data/circleData';
import { ModuleId, ProgressState, StudentProfile } from '../types';

interface DashboardHomeProps {
  student: StudentProfile;
  progress: ProgressState;
  onNavigate: (module: ModuleId) => void;
}

export const DashboardHome: React.FC<DashboardHomeProps> = ({
  student,
  progress,
  onNavigate,
}) => {
  const [quickCheckChoice, setQuickCheckChoice] = useState<string | null>(null);

  const totalLessons = LESSON_CHAPTERS.length;
  const completedLessonsCount = progress.completedLessons.length;

  const totalQuestions = PRACTICE_QUESTIONS.length;
  const correctQuestionsCount = Object.values(progress.answeredQuestions).filter(
    (item) => item.isCorrect
  ).length;

  const labExploredCount = progress.exploredLabModes.length;

  const learningSteps: {
    stepNum: string;
    module: ModuleId;
    title: string;
    desc: string;
    cta: string;
    icon: React.ReactNode;
    accentBg: string;
  }[] = [
    {
      stepNum: '01',
      module: 'lab',
      title: 'Lab Visual & Pemisah d vs r',
      desc: 'Kenali bagian-bagian lingkaran dan geser ukuran jari-jari untuk melihat perubahan luas serta keliling secara langsung.',
      cta: 'Buka Lab Visual',
      icon: <Compass className="w-5 h-5 text-sky-700" />,
      accentBg: 'bg-sky-50',
    },
    {
      stepNum: '02',
      module: 'lessons',
      title: 'Materi Tempo Mandiri',
      desc: 'Pelajari trik memilih π (22/7 vs 3,14), membedakan keliling dan luas, serta mengulang langkah kapan pun tanpa terburu-buru.',
      cta: 'Baca Materi',
      icon: <BookOpen className="w-5 h-5 text-emerald-700" />,
      accentBg: 'bg-emerald-50',
    },
    {
      stepNum: '03',
      module: 'calculator',
      title: 'Kalkulator Penuntun Bertahap',
      desc: 'Masukkan diameter atau jari-jari, lalu ikuti langkah pembagian diameter, pemilihan π, dan coret-coret perkaliannya.',
      cta: 'Coba Kalkulator',
      icon: <Calculator className="w-5 h-5 text-amber-700" />,
      accentBg: 'bg-amber-50',
    },
    {
      stepNum: '04',
      module: 'practice',
      title: 'Latihan & Detektif Soal Cerita',
      desc: 'Uji pemahaman lewat soal bertingkat dengan fitur sorot kata kunci dan penjelasan spesifik jika jawaban masih keliru.',
      cta: 'Mulai Latihan',
      icon: <Target className="w-5 h-5 text-sky-700" />,
      accentBg: 'bg-sky-50',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-10">
      {/* Hero Banner with 1 Dominant Focal CTA */}
      <section className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-8 space-y-4">
          <div className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
            <span>{student.gradeClass}</span>
            <span aria-hidden="true">·</span>
            <span>{student.schoolName}</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight [text-wrap:balance]">
            Halo, {student.fullName}! Siap menaklukkan materi Lingkaran?
          </h1>
          <p className="text-slate-600 text-base leading-relaxed max-w-2xl">
            Banyak siswa sering tertukar antara diameter dan jari-jari atau bingung maksud soal cerita. Di sini kamu bisa belajar pelan-pelan lewat simulasi gambar yang bisa digeser sendiri.
          </p>
          <div className="pt-2 flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={() => onNavigate('lab')}
              className="px-6 py-3 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-semibold text-sm inline-flex items-center gap-2 transition-colors cursor-pointer whitespace-nowrap"
            >
              <span>Mulai dari Lab Visual</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => onNavigate('practice')}
              className="px-5 py-3 rounded-xl bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 font-medium text-sm transition-colors cursor-pointer whitespace-nowrap"
            >
              Langsung ke Latihan Soal
            </button>
          </div>
        </div>

        {/* Clean Progress Summary Panel */}
        <div className="lg:col-span-4 bg-slate-50 border border-slate-200 rounded-xl p-6 space-y-4">
          <h2 className="font-display text-base font-semibold text-slate-900">
            Catatan Progres Belajarmu
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white border border-slate-200 rounded-lg p-3.5">
              <p className="text-xs text-slate-500">Bab Materi</p>
              <p className="mt-1 font-mono text-xl font-semibold text-slate-900 tabular-nums">
                {completedLessonsCount}/{totalLessons}
              </p>
            </div>
            <div className="bg-white border border-slate-200 rounded-lg p-3.5">
              <p className="text-xs text-slate-500">Soal Benar</p>
              <p className="mt-1 font-mono text-xl font-semibold text-emerald-700 tabular-nums">
                {correctQuestionsCount}/{totalQuestions}
              </p>
            </div>
            <div className="bg-white border border-slate-200 rounded-lg p-3.5">
              <p className="text-xs text-slate-500">Mode Lab</p>
              <p className="mt-1 font-mono text-xl font-semibold text-sky-700 tabular-nums">
                {labExploredCount}/2
              </p>
            </div>
            <div className="bg-white border border-slate-200 rounded-lg p-3.5">
              <p className="text-xs text-slate-500">Fokus Materi</p>
              <p className="mt-1 text-sm font-semibold text-slate-900">
                d, r, K &amp; L
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4-Step Learning Path */}
      <section aria-labelledby="roadmap-heading" className="space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <h2
              id="roadmap-heading"
              className="font-display text-2xl font-bold text-slate-900"
            >
              Alur Belajar Runtut (4 Tahap)
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Ikuti urutan dari tahap 01 sampai 04 agar pemahamanmu kuat dari konsep hingga soal cerita.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {learningSteps.map((item) => (
            <div
              key={item.module}
              className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col justify-between hover:border-sky-300 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-10 h-10 rounded-xl ${item.accentBg} flex items-center justify-center`}>
                    {item.icon}
                  </div>
                  <span className="font-mono text-xs font-semibold text-slate-400">
                    Tahap {item.stepNum}
                  </span>
                </div>
                <h3 className="font-display text-lg font-semibold text-slate-900">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
              <button
                type="button"
                onClick={() => onNavigate(item.module)}
                className="mt-6 w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-sky-600 hover:text-white text-slate-800 font-semibold text-sm inline-flex items-center justify-center gap-2 transition-colors cursor-pointer whitespace-nowrap"
              >
                <span>{item.cta}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Misconception Warm-Up */}
      <section className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-6 space-y-3">
          <div className="flex items-center gap-2 text-sm font-semibold text-amber-700">
            <HelpCircle className="w-4 h-4" />
            <span>Pemanasan Cepat: Cek Jebakan Diameter</span>
          </div>
          <h2 className="font-display text-xl sm:text-2xl font-bold text-slate-900">
            Jika diameter sebuah tutup botol adalah 14 cm, angka berapa yang harus kamu masukkan sebagai r di rumus Luas = π × r²?
          </h2>
          <p className="text-sm text-slate-600">
            Coba pilih jawabanmu untuk melihat langsung apakah kamu sudah kebal dari jebakan yang paling sering dialami siswa SMP.
          </p>
        </div>

        <div className="lg:col-span-6 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            {[
              { id: '14', label: 'r = 14 cm' },
              { id: '7', label: 'r = 7 cm' },
            ].map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => setQuickCheckChoice(opt.id)}
                className={`py-3.5 px-4 rounded-xl border font-mono text-sm font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                  quickCheckChoice === opt.id
                    ? opt.id === '7'
                      ? 'bg-emerald-50 border-emerald-600 text-emerald-800'
                      : 'bg-amber-50 border-amber-600 text-amber-900'
                    : 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-slate-100'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>

          {quickCheckChoice === '7' && (
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-sm flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold">Benar! r = 7 cm.</p>
                <p className="mt-1 text-emerald-800">
                  Kamu ingat untuk membagi diameter dengan 2 terlebih dahulu (14 : 2 = 7 cm) sebelum menghitung luas.
                </p>
              </div>
            </div>
          )}

          {quickCheckChoice === '14' && (
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-950 text-sm">
              <p className="font-semibold">Hati-hati, ini jebakan paling sering terjadi!</p>
              <p className="mt-1 text-amber-900">
                14 cm itu masih <strong>diameter (d)</strong> dari tepi ke tepi. Rumus luas memakai <strong>jari-jari (r)</strong> yang panjangnya setengah diameter, jadi bagi 2 dulu: 14 : 2 = 7 cm.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
