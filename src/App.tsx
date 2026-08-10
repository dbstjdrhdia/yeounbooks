import React, { useState, useEffect } from 'react';
import { ActiveTab, BookCuration, StoryEssay, SiteConfig } from './types';
import {
  getStoredConfig,
  saveStoredConfig,
  getStoredCurations,
  saveStoredCurations,
  getStoredEssays,
  saveStoredEssays,
  getBookmarks,
  toggleBookmark,
  resetToDefaults,
} from './lib/storage';

import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomeView } from './components/HomeView';
import { AboutView } from './components/AboutView';
import { AdminDashboard } from './components/AdminDashboard';
import { BookmarksModal } from './components/BookmarksModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');

  const [config, setConfig] = useState<SiteConfig>(getStoredConfig);
  const [curations, setCurations] = useState<BookCuration[]>(getStoredCurations);
  const [essays, setEssays] = useState<StoryEssay[]>(getStoredEssays);
  const [bookmarks, setBookmarks] = useState<string[]>(getBookmarks);

  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isBookmarksOpen, setIsBookmarksOpen] = useState(false);

  // Sync title & description on load
  useEffect(() => {
    document.title = config.seo.metaTitle || `${config.siteName} - ${config.slogan}`;
  }, [config]);

  // Handle Tab Switch
  const handleTabChange = (tab: ActiveTab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Toggle Bookmark
  const handleToggleBookmark = (id: string) => {
    const updated = toggleBookmark(id);
    setBookmarks(updated);
  };

  // Save Config
  const handleSaveConfig = (newConfig: SiteConfig) => {
    setConfig(newConfig);
    saveStoredConfig(newConfig);
  };

  // Save Curations
  const handleSaveCurations = (newCurations: BookCuration[]) => {
    setCurations(newCurations);
    saveStoredCurations(newCurations);
  };

  // Save Essays
  const handleSaveEssays = (newEssays: StoryEssay[]) => {
    setEssays(newEssays);
    saveStoredEssays(newEssays);
  };

  // Reset to Defaults
  const handleResetDefaults = () => {
    const defaults = resetToDefaults();
    setConfig(defaults.config);
    setCurations(defaults.curations);
    setEssays(defaults.essays);
    setBookmarks([]);
  };

  // Font class helper
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

  // Palette background helper
  const getBgClass = () => {
    switch (config.theme.palette) {
      case 'cool-paper':
        return 'bg-[#F4F5F7] text-[#1A1918]';
      case 'dark-charcoal':
        return 'bg-[#1A1918] text-[#FAF9F5]';
      case 'vintage-sepia':
        return 'bg-[#F5EFEB] text-[#2C2A29]';
      default:
        return 'bg-[#FDFCFB] text-[#1A1A1A]';
    }
  };

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-300 ${getBgClass()} ${getFontClass()}`}>
      {/* GNB Header */}
      <Header
        config={config}
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        onOpenAdmin={() => setIsAdminOpen(true)}
        bookmarkCount={bookmarks.length}
        onOpenBookmarks={() => setIsBookmarksOpen(true)}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <HomeView
            config={config}
            setActiveTab={handleTabChange}
          />
        )}

        {activeTab === 'about' && <AboutView config={config} />}
      </main>

      {/* Footer */}
      <Footer config={config} onOpenAdmin={() => setIsAdminOpen(true)} />

      {/* Admin Dashboard */}
      <AdminDashboard
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        config={config}
        onSaveConfig={handleSaveConfig}
        curations={curations}
        onSaveCurations={handleSaveCurations}
        essays={essays}
        onSaveEssays={handleSaveEssays}
        onResetDefaults={handleResetDefaults}
      />

      {/* Bookmarks Modal */}
      <BookmarksModal
        isOpen={isBookmarksOpen}
        onClose={() => setIsBookmarksOpen(false)}
        bookmarks={bookmarks}
        curations={curations}
        essays={essays}
        onSelectCuration={() => {}}
        onSelectEssay={() => {}}
        onToggleBookmark={handleToggleBookmark}
      />
    </div>
  );
}
