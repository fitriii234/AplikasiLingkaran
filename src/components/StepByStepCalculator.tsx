import React, { useEffect, useState } from 'react';
import { Play, Pause, RotateCcw, SkipForward } from 'lucide-react';

type InputKind = 'diameter' | 'radius';
type CalcTarget = 'area' | 'circumference';
type Unit = 'cm' | 'm' | 'dm';

interface CalcStep {
  title: string;
  detail: string;
  formula: string;
  badge: string;
}

export const StepByStepCalculator: React.FC = () => {
  const [inputKind, setInputKind] = useState<InputKind>('diameter');
  const [rawValue, setRawValue] = useState<string>('14');
  const [unit, setUnit] = useState<Unit>('cm');
  const [target, setTarget] = useState<CalcTarget>('area');
  const [visibleStep, setVisibleStep] = useState<number>(5);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const numericInput = Math.max(0.1, Math.min(500, parseFloat(rawValue) || 0));
  const isValid = parseFloat(rawValue) > 0;

  const r = inputKind === 'diameter' ? numericInput / 2 : numericInput;
  const d = inputKind === 'diameter' ? numericInput : numericInput * 2;

  const isMultipleOf7 =
    isValid && (Math.abs(r % 7) < 0.0001 || Math.abs(d % 7) < 0.0001);
  const useFractionPi = isMultipleOf7;
  const piStr = useFractionPi ? '22/7' : '3,14';

  const fmt = (n: number) =>
    Number.isInteger(n)
      ? n.toLocaleString('id-ID')
      : n.toLocaleString('id-ID', { maximumFractionDigits: 2 });

  const areaResult = useFractionPi
    ? (22 * r * r) / 7
    : 3.14 * r * r;

  const circumferenceResult = useFractionPi
    ? (2 * 22 * r) / 7
    : 2 * 3.14 * r;

  const buildSteps = (): CalcStep[] => {
    if (!isValid) return [];

    // Step 1: Identify & Convert d -> r
    const step1: CalcStep =
      inputKind === 'diameter'
        ? {
            badge: 'Langkah 1 · Ubah Diameter ke Jari-jari',
            title: `Diketahui diameter d = ${fmt(d)} ${unit}. Bagi 2 dulu!`,
            detail:
              'Rumus lingkaran memakai jari-jari (r), yaitu setengah dari diameter. Jadi kita bagi diameter dengan 2 sebelum melangkah ke rumus.',
            formula: `r = d ÷ 2 = ${fmt(d)} ÷ 2 = ${fmt(r)} ${unit}`,
          }
        : {
            badge: 'Langkah 1 · Cek yang Diketahui',
            title: `Sudah diketahui jari-jari r = ${fmt(r)} ${unit}.`,
            detail:
              'Karena soal sudah memberikan jari-jari (r), kamu tidak perlu membagi 2 lagi dan bisa langsung ke langkah berikutnya.',
            formula: `r = ${fmt(r)} ${unit} (diameter d = 2 × ${fmt(r)} = ${fmt(d)} ${unit})`,
          };

    // Step 2: Select pi
    const step2: CalcStep = useFractionPi
      ? {
          badge: 'Langkah 2 · Pilih Nilai π',
          title: 'Gunakan π = 22/7 karena angkanya kelipatan 7',
          detail: `Angka ${Math.abs(r % 7) < 0.0001 ? `r = ${fmt(r)}` : `d = ${fmt(d)}`} habis dibagi 7. Memakai 22/7 memungkinkan kita mencoret penyebut 7 agar mudah dihitung.`,
          formula: 'π = 22/7',
        }
      : {
          badge: 'Langkah 2 · Pilih Nilai π',
          title: 'Gunakan π = 3,14 karena bukan kelipatan 7',
          detail: `Karena ${fmt(r)} tidak habis dibagi 7, memakai π = 3,14 jauh lebih praktis dibandingkan pecahan 22/7.`,
          formula: 'π = 3,14',
        };

    // Step 3: Pick Formula
    const step3: CalcStep =
      target === 'area'
        ? {
            badge: 'Langkah 3 · Tulis Rumus Luas',
            title: 'Gunakan rumus Luas (ingat: r dikuadratkan!)',
            detail:
              'Luas mengukur seluruh bagian dalam lingkaran. Jangan sampai tertukar dengan rumus keliling (2 × π × r).',
            formula: 'L = π × r × r   (atau π × r²)',
          }
        : {
            badge: 'Langkah 3 · Tulis Rumus Keliling',
            title: 'Gunakan rumus Keliling (panjang pinggiran luar)',
            detail:
              inputKind === 'diameter'
                ? 'Karena diameter sudah diketahui, kamu bisa pakai K = π × d atau K = 2 × π × r (hasilnya sama!).'
                : 'Karena jari-jari sudah diketahui, gunakan K = 2 × π × r.',
            formula:
              inputKind === 'diameter'
                ? 'K = π × d   (sama dengan 2 × π × r)'
                : 'K = 2 × π × r',
          };

    // Step 4: Substitution & Cancellation
    let step4Formula = '';
    let step4Detail = '';
    if (target === 'area') {
      if (useFractionPi && Math.abs(r % 7) < 0.0001) {
        const simplified = r / 7;
        step4Formula = `L = (22/7) × ${fmt(r)} × ${fmt(r)} = 22 × ${fmt(simplified)} × ${fmt(r)}`;
        step4Detail = `Coret ${fmt(r)} dengan penyebut 7 (${fmt(r)} ÷ 7 = ${fmt(simplified)}), lalu kalikan sisanya.`;
      } else {
        step4Formula = `L = ${piStr} × ${fmt(r)} × ${fmt(r)} = ${piStr} × ${fmt(r * r)}`;
        step4Detail = `Hitung dulu ${fmt(r)} × ${fmt(r)} = ${fmt(r * r)}, lalu kalikan dengan ${piStr}.`;
      }
    } else {
      if (useFractionPi && inputKind === 'diameter' && Math.abs(d % 7) < 0.0001) {
        const simplified = d / 7;
        step4Formula = `K = (22/7) × ${fmt(d)} = 22 × ${fmt(simplified)}`;
        step4Detail = `Coret ${fmt(d)} dengan penyebut 7 (${fmt(d)} ÷ 7 = ${fmt(simplified)}), lalu kalikan dengan 22.`;
      } else if (useFractionPi && Math.abs(r % 7) < 0.0001) {
        const simplified = r / 7;
        step4Formula = `K = 2 × (22/7) × ${fmt(r)} = 2 × 22 × ${fmt(simplified)}`;
        step4Detail = `Coret ${fmt(r)} dengan penyebut 7 (${fmt(r)} ÷ 7 = ${fmt(simplified)}), lalu kalikan 2 × 22 × ${fmt(simplified)}.`;
      } else {
        step4Formula = `K = 2 × ${piStr} × ${fmt(r)} = ${piStr} × ${fmt(d)}`;
        step4Detail = `Kalikan 2 × ${fmt(r)} = ${fmt(d)} terlebih dahulu, lalu kalikan dengan ${piStr}.`;
      }
    }

    const step4: CalcStep = {
      badge: 'Langkah 4 · Masukkan Angka & Sederhanakan',
      title: 'Substitusi nilai ke dalam rumus',
      detail: step4Detail,
      formula: step4Formula,
    };

    // Step 5: Final Answer & Unit
    const step5: CalcStep =
      target === 'area'
        ? {
            badge: 'Langkah 5 · Hasil Akhir & Satuan Persegi',
            title: `Luas lingkaran = ${fmt(areaResult)} ${unit}²`,
            detail: `Karena ini Luas (daerah dalam), satuannya memakai pangkat dua (${unit}²).`,
            formula: `L = ${fmt(areaResult)} ${unit}²`,
          }
        : {
            badge: 'Langkah 5 · Hasil Akhir & Satuan Panjang',
            title: `Keliling lingkaran = ${fmt(circumferenceResult)} ${unit}`,
            detail: `Karena ini Keliling (panjang tepi luar), satuannya tetap satuan panjang biasa (${unit}), bukan ${unit}².`,
            formula: `K = ${fmt(circumferenceResult)} ${unit}`,
          };

    return [step1, step2, step3, step4, step5];
  };

  const steps = buildSteps();

  useEffect(() => {
    if (!isPlaying) return;
    if (visibleStep >= steps.length) {
      setIsPlaying(false);
      return;
    }
    const timer = window.setTimeout(() => {
      setVisibleStep((prev) => Math.min(steps.length, prev + 1));
    }, 1100);
    return () => window.clearTimeout(timer);
  }, [isPlaying, visibleStep, steps.length]);

  const handleRestartAnimation = () => {
    setVisibleStep(1);
    setIsPlaying(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      <div>
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-slate-900">
          Kalkulator Penuntun Step-by-Step
        </h1>
        <p className="mt-1 text-sm text-slate-600 max-w-2xl">
          Bukan sekadar memberi hasil akhir! Masukkan angka dari soalmu, lalu lihat cara mengubah diameter ke jari-jari, memilih π, hingga hasil akhirnya.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Input Controls & Live Mini Diagram */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 space-y-6">
          <div className="space-y-4">
            <h2 className="font-display text-lg font-bold text-slate-900">
              1. Masukkan Data Soal
            </h2>

            {/* Known type toggle */}
            <div>
              <p className="text-xs font-medium text-slate-600 mb-2">
                Apa yang diketahui di soal?
              </p>
              <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-xl">
                <button
                  type="button"
                  onClick={() => {
                    setInputKind('diameter');
                    setVisibleStep(1);
                  }}
                  className={`py-2 px-3 rounded-lg text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                    inputKind === 'diameter'
                      ? 'bg-white text-emerald-800 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Diameter (d)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setInputKind('radius');
                    setVisibleStep(1);
                  }}
                  className={`py-2 px-3 rounded-lg text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                    inputKind === 'radius'
                      ? 'bg-white text-amber-800 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Jari-jari (r)
                </button>
              </div>
            </div>

            {/* Value + Unit */}
            <div className="grid grid-cols-3 gap-3">
              <div className="col-span-2">
                <label
                  htmlFor="calc-number-input"
                  className="block text-xs font-medium text-slate-600 mb-1.5"
                >
                  Nilai {inputKind === 'diameter' ? 'Diameter (d)' : 'Jari-jari (r)'}
                </label>
                <input
                  id="calc-number-input"
                  type="number"
                  min="1"
                  max="500"
                  step="any"
                  value={rawValue}
                  onChange={(e) => {
                    setRawValue(e.target.value);
                    setVisibleStep(5);
                    setIsPlaying(false);
                  }}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 font-mono text-base font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-600"
                />
              </div>
              <div>
                <label
                  htmlFor="calc-unit-select"
                  className="block text-xs font-medium text-slate-600 mb-1.5"
                >
                  Satuan
                </label>
                <select
                  id="calc-unit-select"
                  value={unit}
                  onChange={(e) => setUnit(e.target.value as Unit)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 bg-white font-mono text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-600"
                >
                  <option value="cm">cm</option>
                  <option value="dm">dm</option>
                  <option value="m">m</option>
                </select>
              </div>
            </div>

            {/* Quick Presets */}
            <div className="flex flex-wrap gap-2">
              {[
                { label: 'd = 14', kind: 'diameter' as InputKind, val: '14' },
                { label: 'd = 28', kind: 'diameter' as InputKind, val: '28' },
                { label: 'r = 7', kind: 'radius' as InputKind, val: '7' },
                { label: 'r = 10', kind: 'radius' as InputKind, val: '10' },
                { label: 'd = 20', kind: 'diameter' as InputKind, val: '20' },
                { label: 'r = 21', kind: 'radius' as InputKind, val: '21' },
              ].map((p) => (
                <button
                  key={p.label}
                  type="button"
                  onClick={() => {
                    setInputKind(p.kind);
                    setRawValue(p.val);
                    setVisibleStep(1);
                    setIsPlaying(true);
                  }}
                  className="px-2.5 py-1 rounded-lg border border-slate-200 bg-slate-50 hover:bg-sky-50 hover:border-sky-300 font-mono text-xs font-medium text-slate-700 cursor-pointer whitespace-nowrap"
                >
                  {p.label}
                </button>
              ))}
            </div>

            {/* Target calculation */}
            <div>
              <p className="text-xs font-medium text-slate-600 mb-2">
                Apa yang ditanyakan soal?
              </p>
              <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-xl">
                <button
                  type="button"
                  onClick={() => {
                    setTarget('area');
                    setVisibleStep(1);
                    setIsPlaying(true);
                  }}
                  className={`py-2 px-3 rounded-lg text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                    target === 'area'
                      ? 'bg-white text-sky-800 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Luas (Isi Dalam)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setTarget('circumference');
                    setVisibleStep(1);
                    setIsPlaying(true);
                  }}
                  className={`py-2 px-3 rounded-lg text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                    target === 'circumference'
                      ? 'bg-white text-emerald-800 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Keliling (Pinggiran)
                </button>
              </div>
            </div>
          </div>

          {/* Synchronized SVG Preview */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-4">
            <svg viewBox="0 0 120 120" className="w-24 h-24 shrink-0">
              <circle
                cx="60"
                cy="60"
                r="46"
                fill={target === 'area' ? '#bae6fd' : '#ffffff'}
                stroke={target === 'circumference' ? '#059669' : '#0284c7'}
                strokeWidth={target === 'circumference' ? '5' : '2.5'}
              />
              <line
                x1="14"
                y1="60"
                x2="106"
                y2="60"
                stroke="#059669"
                strokeWidth="2"
                strokeDasharray="4 3"
              />
              <line
                x1="60"
                y1="60"
                x2="92"
                y2="28"
                stroke="#d97706"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <circle cx="60" cy="60" r="3.5" fill="#0f172a" />
            </svg>
            <div className="space-y-1 text-xs">
              <p className="font-semibold text-slate-900">Ringkasan Ukuran</p>
              <p className="font-mono text-emerald-700 tabular-nums">
                Diameter (d) = {isValid ? `${fmt(d)} ${unit}` : '-'}
              </p>
              <p className="font-mono text-amber-700 tabular-nums">
                Jari-jari (r) = {isValid ? `${fmt(r)} ${unit}` : '-'}
              </p>
              <p className="font-mono text-sky-700 tabular-nums">
                Nilai π = {isValid ? piStr : '-'}
              </p>
            </div>
          </div>
        </div>

        {/* Right: Step-by-Step Guided Solution */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <h2 className="font-display text-lg font-bold text-slate-900">
                2. Langkah Pengerjaan Penuntun
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Jalankan pelan-pelan atau tampilkan semua langkah sekaligus.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleRestartAnimation}
                disabled={!isValid}
                className="px-3 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer whitespace-nowrap disabled:opacity-40"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Mulai Langkah 1</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  if (visibleStep >= steps.length) {
                    handleRestartAnimation();
                  } else {
                    setIsPlaying((p) => !p);
                  }
                }}
                disabled={!isValid}
                className="px-3.5 py-2 rounded-lg bg-sky-600 hover:bg-sky-700 text-white text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer whitespace-nowrap disabled:opacity-40"
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-3.5 h-3.5" />
                    <span>Jeda</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5" />
                    <span>Putar Otomatis</span>
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsPlaying(false);
                  setVisibleStep((v) => Math.min(steps.length, v + 1));
                }}
                disabled={!isValid || visibleStep >= steps.length}
                className="px-3 py-2 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold inline-flex items-center gap-1 cursor-pointer whitespace-nowrap disabled:opacity-40"
              >
                <SkipForward className="w-3.5 h-3.5" />
                <span>+1 Langkah</span>
              </button>
            </div>
          </div>

          {!isValid ? (
            <div className="p-6 rounded-xl bg-amber-50 border border-amber-200 text-sm text-amber-900">
              Masukkan angka positif lebih dari 0 untuk melihat langkah perhitungannya.
            </div>
          ) : (
            <div className="space-y-3">
              {steps.map((step, index) => {
                const isShown = index < visibleStep;
                const isFinal = index === steps.length - 1;
                if (!isShown) {
                  return (
                    <button
                      key={step.badge}
                      type="button"
                      onClick={() => setVisibleStep(index + 1)}
                      className="w-full p-3.5 rounded-xl border border-dashed border-slate-300 bg-slate-50/70 text-left text-xs text-slate-500 hover:border-sky-400 hover:text-sky-700 transition-colors cursor-pointer"
                    >
                      {step.badge} (Klik untuk membuka langkah ini)
                    </button>
                  );
                }
                return (
                  <div
                    key={step.badge}
                    className={`p-4 rounded-xl border transition-opacity ${
                      isFinal
                        ? 'bg-emerald-50 border-emerald-300'
                        : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <p
                      className={`text-xs font-semibold ${
                        isFinal ? 'text-emerald-800' : 'text-sky-700'
                      }`}
                    >
                      {step.badge}
                    </p>
                    <p className="mt-1 font-display text-sm sm:text-base font-bold text-slate-900">
                      {step.title}
                    </p>
                    <p className="mt-1 text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {step.detail}
                    </p>
                    <div className="mt-2.5 p-2.5 rounded-lg bg-white border border-slate-200 font-mono text-xs sm:text-sm font-semibold text-slate-900 tabular-nums overflow-x-auto">
                      {step.formula}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
