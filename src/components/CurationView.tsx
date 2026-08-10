import React, { useState } from 'react';
import { BookCuration, SiteConfig } from '../types';
import { Search, Bookmark, ArrowRight, Tag, BookOpen, Quote } from 'lucide-react';

interface CurationViewProps {
  config: SiteConfig;
  curations: BookCuration[];
  onSelectCuration: (id: string) => void;
  bookmarks: string[];
  onToggleBookmark: (id: string) => void;
}

export const CurationView: React.FC<CurationViewProps> = ({
  config,
  curations,
  onSelectCuration,
  bookmarks,
  onToggleBookmark,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = ['all', ...Array.from(new Set(curations.map(c => c.category)))];

  const filtered = curations.filter(c => {
    const matchesSearch =
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.quote.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || c.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-12 py-16 space-y-12">
      {/* Page Header */}
      <div className="text-center space-y-4">
        <span className="text-[10px] uppercase tracking-[0.3em] text-[#8E8373] font-bold block">
          Monthly & Timeless Archive
        </span>
        <h1 className="text-4xl sm:text-5xl font-serif text-[#1A1A1A]">
          여운의 책
        </h1>
        <p className="text-gray-500 font-light text-sm max-w-xl mx-auto leading-relaxed">
          한 달에 한 권, 깊게 엄선한 고전과 도서를 정갈하게 소개하는 조용한 서가입니다.
        </p>
      </div>

      {/* Search & Category Filter */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-gray-100 pb-6">
        {/* Categories */}
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
              {cat === 'all' ? 'All Archive' : cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="w-3.5 h-3.5 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search archive..."
            className="w-full pl-9 pr-4 py-1.5 bg-white border border-gray-200 text-xs text-[#1A1A1A] focus:outline-none focus:border-black transition-colors font-mono"
          />
        </div>
      </div>

      {/* Curation Books Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map((item, idx) => {
          const isBookmarked = bookmarks.includes(item.id);
          return (
            <div
              key={item.id}
              onClick={() => onSelectCuration(item.id)}
              className="group bg-white border border-gray-100 p-6 flex flex-col justify-between hover:border-black transition-all duration-300 cursor-pointer"
            >
              <div>
                {/* Book Cover Container */}
                <div className="relative h-72 bg-stone-50 flex items-center justify-center p-6 border border-gray-100 mb-6">
                  <img
                    src={item.coverImage}
                    alt={item.title}
                    className="max-h-full max-w-full object-contain shadow group-hover:scale-105 transition-transform duration-500"
                  />
                  {item.isFeatured && (
                    <span className="absolute top-3 left-3 bg-black text-white px-2 py-0.5 text-[9px] font-mono tracking-widest uppercase">
                      Featured
                    </span>
                  )}
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

                {/* Content Details */}
                <div className="space-y-3">
                  <span className="text-[9px] uppercase tracking-widest text-[#8E8373] font-mono block">
                    No. 0{idx + 1} — {item.author}
                  </span>
                  <h3 className="text-xl font-serif font-bold text-[#1A1A1A] group-hover:italic transition-all">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-500 italic">
                    {item.subtitle}
                  </p>

                  {/* Highlight Quote */}
                  <div className="bg-[#FAF9F5] p-3 border-l border-black mt-3">
                    <p className="text-xs text-gray-600 font-serif italic leading-relaxed line-clamp-3">
                      "{item.quote}"
                    </p>
                  </div>
                </div>
              </div>

              {/* Footer Button */}
              <div className="pt-6 mt-6 border-t border-gray-100 flex items-center justify-between text-[10px] text-gray-400 font-mono uppercase tracking-widest">
                <span>{item.category}</span>
                <span className="text-black font-semibold flex items-center space-x-1 group-hover:translate-x-1 transition-transform">
                  <span>Read</span>
                  <span>→</span>
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20 bg-white border border-gray-100 p-8 space-y-3">
          <BookOpen className="w-8 h-8 text-gray-300 mx-auto" />
          <p className="text-gray-500 font-serif text-sm">
            검색 조건에 해당되는 큐레이션 도서가 없습니다.
          </p>
        </div>
      )}
    </div>
  );
};
