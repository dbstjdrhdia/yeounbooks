import React, { useState } from 'react';
import { StoryEssay, SiteConfig } from '../types';
import { ArrowLeft, Bookmark, Share2, Quote, Check, Clock, Type, Sparkles } from 'lucide-react';

interface StoryDetailViewProps {
  config: SiteConfig;
  essay: StoryEssay;
  onBack: () => void;
  bookmarks: string[];
  onToggleBookmark: (id: string) => void;
}

export const StoryDetailView: React.FC<StoryDetailViewProps> = ({
  config,
  essay,
  onBack,
  bookmarks,
  onToggleBookmark,
}) => {
  const [copied, setCopied] = useState(false);
  const [fontSize, setFontSize] = useState<'sm' | 'base' | 'lg' | 'xl'>('base');
  const isBookmarked = bookmarks.includes(essay.id);

  const handleCopyQuote = () => {
    navigator.clipboard.writeText(`${essay.highlightQuote}\n\n— [${essay.title}], 여운책방 에세이`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const getFontSizeClass = () => {
    switch (fontSize) {
      case 'sm':
        return 'text-sm sm:text-base leading-relaxed';
      case 'lg':
        return 'text-lg sm:text-xl leading-loose';
      case 'xl':
        return 'text-xl sm:text-2xl leading-loose';
      default:
        return 'text-base sm:text-lg leading-loose';
    }
  };

  return (
    <article className="py-12 px-6 sm:px-12 space-y-12 max-w-4xl mx-auto">
      {/* Top Controller Bar */}
      <div className="flex items-center justify-between border-b border-gray-100 pb-6">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-gray-500 hover:text-black transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Stories</span>
        </button>

        {/* Font size adjuster & Actions */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1 bg-white border border-gray-200 p-1 text-xs font-mono">
            <Type className="w-3.5 h-3.5 text-gray-400 ml-1" />
            <button
              onClick={() => setFontSize('sm')}
              className={`px-2 py-0.5 ${fontSize === 'sm' ? 'bg-black text-white' : 'text-gray-600'}`}
              title="Small"
            >
              S
            </button>
            <button
              onClick={() => setFontSize('base')}
              className={`px-2 py-0.5 ${fontSize === 'base' ? 'bg-black text-white' : 'text-gray-600'}`}
              title="Medium"
            >
              M
            </button>
            <button
              onClick={() => setFontSize('lg')}
              className={`px-2 py-0.5 ${fontSize === 'lg' ? 'bg-black text-white' : 'text-gray-600'}`}
              title="Large"
            >
              L
            </button>
          </div>

          <button
            onClick={handleCopyQuote}
            className="flex items-center space-x-1.5 bg-white border border-gray-200 px-3 py-1.5 text-xs font-mono uppercase tracking-widest hover:border-black transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-black" /> : <Share2 className="w-3.5 h-3.5 text-gray-500" />}
            <span>{copied ? 'Copied' : 'Share'}</span>
          </button>

          <button
            onClick={() => onToggleBookmark(essay.id)}
            className={`p-2 border transition-colors ${
              isBookmarked ? 'bg-black border-black text-white' : 'bg-white border-gray-200 text-gray-700 hover:border-black'
            }`}
            title="보관함"
          >
            <Bookmark className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Title & Cover Section */}
      <div className="space-y-6 text-center">
        <div className="inline-flex items-center space-x-2 bg-black text-white px-3 py-1 text-[9px] font-mono tracking-widest uppercase">
          <span>{essay.category}</span>
          <span>·</span>
          <span>{essay.readingTime}</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#1A1A1A] leading-tight">
          {essay.title}
        </h1>

        <p className="text-base sm:text-lg font-serif text-gray-500 italic max-w-xl mx-auto">
          {essay.subtitle}
        </p>

        {/* Cover Photo */}
        <div className="border border-gray-100 overflow-hidden h-96 my-8">
          <img
            src={essay.coverImage}
            alt={essay.title}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Main Paragraphs */}
      <div className={`max-w-2xl mx-auto space-y-8 font-serif text-[#1A1A1A] ${getFontSizeClass()}`}>
        {/* Paragraph 1 */}
        {essay.paragraphs[0] && (
          <p className="first-letter:float-left first-letter:text-5xl first-letter:font-serif first-letter:font-bold first-letter:mr-3 first-letter:text-black leading-relaxed font-light">
            {essay.paragraphs[0]}
          </p>
        )}

        {/* Highlighted Quote Box */}
        {essay.highlightQuote && (
          <div className="my-10 bg-[#FAF9F5] border-l-2 border-black p-8 text-center space-y-3">
            <Quote className="w-5 h-5 text-black mx-auto opacity-40" />
            <p className="text-lg sm:text-2xl font-serif italic text-[#1A1A1A]">
              "{essay.highlightQuote}"
            </p>
          </div>
        )}

        {/* Paragraph 2 */}
        {essay.paragraphs[1] && (
          <p className="leading-relaxed font-light">{essay.paragraphs[1]}</p>
        )}

        {/* Embedded High-Res Image */}
        {essay.inlineImage && (
          <div className="my-10 space-y-2">
            <div className="border border-gray-100 overflow-hidden">
              <img
                src={essay.inlineImage.url}
                alt={essay.inlineImage.caption || 'Essay photo'}
                className="w-full h-80 object-cover"
              />
            </div>
            {essay.inlineImage.caption && (
              <p className="text-xs text-gray-400 text-center font-mono italic">
                {essay.inlineImage.caption}
              </p>
            )}
          </div>
        )}

        {/* Remaining Paragraphs */}
        {essay.paragraphs.slice(2).map((p, idx) => (
          <p key={idx} className="leading-relaxed font-light">{p}</p>
        ))}

        {/* Author signoff */}
        <div className="pt-10 border-t border-gray-100 flex items-center justify-between text-xs font-mono text-gray-400 uppercase tracking-widest">
          <div>
            <p className="font-semibold text-black">Author: {essay.authorName || 'Yeoun Books'}</p>
            <p className="text-[10px] text-gray-400">Yeoun Books Evergreen Story Archive</p>
          </div>
          <span>Timeless Essay</span>
        </div>
      </div>
    </article>
  );
};
