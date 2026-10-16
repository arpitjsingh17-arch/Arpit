import React, { useEffect, useState } from 'react';
import { Article } from '../data/articles';
import {
  ChevronLeft,
  Share2,
  CheckCircle2,
  HelpCircle,
  FileText,
  ArrowRight,
  Sparkles,
  ChevronDown
} from 'lucide-react';
import { FALLBACK_IMAGE } from '../assets/images';

interface ArticleViewProps {
  article: Article;
  onNavigate: (path: string) => void;
  onSelectArticle: (slug: string) => void;
}

export const ArticleView: React.FC<ArticleViewProps> = ({
  article,
  onNavigate,
  onSelectArticle
}) => {
  const [activeSectionId, setActiveSectionId] = useState<string>(article.sections[0]?.id || '');
  const [copiedLink, setCopiedLink] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Sync document title and meta description dynamically
  useEffect(() => {
    document.title = article.seoTitle;
    
    // Update meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', article.metaDescription);
    }

    // Scroll to top upon loading article
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Inject FAQ Schema.org structured data dynamically
    const faqSchemaScript = document.createElement('script');
    faqSchemaScript.type = 'application/ld+json';
    faqSchemaScript.id = 'article-faq-schema';
    faqSchemaScript.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': article.faqs.map(faq => ({
        '@type': 'Question',
        'name': faq.question,
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': faq.answer
        }
      }))
    });
    
    // Remove previous faq script if any
    const existing = document.getElementById('article-faq-schema');
    if (existing) existing.remove();
    document.head.appendChild(faqSchemaScript);

    return () => {
      const el = document.getElementById('article-faq-schema');
      if (el) el.remove();
    };
  }, [article]);

  const handleCopyShareUrl = () => {
    const fullUrl = window.location.href;
    navigator.clipboard.writeText(fullUrl).then(() => {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    });
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Top Breadcrumb Navigation */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <nav className="flex items-center gap-2 text-xs text-slate-500 overflow-x-auto whitespace-nowrap">
            <a
              href="/"
              onClick={(e) => { e.preventDefault(); onNavigate('/'); }}
              className="hover:text-[#DC052D] transition-colors"
            >
              FC Bayern Munich Hub
            </a>
            <span aria-hidden="true">/</span>
            <span className="text-slate-400">{article.category}</span>
            <span aria-hidden="true">/</span>
            <span className="text-slate-800 font-medium truncate max-w-xs">{article.title}</span>
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyShareUrl}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors cursor-pointer"
              title="Copy clean canonical URL to clipboard"
            >
              {copiedLink ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copiedLink ? 'URL Copied!' : 'Share Article URL'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Article Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">

        {/* Main Article Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Article Body (8 cols) */}
          <main className="lg:col-span-8">
            <article className="bg-white rounded-xl border border-slate-200/90 p-6 sm:p-10 shadow-xs">
              {/* Category, Date, Author unboxed meta */}
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 mb-4">
                <span className="font-bold text-[#DC052D] uppercase tracking-wider">{article.category}</span>
                <span aria-hidden="true">·</span>
                <span>{article.readTime}</span>
                <span aria-hidden="true">·</span>
                <span>Published {article.publishedDate}</span>
                <span aria-hidden="true">·</span>
                <span>By {article.author.name} ({article.author.role})</span>
              </div>

              {/* H1 Main Page Title */}
              <h1 className="text-2xl sm:text-4xl font-display font-extrabold text-slate-900 tracking-tight leading-tight mb-6 text-balance">
                {article.title}
              </h1>

              {/* Key Takeaway Featured Snippet Callout */}
              <div className="p-5 mb-8 bg-slate-50 rounded-xl border border-slate-200">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                  <Sparkles className="w-4 h-4 text-[#DC052D]" />
                  <span>Key Takeaway & Direct Overview</span>
                </div>
                <p className="text-sm sm:text-base text-slate-800 leading-relaxed font-medium">
                  {article.quickAnswerSummary}
                </p>
              </div>

              {/* Primary Article Image Figure (small footprint with descriptive alt text) */}
              <figure className="mb-10">
                <div className="aspect-[16/10] overflow-hidden rounded-xl bg-slate-100 border border-slate-200">
                  <img
                    src={article.image}
                    alt={article.imageAlt}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.currentTarget;
                      target.onerror = null;
                      target.src = FALLBACK_IMAGE;
                    }}
                  />
                </div>
                <figcaption className="text-xs text-slate-500 italic mt-2.5 text-center">
                  {article.imageCaption}
                </figcaption>
              </figure>

              {/* Table of Contents for Long-Form Readability */}
              <div className="p-5 mb-10 bg-slate-50 rounded-xl border border-slate-200">
                <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#DC052D]" />
                  <span>In This Article (Table of Contents)</span>
                </h2>
                <nav className="space-y-2">
                  {article.sections.map((section, idx) => (
                    <a
                      key={section.id}
                      href={`#${section.id}`}
                      className="block text-xs sm:text-sm text-slate-700 hover:text-[#DC052D] transition-colors leading-relaxed"
                    >
                      <span className="font-mono text-slate-400 mr-2">{String(idx + 1).padStart(2, '0')}.</span>
                      {section.question}
                    </a>
                  ))}
                  <a
                    href="#frequently-asked-questions"
                    className="block text-xs sm:text-sm text-slate-700 hover:text-[#DC052D] transition-colors leading-relaxed"
                  >
                    <span className="font-mono text-slate-400 mr-2">{String(article.sections.length + 1).padStart(2, '0')}.</span>
                    Frequently Asked Questions
                  </a>
                </nav>
              </div>

              {/* Article Sections (H2 Subheadings in Question-Answer Format) */}
              <div className="space-y-12">
                {article.sections.map((section, index) => (
                  <section
                    key={section.id}
                    id={section.id}
                    className="scroll-mt-20 pt-2"
                  >
                    {/* H2 in Question Format */}
                    <h2 className="text-xl sm:text-2xl font-display font-bold text-slate-900 tracking-tight leading-snug mb-3">
                      {section.question}
                    </h2>

                    {/* Direct concise answer */}
                    <div className="p-4 mb-4 bg-red-50/60 rounded-lg border border-red-100 text-sm text-slate-900 leading-relaxed font-medium">
                      <span className="text-[#DC052D] font-bold mr-1">Direct Answer:</span>
                      {section.directAnswer}
                    </div>

                    {/* Detailed editorial analysis paragraphs */}
                    <div className="space-y-4 text-sm sm:text-base text-slate-700 leading-relaxed">
                      {section.paragraphs.map((p, pIdx) => (
                        <p key={pIdx}>
                          {p}
                        </p>
                      ))}
                    </div>

                    {/* Key takeaway if present */}
                    {section.keyTakeaway && (
                      <div className="mt-4 p-3 bg-slate-100/70 rounded-md text-xs text-slate-700 font-medium border border-slate-200">
                        <span className="font-bold text-slate-900">Key Takeaway: </span>
                        {section.keyTakeaway}
                      </div>
                    )}
                  </section>
                ))}
              </div>

              {/* Frequently Asked Questions Section */}
              <section id="frequently-asked-questions" className="scroll-mt-20 mt-14 pt-8 border-t border-slate-200">
                <div className="flex items-center gap-2 mb-4">
                  <HelpCircle className="w-5 h-5 text-[#DC052D]" />
                  <h2 className="text-xl sm:text-2xl font-display font-bold text-slate-900">
                    Frequently Asked Questions (FAQ)
                  </h2>
                </div>
                <p className="text-xs text-slate-500 mb-6">
                  Clear answers to key questions regarding this subject.
                </p>

                <div className="space-y-3">
                  {article.faqs.map((faq, index) => (
                    <div
                      key={index}
                      className="border border-slate-200 rounded-lg overflow-hidden bg-slate-50/50"
                    >
                      <button
                        onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                        className="w-full text-left p-4 flex items-center justify-between gap-4 font-semibold text-sm text-slate-900 hover:text-[#DC052D] transition-colors cursor-pointer"
                      >
                        <span>{faq.question}</span>
                        <ChevronDown className={`w-4 h-4 shrink-0 transition-transform ${openFaqIndex === index ? 'rotate-180' : ''}`} />
                      </button>

                      {openFaqIndex === index && (
                        <div className="px-4 pb-4 pt-1 text-sm text-slate-700 leading-relaxed bg-white border-t border-slate-200">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>

              {/* Internal Linking Section with Descriptive Anchor Text */}
              <section className="mt-14 pt-8 border-t border-slate-200">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">
                  Related Guides & Cross-Referenced Studies (Descriptive Anchor Links)
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {article.relatedLinks.map((link, idx) => (
                    <div
                      key={idx}
                      className="p-4 bg-slate-50 rounded-xl border border-slate-200 hover:border-slate-300 transition-colors"
                    >
                      <a
                        href={`/articles/${link.slug}`}
                        onClick={(e) => {
                          e.preventDefault();
                          onSelectArticle(link.slug);
                        }}
                        className="text-sm font-semibold text-[#DC052D] hover:underline flex items-center gap-1.5 mb-1.5"
                      >
                        <span>{link.anchorText}</span>
                        <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                      </a>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        {link.relationNote}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            </article>
          </main>

          {/* Sticky Sidebar (4 cols) */}
          <aside className="lg:col-span-4 space-y-6">
            {/* Quick Author & Factsheet */}
            <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4 pb-2 border-b border-slate-100">
                Article Information & Editorial Spec
              </h3>
              <dl className="space-y-3 text-xs">
                <div>
                  <dt className="text-slate-400 font-medium">Lead Contributor</dt>
                  <dd className="text-slate-900 font-semibold mt-0.5">{article.author.name}</dd>
                  <dd className="text-slate-500 text-[11px]">{article.author.role}</dd>
                </div>
                <div>
                  <dt className="text-slate-400 font-medium">Estimated Reading Time</dt>
                  <dd className="text-slate-900 font-semibold mt-0.5">{article.readTime} ({article.actualWordCount} words)</dd>
                </div>
                <div>
                  <dt className="text-slate-400 font-medium">Analytical Chapters</dt>
                  <dd className="text-slate-900 font-semibold mt-0.5">{article.sections.length} Chapters</dd>
                </div>
                <div>
                  <dt className="text-slate-400 font-medium">Official Slogan</dt>
                  <dd className="text-[#DC052D] font-bold mt-0.5">"Mia San Mia" (We Are Who We Are)</dd>
                </div>
              </dl>
            </div>

            {/* Quick Navigation to other Bayern articles */}
            <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4 pb-2 border-b border-slate-100">
                Explore Further Studies
              </h3>
              <div className="space-y-3">
                <a
                  href="/articles/allianz-arena-matchday-guide-munich"
                  onClick={(e) => { e.preventDefault(); onSelectArticle('allianz-arena-matchday-guide-munich'); }}
                  className="block text-xs group"
                >
                  <span className="font-semibold text-slate-800 group-hover:text-[#DC052D] transition-colors line-clamp-2">
                    Allianz Arena Matchday Guide: Tickets, Transport & Stadium Logistics
                  </span>
                  <span className="text-[11px] text-slate-400 mt-0.5 block">Matchday Operations</span>
                </a>
                <a
                  href="/articles/mia-san-mia-bayern-munich-philosophy"
                  onClick={(e) => { e.preventDefault(); onSelectArticle('mia-san-mia-bayern-munich-philosophy'); }}
                  className="block text-xs group"
                >
                  <span className="font-semibold text-slate-800 group-hover:text-[#DC052D] transition-colors line-clamp-2">
                    What Does Mia San Mia Mean? The 16 Core Principles Explained
                  </span>
                  <span className="text-[11px] text-slate-400 mt-0.5 block">Club Identity</span>
                </a>
                <a
                  href="/articles/bayern-munich-tactical-system-pressing-formation"
                  onClick={(e) => { e.preventDefault(); onSelectArticle('bayern-munich-tactical-system-pressing-formation'); }}
                  className="block text-xs group"
                >
                  <span className="font-semibold text-slate-800 group-hover:text-[#DC052D] transition-colors line-clamp-2">
                    Bayern Munich Tactical System & Formation Analysis: Pressing & Build-Up
                  </span>
                  <span className="text-[11px] text-slate-400 mt-0.5 block">Tactical Breakdown</span>
                </a>
                <a
                  href="/articles/german-50-plus-1-rule-bayern-munich-ownership"
                  onClick={(e) => { e.preventDefault(); onSelectArticle('german-50-plus-1-rule-bayern-munich-ownership'); }}
                  className="block text-xs group"
                >
                  <span className="font-semibold text-slate-800 group-hover:text-[#DC052D] transition-colors line-clamp-2">
                    How Germany's 50+1 Rule Protects Bayern Munich Fan Ownership
                  </span>
                  <span className="text-[11px] text-slate-400 mt-0.5 block">Governance & Ethics</span>
                </a>
              </div>
            </div>

            {/* Back to Hub button */}
            <button
              onClick={() => onNavigate('/')}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back to All 10 FC Bayern Articles</span>
            </button>
          </aside>
        </div>
      </div>
    </div>
  );
};
