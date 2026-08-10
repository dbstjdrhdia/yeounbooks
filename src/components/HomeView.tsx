import React from 'react';
import { BookCuration, StoryEssay, SiteConfig, ActiveTab } from '../types';

const NaverIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M16.273 12.845L7.376 0H0v24h7.726v-12.845L16.624 24H24V0h-7.727v12.845z" />
  </svg>
);

interface HomeViewProps {
  config: SiteConfig;
  curations?: BookCuration[];
  essays?: StoryEssay[];
  setActiveTab: (tab: ActiveTab) => void;
  onSelectCuration?: (id: string) => void;
  onSelectEssay?: (id: string) => void;
  bookmarks?: string[];
  onToggleBookmark?: (id: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  config,
  setActiveTab,
}) => {
  const hero = config.heroBanner;
  const rawQuote = hero.quote || hero.title || '';
  const cleanQuote = rawQuote.replace(/^[“"'\s]+|[”"'\s]+$/g, '');

  return (
    <div className="flex flex-col flex-grow">
      {/* 1. Clean Minimalism Hero Section */}
      <section className="relative flex-grow min-h-[500px] lg:min-h-[580px] flex items-center justify-center overflow-hidden bg-gradient-to-tr from-[#EBE7E0] to-[#FDFCFB] py-20 px-8">
        {/* Background Blur Visual */}
        <div className="absolute right-[10%] w-[400px] h-[400px] bg-[#8E8373]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 text-center max-w-2xl px-6">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#8E8373] mb-6 block font-bold">
            {hero.badgeText || 'Yeoun Books'}
          </span>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif leading-relaxed mb-8 text-[#1A1A1A] whitespace-pre-line font-medium tracking-tight">
            “{cleanQuote}”
          </h1>
          <p className="text-sm text-gray-500 leading-relaxed font-light max-w-xl mx-auto break-keep whitespace-pre-line">
            {hero.subtitle || '시간이 흘러도 빛이 바래지 않는 텍스트의 힘을 믿습니다.'}
          </p>
        </div>
      </section>

      {/* Operational Notice Banner (Minimalist style) */}
      {config.operationalNotice.enabled && (
        <section className="bg-white border-t border-b border-gray-100 py-5 px-6">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between text-xs tracking-wide space-y-3 md:space-y-0">
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#8E8373] font-mono shrink-0">
              00 — Prologue
            </span>
            <p className="font-serif text-gray-600 flex-1 md:text-center px-4 leading-relaxed whitespace-pre-line break-keep md:whitespace-normal">
              {config.operationalNotice.bannerText}
            </p>
            <button
              onClick={() => setActiveTab('about')}
              className="text-[10px] uppercase tracking-widest text-black hover:text-gray-500 transition-colors flex items-center space-x-2 shrink-0 font-medium"
            >
              <span>Our Story</span>
              <span>→</span>
            </button>
          </div>
        </section>
      )}

      {/* Upcoming Books Section */}
      {config.upcomingBooks && config.upcomingBooks.length > 0 && (
        <section className="py-24 bg-[#FAFAFA] border-t border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <span className="text-[10px] uppercase tracking-widest text-[#8E8373] font-mono block mb-4">Upcoming</span>
              <h2 className="text-2xl font-serif text-[#1A1A1A]">출간을 앞둔 원고들</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-5xl mx-auto">
              {config.upcomingBooks.map((book, idx) => (
                <div key={idx} className="flex flex-col items-center group">
                  <div className={`w-64 h-80 sm:h-96 ${book.coverStyle || 'bg-gray-100'} p-6 flex flex-col justify-between shadow-sm group-hover:shadow-md transition-shadow relative mb-8 overflow-hidden`}>
                    {book.coverImage && (
                      <div className="absolute inset-0 z-0">
                        <img src={book.coverImage} alt={book.title} className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity" />
                        <div className="absolute inset-0 bg-black/30"></div>
                      </div>
                    )}
                    <div className="relative z-10 text-center text-white/90 text-[10px] tracking-widest pt-4 break-keep">
                      {book.tagline}
                    </div>
                    <div className="relative z-10 flex-1 flex items-center justify-center">
                      <h3 
                        className="text-xl sm:text-2xl text-white font-serif tracking-widest mx-auto leading-relaxed text-center drop-shadow-md"
                        style={book.isVerticalTitle ? { writingMode: 'vertical-rl' } : undefined}
                      >
                        {book.title}
                      </h3>
                    </div>
                    <div className="relative z-10 text-center text-white/90 text-xs pb-4 drop-shadow-sm">
                      {book.author}
                    </div>
                  </div>
                  <div className="text-center max-w-sm px-4 sm:px-0">
                    <h4 className="text-lg font-serif text-[#1A1A1A] mb-3">{book.title}</h4>
                    <p className="text-[13px] text-gray-500 leading-relaxed break-keep">
                      {book.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 2. Horizontal Featured Cards (Clean Minimalism 2-Column Horizontal Grid) */}
      <section className="bg-white border-t border-b border-gray-100 grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-100">
        {/* Card 1 — Identity */}
        <div
          onClick={() => setActiveTab('about')}
          className="p-10 lg:p-12 flex flex-col justify-between hover:bg-gray-50 transition-colors cursor-pointer group"
        >
          <div>
            <span className="text-[10px] uppercase tracking-widest text-[#8E8373] font-mono">01 — Identity</span>
            <h3 className="text-2xl sm:text-3xl font-serif mt-6 text-[#1A1A1A] group-hover:italic transition-all">
              여운책방 소개
            </h3>
            <p className="text-sm text-gray-500 leading-relaxed mt-6 break-keep">
              가벼운 위로가 범람하는 시대,<br className="hidden sm:block" />
              보이지 않는 마음의 결을 짚어내는 심리 전문 출판사입니다.
            </p>
          </div>
          <div className="mt-12 pt-6 border-t border-gray-100 flex items-center justify-between text-[10px] text-[#8E8373] uppercase tracking-widest font-semibold">
            <span>Read Story</span>
            <span className="group-hover:translate-x-2 transition-transform">→</span>
          </div>
        </div>

        {/* Card 2 — Social & Blog */}
        <a
          href={config.socialLinks?.naverBlog || 'https://blog.naver.com'}
          target="_blank"
          rel="noreferrer"
          className="p-10 lg:p-12 flex flex-col justify-between hover:bg-gray-50 transition-colors cursor-pointer group"
        >
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-widest text-[#8E8373] font-mono">02 — Journal</span>
              <NaverIcon className="w-4 h-4 text-gray-400 group-hover:text-black transition-colors" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-serif mt-6 text-[#1A1A1A] group-hover:italic transition-all">
              네이버 블로그
            </h3>
            <p className="text-sm text-gray-500 leading-relaxed mt-6 break-keep">
              첫 번째 심리 에세이가 만들어지는 과정과<br className="hidden sm:block" />
              고요한 사색의 기록들을 블로그를 통해 먼저 나누고 있습니다.
            </p>
          </div>
          <div className="mt-12 pt-6 border-t border-gray-100 flex items-center justify-between text-[10px] text-[#8E8373] uppercase tracking-widest font-semibold">
            <span>Visit Blog</span>
            <span className="group-hover:translate-x-2 transition-transform">→</span>
          </div>
        </a>
      </section>

      {/* 3. Minimal Quote Philosophy Statement */}
      <section className="border-t border-gray-100 bg-white py-24 px-6 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#8E8373] font-mono">
            Yeoun Books Statement
          </span>
          <p className="text-lg sm:text-2xl md:text-3xl font-serif italic text-[#1A1A1A] leading-relaxed break-keep">
            "흔들리는 마음에 조용한 닻을 내리는,<br className="hidden sm:block" /> 단단한 문장의 힘을 믿습니다."
          </p>
        </div>
      </section>
    </div>
  );
};
