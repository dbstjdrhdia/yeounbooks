import React from 'react';
import { SiteConfig } from '../types';
import { ArrowUp } from 'lucide-react';

interface FooterProps {
  config: SiteConfig;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ config, onOpenAdmin }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-gray-100 bg-white py-12 px-6 sm:px-12 text-xs text-stone-500 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Company & Info Lines */}
        <div className="space-y-1.5 text-stone-600 font-light leading-relaxed">
          <p className="text-stone-500 text-xs">
            경기도 파주시 문발동 출판문화정보산업단지 (여운책방 타임리스 서가)
          </p>
          <p className="text-stone-500 text-xs flex flex-wrap items-center gap-x-2 gap-y-1">
            <span>문의 {config.socialLinks.email}</span>
            <span className="text-stone-300">|</span>
            <span>운영시간 평일 10:00 ~ 17:00 (점심시간 12:00 ~ 13:00)</span>
          </p>
          <div className="text-stone-500 text-xs flex flex-wrap items-center gap-x-2 gap-y-1 pt-0.5">
            <span>기획·에디터: {config.curatorName}</span>
            <span className="text-stone-300">|</span>
            <span>에버그린 아카이브</span>
          </div>
        </div>

        {/* Scroll Top Button */}
        <div className="pt-4 border-t border-gray-100 flex items-center justify-end">
          <button
            onClick={scrollToTop}
            className="flex items-center space-x-1.5 text-xs text-stone-400 hover:text-stone-900 transition-colors font-mono uppercase tracking-widest"
          >
            <ArrowUp className="w-3.5 h-3.5" />
            <span>Top</span>
          </button>
        </div>
      </div>
    </footer>
  );
};

