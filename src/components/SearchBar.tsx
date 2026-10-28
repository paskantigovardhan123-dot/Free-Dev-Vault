import React, { useEffect, useRef } from 'react';
import { Search, X, LayoutGrid, ListFilter, ArrowUpDown } from 'lucide-react';

interface Props {
  value: string;
  onChange: (value: string) => void;
  resultCount: number;
  totalCount: number;
  viewMode: 'grid' | 'compact';
  onViewModeChange: (mode: 'grid' | 'compact') => void;
  sortBy: 'popular' | 'rating' | 'name';
  onSortByChange: (sort: 'popular' | 'rating' | 'name') => void;
}

export default function SearchBar({
  value,
  onChange,
  resultCount,
  totalCount,
  viewMode,
  onViewModeChange,
  sortBy,
  onSortByChange,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  // Keyboard shortcut: press "/" anywhere to focus search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === '/' &&
        document.activeElement?.tagName !== 'INPUT' &&
        document.activeElement?.tagName !== 'TEXTAREA'
      ) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="mb-6 space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search input container */}
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
            <Search className="w-5 h-5 text-slate-400" />
          </div>
          <input
            ref={inputRef}
            type="text"
            placeholder="Search 100+ tools by name, category, or tags (e.g. 'api', 'mock', 'rust', 'auth')..."
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full pl-11 pr-20 py-3.5 rounded-xl bg-slate-800/90 text-white placeholder-slate-400 border border-slate-700/80 focus:outline-none focus:ring-2 focus:ring-blue-500/80 focus:border-blue-500 text-sm sm:text-base shadow-inner transition-all"
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center gap-1.5">
            {value && (
              <button
                onClick={() => onChange('')}
                className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
                title="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[11px] font-mono text-slate-400 bg-slate-700/60 border border-slate-600 rounded">
              /
            </kbd>
          </div>
        </div>

        {/* Controls: Sort and View mode */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          {/* Sort Selector */}
          <div className="relative flex items-center bg-slate-800/90 border border-slate-700/80 rounded-xl px-3 py-2 text-xs sm:text-sm text-slate-300">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400 mr-2" />
            <select
              value={sortBy}
              onChange={(e) => onSortByChange(e.target.value as 'popular' | 'rating' | 'name')}
              className="bg-transparent text-slate-200 focus:outline-none cursor-pointer pr-1"
            >
              <option value="popular" className="bg-slate-800 text-slate-200">
                Most Popular
              </option>
              <option value="rating" className="bg-slate-800 text-slate-200">
                Highest Rating
              </option>
              <option value="name" className="bg-slate-800 text-slate-200">
                Alphabetical
              </option>
            </select>
          </div>

          {/* View Mode Toggle */}
          <div className="flex bg-slate-800/90 border border-slate-700/80 rounded-xl p-1 text-slate-400">
            <button
              onClick={() => onViewModeChange('grid')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'grid'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'hover:text-white hover:bg-slate-700/50'
              }`}
              title="Grid view"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => onViewModeChange('compact')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'compact'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'hover:text-white hover:bg-slate-700/50'
              }`}
              title="Compact list view"
            >
              <ListFilter className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Results summary & quick filter pills */}
      <div className="flex flex-wrap items-center justify-between text-xs text-slate-400 gap-2">
        <div>
          Showing <span className="font-semibold text-slate-200">{resultCount}</span> of{' '}
          <span className="font-semibold text-slate-200">{totalCount}</span> tools
          {value && (
            <span>
              {' '}
              matching &ldquo;<span className="text-cyan-400">{value}</span>&rdquo;
            </span>
          )}
        </div>

        {/* Quick search tags */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-slate-500">Popular searches:</span>
          {['mock', 'postgres', 'docker', 'ai', 'rust', 'icons'].map((tag) => (
            <button
              key={tag}
              onClick={() => onChange(tag)}
              className="px-2 py-0.5 rounded bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors border border-slate-700/50"
            >
              #{tag}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
