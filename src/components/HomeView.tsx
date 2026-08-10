import React from 'react';
import { BookCuration, StoryEssay, SiteConfig, ActiveTab } from '../types';
import { ArrowRight, Quote, BookOpen, Feather, Sparkles, Bookmark, Share2 } from 'lucide-react';

interface HomeViewProps {
  config: SiteConfig;
  curations: BookCuration[];
  essays: StoryEssay[];
  setActiveTab: (tab: ActiveTab) => void;
  onSelectCuration: (id: string) => void;
  onSelectEssay: (id: string) => void;
  bookmarks: string[];
  onToggleBookmark: (id: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  config,
  curations,
  essays,
  setActiveTab,
  onSelectCuration,
  onSelectEssay,
  bookmarks,
  onToggleBookmark,
}) => {
  // Featured items
  const featuredCurations = curations.filter(c => c.isFeatured).slice(0, 2);
  const featuredEssays = essays.filter(e => e.isFeatured).slice(0, 2);

  const hero = config.heroBanner;

  return (
    <div className="flex flex-col flex-grow">
      {/* 1. Clean Minimalism Hero Section */}
      <section className="relative flex-grow min-h-[500px] lg:min-h-[580px] flex items-center justify-center overflow-hidden bg-gradient-to-tr from-[#EBE7E0] to-[#FDFCFB] py-20 px-8">
        {/* Background Blur Visual */}
        <div className="absolute right-[10%] w-[400px] h-[400px] bg-[#8E8373]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 text-center max-w-2xl px-6">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#8E8373] mb-6 block font-bold">
            {hero.badgeText || 'Monthly Curation — No. 12'}
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif italic leading-tight mb-8 text-[#1A1A1A]">
            "{hero.quote || hero.title}"
          </h1>
          <p className="text-sm text-gray-500 leading-relaxed font-light mb-10 max-w-md mx-auto">
            {hero.subtitle || '시간이 흘러도 빛이 바래지 않는 텍스트의 힘. 여운책방이 엄선한 에버그린 아카이브를 지금 만나보세요.'}
          </p>
          <div className="flex items-center justify-center space-x-4">
            <button
              onClick={() => {
                if (hero.linkToId) {
                  if (hero.linkToType === 'curation') onSelectCuration(hero.linkToId);
                  else if (hero.linkToType === 'story') onSelectEssay(hero.linkToId);
                } else {
                  setActiveTab('curation');
                }
              }}
              className="px-10 py-3 border border-black text-xs uppercase tracking-widest hover:bg-black hover:text-white transition-colors cursor-pointer"
            >
              Explore Archive
            </button>
            <button
              onClick={() => setActiveTab('about')}
              className="px-6 py-3 text-xs uppercase tracking-widest text-gray-500 hover:text-black transition-colors"
            >
              About
            </button>
          </div>
        </div>

        {/* Floating Meta Info */}
        <div className="absolute bottom-10 left-12 transform -rotate-90 origin-left text-[9px] uppercase tracking-[0.4em] text-[#8E8373]/60 font-mono hidden md:block">
          Est. 2024 — Seoul, Korea
        </div>
      </section>

      {/* Operational Notice Banner (Minimalist style) */}
      {config.operationalNotice.enabled && (
        <section className="bg-white border-t border-b border-gray-100 py-4 px-8">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between text-xs tracking-wide space-y-2 md:space-y-0">
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#8E8373] font-semibold">
              {config.operationalNotice.modelType === 'monthly' ? '00 — Monthly Theme Exhibition' : '00 — Portfolio Showroom'}
            </span>
            <p className="font-serif italic text-gray-600">
              "{config.operationalNotice.bannerText}"
            </p>
            <button
              onClick={() => setActiveTab('curation')}
              className="text-[10px] uppercase tracking-widest underline underline-offset-4 hover:text-gray-500"
            >
              View Exhibition
            </button>
          </div>
        </section>
      )}

      {/* 2. Horizontal Featured Cards (Clean Minimalism 3-Column Horizontal Grid) */}
      <section className="bg-white border-t border-b border-gray-100 grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-100">
        {/* Card 1 — Curation */}
        {featuredCurations[0] && (
          <div
            onClick={() => onSelectCuration(featuredCurations[0].id)}
            className="p-8 flex flex-col justify-between hover:bg-gray-50 transition-colors cursor-pointer group"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[9px] uppercase tracking-widest text-gray-400 font-mono">01 — Curation</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleBookmark(featuredCurations[0].id);
                  }}
                  className="text-gray-400 hover:text-black"
                >
                  <Bookmark className={`w-3.5 h-3.5 ${bookmarks.includes(featuredCurations[0].id) ? 'fill-black text-black' : ''}`} />
                </button>
              </div>
              <h3 className="text-xl font-serif mt-3 text-[#1A1A1A] group-hover:italic transition-all">
                {featuredCurations[0].title}
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed mt-3 line-clamp-2">
                {featuredCurations[0].subtitle || featuredCurations[0].quote}
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-gray-100 flex items-center justify-between text-[10px] text-gray-400 uppercase tracking-widest">
              <span>{featuredCurations[0].author}</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </div>
        )}

        {/* Card 2 — Essay */}
        {featuredEssays[0] && (
          <div
            onClick={() => onSelectEssay(featuredEssays[0].id)}
            className="p-8 flex flex-col justify-between hover:bg-gray-50 transition-colors cursor-pointer group"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[9px] uppercase tracking-widest text-gray-400 font-mono">02 — Essay</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleBookmark(featuredEssays[0].id);
                  }}
                  className="text-gray-400 hover:text-black"
                >
                  <Bookmark className={`w-3.5 h-3.5 ${bookmarks.includes(featuredEssays[0].id) ? 'fill-black text-black' : ''}`} />
                </button>
              </div>
              <h3 className="text-xl font-serif mt-3 text-[#1A1A1A] group-hover:italic transition-all">
                {featuredEssays[0].title}
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed mt-3 line-clamp-2">
                {featuredEssays[0].subtitle || featuredEssays[0].excerpt}
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-gray-100 flex items-center justify-between text-[10px] text-gray-400 uppercase tracking-widest">
              <span>{featuredEssays[0].authorName || 'Essay'}</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </div>
        )}

        {/* Card 3 — Philosophy / Additional Curation */}
        <div
          onClick={() => setActiveTab('about')}
          className="p-8 flex flex-col justify-between hover:bg-gray-50 transition-colors cursor-pointer group"
        >
          <div>
            <span className="text-[9px] uppercase tracking-widest text-gray-400 font-mono">03 — Philosophy</span>
            <h3 className="text-xl font-serif mt-3 text-[#1A1A1A] group-hover:italic transition-all">
              여운이 남는 삶의 태도
            </h3>
            <p className="text-xs text-gray-400 leading-relaxed mt-3">
              여운책방이 추구하는 템포와 브랜드 철학을 담은 첫 번째 소개서.
            </p>
          </div>
          <div className="mt-8 pt-4 border-t border-gray-100 flex items-center justify-between text-[10px] text-gray-400 uppercase tracking-widest">
            <span>Read Manifest</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </div>
        </div>
      </section>

      {/* 3. Detailed Curated Archive Section */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-20 space-y-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-gray-200 pb-6">
          <div>
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#8E8373] font-bold block mb-2">
              Curated Selection
            </span>
            <h2 className="text-3xl font-serif text-[#1A1A1A]">
              여운의 서가
            </h2>
          </div>
          <button
            onClick={() => setActiveTab('curation')}
            className="text-xs uppercase tracking-widest text-gray-500 hover:text-black mt-4 md:mt-0"
          >
            View All Curations ({curations.length}) →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {curations.map((item, idx) => {
            const isBookmarked = bookmarks.includes(item.id);
            return (
              <div
                key={item.id}
                onClick={() => onSelectCuration(item.id)}
                className="group border border-gray-100 bg-white p-6 flex flex-col justify-between hover:border-black transition-all duration-300 cursor-pointer"
              >
                <div>
                  <div className="relative aspect-[3/2] overflow-hidden mb-6 bg-stone-50">
                    <img
                      src={item.coverImage}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleBookmark(item.id);
                      }}
                      className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm border border-gray-200 hover:bg-white transition-colors"
                    >
                      <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-black text-black' : 'text-gray-600'}`} />
                    </button>
                  </div>

                  <span className="text-[9px] uppercase tracking-widest text-[#8E8373] font-mono block mb-2">
                    Curation No. 0{idx + 1}
                  </span>
                  <h3 className="text-lg font-serif font-bold text-[#1A1A1A] group-hover:italic transition-all">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1 italic">
                    {item.subtitle}
                  </p>
                  <p className="text-xs text-gray-400 mt-4 line-clamp-3 leading-relaxed">
                    "{item.quote}"
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-gray-100 flex items-center justify-between text-[10px] text-gray-400 uppercase tracking-widest">
                  <span>{item.author}</span>
                  <span className="text-black font-medium">Read More</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. Minimal Quote Philosophy Statement */}
      <section className="border-t border-gray-100 bg-white py-20 px-8 text-center">
        <div className="max-w-2xl mx-auto space-y-6">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#8E8373] font-mono">
            Yeoun Books Statement
          </span>
          <p className="text-2xl sm:text-3xl font-serif italic text-[#1A1A1A] leading-relaxed">
            "시간이 흘러도 빛이 바래지 않는 텍스트의 힘을 믿습니다."
          </p>
          <p className="text-xs text-gray-400 uppercase tracking-widest font-mono">
            Est. 2024 — Seoul, Korea
          </p>
        </div>
      </section>
    </div>
  );
};
