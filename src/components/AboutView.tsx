import React from 'react';
import { SiteConfig } from '../types';
import { Feather, Heart, BookOpen, Clock, Compass, Mail, Instagram } from 'lucide-react';

interface AboutViewProps {
  config: SiteConfig;
}

export const AboutView: React.FC<AboutViewProps> = ({ config }) => {
  return (
    <div className="max-w-4xl mx-auto px-6 sm:px-12 py-16 space-y-16">
      {/* Header Title */}
      <div className="text-center space-y-4">
        <span className="text-[10px] uppercase tracking-[0.3em] text-[#8E8373] font-bold block">
          About Yeoun Books
        </span>
        <h1 className="text-4xl sm:text-5xl font-serif text-[#1A1A1A]">
          여운책방 소개
        </h1>
        <p className="text-gray-500 font-serif italic text-base max-w-xl mx-auto">
          “{config.slogan}”
        </p>
      </div>

      {/* Main Hero Image */}
      <div className="relative border border-gray-100 overflow-hidden h-96">
        <img
          src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1600&q=80"
          alt="Yeoun Books Interior"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-8">
          <p className="text-white font-serif text-sm sm:text-base italic max-w-xl">
            지친 일상의 끝자락에서 조용히 내어주는 문장의 안식처
          </p>
        </div>
      </div>

      {/* Brand Philosophy Paragraphs */}
      <div className="bg-white border border-gray-100 p-8 sm:p-12 space-y-8 font-serif text-[#1A1A1A] leading-loose text-base sm:text-lg">
        <div className="space-y-6">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#8E8373] font-mono block">
            Philosophy
          </span>
          <h2 className="text-2xl font-serif font-bold text-[#1A1A1A] border-b border-gray-100 pb-4">
            우리가 추구하는 템포와 철학
          </h2>
          <p className="text-gray-600 leading-relaxed font-light">
            {config.aboutIntro}
          </p>
          {config.aboutBodyParagraphs.map((paragraph, index) => (
            <p key={index} className="text-gray-600 leading-relaxed font-light">
              {paragraph}
            </p>
          ))}
        </div>
      </div>

      {/* Core Brand Values (3 Pillar Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border border-gray-100 p-8 space-y-3 hover:border-black transition-colors">
          <span className="text-[9px] uppercase tracking-widest text-[#8E8373] font-mono block">01</span>
          <h3 className="text-lg font-serif font-bold text-[#1A1A1A]">
            Timeless
          </h3>
          <p className="text-xs text-gray-500 leading-relaxed">
            실시간 뉴스피드가 아닌, 시간이 지나도 가치를 잃지 않는 에버그린 콘텐츠만을 축적합니다.
          </p>
        </div>

        <div className="bg-white border border-gray-100 p-8 space-y-3 hover:border-black transition-colors">
          <span className="text-[9px] uppercase tracking-widest text-[#8E8373] font-mono block">02</span>
          <h3 className="text-lg font-serif font-bold text-[#1A1A1A]">
            High Curation
          </h3>
          <p className="text-xs text-gray-500 leading-relaxed">
            양보다는 완성도에 집착합니다. 한 달에 단 한 권, 단 한 편의 글이라도 묵직하게 담아냅니다.
          </p>
        </div>

        <div className="bg-white border border-gray-100 p-8 space-y-3 hover:border-black transition-colors">
          <span className="text-[9px] uppercase tracking-widest text-[#8E8373] font-mono block">03</span>
          <h3 className="text-lg font-serif font-bold text-[#1A1A1A]">
            Pure Space
          </h3>
          <p className="text-xs text-gray-500 leading-relaxed">
            시각적 소음을 배제하고 넓은 여백과 가독성 높은 레이아웃으로 완벽한 독서 몰입을 선물합니다.
          </p>
        </div>
      </div>

      {/* Curator Profile */}
      <div className="bg-white border border-gray-100 p-8 flex flex-col sm:flex-row items-center space-y-6 sm:space-y-0 sm:space-x-8">
        <img
          src={config.curatorImage}
          alt={config.curatorName}
          className="w-20 h-20 rounded-full object-cover border border-gray-200 shrink-0"
        />
        <div className="space-y-2 text-center sm:text-left">
          <span className="text-[10px] font-bold text-[#8E8373] uppercase tracking-[0.2em] font-mono">
            Curator Note
          </span>
          <h3 className="text-xl font-serif font-bold text-[#1A1A1A]">
            {config.curatorName}
          </h3>
          <p className="text-sm font-serif text-gray-600 leading-relaxed">
            {config.curatorBio}
          </p>
          <div className="pt-2 text-xs text-gray-400 font-mono">
            Contact: {config.socialLinks.email}
          </div>
        </div>
      </div>
    </div>
  );
};
