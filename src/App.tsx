import React, { useState, useMemo, useEffect } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import CategoryFilter from './components/CategoryFilter';
import ToolCard from './components/ToolCard';
import SuggestToolModal from './components/SuggestToolModal';
import ExportModal from './components/ExportModal';
import LaunchPlaybookModal from './components/LaunchPlaybookModal';
import Footer from './components/Footer';
import { tools as initialTools, Tool, CATEGORIES } from './data/tools';
import { filterTools, getCategoryCounts } from './utils/toolFilter';
import { Sparkles, Star, Download, Plus, Rocket, CheckCircle2 } from 'lucide-react';

export default function App() {
  // Tools state (persisted or defaults)
  const [toolsList, setToolsList] = useState<Tool[]>(() => {
    try {
      const saved = localStorage.getItem('quick_dev_tools_custom_items');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Merge custom tools with initial tools avoiding ID collisions
          const customIds = new Set(parsed.map((p: Tool) => p.id));
          const nonColliding = initialTools.filter((t) => !customIds.has(t.id));
          return [...parsed, ...nonColliding];
        }
      }
    } catch {
      // fallback
    }
    return initialTools;
  });

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [filterTag, setFilterTag] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'compact'>('grid');
  const [sortBy, setSortBy] = useState<'popular' | 'rating' | 'name'>('popular');

  // Bookmarks state
  const [bookmarkedIds, setBookmarkedIds] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem('quick_dev_tools_bookmarks');
      return saved ? JSON.parse(saved) : [1, 2, 4, 11, 20, 38, 46, 54, 61, 71];
    } catch {
      return [1, 2, 4, 11, 20, 38, 46, 54, 61, 71];
    }
  });

  // Simulated Star Count
  const [starsSimulated, setStarsSimulated] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('quick_dev_tools_stars');
      return saved ? parseInt(saved, 10) : 348;
    } catch {
      return 348;
    }
  });

  const [hasStarred, setHasStarred] = useState<boolean>(() => {
    try {
      return localStorage.getItem('quick_dev_tools_has_starred') === 'true';
    } catch {
      return false;
    }
  });

  // Modals state
  const [isSuggestOpen, setIsSuggestOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [isPlaybookOpen, setIsPlaybookOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 3000);
  };

  // Sync bookmarks to localStorage
  const handleToggleBookmark = (id: number) => {
    setBookmarkedIds((prev) => {
      const next = prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id];
      try {
        localStorage.setItem('quick_dev_tools_bookmarks', JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  // Star button simulation
  const handleStarClick = () => {
    if (hasStarred) {
      setHasStarred(false);
      setStarsSimulated((prev) => Math.max(0, prev - 1));
      localStorage.setItem('quick_dev_tools_has_starred', 'false');
      localStorage.setItem('quick_dev_tools_stars', (starsSimulated - 1).toString());
    } else {
      setHasStarred(true);
      setStarsSimulated((prev) => prev + 1);
      localStorage.setItem('quick_dev_tools_has_starred', 'true');
      localStorage.setItem('quick_dev_tools_stars', (starsSimulated + 1).toString());
      showToast('⭐ Thank you for starring! You helped boost our trending score!');
    }
  };

  // Add new tool handler
  const handleAddTool = (newToolData: Omit<Tool, 'id'>) => {
    const newTool: Tool = {
      ...newToolData,
      id: Date.now(),
    };

    setToolsList((prev) => {
      const updated = [newTool, ...prev];
      try {
        const customItems = updated.filter((t) => t.id > 1000);
        localStorage.setItem('quick_dev_tools_custom_items', JSON.stringify(customItems));
      } catch {
        // ignore
      }
      return updated;
    });

    setSelectedCategory(newTool.category);
    setFilterTag('all');
    setSearchQuery('');
    showToast(`🎉 "${newTool.name}" added successfully to ${newTool.category}!`);
  };

  // Derived filtered tools using pure logic
  const filteredTools = useMemo(() => {
    return filterTools(toolsList, {
      query: searchQuery,
      category: selectedCategory,
      filterTag,
      bookmarkedIds,
      sortBy,
    });
  }, [toolsList, searchQuery, selectedCategory, filterTag, bookmarkedIds, sortBy]);

  // Derived category counts
  const categoryCounts = useMemo(() => {
    return getCategoryCounts(toolsList);
  }, [toolsList]);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-800 border border-blue-500/50 text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2.5 text-sm animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <Header
        totalTools={toolsList.length}
        starsSimulated={starsSimulated}
        onStarClick={handleStarClick}
        hasStarred={hasStarred}
        onOpenSuggest={() => setIsSuggestOpen(true)}
        onOpenExport={() => setIsExportOpen(true)}
        onOpenPlaybook={() => setIsPlaybookOpen(true)}
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-850 to-slate-900 py-12 sm:py-16 border-b border-slate-800">
        <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Proven GitHub Star Magnet &mdash; 200–500⭐ in 1 Week</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white">
              Discover 100+ Free Tools That{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-400">
                Developers Actually Use
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Curated, searchable, and verified. High-quality free APIs, code editors, databases, cloud hosting, testing tools, and design kits with generous free plans or open-source licenses.
            </p>

            {/* Quick action buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setIsExportOpen(true)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-lg shadow-blue-500/25 transition-all"
              >
                <Download className="w-4 h-4" />
                <span>Export GitHub README.md</span>
              </button>

              <button
                onClick={() => setIsPlaybookOpen(true)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all"
              >
                <Rocket className="w-4 h-4 text-indigo-400" />
                <span>Launch Day Playbook</span>
              </button>
            </div>

            {/* Trust and stat badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 max-w-2xl mx-auto text-left">
              <div className="bg-slate-800/60 rounded-xl p-3 border border-slate-700/60">
                <div className="text-xl font-mono font-bold text-cyan-400">{toolsList.length}+</div>
                <div className="text-xs text-slate-400">Curated Free Tools</div>
              </div>
              <div className="bg-slate-800/60 rounded-xl p-3 border border-slate-700/60">
                <div className="text-xl font-mono font-bold text-emerald-400">10</div>
                <div className="text-xs text-slate-400">Tool Categories</div>
              </div>
              <div className="bg-slate-800/60 rounded-xl p-3 border border-slate-700/60">
                <div className="text-xl font-mono font-bold text-amber-400">100%</div>
                <div className="text-xs text-slate-400">Free / Open Source</div>
              </div>
              <div className="bg-slate-800/60 rounded-xl p-3 border border-slate-700/60">
                <div className="text-xl font-mono font-bold text-indigo-400">1-Click</div>
                <div className="text-xs text-slate-400">Repo & Markdown Kit</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        {/* Search Bar */}
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          resultCount={filteredTools.length}
          totalCount={toolsList.length}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          sortBy={sortBy}
          onSortByChange={setSortBy}
        />

        {/* Categories and Filter pills */}
        <CategoryFilter
          categories={[...CATEGORIES]}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          categoryCounts={categoryCounts}
          filterTag={filterTag}
          onSelectFilterTag={setFilterTag}
          bookmarkedCount={bookmarkedIds.length}
        />

        {/* Tools Display */}
        {filteredTools.length === 0 ? (
          <div className="text-center py-16 bg-slate-800/40 rounded-2xl border border-slate-700/60 p-8 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center mx-auto text-2xl">
              🔍
            </div>
            <h3 className="text-lg font-bold text-white">No tools found</h3>
            <p className="text-slate-400 text-sm max-w-md mx-auto">
              No developer tools matched your search &ldquo;
              <span className="text-cyan-400 font-semibold">{searchQuery}</span>
              &rdquo; in category &ldquo;{selectedCategory}&rdquo;.
            </p>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                  setFilterTag('all');
                }}
                className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-colors"
              >
                Reset All Filters
              </button>
              <button
                onClick={() => setIsSuggestOpen(true)}
                className="px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-650 text-slate-200 text-xs font-semibold transition-colors"
              >
                Suggest &ldquo;{searchQuery}&rdquo; as a New Tool
              </button>
            </div>
          </div>
        ) : viewMode === 'compact' ? (
          <div className="space-y-2">
            {filteredTools.map((tool) => (
              <ToolCard
                key={tool.id}
                tool={tool}
                isBookmarked={bookmarkedIds.includes(tool.id)}
                onToggleBookmark={handleToggleBookmark}
                onTagClick={(tag) => setSearchQuery(tag)}
                viewMode="compact"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTools.map((tool) => (
              <ToolCard
                key={tool.id}
                tool={tool}
                isBookmarked={bookmarkedIds.includes(tool.id)}
                onToggleBookmark={handleToggleBookmark}
                onTagClick={(tag) => setSearchQuery(tag)}
                viewMode="grid"
              />
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer
        totalTools={toolsList.length}
        onOpenExport={() => setIsExportOpen(true)}
        onOpenPlaybook={() => setIsPlaybookOpen(true)}
        onOpenSuggest={() => setIsSuggestOpen(true)}
      />

      {/* Modals */}
      <SuggestToolModal
        isOpen={isSuggestOpen}
        onClose={() => setIsSuggestOpen(false)}
        onAddTool={handleAddTool}
      />

      <ExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        tools={toolsList}
      />

      <LaunchPlaybookModal
        isOpen={isPlaybookOpen}
        onClose={() => setIsPlaybookOpen(false)}
        toolCount={toolsList.length}
      />
    </div>
  );
}
