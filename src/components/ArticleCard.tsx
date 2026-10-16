import React from 'react';
import { Article } from '../data/articles';
import { ArrowUpRight, BookOpen } from 'lucide-react';
import { FALLBACK_IMAGE } from '../assets/images';

interface ArticleCardProps {
  article: Article;
  onSelectArticle: (slug: string) => void;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ article, onSelectArticle }) => {
  const handleCardClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onSelectArticle(article.slug);
  };

  return (
    <article className="group flex flex-col bg-white rounded-xl border border-slate-200/90 overflow-hidden hover:border-slate-300 hover:shadow-md transition-all duration-200">
      {/* Article thumbnail */}
      <a
        href={`/articles/${article.slug}`}
        onClick={handleCardClick}
        className="relative block aspect-[16/10] overflow-hidden bg-slate-100"
        title={`Read full article: ${article.title}`}
      >
        <img
          src={article.image}
          alt={article.imageAlt}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            const target = e.currentTarget;
            target.onerror = null;
            target.src = FALLBACK_IMAGE;
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </a>

      {/* Content body */}
      <div className="flex flex-col flex-1 p-5">
        {/* Unboxed clean metadata (zero-pill discipline) */}
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-2.5">
          <span className="font-semibold text-[#DC052D] uppercase tracking-wider">{article.category}</span>
          <span aria-hidden="true">·</span>
          <span>{article.readTime}</span>
          <span aria-hidden="true">·</span>
          <span>{article.publishedDate}</span>
        </div>

        {/* Title */}
        <h2 className="text-lg sm:text-xl font-display font-bold text-slate-900 group-hover:text-[#DC052D] transition-colors leading-snug mb-3 text-balance">
          <a href={`/articles/${article.slug}`} onClick={handleCardClick}>
            {article.title}
          </a>
        </h2>

        {/* Excerpt */}
        <p className="text-sm text-slate-600 line-clamp-3 leading-relaxed mb-4 flex-1">
          {article.quickAnswerSummary}
        </p>

        {/* CTA with descriptive anchor text */}
        <div className="pt-2 flex items-center justify-between">
          <span className="text-xs text-slate-400 flex items-center gap-1">
            <BookOpen className="w-3.5 h-3.5" />
            {article.sections.length} Chapters
          </span>

          <a
            href={`/articles/${article.slug}`}
            onClick={handleCardClick}
            className="inline-flex items-center gap-1 text-xs font-semibold text-[#DC052D] hover:text-[#9e0320] transition-colors"
          >
            <span>Read Complete Study</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>
      </div>
    </article>
  );
};
