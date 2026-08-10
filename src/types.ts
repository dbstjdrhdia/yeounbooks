export interface BookCuration {
  id: string;
  title: string;
  subtitle: string;
  author: string;
  publisher: string;
  category: string;
  coverImage: string;
  quote: string;
  review: string;
  tags: string[];
  isFeatured?: boolean;
  publishedMonth?: string; // Optional reference e.g., "2026.08"
}

export interface StoryEssay {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  coverImage: string;
  excerpt: string;
  paragraphs: string[];
  inlineImage?: {
    url: string;
    caption?: string;
  };
  highlightQuote: string;
  readingTime: string;
  isFeatured?: boolean;
  authorName?: string;
}

export type FontStyle = 'gowun' | 'serif' | 'sans';
export type ColorPalette = 'warm-cream' | 'cool-paper' | 'dark-charcoal' | 'vintage-sepia';

export interface SiteConfig {
  siteName: string;
  siteSubtitle: string;
  slogan: string;
  aboutIntro: string;
  aboutBodyParagraphs: string[];
  curatorName: string;
  curatorBio: string;
  curatorImage: string;
  heroBanner: {
    title: string;
    subtitle: string;
    quote: string;
    imageUrl: string;
    badgeText: string;
    linkToType: 'curation' | 'story' | 'about';
    linkToId?: string;
  };
  theme: {
    fontStyle: FontStyle;
    palette: ColorPalette;
    hideDates: boolean;
  };
  operationalNotice: {
    enabled: boolean;
    bannerText: string; // e.g., "매월 1일, 마음에 긴 여운을 남기는 새로운 글과 책이 찾아옵니다."
    modelType: 'monthly' | 'portfolio' | 'sns';
  };
  socialLinks: {
    instagram: string;
    substack: string;
    youtube: string;
    email: string;
  };
  seo: {
    metaTitle: string;
    metaDescription: string;
    ogImage: string;
    keywords: string;
  };
}

export type ActiveTab = 'home' | 'about' | 'curation' | 'story' | 'curation-detail' | 'story-detail';
