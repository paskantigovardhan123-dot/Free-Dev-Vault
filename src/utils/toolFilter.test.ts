import test from 'node:test';
import assert from 'node:assert/strict';
import { filterTools, getCategoryCounts, calculateStarScore } from './toolFilter';
import { Tool } from '../data/tools';

const mockTools: Tool[] = [
  {
    id: 1,
    name: 'Postman',
    description: 'API testing platform',
    category: 'APIs & Networking',
    url: 'https://postman.com',
    rating: 5,
    tags: ['api', 'rest'],
    isPopular: true,
    pricing: 'Generous Free Tier',
  },
  {
    id: 2,
    name: 'Hoppscotch',
    description: 'Open-source API client',
    category: 'APIs & Networking',
    url: 'https://hoppscotch.io',
    rating: 4,
    tags: ['api', 'open-source'],
    isOpenSource: true,
    pricing: 'Free & Open Source',
  },
  {
    id: 3,
    name: 'VS Code',
    description: 'Code editor from Microsoft',
    category: 'Code Editors & IDEs',
    url: 'https://code.visualstudio.com',
    rating: 5,
    tags: ['editor', 'microsoft'],
    isPopular: true,
    pricing: 'Free & Open Source',
  },
];

test('filterTools filters by category correctly', () => {
  const result = filterTools(mockTools, {
    query: '',
    category: 'Code Editors & IDEs',
  });
  assert.equal(result.length, 1);
  assert.equal(result[0].name, 'VS Code');
});

test('filterTools matches query in name or tags', () => {
  const queryResult = filterTools(mockTools, {
    query: 'open-source',
    category: 'All',
  });
  assert.equal(queryResult.length, 1);
  assert.equal(queryResult[0].name, 'Hoppscotch');
});

test('filterTools handles popular and open-source filters', () => {
  const popular = filterTools(mockTools, {
    query: '',
    category: 'All',
    filterTag: 'popular',
  });
  assert.equal(popular.length, 2);

  const openSource = filterTools(mockTools, {
    query: '',
    category: 'All',
    filterTag: 'open-source',
  });
  assert.equal(openSource.length, 1);
  assert.equal(openSource[0].name, 'Hoppscotch');
});

test('getCategoryCounts counts accurately', () => {
  const counts = getCategoryCounts(mockTools);
  assert.equal(counts['All'], 3);
  assert.equal(counts['APIs & Networking'], 2);
  assert.equal(counts['Code Editors & IDEs'], 1);
});

test('calculateStarScore computes score and grade correctly', () => {
  const fullScore = calculateStarScore({
    hasBadges: true,
    hasTOC: true,
    hasContributingGuide: true,
    hasLicense: true,
    toolsCount: 100,
    hasSearchDemo: true,
    hasSocialSharingCard: true,
    hasPrTemplate: true,
  });
  assert.equal(fullScore.score, 100);
  assert.equal(fullScore.grade, 'A+');
  assert.equal(fullScore.recommendations.length, 0);

  const partialScore = calculateStarScore({
    hasBadges: false,
    hasTOC: false,
    hasContributingGuide: false,
    hasLicense: true,
    toolsCount: 20,
    hasSearchDemo: false,
    hasSocialSharingCard: false,
    hasPrTemplate: false,
  });
  assert.equal(partialScore.score, 10);
  assert.equal(partialScore.grade, 'C');
  assert.ok(partialScore.recommendations.length > 0);
});
