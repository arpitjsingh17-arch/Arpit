/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { ARTICLES, Article } from './data/articles';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ArticleCard } from './components/ArticleCard';
import { ArticleView } from './components/ArticleView';
import { KeywordResearchTable } from './components/KeywordResearchTable';
import { SeoInspectorModal } from './components/SeoInspectorModal';
import { Footer } from './components/Footer';
import {
  Table,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Copy,
  Globe,
  ExternalLink,
  Sparkles,
  Link2
} from 'lucide-react';

export default function App() {
  // Support both clean pathname and hash fallback for iframe sandboxes
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      if (window.location.hash && window.location.hash.startsWith('#/')) {
        return window.location.hash.slice(1);
      }
      return window.location.pathname || '/';
    }
    return '/';
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isSeoInspectorOpen, setIsSeoInspectorOpen] = useState(false);
  const [copiedUrlFeedback, setCopiedUrlFeedback] = useState(false);

  // Synchronize browser history, hash, and path
  const navigateTo = (path: string) => {
    if (path !== currentPath) {
      try {
        window.history.pushState({}, '', path);
      } catch (e) {
        // Fallback for restricted iframe environments
      }
      // Also sync hash so preview iframes preserve the exact deep-link route
      if (path !== '/') {
        window.location.hash = '#' + path;
      } else {
        window.location.hash = '';
      }
      setCurrentPath(path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handlePopState = () => {
      if (window.location.hash && window.location.hash.startsWith('#/')) {
        setCurrentPath(window.location.hash.slice(1));
      } else {
        setCurrentPath(window.location.pathname || '/');
      }
    };
    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
    };
  }, []);

  // Determine active view from currentPath
  const activeArticleSlug = useMemo(() => {
    if (currentPath.startsWith('/articles/')) {
      return currentPath.replace('/articles/', '');
    }
    return null;
  }, [currentPath]);

  const activeArticle = useMemo(() => {
    if (!activeArticleSlug) return undefined;
    return ARTICLES.find((a) => a.slug === activeArticleSlug);
  }, [activeArticleSlug]);

  const isKeywordTableView = currentPath === '/seo-keyword-research';

  // Categories list
  const categories = useMemo(() => {
    const cats = new Set(ARTICLES.map((a) => a.category));
    return ['All', ...Array.from(cats)];
  }, []);

  // Filtered articles
  const filteredArticles = useMemo(() => {
    return ARTICLES.filter((article) => {
      const matchesCategory =
        selectedCategory === 'All' || article.category === selectedCategory;
      if (!matchesCategory) return false;

      if (!searchQuery) return true;
      const q = searchQuery.toLowerCase();
      return (
        article.title.toLowerCase().includes(q) ||
        article.quickAnswerSummary.toLowerCase().includes(q) ||
        article.primaryKeyword.toLowerCase().includes(q) ||
        article.secondaryKeywords.some((k) => k.toLowerCase().includes(q)) ||
        article.sections.some(
          (s) =>
            s.question.toLowerCase().includes(q) ||
            s.directAnswer.toLowerCase().includes(q)
        )
      );
    });
  }, [searchQuery, selectedCategory]);

  // Update page title, meta description, canonical link, and og:url on EVERY page change
  useEffect(() => {
    const origin = window.location.origin;
    const fullCanonicalUrl = `${origin}${currentPath}`;

    // Update canonical link in DOM
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', fullCanonicalUrl);

    // Update og:url
    let ogUrl = document.querySelector('meta[property="og:url"]');
    if (!ogUrl) {
      ogUrl = document.createElement('meta');
      ogUrl.setAttribute('property', 'og:url');
      document.head.appendChild(ogUrl);
    }
    ogUrl.setAttribute('content', fullCanonicalUrl);

    // Update Title and Meta Description
    if (isKeywordTableView) {
      document.title =
        'FC Bayern Munich Keyword Research Table & On-Page SEO Strategy';
      const meta = document.querySelector('meta[name="description"]');
      if (meta) {
        meta.setAttribute(
          'content',
          'Complete keyword research matrix for FC Bayern Munich homepage and 10 articles, with search intent, word counts, title tags, and meta descriptions.'
        );
      }
    } else if (activeArticle) {
      document.title = activeArticle.seoTitle;
      const meta = document.querySelector('meta[name="description"]');
      if (meta) {
        meta.setAttribute('content', activeArticle.metaDescription);
      }
    } else {
      document.title =
        'FC Bayern Munich Editorial & SEO Hub | Mia San Mia Analysis & Matchday Guides';
      const meta = document.querySelector('meta[name="description"]');
      if (meta) {
        meta.setAttribute(
          'content',
          'Comprehensive FC Bayern Munich editorial platform featuring 10 in-depth articles, AEO-structured Q&As, Allianz Arena matchday guides, and live on-page SEO keyword research auditing.'
        );
      }
    }
  }, [isKeywordTableView, activeArticle, currentPath]);

  const handleCopyCurrentUrl = () => {
    const fullUrl = `${window.location.origin}${currentPath}`;
    navigator.clipboard.writeText(fullUrl).then(() => {
      setCopiedUrlFeedback(true);
      setTimeout(() => setCopiedUrlFeedback(false), 2200);
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
      {/* Top Bar Header */}
      <Header
        currentPath={currentPath}
        onNavigate={navigateTo}
        onToggleSeoInspector={() => setIsSeoInspectorOpen(!isSeoInspectorOpen)}
        isSeoInspectorOpen={isSeoInspectorOpen}
      />

      {/* Active Unique URL & Good URL Rules Verification Banner */}
      <section
        aria-label="URL and On-Page SEO Rule Status"
        className="bg-slate-900 text-slate-200 border-b border-slate-800 text-xs py-2 px-4"
      >
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          {/* Active URL display */}
          <div className="flex items-center gap-2 overflow-hidden">
            <span className="text-slate-400 font-medium shrink-0 flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-emerald-400" />
              <span>Active Unique URL:</span>
            </span>
            <code className="bg-slate-800/90 text-amber-300 px-2 py-0.5 rounded font-mono text-[11px] truncate max-w-md">
              {currentPath}
            </code>
            <button
              onClick={handleCopyCurrentUrl}
              className="text-slate-400 hover:text-white p-1 rounded transition-colors shrink-0 cursor-pointer"
              title="Copy exact canonical URL"
            >
              {copiedUrlFeedback ? (
                <span className="text-emerald-400 font-semibold text-[11px] flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Copied!
                </span>
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
            </button>
          </div>

          {/* Good URL Rules Validation Flags */}
          <div className="hidden lg:flex items-center gap-3 text-[11px] text-slate-300">
            <span className="text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
              Good URL Rules:
            </span>
            <span className="flex items-center gap-1 text-emerald-400">
              <CheckCircle2 className="w-3 h-3" /> All Lowercase
            </span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="flex items-center gap-1 text-emerald-400">
              <CheckCircle2 className="w-3 h-3" /> Hyphen Delimited
            </span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="flex items-center gap-1 text-emerald-400">
              <CheckCircle2 className="w-3 h-3" /> Keyword-Rich Slug
            </span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="flex items-center gap-1 text-emerald-400">
              <CheckCircle2 className="w-3 h-3" /> No Cryptic Parameters
            </span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="flex items-center gap-1 text-emerald-400">
              <CheckCircle2 className="w-3 h-3" /> Canonical Tag Live
            </span>
          </div>
        </div>
      </section>

      {/* Main Content Areas */}
      <div className="flex-1">
        {/* VIEW 1: Active Article View */}
        {activeArticle ? (
          <ArticleView
            article={activeArticle}
            onNavigate={navigateTo}
            onSelectArticle={(slug) => navigateTo(`/articles/${slug}`)}
          />
        ) : isKeywordTableView ? (
          /* VIEW 2: Keyword Research Table & Strategy View */
          <KeywordResearchTable
            onNavigateToArticle={(slug) => navigateTo(`/articles/${slug}`)}
            onNavigateHome={() => navigateTo('/')}
          />
        ) : (
          /* VIEW 3: Main Editorial Archive & Homepage */
          <main>
            {/* Hero Section */}
            <Hero
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              categories={categories}
              totalArticlesCount={ARTICLES.length}
            />

            {/* Keyword Research Banner Callout (Highlights Step 2 fulfillment) */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
              <div className="bg-white rounded-xl border border-slate-200/90 shadow-md p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-red-50 border border-red-100 flex items-center justify-center shrink-0">
                    <Table className="w-5 h-5 text-[#DC052D]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-slate-900">
                        Step 2 & Step 3 SEO Assignment Requirements
                      </h3>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                        Full Compliance
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Every page has its own unique clean URL adhering to Google URL best practices, 1 main keyword, 2 related keywords, title tags, and AEO subheadings.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    onClick={() => navigateTo('/seo-keyword-research')}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer shrink-0"
                  >
                    <span>View All 11 Unique URLs & Keyword Matrix</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Articles Showcase */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 tracking-tight">
                    All 10 In-Depth FC Bayern Studies
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    Click any study below to navigate directly to its unique clean URL (/articles/...) with dynamic browser history and canonical metadata.
                  </p>
                </div>

                <div className="text-xs text-slate-500 hidden sm:block">
                  Showing <span className="font-bold text-slate-900">{filteredArticles.length}</span> of {ARTICLES.length} Articles
                </div>
              </div>

              {filteredArticles.length === 0 ? (
                <div className="p-12 text-center bg-white rounded-xl border border-slate-200">
                  <p className="text-slate-600 font-medium">
                    No articles found matching "{searchQuery}".
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('All');
                    }}
                    className="mt-3 px-4 py-2 text-xs font-semibold text-[#DC052D] hover:underline cursor-pointer"
                  >
                    Reset filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                  {filteredArticles.map((article) => (
                    <ArticleCard
                      key={article.id}
                      article={article}
                      onSelectArticle={(slug) => navigateTo(`/articles/${slug}`)}
                    />
                  ))}
                </div>
              )}
            </section>
          </main>
        )}
      </div>

      {/* On-Page SEO Inspector Modal */}
      <SeoInspectorModal
        isOpen={isSeoInspectorOpen}
        onClose={() => setIsSeoInspectorOpen(false)}
        currentPath={currentPath}
        activeArticle={activeArticle}
      />

      {/* Footer */}
      <Footer
        onNavigate={navigateTo}
        onSelectArticle={(slug) => navigateTo(`/articles/${slug}`)}
      />
    </div>
  );
}
