import React, { useState } from 'react';
import { ArrowRight, BookOpen, Calculator, Compass, Target } from 'lucide-react';
import { StudentProfile } from '../types';

interface LoginScreenProps {
  onLogin: (profile: StudentProfile) => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [fullName, setFullName] = useState('');
  const [gradeClass, setGradeClass] = useState('Kelas 8');
  const [schoolName, setSchoolName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = fullName.trim();
    const trimmedClass = gradeClass.trim();
    const trimmedSchool = schoolName.trim();

    if (!trimmedName || !trimmedClass || !trimmedSchool) {
      setError('Mohon lengkapi Nama Lengkap, Kelas, dan Asal Sekolah sebelum mulai belajar.');
      return;
    }

    onLogin({
      fullName: trimmedName,
      gradeClass: trimmedClass,
      schoolName: trimmedSchool,
      loggedInAt: new Date().toISOString(),
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between">
      <header className="w-full border-b border-slate-200 bg-white">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between gap-8">
          <span className="font-display text-xl font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0">
            LingkarPintar
          </span>
          <div className="hidden sm:flex items-center gap-2 text-sm text-slate-500">
            <span>Matematika SMP</span>
            <span aria-hidden="true">·</span>
            <span>Materi Lingkaran</span>
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-center py-10 px-6">
        <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          {/* Left Stage: Visual Concept & Learning Roadmap */}
          <div className="lg:col-span-7 flex flex-col justify-between bg-white border border-slate-200 rounded-2xl p-8 lg:p-10">
            <div>
              <p className="text-sm font-medium text-sky-700 mb-3">
                Ruang Belajar Mandiri · Kelas 7, 8, &amp; 9 SMP
              </p>
              <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 leading-tight max-w-xl [text-wrap:balance]">
                Pahami Lingkaran Tanpa Bingung Rumus &amp; Soal Cerita
              </h1>
              <p className="mt-4 text-slate-600 text-base leading-relaxed max-w-xl">
                Dirancang khusus agar kamu bisa menggeser ukuran lingkaran secara langsung, membedakan diameter dan jari-jari, serta menyelesaikan soal cerita langkah demi langkah sesuai kecepatan belajarmu sendiri.
              </p>
            </div>

            {/* Interactive-style Preview Diagram (SVG) */}
            <div className="my-8 grid grid-cols-1 sm:grid-cols-12 gap-6 items-center bg-slate-50 border border-slate-200 rounded-xl p-6">
              <div className="sm:col-span-5 flex justify-center">
                <svg
                  viewBox="0 0 220 220"
                  className="w-44 h-44"
                  role="img"
                  aria-label="Ilustrasi diameter dan jari-jari lingkaran"
                >
                  <circle
                    cx="110"
                    cy="110"
                    r="84"
                    fill="#e0f2fe"
                    stroke="#0284c7"
                    strokeWidth="3"
                  />
                  {/* Diameter line */}
                  <line
                    x1="26"
                    y1="110"
                    x2="194"
                    y2="110"
                    stroke="#059669"
                    strokeWidth="3"
                    strokeDasharray="6 4"
                  />
                  {/* Radius highlight */}
                  <line
                    x1="110"
                    y1="110"
                    x2="170"
                    y2="50"
                    stroke="#d97706"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                  <circle cx="110" cy="110" r="5" fill="#0f172a" />
                  <text
                    x="110"
                    y="130"
                    textAnchor="middle"
                    className="fill-emerald-700 text-xs font-semibold font-mono"
                  >
                    d = 14 cm
                  </text>
                  <text
                    x="152"
                    y="75"
                    textAnchor="middle"
                    className="fill-amber-700 text-xs font-semibold font-mono"
                  >
                    r = 7 cm
                  </text>
                  <text
                    x="100"
                    y="102"
                    textAnchor="end"
                    className="fill-slate-900 text-xs font-bold"
                  >
                    O
                  </text>
                </svg>
              </div>
              <div className="sm:col-span-7 space-y-3">
                <div className="flex items-start gap-3">
                  <Compass className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-slate-900">Lab Geser Jari-jari &amp; Diameter</p>
                    <p className="text-xs text-slate-600 mt-0.5">Lihat langsung perubahan luas &amp; keliling saat jari-jari digeser.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <BookOpen className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-slate-900">Materi Tempo Mandiri</p>
                    <p className="text-xs text-slate-600 mt-0.5">Pelajari pelan-pelan dan ulangi bagian yang belum paham kapan saja.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Calculator className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-slate-900">Kalkulator Penuntun Bertahap</p>
                    <p className="text-xs text-slate-600 mt-0.5">Menunjukkan langkah bagi diameter, pilih π, hingga hasil akhir.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Target className="w-5 h-5 text-sky-700 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-slate-900">Latihan &amp; Detektif Soal Cerita</p>
                    <p className="text-xs text-slate-600 mt-0.5">Jika keliru, langsung diberitahu di mana letak kesalahannya.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
              <span>Dikembangkan oleh Siti Fitriani · Pendidikan Matematika 3B</span>
              <span>Model ADDIE · Pembelajaran Lingkaran SMP</span>
            </div>
          </div>

          {/* Right Form: Student Identity Gate */}
          <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-8 lg:p-10 flex flex-col justify-center">
            <div className="mb-6">
              <h2 className="font-display text-2xl font-bold text-slate-900">
                Masuk ke Ruang Belajar
              </h2>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                Isi data dirimu terlebih dahulu supaya catatan progres belajarmu tersimpan rapi.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              <div>
                <label
                  htmlFor="student-name"
                  className="block text-sm font-medium text-slate-800 mb-1.5"
                >
                  Nama Lengkap Siswa
                </label>
                <input
                  id="student-name"
                  type="text"
                  value={fullName}
                  onChange={(e) => {
                    setFullName(e.target.value);
                    if (error) setError('');
                  }}
                  placeholder="Contoh: Mila Rahmawati"
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-600 focus:border-sky-600 transition-colors"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="student-class"
                  className="block text-sm font-medium text-slate-800 mb-1.5"
                >
                  Kelas
                </label>
                <input
                  id="student-class"
                  type="text"
                  value={gradeClass}
                  onChange={(e) => {
                    setGradeClass(e.target.value);
                    if (error) setError('');
                  }}
                  placeholder="Contoh: Kelas 8B atau 9A"
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-600 focus:border-sky-600 transition-colors"
                  required
                />
                <div className="mt-2 flex flex-wrap gap-2">
                  {['Kelas 7', 'Kelas 8', 'Kelas 9'].map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setGradeClass(preset)}
                      className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors whitespace-nowrap shrink-0 ${
                        gradeClass.startsWith(preset)
                          ? 'bg-sky-50 border-sky-600 text-sky-800'
                          : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      {preset}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label
                  htmlFor="student-school"
                  className="block text-sm font-medium text-slate-800 mb-1.5"
                >
                  Asal Sekolah
                </label>
                <input
                  id="student-school"
                  type="text"
                  value={schoolName}
                  onChange={(e) => {
                    setSchoolName(e.target.value);
                    if (error) setError('');
                  }}
                  placeholder="Contoh: SMP Negeri 1 Harapan"
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-600 focus:border-sky-600 transition-colors"
                  required
                />
              </div>

              {error && (
                <div
                  role="alert"
                  className="p-3.5 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 text-sm"
                >
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-semibold text-sm flex items-center justify-center gap-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sky-600 cursor-pointer whitespace-nowrap"
              >
                <span>Mulai Belajar Lingkaran</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};
