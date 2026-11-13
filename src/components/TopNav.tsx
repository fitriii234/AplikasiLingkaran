import React from 'react';
import { LogOut } from 'lucide-react';
import { ModuleId, StudentProfile } from '../types';

interface TopNavProps {
  activeModule: ModuleId;
  onSelectModule: (id: ModuleId) => void;
  student: StudentProfile;
  onLogout: () => void;
}

const NAV_ITEMS: { id: ModuleId; label: string }[] = [
  { id: 'home', label: 'Beranda' },
  { id: 'lab', label: 'Lab Visual' },
  { id: 'lessons', label: 'Materi' },
  { id: 'calculator', label: 'Kalkulator' },
  { id: 'practice', label: 'Latihan' },
];

export const TopNav: React.FC<TopNavProps> = ({
  activeModule,
  onSelectModule,
  student,
  onLogout,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-8">
        {/* Zone 1: Brand wordmark (single text element) */}
        <button
          type="button"
          onClick={() => onSelectModule('home')}
          className="font-display text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-600 rounded"
        >
          LingkarPintar
        </button>

        {/* Zone 2: 5 concise single-line navigation links */}
        <nav
          aria-label="Navigasi utama"
          className="hidden md:flex items-center gap-6"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activeModule === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectModule(item.id)}
                className={`py-1.5 text-sm font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer border-b-2 ${
                  isActive
                    ? 'text-sky-700 border-sky-600'
                    : 'text-slate-600 border-transparent hover:text-slate-900 hover:border-slate-300'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center shrink-0">
          <button
            type="button"
            onClick={onLogout}
            title={`Keluar dari akun ${student.fullName}`}
            className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-600"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Ganti Siswa</span>
          </button>
        </div>
      </div>

      {/* Mobile navigation strip (kept compact under 15% viewport height) */}
      <nav
        aria-label="Navigasi seluler"
        className="md:hidden border-t border-slate-100 px-3 py-1.5 flex items-center justify-between gap-1 overflow-x-auto bg-white"
      >
        {NAV_ITEMS.map((item) => {
          const isActive = activeModule === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelectModule(item.id)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                isActive
                  ? 'bg-sky-50 text-sky-700 font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </nav>
    </header>
  );
};
