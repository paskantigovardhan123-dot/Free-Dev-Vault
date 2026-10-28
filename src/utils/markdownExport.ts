import { Tool, CATEGORIES } from '../data/tools';

export interface RepoConfig {
  repoName: string;
  githubUsername: string;
  repoDescription: string;
  demoUrl?: string;
}

/**
 * Generates a complete, beautiful, GitHub-trending-ready README.md
 */
export function generateReadmeMarkdown(tools: Tool[], config: RepoConfig): string {
  const {
    repoName = 'quick-dev-tools',
    githubUsername = 'yourusername',
    repoDescription = 'A curated directory of 100+ free development tools that developers actually use.',
    demoUrl = 'https://quick-dev-tools.vercel.app',
  } = config;

  // Group tools by category
  const categoriesInOrder = CATEGORIES.filter((c) => c !== 'All');

  const tocLinks = categoriesInOrder
    .map((cat) => {
      const slug = cat
        .toLowerCase()
        .replace(/&/g, '')
        .replace(/\s+/g, '-')
        .replace(/[^\w-]/g, '');
      const count = tools.filter((t) => t.category === cat).length;
      return `- [${cat} (${count})](#${slug})`;
    })
    .join('\n');

  let markdown = `# ⚡ ${repoName}

> ${repoDescription}

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![GitHub stars](https://img.shields.io/github/stars/${githubUsername}/${repoName}?style=social)](https://github.com/${githubUsername}/${repoName})
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)
[![Awesome](https://awesome.re/badge.svg)](https://awesome.re)
[![Live Demo](https://img.shields.io/badge/demo-online-success)](${demoUrl})

🌐 **[Try the Interactive Searchable Web App &rarr;](${demoUrl})**

---

## 📑 Table of Contents
${tocLinks}
- [🤝 How to Contribute](#how-to-contribute)
- [⭐ Star History](#star-history)
- [📜 License](#license)

---
`;

  // Render each category
  for (const cat of categoriesInOrder) {
    const catTools = tools.filter((t) => t.category === cat);
    if (catTools.length === 0) continue;

    markdown += `\n## ${cat}\n\n`;
    markdown += `| Tool | Description | Pricing / License | Rating |\n`;
    markdown += `| :--- | :--- | :--- | :---: |\n`;

    for (const tool of catTools) {
      const popBadge = tool.isPopular ? ' ⭐' : '';
      const osBadge = tool.isOpenSource ? ' 🟢 [OS]' : '';
      const nameCol = `**[${tool.name}](${tool.url})**${popBadge}${osBadge}`;
      const descCol = tool.description.replace(/\|/g, '\\|');
      const pricingCol = `\`${tool.pricing}\``;
      const ratingCol = '⭐'.repeat(tool.rating);

      markdown += `| ${nameCol} | ${descCol} | ${pricingCol} | ${ratingCol} |\n`;
    }
  }

  markdown += `\n---

## 🤝 How to Contribute

We welcome additions from the developer community! Follow these steps to submit a tool:

1. **Fork** this repository.
2. Add your tool entry to the appropriate category table above, keeping alphabetical order.
3. Add tags and verify that the tool has a **free tier** or is **open source**.
4. Submit a **Pull Request** with the title \`Add [Tool Name]\`.

See our full guide in [CONTRIBUTING.md](CONTRIBUTING.md).

---

## ⭐ Star History

If you found this list helpful, please consider giving it a **Star ⭐** to help other developers discover it!

[![Star History Chart](https://api.star-history.com/svg?repos=${githubUsername}/${repoName}&type=Date)](https://star-history.com/#${githubUsername}/${repoName}&Date)

---

## 📜 License

Distributed under the **MIT License**. See [LICENSE](LICENSE) for more information.
`;

  return markdown;
}

/**
 * Generates CONTRIBUTING.md
 */
export function generateContributingMarkdown(config: RepoConfig): string {
  return `# Contributing to ${config.repoName}

First off, thank you for considering contributing to **${config.repoName}**! 🙌

### Inclusion Criteria
To keep this directory high quality, every suggested tool should meet:
1. **Free Access**: Must have a genuinely usable Free Tier, Free Forever plan, or be Free & Open Source.
2. **Active**: The project or service must be actively maintained.
3. **No Affiliates**: Direct URLs only — no affiliate tracking links or referral codes.

### Pull Request Process
1. Fork the repo and create your branch from \`main\`.
2. Edit \`README.md\` or \`src/data/tools.ts\`.
3. Ensure formatting and links are valid.
4. Open a Pull Request with a short explanation of why the tool is valuable.

Thank you for helping fellow developers! 🚀
`;
}

/**
 * Generates MIT LICENSE
 */
export function generateLicenseMarkdown(config: RepoConfig): string {
  const year = new Date().getFullYear();
  return `MIT License

Copyright (c) ${year} ${config.githubUsername}

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
`;
}
