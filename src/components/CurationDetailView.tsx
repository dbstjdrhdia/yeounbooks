import React, { useState } from 'react';
import { BookCuration, SiteConfig } from '../types';
import { ArrowLeft, Bookmark, Share2, Quote, Check, BookOpen } from 'lucide-react';

interface CurationDetailViewProps {
  config: SiteConfig;
  curation: BookCuration;
  onBack: () => void;
  bookmarks: string[];
  onToggleBookmark: (id: string) => void;
}

export const CurationDetailView: React.FC<CurationDetailViewProps> = ({
  config,
  curation,
  onBack,
  bookmarks,
  onToggleBookmark,
}) => {
  const [copied, setCopied] = useState(false);
  const isBookmarked = bookmarks.includes(curation.id);

  const handleCopyQuote = () => {
    navigator.clipboard.writeText(`${curation.quote}\n\n— [${curation.title}] (${curation.author} 저), 여운책방 큐레이션`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <article className="max-w-4xl mx-auto px-6 sm:px-12 py-12 space-y-16">
      {/* Back button */}
      <div className="flex items-center justify-between border-b border-gray-100 pb-6">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-gray-500 hover:text-black transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Archive</span>
        </button>

        <div className="flex items-center space-x-3">
          <button
            onClick={handleCopyQuote}
            className="flex items-center space-x-1.5 bg-white border border-gray-200 px-3 py-1.5 text-xs font-mono uppercase tracking-widest hover:border-black transition-colors"
            title="대표 문구 복사"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-black" /> : <Share2 className="w-3.5 h-3.5 text-gray-500" />}
            <span>{copied ? 'Copied' : 'Share Quote'}</span>
          </button>

          <button
            onClick={() => onToggleBookmark(curation.id)}
            className={`p-2 border transition-colors ${
              isBookmarked ? 'bg-black border-black text-white' : 'bg-white border-gray-200 text-gray-700 hover:border-black'
            }`}
            title="보관함"
          >
            <Bookmark className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Hero Header Area */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center border-b border-gray-100 pb-12">
        {/* Cover Image */}
        <div className="md:col-span-5 bg-stone-50 p-6 border border-gray-100 flex items-center justify-center">
          <img
            src={curation.coverImage}
            alt={curation.title}
            className="max-h-96 object-contain shadow"
          />
        </div>

        {/* Title & Metadata */}
        <div className="md:col-span-7 space-y-6">
          <div className="space-y-2">
            <span className="inline-block bg-black text-white text-[9px] px-2.5 py-1 font-mono uppercase tracking-widest">
              {curation.category}
            </span>
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#1A1A1A] leading-tight">
              {curation.title}
            </h1>
            <p className="text-base font-serif text-gray-500 italic">
              {curation.subtitle}
            </p>
          </div>

          <div className="bg-white p-4 border border-gray-100 space-y-1.5 text-xs font-mono text-gray-600">
            <p><span className="text-gray-400 uppercase tracking-wider">Author:</span> {curation.author}</p>
            <p><span className="text-gray-400 uppercase tracking-wider">Publisher:</span> {curation.publisher}</p>
            <p><span className="text-gray-400 uppercase tracking-wider">Tags:</span> {curation.tags.join(', ')}</p>
          </div>
        </div>
      </div>

      {/* Quote Banner */}
      <div className="bg-[#FAF9F5] border-l-2 border-black py-8 px-8 sm:px-12 text-center space-y-4">
        <Quote className="w-6 h-6 text-black mx-auto opacity-40" />
        <p className="text-lg sm:text-2xl font-serif text-[#1A1A1A] italic leading-relaxed max-w-2xl mx-auto">
          "{curation.quote}"
        </p>
        <span className="text-[10px] text-gray-400 font-mono uppercase tracking-widest block">
          — Key Selection Excerpt
        </span>
      </div>

      {/* Curator Review Body */}
      <div className="max-w-2xl mx-auto space-y-8 font-serif text-[#1A1A1A] leading-loose text-base sm:text-lg">
        <div className="border-b border-gray-100 pb-3">
          <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#8E8373] block mb-1">
            Curator Note
          </span>
          <h2 className="text-xl font-serif font-bold text-[#1A1A1A]">
            여운 노트
          </h2>
        </div>

        <div className="whitespace-pre-line space-y-6 text-gray-700 font-light leading-relaxed">
          {curation.review}
        </div>
      </div>

      {/* Bottom Footer Note */}
      <div className="max-w-2xl mx-auto border-t border-gray-100 pt-8 flex items-center justify-between text-[10px] text-gray-400 font-mono uppercase tracking-widest">
        <span>Yeoun Books Timeless Archive</span>
        {!config.theme.hideDates && curation.publishedMonth && (
          <span>Published: {curation.publishedMonth}</span>
        )}
      </div>
    </article>
  );
};
