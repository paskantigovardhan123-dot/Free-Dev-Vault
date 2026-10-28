import { Tool } from '../data/tools';

export interface FilterOptions {
  query: string;
  category: string;
  filterTag?: string; // e.g. "popular", "open-source", "bookmarked", "all"
  bookmarkedIds?: number[];
  sortBy?: 'name' | 'rating' | 'popular';
}

/**
 * Pure function to filter tools based on search query, category, and tags
 */
export function filterTools(tools: Tool[], options: FilterOptions): Tool[] {
  const { query, category, filterTag = 'all', bookmarkedIds = [], sortBy = 'popular' } = options;
  const cleanQuery = query.trim().toLowerCase();

  const results = tools.filter((tool) => {
    // 1. Category check
    if (category !== 'All' && tool.category !== category) {
      return false;
    }

    // 2. Special filter tag
    if (filterTag === 'popular' && !tool.isPopular) {
      return false;
    }
    if (filterTag === 'open-source' && !tool.isOpenSource) {
      return false;
    }
    if (filterTag === 'bookmarked' && !bookmarkedIds.includes(tool.id)) {
      return false;
    }

    // 3. Search query check
    if (cleanQuery) {
      const matchName = tool.name.toLowerCase().includes(cleanQuery);
      const matchDesc = tool.description.toLowerCase().includes(cleanQuery);
      const matchCategory = tool.category.toLowerCase().includes(cleanQuery);
      const matchTags = tool.tags.some((tag) => tag.toLowerCase().includes(cleanQuery));
      const matchAuthor = tool.authorOrOrg ? tool.authorOrOrg.toLowerCase().includes(cleanQuery) : false;

      if (!matchName && !matchDesc && !matchCategory && !matchTags && !matchAuthor) {
        return false;
      }
    }

    return true;
  });

  // Sort results
  return results.sort((a, b) => {
    if (sortBy === 'rating') {
      return b.rating - a.rating;
    }
    if (sortBy === 'name') {
      return a.name.localeCompare(b.name);
    }
    // 'popular' default: popular first, then higher rating
    if (a.isPopular && !b.isPopular) return -1;
    if (!a.isPopular && b.isPopular) return 1;
    return b.rating - a.rating;
  });
}

/**
 * Calculates category tool counts
 */
export function getCategoryCounts(tools: Tool[]): Record<string, number> {
  const counts: Record<string, number> = { All: tools.length };
  for (const tool of tools) {
    counts[tool.category] = (counts[tool.category] || 0) + 1;
  }
  return counts;
}

/**
 * Calculates a repository's "Star Readiness Score" (0 to 100)
 * based on vital GitHub star-magnet criteria.
 */
export interface RepoAuditMetrics {
  hasBadges: boolean;
  hasTOC: boolean;
  hasContributingGuide: boolean;
  hasLicense: boolean;
  toolsCount: number;
  hasSearchDemo: boolean;
  hasSocialSharingCard: boolean;
  hasPrTemplate: boolean;
}

export interface AuditResult {
  score: number;
  grade: 'A+' | 'A' | 'B' | 'C';
  passedCount: number;
  totalChecks: number;
  recommendations: string[];
}

export function calculateStarScore(metrics: RepoAuditMetrics): AuditResult {
  let score = 0;
  const recommendations: string[] = [];
  let passedCount = 0;
  const totalChecks = 7;

  if (metrics.toolsCount >= 50) {
    score += 25;
    passedCount++;
  } else {
    recommendations.push(`Add more tools: Aim for 50+ tools (currently ${metrics.toolsCount}).`);
  }

  if (metrics.hasBadges) {
    score += 15;
    passedCount++;
  } else {
    recommendations.push("Add GitHub Shields badges (License, Stars, PRs welcome).");
  }

  if (metrics.hasTOC) {
    score += 15;
    passedCount++;
  } else {
    recommendations.push("Include a clear Table of Contents with quick anchor links.");
  }

  if (metrics.hasContributingGuide) {
    score += 15;
    passedCount++;
  } else {
    recommendations.push("Include a CONTRIBUTING.md so developers can easily submit PRs.");
  }

  if (metrics.hasLicense) {
    score += 10;
    passedCount++;
  } else {
    recommendations.push("Specify an open source license (MIT recommended).");
  }

  if (metrics.hasSearchDemo) {
    score += 10;
    passedCount++;
  } else {
    recommendations.push("Deploy a live web demo (Vercel / Cloudflare) and link it at the top.");
  }

  if (metrics.hasSocialSharingCard) {
    score += 10;
    passedCount++;
  } else {
    recommendations.push("Include an OpenGraph social preview image in repository settings.");
  }

  let grade: 'A+' | 'A' | 'B' | 'C' = 'C';
  if (score >= 90) grade = 'A+';
  else if (score >= 80) grade = 'A';
  else if (score >= 60) grade = 'B';

  return {
    score,
    grade,
    passedCount,
    totalChecks,
    recommendations,
  };
}
