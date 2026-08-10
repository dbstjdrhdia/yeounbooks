import { BookCuration, StoryEssay, SiteConfig } from '../types';
import { INITIAL_SITE_CONFIG, INITIAL_CURATIONS, INITIAL_ESSAYS } from '../data/initialData';

const CONFIG_KEY = 'yeoun_site_config';
const CURATIONS_KEY = 'yeoun_curations';
const ESSAYS_KEY = 'yeoun_essays';
const BOOKMARKS_KEY = 'yeoun_bookmarks';

export function getStoredConfig(): SiteConfig {
  try {
    const data = localStorage.getItem(CONFIG_KEY);
    if (data) {
      return JSON.parse(data);
    }
  } catch (e) {
    console.error('Failed to parse site config from storage', e);
  }
  return INITIAL_SITE_CONFIG;
}

export function saveStoredConfig(config: SiteConfig) {
  try {
    localStorage.setItem(CONFIG_KEY, JSON.stringify(config));
  } catch (e) {
    console.error('Failed to save config', e);
  }
}

export function getStoredCurations(): BookCuration[] {
  try {
    const data = localStorage.getItem(CURATIONS_KEY);
    if (data) {
      return JSON.parse(data);
    }
  } catch (e) {
    console.error('Failed to parse curations', e);
  }
  return INITIAL_CURATIONS;
}

export function saveStoredCurations(curations: BookCuration[]) {
  try {
    localStorage.setItem(CURATIONS_KEY, JSON.stringify(curations));
  } catch (e) {
    console.error('Failed to save curations', e);
  }
}

export function getStoredEssays(): StoryEssay[] {
  try {
    const data = localStorage.getItem(ESSAYS_KEY);
    if (data) {
      return JSON.parse(data);
    }
  } catch (e) {
    console.error('Failed to parse essays', e);
  }
  return INITIAL_ESSAYS;
}

export function saveStoredEssays(essays: StoryEssay[]) {
  try {
    localStorage.setItem(ESSAYS_KEY, JSON.stringify(essays));
  } catch (e) {
    console.error('Failed to save essays', e);
  }
}

export function getBookmarks(): string[] {
  try {
    const data = localStorage.getItem(BOOKMARKS_KEY);
    if (data) return JSON.parse(data);
  } catch (e) {
    console.error(e);
  }
  return [];
}

export function toggleBookmark(id: string): string[] {
  const current = getBookmarks();
  let updated: string[];
  if (current.includes(id)) {
    updated = current.filter(item => item !== id);
  } else {
    updated = [...current, id];
  }
  try {
    localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error(e);
  }
  return updated;
}

export function resetToDefaults(): { config: SiteConfig; curations: BookCuration[]; essays: StoryEssay[] } {
  localStorage.removeItem(CONFIG_KEY);
  localStorage.removeItem(CURATIONS_KEY);
  localStorage.removeItem(ESSAYS_KEY);
  return {
    config: INITIAL_SITE_CONFIG,
    curations: INITIAL_CURATIONS,
    essays: INITIAL_ESSAYS
  };
}
