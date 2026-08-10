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
          src="https://images.unsplash.com/photo-1440688807730-73e4e2169fb8?auto=format&fit=crop&w=1600&q=80"
          alt="Calm misty water reflecting the philosophy of Yeoun Books"
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
          <div className="space-y-8 mt-8">
            <p className="text-gray-600 leading-loose font-light break-keep whitespace-pre-line">
              {config.aboutIntro}
            </p>
            {config.aboutBodyParagraphs.map((paragraph, index) => (
              <p key={index} className="text-gray-600 leading-loose font-light break-keep whitespace-pre-line">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* Core Brand Values (3 Pillar Cards) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white border border-gray-100 p-8 lg:p-10 space-y-4 hover:border-black transition-colors">
          <span className="text-[10px] uppercase tracking-widest text-[#8E8373] font-mono block">01</span>
          <h3 className="text-xl font-serif font-bold text-[#1A1A1A]">
            Timeless
          </h3>
          <p className="text-[13px] text-gray-500 leading-[1.8] break-keep">
            시대의 유행에 휩쓸리지 않고, 오랜 시간이 흐른 뒤에도 서재 한 켠에 남겨두고 싶은 텍스트만을 지향합니다.
          </p>
        </div>

        <div className="bg-white border border-gray-100 p-8 lg:p-10 space-y-4 hover:border-black transition-colors">
          <span className="text-[10px] uppercase tracking-widest text-[#8E8373] font-mono block">02</span>
          <h3 className="text-xl font-serif font-bold text-[#1A1A1A]">
            Slow Paced
          </h3>
          <p className="text-[13px] text-gray-500 leading-[1.8] break-keep">
            빠른 출간보다는 온전한 사유를 믿습니다. 조급함을 내려놓고 문장이 온전히 숨 쉴 수 있는 여백을 만들어갑니다.
          </p>
        </div>

        <div className="bg-white border border-gray-100 p-8 lg:p-10 space-y-4 hover:border-black transition-colors">
          <span className="text-[10px] uppercase tracking-widest text-[#8E8373] font-mono block">03</span>
          <h3 className="text-xl font-serif font-bold text-[#1A1A1A]">
            Minimalism
          </h3>
          <p className="text-[13px] text-gray-500 leading-[1.8] break-keep">
            불필요한 수사와 시각적 소음을 배제하고, 독자가 활자의 본질적인 질감과 의미에만 깊이 몰입할 수 있도록 돕습니다.
          </p>
        </div>
      </div>
    </div>
  );
};
