import React, { useState } from 'react';
import { ActiveTab, SiteConfig } from '../types';
import { Instagram, Menu, X } from 'lucide-react';

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

  const getFontClass = () => {
    switch (config.theme.fontStyle) {
      case 'gowun':
        return 'font-gowun';
      case 'serif':
        return 'font-serif-kr';
      default:
        return 'font-sans-kr';
    }
  };

  const navItems: { id: ActiveTab; label: string; sublabel: string }[] = [
    { id: 'about', label: 'About', sublabel: '여운소개' },
    { id: 'curation', label: 'Curation', sublabel: '여운의 책' },
    { id: 'story', label: 'Story', sublabel: '여운의 글' },
  ];

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
            const isActive = activeTab === item.id || (activeTab === `${item.id}-detail` as ActiveTab);
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

        {/* Right Action Icons (Instagram) */}
        <div className="hidden md:flex items-center space-x-4">
          {config.socialLinks?.instagram ? (
            <a
              href={config.socialLinks.instagram}
              target="_blank"
              rel="noreferrer"
              className="p-2 text-gray-600 hover:text-black transition-colors rounded-full hover:bg-gray-100 flex items-center justify-center"
              title="Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>
          ) : (
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="p-2 text-gray-600 hover:text-black transition-colors rounded-full hover:bg-gray-100 flex items-center justify-center"
              title="Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>
          )}
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

          <div className="flex items-center justify-end pt-4 border-t border-gray-100">
            <a
              href={config.socialLinks?.instagram || "https://instagram.com"}
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
