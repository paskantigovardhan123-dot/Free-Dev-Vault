import React from 'react';
import { Star, Heart, Github, Rocket, ArrowUpRight } from 'lucide-react';

interface Props {
  totalTools: number;
  onOpenExport: () => void;
  onOpenPlaybook: () => void;
  onOpenSuggest: () => void;
}

export default function Footer({
  totalTools,
  onOpenExport,
  onOpenPlaybook,
  onOpenSuggest,
}: Props) {
  return (
    <footer className="mt-20 border-t border-slate-800 bg-slate-950/80 text-slate-400 py-12 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-base shadow-md shadow-blue-500/20">
                ⚡
              </span>
              <span className="font-extrabold text-lg text-white font-sans tracking-tight">
                Quick Dev Tools
              </span>
              <span className="text-[11px] font-mono bg-blue-950/70 text-blue-300 px-2 py-0.5 rounded border border-blue-800/40">
                100+ Free Tools
              </span>
            </div>
            <p className="text-slate-400 text-xs sm:text-sm max-w-md leading-relaxed">
              A curated, community-driven collection of {totalTools} genuinely free developer tools, APIs, design assets, and cloud hosting with zero fluff and no hidden paywalls.
            </p>
            <div className="flex items-center gap-3 pt-1">
              <span className="text-xs text-slate-400">
                Built to get 200–500+ GitHub Stars in 1 week.
              </span>
            </div>
          </div>

          {/* Quick Actions */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">
              Repository Toolkit
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={onOpenExport}
                  className="hover:text-blue-400 transition-colors flex items-center gap-1"
                >
                  <span>Export GitHub README</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-400" />
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenPlaybook}
                  className="hover:text-blue-400 transition-colors flex items-center gap-1"
                >
                  <span>7-Day Launch Playbook</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-400" />
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenSuggest}
                  className="hover:text-blue-400 transition-colors flex items-center gap-1"
                >
                  <span>Suggest a New Tool</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-400" />
                </button>
              </li>
            </ul>
          </div>

          {/* Contributing & License */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">
              Open Source
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <span className="text-slate-400">License:</span>{' '}
                <span className="text-slate-200 font-medium">MIT (100% Free)</span>
              </li>
              <li>
                <span className="text-slate-400">Contributions:</span>{' '}
                <span className="text-emerald-400 font-medium">PRs Welcome</span>
              </li>
              <li>
                <span className="text-slate-400">Standards:</span>{' '}
                <span className="text-slate-300">Curated & Tested 2026</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© 2026 Quick Dev Tools. Made with ❤️ for the global developer community.</p>
          <div className="flex items-center gap-2">
            <span>Star this project on GitHub ⭐</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
