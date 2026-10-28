import React from 'react';
import { Star, Bookmark, ShieldCheck, Sparkles, Filter } from 'lucide-react';

interface Props {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  categoryCounts: Record<string, number>;
  filterTag: string;
  onSelectFilterTag: (tag: string) => void;
  bookmarkedCount: number;
}

export default function CategoryFilter({
  categories,
  selectedCategory,
  onSelectCategory,
  categoryCounts,
  filterTag,
  onSelectFilterTag,
  bookmarkedCount,
}: Props) {
  return (
    <div className="mb-8 space-y-3">
      {/* Secondary Fast Filters (All, Popular, Open Source, Bookmarked) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1 mr-1">
          <Filter className="w-3.5 h-3.5 text-slate-400" />
          Filter:
        </span>

        <button
          onClick={() => onSelectFilterTag('all')}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
            filterTag === 'all'
              ? 'bg-slate-200 text-slate-900 font-semibold shadow-sm'
              : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700/80 border border-slate-700/60'
          }`}
        >
          All Tools
        </button>

        <button
          onClick={() => onSelectFilterTag('popular')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
            filterTag === 'popular'
              ? 'bg-amber-500 text-slate-950 font-bold shadow-sm shadow-amber-500/20'
              : 'bg-slate-800/80 text-amber-300/90 hover:bg-slate-700/80 border border-amber-500/30'
          }`}
        >
          <Star className="w-3.5 h-3.5 fill-current" />
          Popular ⭐
        </button>

        <button
          onClick={() => onSelectFilterTag('open-source')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
            filterTag === 'open-source'
              ? 'bg-emerald-500 text-slate-950 font-bold shadow-sm shadow-emerald-500/20'
              : 'bg-slate-800/80 text-emerald-300/90 hover:bg-slate-700/80 border border-emerald-500/30'
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          Open Source 🟢
        </button>

        <button
          onClick={() => onSelectFilterTag('bookmarked')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
            filterTag === 'bookmarked'
              ? 'bg-blue-600 text-white font-bold shadow-sm shadow-blue-500/20'
              : 'bg-slate-800/80 text-blue-300/90 hover:bg-slate-700/80 border border-blue-500/30'
          }`}
        >
          <Bookmark className="w-3.5 h-3.5" />
          Bookmarked ({bookmarkedCount})
        </button>
      </div>

      {/* Main Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((category) => {
          const count = categoryCounts[category] || 0;
          const isSelected = selectedCategory === category;

          return (
            <button
              key={category}
              onClick={() => onSelectCategory(category)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
                isSelected
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/25 border border-blue-400/30 font-semibold'
                  : 'bg-slate-800/90 text-slate-300 hover:bg-slate-750 hover:text-white border border-slate-700/80'
              }`}
            >
              <span>{category}</span>
              <span
                className={`text-[11px] px-1.5 py-0.5 rounded-md font-mono ${
                  isSelected
                    ? 'bg-white/20 text-white'
                    : 'bg-slate-900/60 text-slate-400'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
