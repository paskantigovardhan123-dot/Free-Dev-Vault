import React from 'react';
import { Sparkles, Star, Download, Plus, Rocket, Github } from 'lucide-react';

interface Props {
  totalTools: number;
  starsSimulated: number;
  onStarClick: () => void;
  hasStarred: boolean;
  onOpenSuggest: () => void;
  onOpenExport: () => void;
  onOpenPlaybook: () => void;
}

export default function Header({
  totalTools,
  starsSimulated,
  onStarClick,
  hasStarred,
  onOpenSuggest,
  onOpenExport,
  onOpenPlaybook,
}: Props) {
  return (
    <header className="border-b border-slate-700/80 bg-slate-900/90 backdrop-blur-md sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-2 sm:gap-4">
          {/* Logo & title */}
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/20 text-white font-extrabold text-lg sm:text-xl shrink-0">
              ⚡
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="font-extrabold text-base sm:text-xl tracking-tight text-white font-sans whitespace-nowrap">
                  Quick Dev Tools
                </span>
                <span className="hidden sm:inline-flex text-[10px] sm:text-xs px-2 py-0.5 rounded-full font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  2026 Edition
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden md:block">
                Curated directory of {totalTools}+ free tools developers love
              </p>
            </div>
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            {/* Launch Playbook Button */}
            <button
              onClick={onOpenPlaybook}
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 transition-colors"
              title="View GitHub Launch Playbook & Day 1-7 Strategy"
            >
              <Rocket className="w-4 h-4 text-indigo-400" />
              <span>Launch Playbook</span>
            </button>

            {/* Export Repo Kit */}
            <button
              onClick={onOpenExport}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
              title="Export complete GitHub README.md and repo files"
            >
              <Download className="w-4 h-4 text-cyan-400" />
              <span>Export README</span>
            </button>

            {/* Suggest Tool */}
            <button
              onClick={onOpenSuggest}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-600/20 transition-colors"
            >
              <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Suggest Tool</span>
              <span className="sm:hidden">Suggest</span>
            </button>

            {/* GitHub Star simulation button */}
            <button
              onClick={onStarClick}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold border transition-all ${
                hasStarred
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-sm shadow-amber-500/20'
                  : 'bg-slate-800 hover:bg-slate-750 text-slate-300 border-slate-700 hover:border-amber-400/40'
              }`}
              title="Star this project!"
            >
              <Star
                className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${hasStarred ? 'fill-amber-400 text-amber-400' : 'text-slate-400'}`}
              />
              <span className="hidden md:inline">Star</span>
              <span className="bg-slate-900/60 px-1.5 py-0.5 rounded text-[11px] font-mono text-slate-300">
                {starsSimulated.toLocaleString()}
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
