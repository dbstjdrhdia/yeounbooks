import React, { useState } from 'react';
import { ActiveTab, SiteConfig } from '../types';
import { BookOpen, Settings, Bookmark, Instagram, Mail, Sparkles, Menu, X } from 'lucide-react';

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
      {/* Top Operational Notice Banner */}
      {config.operationalNotice.enabled && (
        <div className="bg-[#1A1A1A] text-[#FDFCFB] text-[11px] py-2 px-4 text-center tracking-[0.15em] uppercase font-sans flex items-center justify-center space-x-2">
          <Sparkles className="w-3 h-3 text-[#8E8373] shrink-0" />
          <span className="truncate">{config.operationalNotice.bannerText}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6 sm:px-12 h-20 flex items-center justify-between relative">
        {/* Logo (Left) */}
        <div className="flex items-center space-x-3 cursor-pointer group" onClick={() => setActiveTab('home')}>
          <div className="w-8 h-8 rounded-full border border-black flex items-center justify-center font-serif text-sm font-bold text-[#1A1A1A] group-hover:bg-black group-hover:text-white transition-colors">
            여
          </div>
          <div>
            <span className="text-2xl font-serif font-bold tracking-tighter text-[#1A1A1A] block">
              {config.siteName}
            </span>
            <span className="text-[9px] uppercase tracking-[0.25em] text-[#8E8373] block -mt-1 font-mono">
              {config.siteSubtitle}
            </span>
          </div>
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

        {/* Right Action Icons & Admin Toggle */}
        <div className="hidden md:flex items-center space-x-4">
          {/* Bookmarks */}
          <button
            onClick={onOpenBookmarks}
            className="relative text-gray-600 hover:text-black p-2 transition-colors"
            title="보관한 문장"
          >
            <Bookmark className="w-4 h-4" />
            {bookmarkCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-black text-white text-[9px] flex items-center justify-center font-bold">
                {bookmarkCount}
              </span>
            )}
          </button>

          {/* Social Links */}
          {config.socialLinks.instagram && (
            <a
              href={config.socialLinks.instagram}
              target="_blank"
              rel="noreferrer"
              className="w-6 h-6 rounded-full border border-black flex items-center justify-center text-[10px] font-mono hover:bg-black hover:text-white transition-colors"
              title="Instagram"
            >
              IG
            </a>
          )}
          {config.socialLinks.email && (
            <a
              href={`mailto:${config.socialLinks.email}`}
              className="w-6 h-6 rounded-full border border-black flex items-center justify-center text-[10px] font-mono hover:bg-black hover:text-white transition-colors"
              title="Email Contact"
            >
              MAIL
            </a>
          )}

          {/* Admin Dashboard Button */}
          <button
            onClick={onOpenAdmin}
            className="flex items-center space-x-1.5 border border-black text-[#1A1A1A] hover:bg-black hover:text-white px-3 py-1.5 text-[11px] uppercase tracking-widest transition-colors focus:outline-none"
            title="관리자 설정 & 에디터"
          >
            <Settings className="w-3 h-3" />
            <span>Edit</span>
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center space-x-2">
          <button
            onClick={onOpenAdmin}
            className="p-2 bg-[#1A1918] text-white rounded-full focus:outline-none"
            title="관리자 설정"
          >
            <Settings className="w-4 h-4" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#1A1918] focus:outline-none"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#EAE5D9] bg-[#FAF9F5] px-6 py-6 space-y-4">
          <div className="flex flex-col space-y-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`text-left py-2 border-b border-[#EAE5D9]/50 text-base font-medium font-sans-kr ${
                  activeTab === item.id ? 'text-[#1A1918] font-bold' : 'text-[#665F55]'
                }`}
              >
                {item.label} <span className="text-xs text-stone-500 font-serif-kr">({item.sublabel})</span>
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between pt-4">
            <button
              onClick={() => {
                onOpenBookmarks();
                setMobileMenuOpen(false);
              }}
              className="flex items-center space-x-2 text-sm text-[#665F55]"
            >
              <Bookmark className="w-4 h-4" />
              <span>보관함 ({bookmarkCount})</span>
            </button>

            <button
              onClick={() => {
                onOpenAdmin();
                setMobileMenuOpen(false);
              }}
              className="flex items-center space-x-2 text-xs bg-[#1A1918] text-white px-3 py-1.5 rounded-full"
            >
              <Settings className="w-3.5 h-3.5" />
              <span>관리자 대시보드</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
