import React, { useState } from 'react';
import { StoryEssay, SiteConfig } from '../types';
import { Search, Feather, Bookmark, ArrowRight, Clock } from 'lucide-react';

interface StoryViewProps {
  config: SiteConfig;
  essays: StoryEssay[];
  onSelectEssay: (id: string) => void;
  bookmarks: string[];
  onToggleBookmark: (id: string) => void;
}

export const StoryView: React.FC<StoryViewProps> = ({
  config,
  essays,
  onSelectEssay,
  bookmarks,
  onToggleBookmark,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = ['all', ...Array.from(new Set(essays.map(e => e.category)))];

  const filtered = essays.filter(e => {
    const matchesSearch =
      e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.paragraphs.some(p => p.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || e.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-12 py-16 space-y-12">
      {/* Header */}
      <div className="text-center space-y-4">
        <span className="text-[10px] uppercase tracking-[0.3em] text-[#8E8373] font-bold block">
          Timeless Story Archive
        </span>
        <h1 className="text-4xl sm:text-5xl font-serif text-[#1A1A1A]">
          여운의 글
        </h1>
        <p className="text-gray-500 font-light text-sm max-w-xl mx-auto leading-relaxed">
          시간에 구애받지 않고 언제 읽어도 마음속 깊이 온기를 전하는 에세이 보관소입니다.
        </p>
      </div>

      {/* Filter and Search */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-gray-100 pb-6">
        <div className="flex items-center space-x-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 text-xs font-mono uppercase tracking-widest transition-colors ${
                selectedCategory === cat
                  ? 'bg-black text-white font-semibold'
                  : 'bg-white text-gray-500 hover:text-black border border-gray-200'
              }`}
            >
              {cat === 'all' ? 'All Stories' : cat}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-72">
          <Search className="w-3.5 h-3.5 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search stories..."
            className="w-full pl-9 pr-4 py-1.5 bg-white border border-gray-200 text-xs text-[#1A1A1A] focus:outline-none focus:border-black transition-colors font-mono"
          />
        </div>
      </div>

      {/* Essay List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {filtered.map((item, idx) => {
          const isBookmarked = bookmarks.includes(item.id);
          return (
            <div
              key={item.id}
              onClick={() => onSelectEssay(item.id)}
              className="group bg-white border border-gray-100 p-8 flex flex-col justify-between hover:border-black transition-all duration-300 cursor-pointer"
            >
              <div>
                <div className="relative aspect-[16/9] overflow-hidden mb-6 bg-stone-50 border border-gray-100">
                  <img
                    src={item.coverImage}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-black text-white px-2 py-0.5 text-[9px] font-mono tracking-widest uppercase">
                    {item.category}
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleBookmark(item.id);
                    }}
                    className={`absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm border border-gray-200 hover:bg-white transition-colors`}
                    title="문장 보관함"
                  >
                    <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-black text-black' : 'text-gray-500'}`} />
                  </button>
                </div>

                <div className="space-y-3">
                  <span className="text-[9px] uppercase tracking-widest text-[#8E8373] font-mono block">
                    Story No. 0{idx + 1} — {item.readingTime}
                  </span>
                  <h3 className="text-2xl font-serif font-bold text-[#1A1A1A] group-hover:italic transition-all">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-500 italic">
                    {item.subtitle}
                  </p>
                  <p className="text-xs text-gray-400 leading-relaxed mt-3 line-clamp-3">
                    {item.excerpt}
                  </p>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-gray-100 flex items-center justify-between text-[10px] text-gray-400 font-mono uppercase tracking-widest">
                <span>By {item.authorName || 'Yeoun Books'}</span>
                <span className="text-black font-semibold flex items-center space-x-1 group-hover:translate-x-1 transition-transform">
                  <span>Read Story</span>
                  <span>→</span>
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20 bg-white border border-gray-100 p-8 space-y-3">
          <Feather className="w-8 h-8 text-gray-300 mx-auto" />
          <p className="text-gray-500 font-serif text-sm">
            등록된 에세이가 없습니다.
          </p>
        </div>
      )}
    </div>
  );
};
