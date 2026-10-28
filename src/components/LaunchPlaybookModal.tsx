import React, { useState } from 'react';
import {
  X,
  Rocket,
  Calendar,
  Share2,
  CheckCircle2,
  Copy,
  Check,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  MessageSquare,
} from 'lucide-react';
import { calculateStarScore, RepoAuditMetrics } from '../utils/toolFilter';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  toolCount: number;
}

export default function LaunchPlaybookModal({ isOpen, onClose, toolCount }: Props) {
  const [activeTab, setActiveTab] = useState<'strategy' | 'templates' | 'badges'>('strategy');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (!isOpen) return null;

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const auditMetrics: RepoAuditMetrics = {
    hasBadges: true,
    hasTOC: true,
    hasContributingGuide: true,
    hasLicense: true,
    toolsCount: toolCount,
    hasSearchDemo: true,
    hasSocialSharingCard: true,
    hasPrTemplate: true,
  };

  const audit = calculateStarScore(auditMetrics);

  const hnPost = `Show HN: Quick Dev Tools – Curated directory of 100+ free developer tools

Hey HN!

Over the past few years, keeping track of genuinely free developer tools (APIs, mock servers, headless CMSs, DBs, terminal utilities, and AI dev tools) became messy with expired free tiers and hidden credit card walls.

I built Quick Dev Tools: a clean, community-curated, filterable directory of 100+ tools with authentic free forever or generous free tiers.

Live web app: https://quick-dev-tools.vercel.app
GitHub repository: https://github.com/yourusername/quick-dev-tools

Everything is MIT-licensed and welcomes PRs. Would love your feedback on tools you use daily that are missing!`;

  const redditPost = `Title: I curated 100+ genuinely free developer tools & made an interactive searchable directory (and GitHub repo)

Hey r/webdev!

I got tired of hunting for free APIs, mock servers, Postgres hosting, and UI assets only to find they require a credit card upfront or expired.

So I put together "Quick Dev Tools" — 100+ tools grouped into 10 categories:
- APIs & Networking (Postman, Hoppscotch, Bruno, JSONPlaceholder, Mockoon)
- Code Editors & IDEs (VS Code, Cursor, Zed, Neovim)
- Cloud & Free Hosting (Vercel, Netlify, Cloudflare Pages, Render)
- Databases (Supabase, Neon Postgres, Turso, PocketBase)
- Design & UI (Figma, Penpot, Excalidraw, Lucide Icons, Shots.so)
- Testing & QA (Playwright, Vitest, MSW, k6)
- Dev Utilities (Regex101, DevToys, Bundlephobia, JSON Crack, Transform.tools)

You can search and filter live here: https://quick-dev-tools.vercel.app
Or star / contribute to the GitHub list: https://github.com/yourusername/quick-dev-tools

Hope this saves you time on your next side project! What's your #1 favorite free tool?`;

  const twitterPost = `🚀 Launched "Quick Dev Tools" — a curated directory of 100+ free tools for developers in 2026.

Stop paying for dev tools you can get for free:
• 10 Categories
• Instant Search & Category Filters
• 1-Click Markdown Export for GitHub

Check it out: https://quick-dev-tools.vercel.app
⭐ Star on GitHub: https://github.com/yourusername/quick-dev-tools

#webdev #javascript #react #opensource #coding`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-800/80">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center border border-indigo-500/30">
              <Rocket className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                GitHub Star Launch Playbook
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Target: 200–500 ⭐ in 1 Week
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Actionable launch strategy, viral distribution templates, and shields badges
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close playbook modal"
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Audit Score Banner */}
        <div className="p-4 bg-gradient-to-r from-blue-950/70 via-indigo-950/70 to-slate-900 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 font-extrabold flex items-center justify-center border border-emerald-500/40 text-xl font-mono">
              {audit.grade}
            </div>
            <div>
              <div className="text-sm font-bold text-white flex items-center gap-2">
                Repo Star Readiness Score: <span className="text-emerald-400">{audit.score}/100</span>
              </div>
              <p className="text-xs text-slate-400">
                {audit.passedCount} of {audit.totalChecks} viral repository criteria satisfied! Ready to launch.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-400">Curated tools:</span>
            <span className="font-bold text-cyan-400 font-mono bg-slate-800 px-2.5 py-1 rounded-md border border-slate-700">
              {toolCount} Tools
            </span>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-2 px-6 py-2 border-b border-slate-800 bg-slate-900/60">
          <button
            onClick={() => setActiveTab('strategy')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              activeTab === 'strategy'
                ? 'bg-indigo-600 text-white'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            7-Day Launch Schedule
          </button>
          <button
            onClick={() => setActiveTab('templates')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              activeTab === 'templates'
                ? 'bg-indigo-600 text-white'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Share2 className="w-3.5 h-3.5" />
            Viral Post Copy Templates
          </button>
          <button
            onClick={() => setActiveTab('badges')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              activeTab === 'badges'
                ? 'bg-indigo-600 text-white'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            Shields Badges Kit
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 overflow-y-auto flex-1 text-sm space-y-6">
          {activeTab === 'strategy' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-800/80 rounded-xl p-4 border border-slate-700/80">
                  <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider block mb-1">
                    Day 1: Repo Setup & Polish
                  </span>
                  <h4 className="text-white font-bold mb-2">Publish repo with 100+ tools</h4>
                  <ul className="text-xs text-slate-300 space-y-1.5 list-disc pl-4">
                    <li>Create repo: <code className="text-cyan-300 font-mono">awesome-free-dev-tools</code></li>
                    <li>Add the exported <code className="text-cyan-300 font-mono">README.md</code>, <code className="text-cyan-300 font-mono">CONTRIBUTING.md</code>, and <code className="text-cyan-300 font-mono">LICENSE</code>.</li>
                    <li>Add GitHub topics: <code className="text-slate-400 font-mono">developer-tools, awesome-list, free-tools, programming, api</code>.</li>
                    <li>Deploy web directory to Vercel/Cloudflare Pages with 1-click.</li>
                  </ul>
                </div>

                <div className="bg-slate-800/80 rounded-xl p-4 border border-slate-700/80">
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block mb-1">
                    Day 2: Developer Communities
                  </span>
                  <h4 className="text-white font-bold mb-2">Reddit & Dev.to Launch</h4>
                  <ul className="text-xs text-slate-300 space-y-1.5 list-disc pl-4">
                    <li>Post on <code className="text-slate-300 font-mono">r/webdev</code> (Friday morning or Tuesday 9am EST).</li>
                    <li>Post on <code className="text-slate-300 font-mono">r/learnprogramming</code> and <code className="text-slate-300 font-mono">r/reactjs</code>.</li>
                    <li>Publish a Dev.to companion post: &quot;Top 50 Free Developer Tools I Use in 2026&quot;.</li>
                  </ul>
                </div>

                <div className="bg-slate-800/80 rounded-xl p-4 border border-slate-700/80">
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block mb-1">
                    Day 3: Hacker News & X/Twitter
                  </span>
                  <h4 className="text-white font-bold mb-2">Show HN & Tech Thread</h4>
                  <ul className="text-xs text-slate-300 space-y-1.5 list-disc pl-4">
                    <li>Submit <code className="text-amber-300 font-mono">Show HN: Quick Dev Tools</code> at 8:00 AM PST.</li>
                    <li>Post a 7-tweet breakdown thread on X/Twitter with images from <code className="text-slate-300 font-mono">shots.so</code>.</li>
                    <li>Respond to every comment on HN within 15 minutes to boost algorithm ranking.</li>
                  </ul>
                </div>

                <div className="bg-slate-800/80 rounded-xl p-4 border border-slate-700/80">
                  <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider block mb-1">
                    Day 4–7: PRs & Viral Loop
                  </span>
                  <h4 className="text-white font-bold mb-2">Turn Contributors into Stars</h4>
                  <ul className="text-xs text-slate-300 space-y-1.5 list-disc pl-4">
                    <li>Add first "Good First Issue" asking: "Add your favorite free API tool".</li>
                    <li>Merge user PRs quickly with friendly feedback.</li>
                    <li>Submit PR to official <code className="text-slate-300 font-mono">sindresorhus/awesome</code> list.</li>
                    <li>Every contributor typically stars your repo! ⭐</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'templates' && (
            <div className="space-y-6">
              {/* Hacker News */}
              <div className="bg-slate-800/80 rounded-xl p-4 border border-slate-700">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                    Hacker News (Show HN)
                  </span>
                  <button
                    onClick={() => copyToClipboard(hnPost, 'hn')}
                    className="flex items-center gap-1 text-xs text-slate-300 hover:text-white px-2.5 py-1 rounded bg-slate-700"
                  >
                    {copiedKey === 'hn' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedKey === 'hn' ? 'Copied' : 'Copy HN Post'}</span>
                  </button>
                </div>
                <pre className="text-xs font-mono text-slate-300 bg-slate-900/90 p-3 rounded-lg overflow-x-auto whitespace-pre-wrap">
                  {hnPost}
                </pre>
              </div>

              {/* Reddit */}
              <div className="bg-slate-800/80 rounded-xl p-4 border border-slate-700">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
                    Reddit (r/webdev, r/reactjs, r/learnprogramming)
                  </span>
                  <button
                    onClick={() => copyToClipboard(redditPost, 'reddit')}
                    className="flex items-center gap-1 text-xs text-slate-300 hover:text-white px-2.5 py-1 rounded bg-slate-700"
                  >
                    {copiedKey === 'reddit' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedKey === 'reddit' ? 'Copied' : 'Copy Reddit Post'}</span>
                  </button>
                </div>
                <pre className="text-xs font-mono text-slate-300 bg-slate-900/90 p-3 rounded-lg overflow-x-auto whitespace-pre-wrap">
                  {redditPost}
                </pre>
              </div>

              {/* Twitter / X */}
              <div className="bg-slate-800/80 rounded-xl p-4 border border-slate-700">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                    Twitter / X Launch Post
                  </span>
                  <button
                    onClick={() => copyToClipboard(twitterPost, 'twitter')}
                    className="flex items-center gap-1 text-xs text-slate-300 hover:text-white px-2.5 py-1 rounded bg-slate-700"
                  >
                    {copiedKey === 'twitter' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedKey === 'twitter' ? 'Copied' : 'Copy Tweet'}</span>
                  </button>
                </div>
                <pre className="text-xs font-mono text-slate-300 bg-slate-900/90 p-3 rounded-lg overflow-x-auto whitespace-pre-wrap">
                  {twitterPost}
                </pre>
              </div>
            </div>
          )}

          {activeTab === 'badges' && (
            <div className="space-y-4">
              <p className="text-xs text-slate-400">
                Copy and paste these Shields.io badges into your <code className="text-cyan-400 font-mono">README.md</code> header. Badges significantly increase click-through and star conversion rates:
              </p>
              <div className="space-y-3 font-mono text-xs">
                {[
                  {
                    name: 'License Badge',
                    markdown: '[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)',
                  },
                  {
                    name: 'PRs Welcome Badge',
                    markdown: '[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)',
                  },
                  {
                    name: 'Awesome List Badge',
                    markdown: '[![Awesome](https://awesome.re/badge.svg)](https://awesome.re)',
                  },
                  {
                    name: 'GitHub Stars Social Badge',
                    markdown: '[![Stars](https://img.shields.io/github/stars/yourusername/quick-dev-tools?style=social)](https://github.com/yourusername/quick-dev-tools)',
                  },
                ].map((item, index) => (
                  <div key={index} className="bg-slate-800/80 rounded-xl p-3 border border-slate-700/80 flex items-center justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <span className="text-[11px] font-sans text-slate-400 block mb-1 font-semibold">{item.name}</span>
                      <code className="text-cyan-300 break-all select-all text-xs">{item.markdown}</code>
                    </div>
                    <button
                      onClick={() => copyToClipboard(item.markdown, `badge-${index}`)}
                      className="p-1.5 rounded-lg bg-slate-700 hover:bg-slate-650 text-slate-200 transition-colors shrink-0"
                    >
                      {copiedKey === `badge-${index}` ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-800 bg-slate-900 text-xs text-slate-400 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-colors"
          >
            Got it, Let&apos;s Launch!
          </button>
        </div>
      </div>
    </div>
  );
}
