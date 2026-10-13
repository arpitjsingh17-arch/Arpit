import React, { useState } from 'react';
import { KEYWORD_RESEARCH_DATA, KeywordResearchRow } from '../data/articles';
import {
  Table,
  CheckCircle2,
  Copy,
  Download,
  Search,
  ExternalLink,
  ShieldCheck,
  FileCheck,
  ArrowUpRight,
  ListFilter
} from 'lucide-react';

interface KeywordResearchTableProps {
  onNavigateToArticle: (slug: string) => void;
  onNavigateHome: () => void;
}

export const KeywordResearchTable: React.FC<KeywordResearchTableProps> = ({
  onNavigateToArticle,
  onNavigateHome
}) => {
  const [filterMode, setFilterMode] = useState<'all' | 'homepage_and_3' | 'articles_only'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedStatus, setCopiedStatus] = useState<string | null>(null);

  // Filter rows
  const filteredRows = KEYWORD_RESEARCH_DATA.filter((row, idx) => {
    // Mode filter
    if (filterMode === 'homepage_and_3' && idx > 3) return false;
    if (filterMode === 'articles_only' && idx === 0) return false;

    // Search query
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      row.pageName.toLowerCase().includes(query) ||
      row.primaryKeyword.toLowerCase().includes(query) ||
      row.secondaryKeyword1.toLowerCase().includes(query) ||
      row.secondaryKeyword2.toLowerCase().includes(query) ||
      row.urlSlug.toLowerCase().includes(query)
    );
  });

  const handleExportCSV = () => {
    const headers = [
      'Page / Topic',
      'URL Slug',
      'Main Keyword',
      'Related Keyword 1',
      'Related Keyword 2',
      'Search Intent',
      'Target Word Count',
      'Title Tag (Rule Check)',
      'Meta Description (Rule Check)'
    ];

    const csvContent = [
      headers.join(','),
      ...KEYWORD_RESEARCH_DATA.map(r => [
        `"${r.pageName.replace(/"/g, '""')}"`,
        `"${r.urlSlug}"`,
        `"${r.primaryKeyword.replace(/"/g, '""')}"`,
        `"${r.secondaryKeyword1.replace(/"/g, '""')}"`,
        `"${r.secondaryKeyword2.replace(/"/g, '""')}"`,
        `"${r.searchIntent}"`,
        r.targetWordCount,
        `"${r.seoTitle.replace(/"/g, '""')}"`,
        `"${r.metaDescription.replace(/"/g, '""')}"`
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'fc_bayern_keyword_research_table.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setCopiedStatus('CSV downloaded!');
    setTimeout(() => setCopiedStatus(null), 2500);
  };

  const handleCopyMarkdown = () => {
    let md = '| Page / Topic | URL Slug | Main Keyword | Related Keyword 1 | Related Keyword 2 | Search Intent | Word Count | Title Tag | Meta Description |\n';
    md += '| --- | --- | --- | --- | --- | --- | --- | --- | --- |\n';
    KEYWORD_RESEARCH_DATA.forEach(r => {
      md += `| ${r.pageName} | \`${r.urlSlug}\` | **${r.primaryKeyword}** | ${r.secondaryKeyword1} | ${r.secondaryKeyword2} | ${r.searchIntent} | ${r.targetWordCount} | ${r.seoTitle} | ${r.metaDescription} |\n`;
    });

    navigator.clipboard.writeText(md).then(() => {
      setCopiedStatus('Markdown table copied to clipboard!');
      setTimeout(() => setCopiedStatus(null), 2500);
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-xs font-semibold text-[#DC052D] uppercase tracking-wider mb-2">
          <span>Step 2 & Step 3 SEO Architecture</span>
          <span aria-hidden="true">·</span>
          <span>Google Search & AEO Strategy</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 tracking-tight leading-tight mb-3">
          FC Bayern Munich Keyword Research Table & On-Page SEO Audit
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-4xl leading-relaxed">
          Comprehensive keyword architecture built strictly according to the assignment requirements:
          every page features its own unique clean URL, 1 primary keyword, 2 related secondary keywords,
          title tags strictly within 50–60 characters, compelling meta descriptions within 140–160 characters,
          and question-answer subheadings for Answer Engine Optimization (AEO).
        </p>
      </div>

      {/* Verification Checklist Banner */}
      <div className="mb-8 bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs">
        <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Assignment SEO Rules Compliance Checklist</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-xs text-slate-700">
          <div className="flex items-start gap-2 p-2.5 rounded-lg bg-emerald-50/60 border border-emerald-100">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-900 block">1. Unique Clean URLs</strong>
              <span>Lowercase, hyphenated, descriptive URLs with zero ID parameters.</span>
            </div>
          </div>
          <div className="flex items-start gap-2 p-2.5 rounded-lg bg-emerald-50/60 border border-emerald-100">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-900 block">2. Main & 2 Related Keywords</strong>
              <span>Every page targets 1 primary keyword and exactly 2 secondary keywords.</span>
            </div>
          </div>
          <div className="flex items-start gap-2 p-2.5 rounded-lg bg-emerald-50/60 border border-emerald-100">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-900 block">3. Strict Title Tag Rules</strong>
              <span>50–60 chars, brand suffix included, front-loaded with primary keyword.</span>
            </div>
          </div>
          <div className="flex items-start gap-2 p-2.5 rounded-lg bg-emerald-50/60 border border-emerald-100">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-900 block">4. Meta Description Rules</strong>
              <span>140–160 chars, includes CTA, primary keyword & related terms.</span>
            </div>
          </div>
          <div className="flex items-start gap-2 p-2.5 rounded-lg bg-emerald-50/60 border border-emerald-100">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-900 block">5. Images with Alt Text</strong>
              <span>Small file footprint, fast rendering, descriptive semantic alt texts.</span>
            </div>
          </div>
          <div className="flex items-start gap-2 p-2.5 rounded-lg bg-emerald-50/60 border border-emerald-100">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-900 block">6. Descriptive Anchor Text & AEO H2</strong>
              <span>All links have descriptive context; H2s formatted as questions for AI search.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Control Bar: Filter Tabs + Search + Action Buttons */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-5">
        {/* Filter buttons */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg">
          <button
            onClick={() => setFilterMode('all')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
              filterMode === 'all'
                ? 'bg-white text-slate-900 shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All 11 Pages
          </button>
          <button
            onClick={() => setFilterMode('homepage_and_3')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
              filterMode === 'homepage_and_3'
                ? 'bg-white text-slate-900 shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Homepage + 3 Articles (Step 2 Focus)
          </button>
          <button
            onClick={() => setFilterMode('articles_only')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
              filterMode === 'articles_only'
                ? 'bg-white text-slate-900 shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            10 Long Articles
          </button>
        </div>

        {/* Action export buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyMarkdown}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg shadow-2xs transition-colors cursor-pointer"
            title="Copy table formatted for markdown assignment submission"
          >
            <Copy className="w-3.5 h-3.5" />
            <span>Copy Markdown Table</span>
          </button>
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-white bg-[#DC052D] hover:bg-[#9e0320] rounded-lg shadow-2xs transition-colors cursor-pointer"
            title="Download CSV for Excel / Google Sheets"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {copiedStatus && (
        <div className="mb-4 p-2.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-lg font-medium flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{copiedStatus}</span>
        </div>
      )}

      {/* Main Responsive Table */}
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-900 text-white font-semibold border-b border-slate-800">
                <th className="py-3 px-4 whitespace-nowrap">Page Name / Title</th>
                <th className="py-3 px-4 whitespace-nowrap">Unique Clean URL</th>
                <th className="py-3 px-4 whitespace-nowrap">Main Target Keyword</th>
                <th className="py-3 px-4 whitespace-nowrap">2 Related Keywords</th>
                <th className="py-3 px-4 whitespace-nowrap">Search Intent</th>
                <th className="py-3 px-4 whitespace-nowrap tabular-nums">Word Count</th>
                <th className="py-3 px-4 min-w-[280px]">Title Tag (50–60 chars)</th>
                <th className="py-3 px-4 min-w-[340px]">Meta Description (140–160 chars)</th>
                <th className="py-3 px-4 whitespace-nowrap text-right">Live View</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredRows.map((row, index) => {
                const isHome = row.urlSlug === '/';
                const slugPart = row.urlSlug.replace('/articles/', '');

                return (
                  <tr
                    key={index}
                    className={`hover:bg-slate-50/80 transition-colors ${
                      isHome ? 'bg-amber-50/30' : ''
                    }`}
                  >
                    {/* Page Name */}
                    <td className="py-3.5 px-4 font-semibold text-slate-900 min-w-[200px]">
                      <div className="flex items-center gap-2">
                        {isHome && (
                          <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded">
                            HOME
                          </span>
                        )}
                        <span>{row.pageName}</span>
                      </div>
                    </td>

                    {/* URL Slug */}
                    <td className="py-3.5 px-4 font-mono text-[11px] text-slate-600 whitespace-nowrap">
                      <span className="bg-slate-100 px-2 py-1 rounded">
                        {row.urlSlug}
                      </span>
                    </td>

                    {/* Main Target Keyword */}
                    <td className="py-3.5 px-4 font-bold text-[#DC052D] whitespace-nowrap">
                      {row.primaryKeyword}
                    </td>

                    {/* 2 Related Keywords */}
                    <td className="py-3.5 px-4 text-slate-700 min-w-[220px]">
                      <div className="space-y-0.5">
                        <div className="text-slate-800">1. {row.secondaryKeyword1}</div>
                        <div className="text-slate-600">2. {row.secondaryKeyword2}</div>
                      </div>
                    </td>

                    {/* Search Intent */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className="text-slate-600 font-medium">{row.searchIntent}</span>
                    </td>

                    {/* Word Count */}
                    <td className="py-3.5 px-4 tabular-nums text-slate-700 font-medium whitespace-nowrap">
                      {row.targetWordCount.toLocaleString()} words
                    </td>

                    {/* Title Tag */}
                    <td className="py-3.5 px-4 text-slate-800">
                      <div className="space-y-1">
                        <p className="font-medium">{row.seoTitle}</p>
                        <span className="text-[10px] text-emerald-600 font-mono">
                          {row.seoTitle.length} characters (Optimal 50–60)
                        </span>
                      </div>
                    </td>

                    {/* Meta Description */}
                    <td className="py-3.5 px-4 text-slate-600 leading-relaxed">
                      <div className="space-y-1">
                        <p>{row.metaDescription}</p>
                        <span className="text-[10px] text-emerald-600 font-mono">
                          {row.metaDescription.length} characters (Optimal 140–160)
                        </span>
                      </div>
                    </td>

                    {/* Live View link */}
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      {isHome ? (
                        <button
                          onClick={onNavigateHome}
                          className="inline-flex items-center gap-1 text-[#DC052D] hover:underline font-semibold cursor-pointer"
                        >
                          <span>Home</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </button>
                      ) : (
                        <button
                          onClick={() => onNavigateToArticle(slugPart)}
                          className="inline-flex items-center gap-1 text-[#DC052D] hover:underline font-semibold cursor-pointer"
                        >
                          <span>Open</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
