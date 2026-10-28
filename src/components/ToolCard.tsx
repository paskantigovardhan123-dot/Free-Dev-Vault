import React, { useState } from 'react';
import { ExternalLink, Star, Bookmark, Copy, Check, Sparkles, ShieldCheck } from 'lucide-react';
import { Tool } from '../data/tools';

interface Props {
  tool: Tool;
  isBookmarked: boolean;
  onToggleBookmark: (id: number) => void;
  onTagClick: (tag: string) => void;
  viewMode?: 'grid' | 'compact';
}

export default function ToolCard({
  tool,
  isBookmarked,
  onToggleBookmark,
  onTagClick,
  viewMode = 'grid',
}: Props) {
  const [copied, setCopied] = useState(false);

  const handleCopyMarkdown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const md = `- [${tool.name}](${tool.url}) - ${tool.description} (${tool.pricing})`;
    navigator.clipboard.writeText(md);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleBookmark = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onToggleBookmark(tool.id);
  };

  if (viewMode === 'compact') {
    return (
      <div className="group bg-slate-800/90 hover:bg-slate-750/90 rounded-xl p-4 border border-slate-700/80 hover:border-blue-500/50 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-md">
        <div className="flex items-start sm:items-center gap-3 min-w-0 flex-1">
          <button
            onClick={handleBookmark}
            aria-label={`Bookmark ${tool.name}`}
            className="mt-0.5 sm:mt-0 p-1.5 rounded-lg text-slate-400 hover:text-blue-400 hover:bg-slate-700 transition-colors"
          >
            <Bookmark
              className={`w-4 h-4 ${isBookmarked ? 'fill-blue-500 text-blue-500' : 'text-slate-400'}`}
            />
          </button>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <a
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-white group-hover:text-blue-400 flex items-center gap-1.5 transition-colors"
              >
                <span>{tool.name}</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-400" />
              </a>

              {tool.isPopular && (
                <span className="bg-amber-500/20 text-amber-300 text-[10px] font-semibold px-2 py-0.5 rounded-full border border-amber-500/30">
                  Popular ⭐
                </span>
              )}

              {tool.isOpenSource && (
                <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-semibold px-2 py-0.5 rounded-full border border-emerald-500/30">
                  Open Source
                </span>
              )}

              <span className="text-[11px] text-slate-400 bg-slate-700/50 px-2 py-0.5 rounded">
                {tool.category}
              </span>
            </div>

            <p className="text-slate-300 text-xs sm:text-sm mt-1 line-clamp-1">
              {tool.description}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
          <span className="text-xs font-mono text-slate-400 bg-slate-900/60 px-2 py-1 rounded border border-slate-700/60">
            {tool.pricing}
          </span>

          <button
            onClick={handleCopyMarkdown}
            aria-label="Copy markdown"
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
            title="Copy Markdown entry"
          >
            {copied ? (
              <Check className="w-4 h-4 text-emerald-400" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="group relative bg-slate-800/90 hover:bg-slate-750/90 rounded-2xl p-6 border border-slate-700/80 hover:border-blue-500/60 transition-all duration-200 flex flex-col justify-between shadow-lg hover:shadow-xl hover:shadow-blue-500/10">
      <div>
        {/* Top bar: Category badge, bookmark, copy */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-slate-700/60 text-slate-300 border border-slate-600/50">
            {tool.category}
          </span>

          <div className="flex items-center gap-1">
            <button
              onClick={handleCopyMarkdown}
              aria-label="Copy markdown entry"
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
              title="Copy Markdown row"
            >
              {copied ? (
                <Check className="w-4 h-4 text-emerald-400" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>
            <button
              onClick={handleBookmark}
              aria-label={`Bookmark ${tool.name}`}
              className="p-1.5 rounded-lg text-slate-400 hover:text-blue-400 hover:bg-slate-700 transition-colors"
              title={isBookmarked ? 'Remove bookmark' : 'Bookmark this tool'}
            >
              <Bookmark
                className={`w-4 h-4 ${isBookmarked ? 'fill-blue-500 text-blue-500' : 'text-slate-400'}`}
              />
            </button>
          </div>
        </div>

        {/* Title and Badges */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <a
            href={tool.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors flex items-center gap-1.5 inline-flex"
          >
            <span>{tool.name}</span>
            <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-blue-400 transition-colors shrink-0" />
          </a>

          {tool.isPopular && (
            <span className="bg-amber-500/20 text-amber-300 text-[11px] font-bold px-2 py-0.5 rounded-full border border-amber-500/40 shrink-0">
              ⭐ Popular
            </span>
          )}
        </div>

        {/* Author or Org if present */}
        {tool.authorOrOrg && (
          <p className="text-xs text-slate-400 mb-2 font-mono">
            by {tool.authorOrOrg}
          </p>
        )}

        {/* Description */}
        <p className="text-slate-300 text-sm leading-relaxed mb-4 line-clamp-3">
          {tool.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {tool.tags.map((tag) => (
            <button
              key={tag}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onTagClick(tag);
              }}
              className="bg-blue-950/60 hover:bg-blue-900/80 text-blue-300 text-xs px-2.5 py-0.5 rounded-md font-mono border border-blue-800/40 transition-colors cursor-pointer"
            >
              #{tag}
            </button>
          ))}
        </div>
      </div>

      {/* Footer Info: Pricing and Rating */}
      <div className="pt-4 border-t border-slate-700/60 flex items-center justify-between text-xs">
        <div className="flex items-center gap-1.5">
          <span className="text-slate-400 font-medium">Pricing:</span>
          <span
            className={`font-semibold px-2 py-0.5 rounded text-[11px] ${
              tool.pricing === 'Free Forever'
                ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-800/40'
                : tool.pricing === 'Free & Open Source'
                ? 'bg-cyan-950/60 text-cyan-300 border border-cyan-800/40'
                : 'bg-indigo-950/60 text-indigo-300 border border-indigo-800/40'
            }`}
          >
            {tool.pricing}
          </span>
        </div>

        <div className="flex items-center gap-1 text-amber-400">
          <div className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-3.5 h-3.5 ${
                  i < tool.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-600'
                }`}
              />
            ))}
          </div>
          {tool.starsCount && (
            <span className="ml-1 text-[11px] text-slate-400 font-mono">
              {tool.starsCount}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
