import React from 'react';
import { Search, Trophy, MapPin, Users, Flame, BookOpen, Compass } from 'lucide-react';

interface HeroProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  categories: string[];
  totalArticlesCount: number;
}

export const Hero: React.FC<HeroProps> = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onSelectCategory,
  categories,
  totalArticlesCount
}) => {
  return (
    <div className="relative bg-[#001e38] text-white overflow-hidden border-b border-slate-800">
      {/* Background imagery with subtle dark scrim */}
      <div className="absolute inset-0 z-0 opacity-25 mix-blend-luminosity">
        <img
          src="/src/assets/images/bayern_allianz_arena_dusk_1791884292295.jpg"
          alt="Atmospheric view of the Allianz Arena stadium at dusk"
          className="w-full h-full object-cover object-center"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#001e38] via-[#001e38]/80 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-14">
        {/* Subtle sub-heading kicker */}
        <div className="flex items-center gap-3 text-xs tracking-wider uppercase text-slate-300 font-semibold mb-3">
          <span className="text-[#DC052D]">FC Bayern München</span>
          <span aria-hidden="true">·</span>
          <span>Official Editorial & Analysis Archive</span>
          <span aria-hidden="true">·</span>
          <span>1900 — Present</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight text-white max-w-4xl leading-[1.1] mb-5 text-balance">
          Mia San Mia: The Complete FC Bayern Munich Tactical & Historical Archive
        </h1>

        <p className="text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed mb-8">
          Explore ten publication-grade, long-form analytical studies covering Champions League triumphs,
          Allianz Arena matchday logistics, squad tactics, club legends, and 50+1 fan democracy.
          Engineered for answer-engine clarity with structured question-answer insights.
        </p>

        {/* Club Statistics Strip (adjacent proof metrics) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 px-5 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 mb-8 max-w-4xl">
          <div className="flex flex-col">
            <span className="text-2xl sm:text-3xl font-display font-bold text-white tabular-nums">6</span>
            <span className="text-xs text-slate-300 uppercase tracking-wider mt-0.5">Champions League Titles</span>
          </div>
          <div className="flex flex-col">
            <span className="text-2xl sm:text-3xl font-display font-bold text-white tabular-nums">33</span>
            <span className="text-xs text-slate-300 uppercase tracking-wider mt-0.5">German Championships</span>
          </div>
          <div className="flex flex-col">
            <span className="text-2xl sm:text-3xl font-display font-bold text-white tabular-nums">360,000+</span>
            <span className="text-xs text-slate-300 uppercase tracking-wider mt-0.5">Global Club Members</span>
          </div>
          <div className="flex flex-col">
            <span className="text-2xl sm:text-3xl font-display font-bold text-[#DC052D] tabular-nums">{totalArticlesCount}</span>
            <span className="text-xs text-slate-300 uppercase tracking-wider mt-0.5">Comprehensive Articles</span>
          </div>
        </div>

        {/* Search bar & Category filter */}
        <div className="space-y-4 max-w-3xl">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search by keyword, tactical topic, player, or question (e.g. 'Champions League', 'Allianz Arena', 'Harry Kane')..."
              className="w-full pl-12 pr-4 py-3 bg-white text-slate-900 rounded-lg text-sm placeholder:text-slate-400 shadow-md focus:outline-none focus:ring-2 focus:ring-[#DC052D]"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-700 px-2 py-1"
              >
                Clear
              </button>
            )}
          </div>

          {/* Interactive filter tabs (functional buttons with click handlers) */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => onSelectCategory(cat)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#DC052D] text-white shadow-sm font-semibold'
                    : 'bg-white/10 text-slate-200 hover:bg-white/20'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
