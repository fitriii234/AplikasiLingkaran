import React, { useEffect, useState } from 'react';
import { ArrowRight, Layers, RotateCcw, Scissors } from 'lucide-react';
import { CIRCLE_PARTS } from '../data/circleData';
import { CirclePart } from '../types';

interface CircleLabProps {
  onExploreMode: (mode: string) => void;
  onGoToCalculator: () => void;
}

type LabTab = 'slider' | 'parts';
type ControlType = 'radius' | 'diameter';
type VisualFocus = 'both' | 'area' | 'perimeter';

export const CircleLab: React.FC<CircleLabProps> = ({
  onExploreMode,
  onGoToCalculator,
}) => {
  const [activeTab, setActiveTab] = useState<LabTab>('slider');
  const [controlType, setControlType] = useState<ControlType>('radius');
  const [radiusValue, setRadiusValue] = useState<number>(7);
  const [visualFocus, setVisualFocus] = useState<VisualFocus>('both');
  const [selectedPartId, setSelectedPartId] = useState<CirclePart['id']>('diameter');
  const [splitDiameter, setSplitDiameter] = useState<boolean>(false);

  useEffect(() => {
    onExploreMode(activeTab);
  }, [activeTab, onExploreMode]);

  const diameterValue = Number((radiusValue * 2).toFixed(1));
  const isMultipleOf7 =
    Math.abs(radiusValue % 7) < 0.001 || Math.abs(diameterValue % 7) < 0.001;
  const piValue = isMultipleOf7 ? 22 / 7 : 3.14;
  const piLabel = isMultipleOf7 ? '22/7' : '3,14';

  const circumference = isMultipleOf7
    ? Number(((2 * 22 * radiusValue) / 7).toFixed(2))
    : Number((2 * 3.14 * radiusValue).toFixed(2));

  const area = isMultipleOf7
    ? Number(((22 * radiusValue * radiusValue) / 7).toFixed(2))
    : Number((3.14 * radiusValue * radiusValue).toFixed(2));

  // Map radius (3..28) to visual SVG radius (32..126 px)
  const svgRadius = Math.min(126, Math.max(32, 24 + radiusValue * 3.6));
  const cx = 170;
  const cy = 160;

  const selectedPart =
    CIRCLE_PARTS.find((p) => p.id === selectedPartId) || CIRCLE_PARTS[0];

  const handleSliderChange = (val: number) => {
    if (controlType === 'radius') {
      setRadiusValue(val);
    } else {
      setRadiusValue(val / 2);
    }
  };

  const formatNum = (n: number) => {
    return Number.isInteger(n)
      ? n.toLocaleString('id-ID')
      : n.toLocaleString('id-ID', { maximumFractionDigits: 2 });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      {/* Header & Mode Switcher */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-slate-900">
            Lab Visual Lingkaran
          </h1>
          <p className="mt-1 text-sm text-slate-600 max-w-2xl">
            Geser ukuran jari-jari atau diameter untuk melihat perubahan langsung pada bentuk, keliling, dan luas lingkaran.
          </p>
        </div>

        <div className="inline-flex p-1 bg-slate-200/80 rounded-xl self-start">
          <button
            type="button"
            onClick={() => setActiveTab('slider')}
            className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === 'slider'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Simulasi Geser r &amp; d
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('parts')}
            className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === 'parts'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Kenali Unsur &amp; Pemisah d
          </button>
        </div>
      </div>

      {activeTab === 'slider' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* LEFT ZONE (60%): Interactive SVG Canvas Stage */}
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 flex flex-col justify-between">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2 text-xs font-medium text-slate-600">
                <Layers className="w-4 h-4 text-sky-600" />
                <span>Tampilan Fokus:</span>
              </div>
              <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg">
                {(
                  [
                    { id: 'both', label: 'Semua' },
                    { id: 'area', label: 'Luas (Isi)' },
                    { id: 'perimeter', label: 'Keliling (Tepi)' },
                  ] as { id: VisualFocus; label: string }[]
                ).map((mode) => (
                  <button
                    key={mode.id}
                    type="button"
                    onClick={() => setVisualFocus(mode.id)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      visualFocus === mode.id
                        ? 'bg-white text-slate-900 shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {mode.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Dynamic SVG Stage */}
            <div className="my-4 flex flex-col items-center justify-center bg-slate-50 border border-slate-200 rounded-xl p-4 relative overflow-hidden">
              <svg
                viewBox="0 0 340 320"
                className="w-full max-w-[360px] h-auto"
                role="img"
                aria-label={`Lingkaran dengan jari-jari ${radiusValue} cm dan diameter ${diameterValue} cm`}
              >
                <defs>
                  <pattern
                    id="areaGrid"
                    width="14"
                    height="14"
                    patternUnits="userSpaceOnUse"
                  >
                    <path
                      d="M 14 0 L 0 0 0 14"
                      fill="none"
                      stroke="#0284c7"
                      strokeOpacity="0.2"
                      strokeWidth="1"
                    />
                  </pattern>
                </defs>

                {/* Coordinate faint backdrop crosshairs */}
                <line
                  x1="20"
                  y1={cy}
                  x2="320"
                  y2={cy}
                  stroke="#cbd5e1"
                  strokeWidth="1"
                  strokeDasharray="3 3"
                />
                <line
                  x1={cx}
                  y1="15"
                  x2={cx}
                  y2="305"
                  stroke="#cbd5e1"
                  strokeWidth="1"
                  strokeDasharray="3 3"
                />

                {/* Circle Area Fill */}
                <circle
                  cx={cx}
                  cy={cy}
                  r={svgRadius}
                  fill={
                    visualFocus === 'perimeter'
                      ? '#f8fafc'
                      : visualFocus === 'area'
                      ? '#bae6fd'
                      : '#e0f2fe'
                  }
                  className="transition-all duration-150"
                />

                {/* Grid inside circle when showing area */}
                {visualFocus !== 'perimeter' && (
                  <circle
                    cx={cx}
                    cy={cy}
                    r={svgRadius}
                    fill="url(#areaGrid)"
                  />
                )}

                {/* Circle Outer Rim (Perimeter) */}
                <circle
                  cx={cx}
                  cy={cy}
                  r={svgRadius}
                  fill="none"
                  stroke={visualFocus === 'perimeter' ? '#059669' : '#0284c7'}
                  strokeWidth={visualFocus === 'perimeter' ? '6' : '3'}
                  className="transition-all duration-150"
                />

                {/* Full Diameter Line (horizontal) */}
                <line
                  x1={cx - svgRadius}
                  y1={cy}
                  x2={cx + svgRadius}
                  y2={cy}
                  stroke="#059669"
                  strokeWidth="2.5"
                  strokeDasharray="6 4"
                />

                {/* Radius Line (angled 40deg up-right so it never overlaps diameter text!) */}
                <line
                  x1={cx}
                  y1={cy}
                  x2={cx + svgRadius * Math.cos(-Math.PI / 4)}
                  y2={cy + svgRadius * Math.sin(-Math.PI / 4)}
                  stroke="#d97706"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />

                {/* Center Dot */}
                <circle cx={cx} cy={cy} r="5" fill="#0f172a" />
                <text
                  x={cx - 10}
                  y={cy - 8}
                  textAnchor="end"
                  className="fill-slate-900 text-xs font-bold"
                >
                  O
                </text>

                {/* Diameter Label */}
                <rect
                  x={cx - 46}
                  y={cy + 10}
                  width="92"
                  height="22"
                  rx="6"
                  fill="#ffffff"
                  stroke="#a7f3d0"
                />
                <text
                  x={cx}
                  y={cy + 25}
                  textAnchor="middle"
                  className="fill-emerald-700 text-xs font-mono font-semibold"
                >
                  d = {formatNum(diameterValue)} cm
                </text>

                {/* Radius Label */}
                <rect
                  x={cx + svgRadius * 0.35 - 32}
                  y={cy - svgRadius * 0.35 - 28}
                  width="82"
                  height="22"
                  rx="6"
                  fill="#ffffff"
                  stroke="#fde68a"
                />
                <text
                  x={cx + svgRadius * 0.35 + 9}
                  y={cy - svgRadius * 0.35 - 13}
                  textAnchor="middle"
                  className="fill-amber-700 text-xs font-mono font-semibold"
                >
                  r = {formatNum(radiusValue)} cm
                </text>
              </svg>

              {/* Visual Unrolled Perimeter Bar when focusing on perimeter or both */}
              <div className="w-full mt-2 pt-3 border-t border-slate-200 flex flex-col gap-1.5">
                <div className="flex items-center justify-between text-xs text-slate-600">
                  <span>
                    {visualFocus === 'area'
                      ? 'Daerah arsir biru = Luas (isi dalam lingkaran)'
                      : 'Jika garis tepi luar dibentangkan lurus = Keliling:'}
                  </span>
                  <span className="font-mono font-semibold text-emerald-700 tabular-nums">
                    K = {formatNum(circumference)} cm
                  </span>
                </div>
                <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-600 rounded-full transition-all duration-150"
                    style={{
                      width: `${Math.min(100, (circumference / 180) * 100)}%`,
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Live Legend Footer (Unboxed, Dual-Coded) */}
            <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-slate-600">
              <div className="flex flex-wrap items-center gap-4">
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-3 h-0.5 bg-amber-600 inline-block" />
                  <span>Jari-jari (r): pusat ke tepi</span>
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-3 h-0.5 border-t-2 border-dashed border-emerald-600 inline-block" />
                  <span>Diameter (d): tepi ke tepi = 2 × r</span>
                </span>
              </div>
              <button
                type="button"
                onClick={() => {
                  setControlType('radius');
                  setRadiusValue(7);
                  setVisualFocus('both');
                }}
                className="inline-flex items-center gap-1 text-slate-600 hover:text-slate-900 font-medium cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            </div>
          </div>

          {/* RIGHT ZONE (40%): Control & Live Concept Deck */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            {/* Control Card */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-5">
              <div className="flex items-center justify-between gap-3">
                <h2 className="font-display text-lg font-semibold text-slate-900">
                  Atur Ukuran Lingkaran
                </h2>
                <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg">
                  <button
                    type="button"
                    onClick={() => setControlType('radius')}
                    className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                      controlType === 'radius'
                        ? 'bg-white text-amber-700 shadow-sm'
                        : 'text-slate-600'
                    }`}
                  >
                    Geser r
                  </button>
                  <button
                    type="button"
                    onClick={() => setControlType('diameter')}
                    className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                      controlType === 'diameter'
                        ? 'bg-white text-emerald-700 shadow-sm'
                        : 'text-slate-600'
                    }`}
                  >
                    Geser d
                  </button>
                </div>
              </div>

              {/* Labeled Slider */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="circle-size-slider"
                    className="text-sm font-medium text-slate-700"
                  >
                    {controlType === 'radius'
                      ? 'Panjang Jari-jari (r)'
                      : 'Panjang Diameter (d)'}
                  </label>
                  <span className="font-mono text-base font-bold text-slate-900 tabular-nums">
                    {controlType === 'radius'
                      ? `${formatNum(radiusValue)} cm`
                      : `${formatNum(diameterValue)} cm`}
                  </span>
                </div>
                <input
                  id="circle-size-slider"
                  type="range"
                  min={controlType === 'radius' ? 3 : 6}
                  max={controlType === 'radius' ? 28 : 56}
                  step={controlType === 'radius' ? 1 : 2}
                  value={controlType === 'radius' ? radiusValue : diameterValue}
                  onChange={(e) => handleSliderChange(Number(e.target.value))}
                  className="w-full geometry-slider"
                />
                <div className="flex justify-between text-xs font-mono text-slate-400 tabular-nums">
                  <span>{controlType === 'radius' ? '3 cm' : '6 cm'}</span>
                  <span>{controlType === 'radius' ? '14 cm' : '28 cm'}</span>
                  <span>{controlType === 'radius' ? '28 cm' : '56 cm'}</span>
                </div>
              </div>

              {/* Quick SMP Presets */}
              <div className="space-y-2">
                <p className="text-xs font-medium text-slate-500">
                  Pilih angka soal yang sering keluar di SMP:
                </p>
                <div className="flex flex-wrap gap-2">
                  {[
                    { label: 'r = 7 cm', r: 7, mode: 'radius' as ControlType },
                    { label: 'd = 14 cm', r: 7, mode: 'diameter' as ControlType },
                    { label: 'r = 10 cm', r: 10, mode: 'radius' as ControlType },
                    { label: 'd = 20 cm', r: 10, mode: 'diameter' as ControlType },
                    { label: 'r = 21 cm', r: 21, mode: 'radius' as ControlType },
                    { label: 'd = 28 cm', r: 14, mode: 'diameter' as ControlType },
                  ].map((preset) => (
                    <button
                      key={preset.label}
                      type="button"
                      onClick={() => {
                        setControlType(preset.mode);
                        setRadiusValue(preset.r);
                      }}
                      className="px-3 py-1.5 text-xs font-mono font-medium rounded-lg border border-slate-200 bg-slate-50 hover:bg-sky-50 hover:border-sky-300 text-slate-700 transition-colors cursor-pointer whitespace-nowrap"
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Live Calculation & Pi Decision Card */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 flex-1 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
                    <span>Nilai π yang dipilih otomatis</span>
                    <span className="font-mono text-sm text-sky-700">
                      π = {piLabel}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                    {isMultipleOf7
                      ? `Karena ${formatNum(radiusValue)} (atau d = ${formatNum(diameterValue)}) habis dibagi 7, memakai 22/7 membuat hitungan langsung bulat tanpa desimal.`
                      : `Karena ${formatNum(radiusValue)} bukan kelipatan 7, memakai 3,14 jauh lebih praktis saat dikalikan.`}
                  </p>
                </div>

                {/* Live Formulas Comparison */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200">
                    <p className="text-xs font-semibold text-emerald-800">
                      Keliling (Pinggiran)
                    </p>
                    <p className="mt-1 font-mono text-xs text-emerald-700">
                      K = 2 × {piLabel} × {formatNum(radiusValue)}
                    </p>
                    <p className="mt-2 font-mono text-xl font-bold text-emerald-900 tabular-nums">
                      {formatNum(circumference)} cm
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-sky-50/80 border border-sky-200">
                    <p className="text-xs font-semibold text-sky-800">
                      Luas (Isi Dalam)
                    </p>
                    <p className="mt-1 font-mono text-xs text-sky-700">
                      L = {piLabel} × {formatNum(radiusValue)}²
                    </p>
                    <p className="mt-2 font-mono text-xl font-bold text-sky-900 tabular-nums">
                      {formatNum(area)} cm²
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                <p className="text-xs text-slate-500">
                  Perhatikan: saat r membesar 2×, luasnya membesar 4× lipat!
                </p>
                <button
                  type="button"
                  onClick={onGoToCalculator}
                  className="text-xs font-semibold text-sky-700 hover:text-sky-800 inline-flex items-center gap-1 whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <span>Lihat cara hitungnya</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* TAB 2: Interactive Circle Parts Explorer + Diameter Splitter */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 flex flex-col justify-between">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
              <p className="text-sm font-semibold text-slate-900">
                Klik bagian pada daftar atau gambar untuk menyorot unsurnya
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedPartId('diameter');
                  setSplitDiameter((prev) => !prev);
                }}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold inline-flex items-center gap-1.5 border transition-colors cursor-pointer whitespace-nowrap ${
                  splitDiameter
                    ? 'bg-amber-50 border-amber-400 text-amber-900'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <Scissors className="w-3.5 h-3.5" />
                <span>{splitDiameter ? 'Gabungkan Kembali d' : 'Belah Diameter Jadi 2 r'}</span>
              </button>
            </div>

            <div className="my-4 flex flex-col items-center justify-center bg-slate-50 border border-slate-200 rounded-xl p-6">
              <svg
                viewBox="0 0 340 300"
                className="w-full max-w-[360px] h-auto"
                role="img"
                aria-label="Diagram interaktif unsur-unsur lingkaran"
              >
                {/* Base circle */}
                <circle
                  cx="170"
                  cy="150"
                  r="105"
                  fill="#ffffff"
                  stroke="#94a3b8"
                  strokeWidth="2.5"
                />

                {/* Sector (Juring) AOB */}
                <path
                  d="M 170 150 L 244 76 A 105 105 0 0 1 275 150 Z"
                  fill={selectedPartId === 'sector' ? '#bae6fd' : '#f1f5f9'}
                  stroke={selectedPartId === 'sector' ? '#0284c7' : '#cbd5e1'}
                  strokeWidth={selectedPartId === 'sector' ? '2.5' : '1'}
                  className="cursor-pointer transition-colors"
                  onClick={() => setSelectedPartId('sector')}
                />

                {/* Segment (Tembereng) */}
                <path
                  d="M 96 224 A 105 105 0 0 0 244 224 Z"
                  fill={selectedPartId === 'segment' ? '#fde68a' : '#f8fafc'}
                  stroke={selectedPartId === 'segment' ? '#d97706' : '#cbd5e1'}
                  strokeWidth={selectedPartId === 'segment' ? '2.5' : '1'}
                  className="cursor-pointer transition-colors"
                  onClick={() => setSelectedPartId('segment')}
                />

                {/* Chord (Tali Busur) */}
                <line
                  x1="96"
                  y1="224"
                  x2="244"
                  y2="224"
                  stroke={selectedPartId === 'chord' ? '#d97706' : '#64748b'}
                  strokeWidth={selectedPartId === 'chord' ? '4.5' : '2.5'}
                  strokeLinecap="round"
                  className="cursor-pointer"
                  onClick={() => setSelectedPartId('chord')}
                />

                {/* Arc (Busur) top-left */}
                <path
                  d="M 65 150 A 105 105 0 0 1 170 45"
                  fill="none"
                  stroke={selectedPartId === 'arc' ? '#059669' : '#94a3b8'}
                  strokeWidth={selectedPartId === 'arc' ? '6' : '2.5'}
                  strokeLinecap="round"
                  className="cursor-pointer"
                  onClick={() => setSelectedPartId('arc')}
                />

                {/* Diameter */}
                {!splitDiameter ? (
                  <line
                    x1="65"
                    y1="150"
                    x2="275"
                    y2="150"
                    stroke={selectedPartId === 'diameter' ? '#059669' : '#64748b'}
                    strokeWidth={selectedPartId === 'diameter' ? '4.5' : '2'}
                    strokeDasharray={selectedPartId === 'diameter' ? undefined : '5 4'}
                    className="cursor-pointer"
                    onClick={() => setSelectedPartId('diameter')}
                  />
                ) : (
                  <g>
                    <line
                      x1="65"
                      y1="142"
                      x2="167"
                      y2="142"
                      stroke="#d97706"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                    <line
                      x1="173"
                      y1="158"
                      x2="275"
                      y2="158"
                      stroke="#0284c7"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                    <text
                      x="116"
                      y="132"
                      textAnchor="middle"
                      className="fill-amber-700 text-xs font-mono font-bold"
                    >
                      r = 7 cm
                    </text>
                    <text
                      x="224"
                      y="176"
                      textAnchor="middle"
                      className="fill-sky-700 text-xs font-mono font-bold"
                    >
                      r = 7 cm
                    </text>
                  </g>
                )}

                {/* Radius line */}
                <line
                  x1="170"
                  y1="150"
                  x2="244"
                  y2="76"
                  stroke={selectedPartId === 'radius' ? '#0284c7' : '#64748b'}
                  strokeWidth={selectedPartId === 'radius' ? '4.5' : '2'}
                  strokeLinecap="round"
                  className="cursor-pointer"
                  onClick={() => setSelectedPartId('radius')}
                />

                {/* Center point O */}
                <circle
                  cx="170"
                  cy="150"
                  r={selectedPartId === 'center' ? '8' : '5.5'}
                  fill={selectedPartId === 'center' ? '#dc2626' : '#0f172a'}
                  className="cursor-pointer"
                  onClick={() => setSelectedPartId('center')}
                />
                <text
                  x="160"
                  y="140"
                  textAnchor="end"
                  className="fill-slate-900 text-xs font-bold"
                >
                  O
                </text>
              </svg>

              {splitDiameter && (
                <div className="mt-3 p-3 rounded-lg bg-amber-50 border border-amber-200 text-xs text-amber-950 text-center">
                  Terlihat jelas! Satu diameter penuh (14 cm) terbelah pas menjadi dua jari-jari yang sama panjang (7 cm + 7 cm).
                </div>
              )}
            </div>

            {/* Part Buttons Strip */}
            <div className="flex flex-wrap gap-2">
              {CIRCLE_PARTS.map((part) => (
                <button
                  key={part.id}
                  type="button"
                  onClick={() => {
                    setSelectedPartId(part.id);
                    if (part.id !== 'diameter') setSplitDiameter(false);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors cursor-pointer whitespace-nowrap ${
                    selectedPartId === part.id
                      ? 'bg-sky-600 border-sky-600 text-white'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {part.name} {part.symbol ? `(${part.symbol})` : ''}
                </button>
              ))}
            </div>
          </div>

          {/* Right Deck: Selected Part Explanation */}
          <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="pb-4 border-b border-slate-100">
                <p className="text-xs font-medium text-sky-700">
                  Unsur Lingkaran Terpilih
                </p>
                <h2 className="font-display text-2xl font-bold text-slate-900 mt-1">
                  {selectedPart.name}{' '}
                  {selectedPart.symbol ? (
                    <span className="font-mono text-sky-700">
                      ({selectedPart.symbol})
                    </span>
                  ) : null}
                </h2>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-slate-900">
                  Pengertian Sederhana
                </h3>
                <p className="text-sm text-slate-700 leading-relaxed">
                  {selectedPart.shortDesc}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                <p className="text-xs font-semibold text-slate-800">
                  Contoh di Kehidupan Sehari-hari
                </p>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {selectedPart.dailyAnalogy}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 space-y-1.5">
                <p className="text-xs font-semibold text-emerald-900">
                  Tips Anti-Lupa saat Ujian
                </p>
                <p className="text-sm text-emerald-800 leading-relaxed">
                  {selectedPart.tip}
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 text-xs text-slate-500">
              Tips: Coba klik tombol <strong>Belah Diameter Jadi 2 r</strong> di sebelah kiri agar tidak pernah lupa rumus konversi diameter!
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
