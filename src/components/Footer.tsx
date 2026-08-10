import React from 'react';
import { SiteConfig } from '../types';
import { Instagram, Mail, ArrowUp } from 'lucide-react';

interface FooterProps {
  config: SiteConfig;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ config, onOpenAdmin }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-gray-100 bg-white py-8 px-6 sm:px-12 text-[10px] text-gray-400 uppercase tracking-widest">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          © {new Date().getFullYear()} {config.siteName}. All rights reserved.
        </div>
        <div className="flex items-center space-x-6">
          {config.socialLinks.email && (
            <a
              href={`mailto:${config.socialLinks.email}`}
              className="hover:text-black transition-colors"
            >
              Contact
            </a>
          )}
          {config.socialLinks.instagram && (
            <a
              href={config.socialLinks.instagram}
              target="_blank"
              rel="noreferrer"
              className="hover:text-black transition-colors"
            >
              Instagram
            </a>
          )}
          <button
            onClick={onOpenAdmin}
            className="hover:text-black transition-colors uppercase"
          >
            Admin
          </button>
          <button
            onClick={scrollToTop}
            className="hover:text-black transition-colors uppercase"
          >
            Top ↑
          </button>
        </div>
      </div>
    </footer>
  );
};
