import React, { useState } from 'react';
import { Menu, X, ArrowUpRight, Compass } from 'lucide-react';

interface HeaderProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPath,
  onNavigate
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
            title="FC Bayern Munich Editorial Hub"
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
              href="/articles/bayern-munich-champions-league-titles-history"
              onClick={(e) => handleLinkClick('/articles/bayern-munich-champions-league-titles-history', e)}
              className={`hover:text-[#DC052D] transition-colors whitespace-nowrap shrink-0 ${
                currentPath === '/articles/bayern-munich-champions-league-titles-history' ? 'text-[#DC052D] font-semibold' : ''
              }`}
            >
              Champions League
            </a>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="/articles/allianz-arena-matchday-guide-munich"
              onClick={(e) => handleLinkClick('/articles/allianz-arena-matchday-guide-munich', e)}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-[#DC052D] hover:bg-[#9e0320] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer shadow-xs"
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Matchday Guide</span>
            </a>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 cursor-pointer"
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
            All Articles (10 Publications)
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
            href="/articles/bayern-munich-champions-league-titles-history"
            onClick={(e) => handleLinkClick('/articles/bayern-munich-champions-league-titles-history', e)}
            className="block py-2 text-sm font-medium text-slate-700 hover:text-[#DC052D]"
          >
            Champions League History & Records
          </a>
        </div>
      )}
    </header>
  );
};
