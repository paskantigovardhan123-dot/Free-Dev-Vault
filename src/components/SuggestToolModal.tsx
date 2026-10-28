import React, { useState } from 'react';
import { X, Plus, Sparkles, Check, Copy } from 'lucide-react';
import { CATEGORIES, Tool } from '../data/tools';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onAddTool: (newTool: Omit<Tool, 'id'>) => void;
}

export default function SuggestToolModal({ isOpen, onClose, onAddTool }: Props) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<string>('APIs & Networking');
  const [url, setUrl] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [pricing, setPricing] = useState<Tool['pricing']>('Generous Free Tier');
  const [rating, setRating] = useState<number>(5);
  const [isOpenSource, setIsOpenSource] = useState(false);
  const [authorOrOrg, setAuthorOrOrg] = useState('');
  const [copiedPr, setCopiedPr] = useState(false);
  const [submittedMessage, setSubmittedMessage] = useState(false);

  if (!isOpen) return null;

  const validCategories = CATEGORIES.filter((c) => c !== 'All');

  const tags = tagsInput
    .split(',')
    .map((t) => t.trim().toLowerCase())
    .filter(Boolean);

  const previewMarkdown = `- **[${name || 'Tool Name'}](${url || 'https://example.com'})** - ${
    description || 'Brief description of the free tool'
  } (\`${pricing}\`)`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !url.trim() || !description.trim()) return;

    onAddTool({
      name: name.trim(),
      description: description.trim(),
      category,
      url: url.trim(),
      rating,
      tags: tags.length > 0 ? tags : ['developer-tool'],
      pricing,
      isOpenSource,
      authorOrOrg: authorOrOrg.trim() || undefined,
      isPopular: false,
    });

    setSubmittedMessage(true);
    setTimeout(() => {
      setSubmittedMessage(false);
      onClose();
    }, 1200);
  };

  const handleCopyPrTemplate = () => {
    const text = `### Tool Addition
- **Name**: ${name || 'Tool Name'}
- **URL**: ${url || 'https://...'}
- **Category**: ${category}
- **Pricing**: ${pricing}
- **Open Source**: ${isOpenSource ? 'Yes' : 'No'}
- **Description**: ${description || '...'}
- **Tags**: ${tags.join(', ')}

Markdown snippet:
\`\`\`markdown
| **[${name || 'Tool'}](${url || '#'})** | ${description || 'Description'} | \`${pricing}\` | ${'⭐'.repeat(
      rating
    )} |
\`\`\``;
    navigator.clipboard.writeText(text);
    setCopiedPr(true);
    setTimeout(() => setCopiedPr(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-800 border border-slate-700 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-700/80 sticky top-0 bg-slate-800/95 backdrop-blur z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600/20 text-blue-400 flex items-center justify-center border border-blue-500/30">
              <Plus className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Suggest a Free Tool</h2>
              <p className="text-xs text-slate-400">
                Add to your directory or generate a ready-to-merge Pull Request entry
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Tool Name <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Bruno"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900/80 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Website URL <span className="text-rose-400">*</span>
              </label>
              <input
                type="url"
                required
                placeholder="https://..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900/80 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Description <span className="text-rose-400">*</span>
            </label>
            <textarea
              required
              rows={2}
              placeholder="What makes this tool great for developers? Why is it useful?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900/80 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500 resize-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg bg-slate-900/80 border border-slate-700 text-white text-sm focus:outline-none focus:border-blue-500 cursor-pointer"
              >
                {validCategories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Pricing Model
              </label>
              <select
                value={pricing}
                onChange={(e) => setPricing(e.target.value as Tool['pricing'])}
                className="w-full px-3 py-2.5 rounded-lg bg-slate-900/80 border border-slate-700 text-white text-sm focus:outline-none focus:border-blue-500 cursor-pointer"
              >
                <option value="Free Forever">Free Forever</option>
                <option value="Generous Free Tier">Generous Free Tier</option>
                <option value="Free & Open Source">Free & Open Source</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Rating (1-5)
              </label>
              <select
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                className="w-full px-3 py-2.5 rounded-lg bg-slate-900/80 border border-slate-700 text-white text-sm focus:outline-none focus:border-blue-500 cursor-pointer"
              >
                <option value={5}>⭐⭐⭐⭐⭐ (5 stars)</option>
                <option value={4}>⭐⭐⭐⭐ (4 stars)</option>
                <option value={3}>⭐⭐⭐ (3 stars)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Tags (comma-separated)
              </label>
              <input
                type="text"
                placeholder="e.g. rest, testing, offline"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900/80 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Author / Organization (optional)
              </label>
              <input
                type="text"
                placeholder="e.g. Kong, Vercel"
                value={authorOrOrg}
                onChange={(e) => setAuthorOrOrg(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900/80 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              id="isOpenSource"
              checked={isOpenSource}
              onChange={(e) => setIsOpenSource(e.target.checked)}
              className="w-4 h-4 rounded text-blue-600 bg-slate-900 border-slate-700 focus:ring-blue-500"
            />
            <label htmlFor="isOpenSource" className="text-xs text-slate-300 font-medium cursor-pointer">
              This tool is Open Source (public code repository)
            </label>
          </div>

          {/* Live Preview Box */}
          <div className="bg-slate-900/90 rounded-xl p-3.5 border border-slate-700/80">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wide">
                Live Markdown Preview
              </span>
              <button
                type="button"
                onClick={handleCopyPrTemplate}
                className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1"
              >
                {copiedPr ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy PR Format</span>
                  </>
                )}
              </button>
            </div>
            <code className="text-xs font-mono text-cyan-300 break-all block">
              {previewMarkdown}
            </code>
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-700/60">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-sm font-semibold text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/30 transition-colors"
            >
              {submittedMessage ? (
                <>
                  <Check className="w-4 h-4 text-emerald-300" />
                  <span>Added Successfully!</span>
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  <span>Add Tool to Directory</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
