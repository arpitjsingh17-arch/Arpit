import React, { useState } from 'react';
import { Search, ShieldCheck, BookOpen, Table, ExternalLink, Menu, X } from 'lucide-react';

interface HeaderProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  onToggleSeoInspector: () => void;
  isSeoInspectorOpen: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  currentPath,
  onNavigate,
  onToggleSeoInspector,
  isSeoInspectorOpen
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLinkClick = (path: string, e: React.MouseEvent) => {
    e.preventDefault();
    onNavigate(path);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="/"
            onClick={(e) => handleLinkClick('/', e)}
            className="flex items-center gap-2.5 whitespace-nowrap shrink-0 group"
            title="FC Bayern Munich Hub Homepage"
          >
            <div className="w-8 h-8 rounded-full bg-[#DC052D] flex items-center justify-center text-white font-bold text-xs tracking-wider shadow-sm group-hover:scale-105 transition-transform">
              FCB
            </div>
            <span className="font-display font-extrabold text-lg sm:text-xl tracking-tight text-slate-900 group-hover:text-[#DC052D] transition-colors">
              FC Bayern <span className="text-[#DC052D]">Munich</span>
            </span>
          </a>

          {/* Zone 2: 4–5 clean single-line text navigation links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
            <a
              href="/"
              onClick={(e) => handleLinkClick('/', e)}
              className={`hover:text-[#DC052D] transition-colors whitespace-nowrap shrink-0 ${
                currentPath === '/' ? 'text-[#DC052D] font-semibold' : ''
              }`}
            >
              All Articles
            </a>
            <a
              href="/articles/allianz-arena-matchday-guide-munich"
              onClick={(e) => handleLinkClick('/articles/allianz-arena-matchday-guide-munich', e)}
              className={`hover:text-[#DC052D] transition-colors whitespace-nowrap shrink-0 ${
                currentPath === '/articles/allianz-arena-matchday-guide-munich' ? 'text-[#DC052D] font-semibold' : ''
              }`}
            >
              Matchday Guide
            </a>
            <a
              href="/articles/mia-san-mia-bayern-munich-philosophy"
              onClick={(e) => handleLinkClick('/articles/mia-san-mia-bayern-munich-philosophy', e)}
              className={`hover:text-[#DC052D] transition-colors whitespace-nowrap shrink-0 ${
                currentPath === '/articles/mia-san-mia-bayern-munich-philosophy' ? 'text-[#DC052D] font-semibold' : ''
              }`}
            >
              Mia San Mia
            </a>
            <a
              href="/articles/bayern-munich-tactical-system-pressing-formation"
              onClick={(e) => handleLinkClick('/articles/bayern-munich-tactical-system-pressing-formation', e)}
              className={`hover:text-[#DC052D] transition-colors whitespace-nowrap shrink-0 ${
                currentPath === '/articles/bayern-munich-tactical-system-pressing-formation' ? 'text-[#DC052D] font-semibold' : ''
              }`}
            >
              Tactics
            </a>
            <a
              href="/seo-keyword-research"
              onClick={(e) => handleLinkClick('/seo-keyword-research', e)}
              className={`hover:text-[#DC052D] transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                currentPath === '/seo-keyword-research' ? 'text-[#DC052D] font-semibold' : ''
              }`}
            >
              <Table className="w-3.5 h-3.5" />
              SEO Keyword Table
            </a>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onToggleSeoInspector}
              className={`flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                isSeoInspectorOpen
                  ? 'bg-[#DC052D] text-white shadow-sm'
                  : 'bg-slate-100 text-slate-800 hover:bg-slate-200 border border-slate-300/80'
              }`}
              title="Audit Title, Meta Descriptions, and Keywords on this page"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>{isSeoInspectorOpen ? 'Hide SEO Audit' : 'Audit On-Page SEO'}</span>
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-5 space-y-2">
          <a
            href="/"
            onClick={(e) => handleLinkClick('/', e)}
            className="block py-2 text-sm font-medium text-slate-700 hover:text-[#DC052D]"
          >
            All Articles (10 Long Studies)
          </a>
          <a
            href="/articles/allianz-arena-matchday-guide-munich"
            onClick={(e) => handleLinkClick('/articles/allianz-arena-matchday-guide-munich', e)}
            className="block py-2 text-sm font-medium text-slate-700 hover:text-[#DC052D]"
          >
            Allianz Arena Matchday Guide
          </a>
          <a
            href="/articles/mia-san-mia-bayern-munich-philosophy"
            onClick={(e) => handleLinkClick('/articles/mia-san-mia-bayern-munich-philosophy', e)}
            className="block py-2 text-sm font-medium text-slate-700 hover:text-[#DC052D]"
          >
            Mia San Mia Club Culture
          </a>
          <a
            href="/articles/bayern-munich-tactical-system-pressing-formation"
            onClick={(e) => handleLinkClick('/articles/bayern-munich-tactical-system-pressing-formation', e)}
            className="block py-2 text-sm font-medium text-slate-700 hover:text-[#DC052D]"
          >
            Tactical Analysis & Formations
          </a>
          <a
            href="/seo-keyword-research"
            onClick={(e) => handleLinkClick('/seo-keyword-research', e)}
            className="block py-2 text-sm font-medium text-[#DC052D] font-semibold"
          >
            Keyword Research Table & Assignment Strategy
          </a>
        </div>
      )}
    </header>
  );
};
