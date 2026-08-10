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
          <p className="text-[11px] text-stone-400 font-mono mb-1">
            Copyright © Yeoun Books. All rights reserved.
          </p>
          <p className="text-stone-500 text-xs">
            21060 인천 계양구 계산새로 71 307호
          </p>
          <p className="text-stone-500 text-xs flex flex-wrap items-center gap-x-2">
            <span>사업자등록번호: 483-98-01948</span>
            <span className="text-stone-300">|</span>
            <span>문의: {config.socialLinks.email}</span>
          </p>
        </div>

        {/* Scroll Top */}
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

