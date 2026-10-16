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
import { Footer } from './components/Footer';

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

  // Update page title, meta description, canonical link, and og:url on EVERY page change behind the scenes
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
    if (activeArticle) {
      document.title = activeArticle.seoTitle;
      const meta = document.querySelector('meta[name="description"]');
      if (meta) {
        meta.setAttribute('content', activeArticle.metaDescription);
      }
    } else {
      document.title =
        'FC Bayern Munich Editorial & Matchday Hub | Mia San Mia Analysis & News';
      const meta = document.querySelector('meta[name="description"]');
      if (meta) {
        meta.setAttribute(
          'content',
          'Comprehensive FC Bayern Munich editorial platform featuring 10 in-depth articles, Champions League history, Allianz Arena matchday guides, and squad tactics.'
        );
      }
    }
  }, [activeArticle, currentPath]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
      {/* Top Bar Header */}
      <Header
        currentPath={currentPath}
        onNavigate={navigateTo}
      />

      {/* Main Content Areas */}
      <div className="flex-1">
        {/* VIEW 1: Active Article View */}
        {activeArticle ? (
          <ArticleView
            article={activeArticle}
            onNavigate={navigateTo}
            onSelectArticle={(slug) => navigateTo(`/articles/${slug}`)}
          />
        ) : (
          /* VIEW 2: Main Editorial Archive & Homepage */
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

            {/* Articles Showcase */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 tracking-tight">
                    In-Depth FC Bayern Munich Analysis & Guides
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    Explore comprehensive tactical breakdowns, historical retrospectives, matchday guides, and player profiles.
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

      {/* Footer */}
      <Footer
        onNavigate={navigateTo}
        onSelectArticle={(slug) => navigateTo(`/articles/${slug}`)}
      />
    </div>
  );
}
