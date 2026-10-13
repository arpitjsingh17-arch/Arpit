import React from 'react';
import { Table, ShieldCheck, ArrowRight, Heart } from 'lucide-react';

interface FooterProps {
  onNavigate: (path: string) => void;
  onSelectArticle: (slug: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onSelectArticle }) => {
  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand & Motto */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-[#DC052D] flex items-center justify-center text-white font-bold text-xs">
                FCB
              </div>
              <span className="font-display font-bold text-white text-lg">
                FC Bayern München
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              "Mia San Mia" — We are who we are. An independent editorial, tactical, and historical publication dedicated to the record German champions.
            </p>
            <div className="text-xs text-slate-500 pt-1">
              Werner-Heisenberg-Allee 25, 80939 Munich, Germany
            </div>
          </div>

          {/* Quick Guides with Descriptive Anchor Text */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Matchday & Culture Guides
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="/articles/allianz-arena-matchday-guide-munich"
                  onClick={(e) => { e.preventDefault(); onSelectArticle('allianz-arena-matchday-guide-munich'); }}
                  className="hover:text-white transition-colors"
                >
                  Allianz Arena Matchday Visitor Guide
                </a>
              </li>
              <li>
                <a
                  href="/articles/mia-san-mia-bayern-munich-philosophy"
                  onClick={(e) => { e.preventDefault(); onSelectArticle('mia-san-mia-bayern-munich-philosophy'); }}
                  className="hover:text-white transition-colors"
                >
                  What Does Mia San Mia Mean?
                </a>
              </li>
              <li>
                <a
                  href="/articles/german-50-plus-1-rule-bayern-munich-ownership"
                  onClick={(e) => { e.preventDefault(); onSelectArticle('german-50-plus-1-rule-bayern-munich-ownership'); }}
                  className="hover:text-white transition-colors"
                >
                  Germany's 50+1 Fan Ownership Rule
                </a>
              </li>
              <li>
                <a
                  href="/articles/fc-bayern-campus-youth-academy-development"
                  onClick={(e) => { e.preventDefault(); onSelectArticle('fc-bayern-campus-youth-academy-development'); }}
                  className="hover:text-white transition-colors"
                >
                  Inside the FC Bayern Campus Youth Academy
                </a>
              </li>
            </ul>
          </div>

          {/* Tactical & Legends */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Tactics & European History
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="/articles/bayern-munich-champions-league-titles-history"
                  onClick={(e) => { e.preventDefault(); onSelectArticle('bayern-munich-champions-league-titles-history'); }}
                  className="hover:text-white transition-colors"
                >
                  How Many Champions League Titles Has Bayern Won?
                </a>
              </li>
              <li>
                <a
                  href="/articles/bayern-munich-tactical-system-pressing-formation"
                  onClick={(e) => { e.preventDefault(); onSelectArticle('bayern-munich-tactical-system-pressing-formation'); }}
                  className="hover:text-white transition-colors"
                >
                  Tactical System & Formation Analysis
                </a>
              </li>
              <li>
                <a
                  href="/articles/harry-kane-bayern-munich-tactical-impact-records"
                  onClick={(e) => { e.preventDefault(); onSelectArticle('harry-kane-bayern-munich-tactical-impact-records'); }}
                  className="hover:text-white transition-colors"
                >
                  Harry Kane Goals & Bundesliga Records
                </a>
              </li>
              <li>
                <a
                  href="/articles/greatest-bayern-munich-legends-history"
                  onClick={(e) => { e.preventDefault(); onSelectArticle('greatest-bayern-munich-legends-history'); }}
                  className="hover:text-white transition-colors"
                >
                  Greatest Legends: Beckenbauer, Müller & Kahn
                </a>
              </li>
            </ul>
          </div>

          {/* Assignment Step 2 & 3 Compliance Hub */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Assignment SEO Strategy
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Engineered with clean unique URLs, primary and secondary keywords, title tag and meta description rules, and AEO question-answer structures.
            </p>
            <div className="pt-1">
              <a
                href="/seo-keyword-research"
                onClick={(e) => { e.preventDefault(); onNavigate('/seo-keyword-research'); }}
                className="inline-flex items-center gap-1.5 px-3 py-2 bg-[#DC052D] hover:bg-[#9e0320] text-white rounded-lg text-xs font-semibold transition-colors"
              >
                <Table className="w-3.5 h-3.5" />
                <span>View Complete Keyword Table</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} FC Bayern Munich Editorial & SEO Knowledge Hub. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <a
              href="/"
              onClick={(e) => { e.preventDefault(); onNavigate('/'); }}
              className="hover:text-slate-300 transition-colors"
            >
              Editorial Home
            </a>
            <span aria-hidden="true">·</span>
            <a
              href="/seo-keyword-research"
              onClick={(e) => { e.preventDefault(); onNavigate('/seo-keyword-research'); }}
              className="hover:text-slate-300 transition-colors"
            >
              Keyword Research Matrix
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
