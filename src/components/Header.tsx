import React, { useState } from 'react';
import { ActiveTab, SiteConfig } from '../types';
import { Instagram, Menu, X } from 'lucide-react';

const NaverIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M16.273 12.845L7.376 0H0v24h7.726v-12.845L16.624 24H24V0h-7.727v12.845z" />
  </svg>
);

interface HeaderProps {
  config: SiteConfig;
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  onOpenAdmin: () => void;
  bookmarkCount: number;
  onOpenBookmarks: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  config,
  activeTab,
  setActiveTab,
  onOpenAdmin,
  bookmarkCount,
  onOpenBookmarks,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: ActiveTab; label: string; sublabel: string }[] = [
    { id: 'about', label: 'About', sublabel: '여운소개' },
  ];

  const instagramUrl = config.socialLinks?.instagram || 'https://instagram.com';
  const naverBlogUrl = config.socialLinks?.naverBlog || 'https://blog.naver.com';

  return (
    <header className="sticky top-0 z-30 bg-[#FDFCFB]/90 backdrop-blur-sm border-b border-gray-100 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 h-20 flex items-center justify-between relative">
        {/* Logo (Left) */}
        <div className="flex flex-col justify-center cursor-pointer group" onClick={() => setActiveTab('home')}>
          <span className="text-2xl font-serif font-bold tracking-tight text-[#1A1A1A] leading-none">
            {config.siteName}
          </span>
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#8E8373] font-mono leading-tight mt-1.5">
            {config.siteSubtitle}
          </span>
        </div>

        {/* Desktop Main Menu (Center - Clean Minimalist Nav) */}
        <nav className="hidden md:flex space-x-12 absolute left-1/2 -translate-x-1/2">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`text-xs uppercase tracking-[0.2em] font-medium transition-colors focus:outline-none ${
                  isActive ? 'text-black border-b border-black pb-1 font-semibold' : 'text-gray-500 hover:text-black pb-1'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right Action Icons (Naver Blog & Instagram) */}
        <div className="hidden md:flex items-center space-x-3">
          <a
            href={naverBlogUrl}
            target="_blank"
            rel="noreferrer"
            className="p-2 text-gray-600 hover:text-black transition-colors rounded-full hover:bg-gray-100 flex items-center justify-center"
            title="Naver Blog"
          >
            <NaverIcon className="w-3.5 h-3.5" />
          </a>
          <a
            href={instagramUrl}
            target="_blank"
            rel="noreferrer"
            className="p-2 text-gray-600 hover:text-black transition-colors rounded-full hover:bg-gray-100 flex items-center justify-center"
            title="Instagram"
          >
            <Instagram className="w-4 h-4" />
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center space-x-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#1A1A1A] focus:outline-none"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-[#FDFCFB] px-6 py-6">
          <div className="flex flex-col space-y-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`text-left py-2 border-b border-gray-100 text-sm uppercase tracking-widest ${
                  activeTab === item.id ? 'text-black font-bold' : 'text-gray-500'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-100">
            <a
              href={naverBlogUrl}
              target="_blank"
              rel="noreferrer"
              className="p-2 text-gray-600 hover:text-black transition-colors"
              title="Naver Blog"
            >
              <NaverIcon className="w-4 h-4" />
            </a>
            <a
              href={instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="p-2 text-gray-600 hover:text-black transition-colors"
              title="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
