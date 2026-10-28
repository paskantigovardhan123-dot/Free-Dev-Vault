import React, { useState } from 'react';
import { X, Copy, Check, Download, FileText, Shield, Sparkles, BookOpen, FileCode } from 'lucide-react';
import { Tool } from '../data/tools';
import {
  generateReadmeMarkdown,
  generateContributingMarkdown,
  generateLicenseMarkdown,
  RepoConfig,
} from '../utils/markdownExport';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  tools: Tool[];
}

export default function ExportModal({ isOpen, onClose, tools }: Props) {
  const [activeTab, setActiveTab] = useState<'readme' | 'contributing' | 'license' | 'json'>('readme');
  const [repoName, setRepoName] = useState('quick-dev-tools');
  const [githubUsername, setGithubUsername] = useState('yourusername');
  const [demoUrl, setDemoUrl] = useState('https://quick-dev-tools.vercel.app');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const config: RepoConfig = {
    repoName: repoName.trim() || 'quick-dev-tools',
    githubUsername: githubUsername.trim() || 'yourusername',
    repoDescription: 'A curated directory of 100+ free development tools that developers actually use.',
    demoUrl: demoUrl.trim() || 'https://quick-dev-tools.vercel.app',
  };

  const readmeContent = generateReadmeMarkdown(tools, config);
  const contributingContent = generateContributingMarkdown(config);
  const licenseContent = generateLicenseMarkdown(config);
  const jsonContent = JSON.stringify(tools, null, 2);

  const getCurrentContent = () => {
    switch (activeTab) {
      case 'readme':
        return readmeContent;
      case 'contributing':
        return contributingContent;
      case 'license':
        return licenseContent;
      case 'json':
        return jsonContent;
    }
  };

  const getFilename = () => {
    switch (activeTab) {
      case 'readme':
        return 'README.md';
      case 'contributing':
        return 'CONTRIBUTING.md';
      case 'license':
        return 'LICENSE';
      case 'json':
        return 'tools.json';
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getCurrentContent());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([getCurrentContent()], { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = getFilename();
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-850 bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-700 bg-slate-800/80">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center border border-cyan-500/30">
              <Download className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                Export GitHub Repository Kit
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
                  {tools.length} Tools
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Ready-to-push README.md, Contributing guidelines, and MIT license formatted for stars
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close export dialog"
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Configuration settings */}
        <div className="p-4 bg-slate-800/40 border-b border-slate-700/80 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div>
            <label className="block text-slate-400 font-medium mb-1">
              GitHub Username
            </label>
            <input
              type="text"
              value={githubUsername}
              onChange={(e) => setGithubUsername(e.target.value)}
              placeholder="yourusername"
              className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-white font-mono text-xs focus:border-cyan-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-slate-400 font-medium mb-1">
              Repository Name
            </label>
            <input
              type="text"
              value={repoName}
              onChange={(e) => setRepoName(e.target.value)}
              placeholder="quick-dev-tools"
              className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-white font-mono text-xs focus:border-cyan-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-slate-400 font-medium mb-1">
              Live Web App URL (Demo)
            </label>
            <input
              type="text"
              value={demoUrl}
              onChange={(e) => setDemoUrl(e.target.value)}
              placeholder="https://..."
              className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-white font-mono text-xs focus:border-cyan-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center justify-between px-6 py-2 border-b border-slate-800 bg-slate-900/60">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('readme')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                activeTab === 'readme'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              README.md
            </button>
            <button
              onClick={() => setActiveTab('contributing')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                activeTab === 'contributing'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              CONTRIBUTING.md
            </button>
            <button
              onClick={() => setActiveTab('license')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                activeTab === 'license'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Shield className="w-3.5 h-3.5" />
              LICENSE
            </button>
            <button
              onClick={() => setActiveTab('json')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                activeTab === 'json'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <FileCode className="w-3.5 h-3.5" />
              tools.json
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy File</span>
                </>
              )}
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-cyan-600 hover:bg-cyan-500 text-white transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download</span>
            </button>
          </div>
        </div>

        {/* Code Content Area */}
        <div className="p-6 overflow-y-auto flex-1 font-mono text-xs bg-slate-950/80 text-slate-300 select-all leading-relaxed whitespace-pre-wrap">
          {getCurrentContent()}
        </div>

        {/* Footer info note */}
        <div className="px-6 py-3 border-t border-slate-800 bg-slate-900 text-xs text-slate-400 flex items-center justify-between">
          <span>
            💡 <strong>Tip for 500+ stars:</strong> Commit this <code className="text-cyan-400">README.md</code> directly to GitHub, add repository tags (<code className="text-slate-300">awesome-list</code>, <code className="text-slate-300">developer-tools</code>, <code className="text-slate-300">free-tier</code>), and submit to <code className="text-slate-300">awesome-selfhosted</code> and Reddit!
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium ml-4 shrink-0"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
