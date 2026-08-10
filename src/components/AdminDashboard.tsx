import React, { useState } from 'react';
import { BookCuration, StoryEssay, SiteConfig, FontStyle, ColorPalette } from '../types';
import {
  X,
  Plus,
  Trash2,
  Edit,
  Sparkles,
  Palette,
  FileText,
  BookOpen,
  Layout,
  Search,
  Globe,
  Share2,
  RotateCcw,
  Check,
  Image as ImageIcon,
  HelpCircle,
  Eye
} from 'lucide-react';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  config: SiteConfig;
  onSaveConfig: (config: SiteConfig) => void;
  curations: BookCuration[];
  onSaveCurations: (curations: BookCuration[]) => void;
  essays: StoryEssay[];
  onSaveEssays: (essays: StoryEssay[]) => void;
  onResetDefaults: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  isOpen,
  onClose,
  config,
  onSaveConfig,
  curations,
  onSaveCurations,
  essays,
  onSaveEssays,
  onResetDefaults,
}) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<'content' | 'theme' | 'hero' | 'ai' | 'seo' | 'solution'>('content');
  const [contentSubTab, setContentSubTab] = useState<'curation' | 'essay'>('curation');

  // Form State for editing site config
  const [localConfig, setLocalConfig] = useState<SiteConfig>(config);
  
  // State for AI Generator
  const [aiType, setAiType] = useState<'curation' | 'essay' | 'seo'>('curation');
  const [aiTopic, setAiTopic] = useState('');
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiTone, setAiTone] = useState('감성적이고 깊이 있는');
  const [aiResult, setAiResult] = useState('');
  const [aiLoading, setAiLoading] = useState(false);

  // New Curation State
  const [editingCuration, setEditingCuration] = useState<BookCuration | null>(null);

  // New Essay State
  const [editingEssay, setEditingEssay] = useState<StoryEssay | null>(null);

  // Save Config Changes
  const handleSaveConfig = () => {
    onSaveConfig(localConfig);
    alert('사이트 설정 및 디자인이 성공적으로 적용되었습니다.');
  };

  // AI Call to /api/ai/generate
  const handleGenerateAI = async () => {
    setAiLoading(true);
    setAiResult('');
    try {
      const res = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: aiType,
          topic: aiTopic,
          prompt: aiPrompt,
          tone: aiTone,
        }),
      });
      const data = await res.json();
      if (data.text) {
        setAiResult(data.text);
      } else {
        setAiResult('AI 문장 생성 결과를 불러오지 못했습니다.');
      }
    } catch (e: any) {
      console.error(e);
      setAiResult('오류가 발생했습니다: ' + e.message);
    } finally {
      setAiLoading(false);
    }
  };

  // Handle Curation Save/Add
  const handleSaveCurationForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCuration) return;

    if (curations.some(c => c.id === editingCuration.id)) {
      const updated = curations.map(c => c.id === editingCuration.id ? editingCuration : c);
      onSaveCurations(updated);
    } else {
      onSaveCurations([editingCuration, ...curations]);
    }
    setEditingCuration(null);
  };

  const handleDeleteCuration = (id: string) => {
    if (confirm('이 큐레이션 도서를 삭제하시겠습니까?')) {
      onSaveCurations(curations.filter(c => c.id !== id));
    }
  };

  // Handle Essay Save/Add
  const handleSaveEssayForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingEssay) return;

    if (essays.some(es => es.id === editingEssay.id)) {
      const updated = essays.map(es => es.id === editingEssay.id ? editingEssay : es);
      onSaveEssays(updated);
    } else {
      onSaveEssays([editingEssay, ...essays]);
    }
    setEditingEssay(null);
  };

  const handleDeleteEssay = (id: string) => {
    if (confirm('이 에세이를 삭제하시겠습니까?')) {
      onSaveEssays(essays.filter(es => es.id !== id));
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-2 sm:p-6">
      <div className="bg-[#FAF9F5] border border-[#EAE5D9] rounded-2xl max-w-5xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden font-sans-kr">
        {/* Header */}
        <div className="px-6 py-4 bg-[#1A1918] text-[#FAF9F5] flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-7 h-7 rounded-full bg-[#D2B48C] text-[#1A1918] flex items-center justify-center font-bold text-xs">
              관리
            </div>
            <div>
              <h2 className="text-base font-bold font-gowun">여운책방 통합 관리자 대시보드</h2>
              <p className="text-[11px] text-stone-400">콘텐츠 작성·디자인 커스터마이징·AI 보조·SEO 설정</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => {
                if (confirm('모든 데이터를 초기 플레이스홀더 샘플 상태로 복원하시겠습니까?')) {
                  onResetDefaults();
                  alert('샘플 콘텐츠가 복원되었습니다.');
                  onClose();
                }
              }}
              className="flex items-center space-x-1 bg-stone-800 hover:bg-stone-700 text-stone-300 px-3 py-1.5 rounded-full text-xs font-medium transition-colors"
              title="샘플 콘텐츠 복원"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">샘플 데이터 복원</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-stone-400 hover:text-white rounded-full hover:bg-stone-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main Navigation Tabs */}
        <div className="bg-white border-b border-[#EAE5D9] px-6 flex items-center space-x-2 overflow-x-auto text-xs font-medium text-stone-600">
          <button
            onClick={() => setActiveTab('content')}
            className={`py-3 px-4 flex items-center space-x-2 border-b-2 transition-colors ${
              activeTab === 'content' ? 'border-[#1A1918] text-[#1A1918] font-bold' : 'border-transparent hover:text-[#1A1918]'
            }`}
          >
            <BookOpen className="w-4 h-4 text-[#8C6239]" />
            <span>게시글 & 큐레이션 관리</span>
          </button>

          <button
            onClick={() => setActiveTab('theme')}
            className={`py-3 px-4 flex items-center space-x-2 border-b-2 transition-colors ${
              activeTab === 'theme' ? 'border-[#1A1918] text-[#1A1918] font-bold' : 'border-transparent hover:text-[#1A1918]'
            }`}
          >
            <Palette className="w-4 h-4 text-[#8C6239]" />
            <span>디자인, 색상 & 폰트</span>
          </button>

          <button
            onClick={() => setActiveTab('hero')}
            className={`py-3 px-4 flex items-center space-x-2 border-b-2 transition-colors ${
              activeTab === 'hero' ? 'border-[#1A1918] text-[#1A1918] font-bold' : 'border-transparent hover:text-[#1A1918]'
            }`}
          >
            <Layout className="w-4 h-4 text-[#8C6239]" />
            <span>메인 히어로 & 브랜드</span>
          </button>

          <button
            onClick={() => setActiveTab('ai')}
            className={`py-3 px-4 flex items-center space-x-2 border-b-2 transition-colors ${
              activeTab === 'ai' ? 'border-[#1A1918] text-[#1A1918] font-bold' : 'border-transparent hover:text-[#1A1918]'
            }`}
          >
            <Sparkles className="w-4 h-4 text-[#8C6239]" />
            <span>AI 여운 글쓰기 보조</span>
          </button>

          <button
            onClick={() => setActiveTab('seo')}
            className={`py-3 px-4 flex items-center space-x-2 border-b-2 transition-colors ${
              activeTab === 'seo' ? 'border-[#1A1918] text-[#1A1918] font-bold' : 'border-transparent hover:text-[#1A1918]'
            }`}
          >
            <Globe className="w-4 h-4 text-[#8C6239]" />
            <span>SEO & 소셜 연동</span>
          </button>

          <button
            onClick={() => setActiveTab('solution')}
            className={`py-3 px-4 flex items-center space-x-2 border-b-2 transition-colors ${
              activeTab === 'solution' ? 'border-[#1A1918] text-[#1A1918] font-bold' : 'border-transparent hover:text-[#1A1918]'
            }`}
          >
            <HelpCircle className="w-4 h-4 text-[#8C6239]" />
            <span>운영 솔루션 모델</span>
          </button>
        </div>

        {/* Tab Body Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {/* TAB 1: Content Management (Curations & Essays) */}
          {activeTab === 'content' && (
            <div className="space-y-6">
              {/* Subtabs */}
              <div className="flex items-center space-x-3 bg-stone-100 p-1.5 rounded-xl max-w-md">
                <button
                  onClick={() => {
                    setContentSubTab('curation');
                    setEditingCuration(null);
                  }}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    contentSubTab === 'curation' ? 'bg-white text-[#1A1918] shadow-sm' : 'text-stone-600'
                  }`}
                >
                  여운의 책 (도서 큐레이션)
                </button>
                <button
                  onClick={() => {
                    setContentSubTab('essay');
                    setEditingEssay(null);
                  }}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    contentSubTab === 'essay' ? 'bg-white text-[#1A1918] shadow-sm' : 'text-stone-600'
                  }`}
                >
                  여운의 글 (에세이)
                </button>
              </div>

              {/* Subtab 1: Curation Management */}
              {contentSubTab === 'curation' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-bold font-gowun text-[#1A1918]">
                        도서 큐레이션 목록 ({curations.length}개)
                      </h3>
                      <p className="text-xs text-stone-500">
                        타사 도서를 전시하듯 소개하는 큐레이션 보관함입니다.
                      </p>
                    </div>
                    <button
                      onClick={() => setEditingCuration({
                        id: `curation-${Date.now()}`,
                        title: '',
                        subtitle: '',
                        author: '',
                        publisher: '',
                        category: '에세이',
                        coverImage: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
                        quote: '',
                        review: '',
                        tags: ['사색', '감성'],
                        isFeatured: false
                      })}
                      className="bg-[#1A1918] text-[#FAF9F5] hover:bg-[#3A3835] px-4 py-2 rounded-lg text-xs font-medium flex items-center space-x-1.5"
                    >
                      <Plus className="w-4 h-4" />
                      <span>새 큐레이션 도서 작성</span>
                    </button>
                  </div>

                  {/* Curation Form Modal/Inline */}
                  {editingCuration && (
                    <form onSubmit={handleSaveCurationForm} className="bg-white p-6 rounded-xl border-2 border-[#8C6239] space-y-4 shadow-md">
                      <h4 className="text-sm font-bold font-gowun text-[#8C6239] border-b pb-2">
                        {curations.some(c => c.id === editingCuration.id) ? '큐레이션 수정' : '새 큐레이션 도서 추가'}
                      </h4>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                        <div>
                          <label className="block text-stone-700 font-medium mb-1">도서 제목 *</label>
                          <input
                            type="text"
                            required
                            value={editingCuration.title}
                            onChange={(e) => setEditingCuration({ ...editingCuration, title: e.target.value })}
                            className="w-full p-2.5 bg-[#FAF9F5] border border-[#EAE5D9] rounded-lg focus:outline-none focus:border-[#1A1918]"
                            placeholder="예: 작은 것들의 신성이 피어나는 서가"
                          />
                        </div>

                        <div>
                          <label className="block text-stone-700 font-medium mb-1">부제목 / 부연설명</label>
                          <input
                            type="text"
                            value={editingCuration.subtitle}
                            onChange={(e) => setEditingCuration({ ...editingCuration, subtitle: e.target.value })}
                            className="w-full p-2.5 bg-[#FAF9F5] border border-[#EAE5D9] rounded-lg focus:outline-none focus:border-[#1A1918]"
                            placeholder="예: 침묵 속에서 스스로를 찾아가는 서사"
                          />
                        </div>

                        <div>
                          <label className="block text-stone-700 font-medium mb-1">저자 *</label>
                          <input
                            type="text"
                            required
                            value={editingCuration.author}
                            onChange={(e) => setEditingCuration({ ...editingCuration, author: e.target.value })}
                            className="w-full p-2.5 bg-[#FAF9F5] border border-[#EAE5D9] rounded-lg focus:outline-none focus:border-[#1A1918]"
                            placeholder="예: 한정원"
                          />
                        </div>

                        <div>
                          <label className="block text-stone-700 font-medium mb-1">출판사 *</label>
                          <input
                            type="text"
                            required
                            value={editingCuration.publisher}
                            onChange={(e) => setEditingCuration({ ...editingCuration, publisher: e.target.value })}
                            className="w-full p-2.5 bg-[#FAF9F5] border border-[#EAE5D9] rounded-lg focus:outline-none focus:border-[#1A1918]"
                            placeholder="예: 난다"
                          />
                        </div>

                        <div>
                          <label className="block text-stone-700 font-medium mb-1">카테고리</label>
                          <input
                            type="text"
                            value={editingCuration.category}
                            onChange={(e) => setEditingCuration({ ...editingCuration, category: e.target.value })}
                            className="w-full p-2.5 bg-[#FAF9F5] border border-[#EAE5D9] rounded-lg focus:outline-none focus:border-[#1A1918]"
                            placeholder="예: 에세이 / 독서일기"
                          />
                        </div>

                        <div>
                          <label className="block text-stone-700 font-medium mb-1">표지 이미지 URL</label>
                          <input
                            type="text"
                            value={editingCuration.coverImage}
                            onChange={(e) => setEditingCuration({ ...editingCuration, coverImage: e.target.value })}
                            className="w-full p-2.5 bg-[#FAF9F5] border border-[#EAE5D9] rounded-lg focus:outline-none focus:border-[#1A1918]"
                          />
                        </div>
                      </div>

                      <div className="text-xs">
                        <label className="block text-stone-700 font-medium mb-1">핵심 발췌 문구 (Quote) *</label>
                        <textarea
                          rows={2}
                          required
                          value={editingCuration.quote}
                          onChange={(e) => setEditingCuration({ ...editingCuration, quote: e.target.value })}
                          className="w-full p-2.5 bg-[#FAF9F5] border border-[#EAE5D9] rounded-lg focus:outline-none focus:border-[#1A1918]"
                          placeholder="마음에 가장 깊은 여운을 전하는 핵심 한 문장 발췌"
                        />
                      </div>

                      <div className="text-xs">
                        <label className="block text-stone-700 font-medium mb-1">큐레이터 노상 / 리뷰 에세이 본문 *</label>
                        <textarea
                          rows={4}
                          required
                          value={editingCuration.review}
                          onChange={(e) => setEditingCuration({ ...editingCuration, review: e.target.value })}
                          className="w-full p-2.5 bg-[#FAF9F5] border border-[#EAE5D9] rounded-lg focus:outline-none focus:border-[#1A1918]"
                          placeholder="이 책을 추천하는 깊은 이유와 감상평 작성"
                        />
                      </div>

                      <div className="flex items-center space-x-4 text-xs pt-2">
                        <label className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={editingCuration.isFeatured || false}
                            onChange={(e) => setEditingCuration({ ...editingCuration, isFeatured: e.target.checked })}
                            className="rounded text-[#8C6239] focus:ring-0"
                          />
                          <span className="font-medium text-[#1A1918]">메인 하이라이트 큐레이션으로 지정</span>
                        </label>
                      </div>

                      <div className="flex items-center justify-end space-x-2 pt-2">
                        <button
                          type="button"
                          onClick={() => setEditingCuration(null)}
                          className="px-4 py-2 border border-[#EAE5D9] rounded-lg text-xs font-medium hover:bg-stone-100"
                        >
                          취소
                        </button>
                        <button
                          type="submit"
                          className="px-5 py-2 bg-[#8C6239] text-white rounded-lg text-xs font-medium hover:bg-[#6D4C2B]"
                        >
                          저장하기
                        </button>
                      </div>
                    </form>
                  )}

                  {/* List of Curations */}
                  <div className="space-y-3">
                    {curations.map((item) => (
                      <div
                        key={item.id}
                        className="bg-white p-4 rounded-xl border border-[#EAE5D9] flex items-center justify-between gap-4 shadow-sm"
                      >
                        <div className="flex items-center space-x-4 overflow-hidden">
                          <img
                            src={item.coverImage}
                            alt={item.title}
                            className="w-12 h-16 object-cover rounded shrink-0"
                          />
                          <div className="truncate text-xs space-y-1">
                            <div className="flex items-center space-x-2">
                              {item.isFeatured && (
                                <span className="bg-[#8C6239] text-white text-[9px] px-2 py-0.5 rounded font-bold">
                                  메인 추천
                                </span>
                              )}
                              <span className="font-bold text-[#1A1918] font-gowun text-sm truncate">
                                {item.title}
                              </span>
                            </div>
                            <p className="text-stone-500 font-sans-kr">
                              {item.author} 저 · {item.publisher} ({item.category})
                            </p>
                            <p className="text-stone-600 font-serif-kr italic truncate max-w-lg">
                              “{item.quote}”
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2 shrink-0">
                          <button
                            onClick={() => setEditingCuration(item)}
                            className="p-2 text-stone-600 hover:text-[#1A1918] hover:bg-stone-100 rounded-lg"
                            title="수정"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteCuration(item.id)}
                            className="p-2 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                            title="삭제"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Subtab 2: Essay Management */}
              {contentSubTab === 'essay' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-bold font-gowun text-[#1A1918]">
                        에세이 & 단상 목록 ({essays.length}개)
                      </h3>
                      <p className="text-xs text-stone-500">
                        시간에 구애받지 않고 언제 읽어도 좋은 원본 에세이 아카이브입니다.
                      </p>
                    </div>
                    <button
                      onClick={() => setEditingEssay({
                        id: `story-${Date.now()}`,
                        title: '',
                        subtitle: '',
                        category: '밤의 사색',
                        coverImage: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=1200&q=80',
                        excerpt: '',
                        paragraphs: ['', ''],
                        highlightQuote: '',
                        readingTime: '4분 사색',
                        isFeatured: false,
                        authorName: localConfig.curatorName
                      })}
                      className="bg-[#1A1918] text-[#FAF9F5] hover:bg-[#3A3835] px-4 py-2 rounded-lg text-xs font-medium flex items-center space-x-1.5"
                    >
                      <Plus className="w-4 h-4" />
                      <span>새 에세이 작성</span>
                    </button>
                  </div>

                  {/* Essay Form Modal/Inline */}
                  {editingEssay && (
                    <form onSubmit={handleSaveEssayForm} className="bg-white p-6 rounded-xl border-2 border-[#8C6239] space-y-4 shadow-md">
                      <h4 className="text-sm font-bold font-gowun text-[#8C6239] border-b pb-2">
                        {essays.some(es => es.id === editingEssay.id) ? '에세이 수정' : '새 에세이 작성'}
                      </h4>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                        <div>
                          <label className="block text-stone-700 font-medium mb-1">에세이 제목 *</label>
                          <input
                            type="text"
                            required
                            value={editingEssay.title}
                            onChange={(e) => setEditingEssay({ ...editingEssay, title: e.target.value })}
                            className="w-full p-2.5 bg-[#FAF9F5] border border-[#EAE5D9] rounded-lg focus:outline-none focus:border-[#1A1918]"
                            placeholder="예: 침묵 속에서 들려오는 문장들"
                          />
                        </div>

                        <div>
                          <label className="block text-stone-700 font-medium mb-1">부제목 / 소제목</label>
                          <input
                            type="text"
                            value={editingEssay.subtitle}
                            onChange={(e) => setEditingEssay({ ...editingEssay, subtitle: e.target.value })}
                            className="w-full p-2.5 bg-[#FAF9F5] border border-[#EAE5D9] rounded-lg focus:outline-none focus:border-[#1A1918]"
                            placeholder="예: 세상을 끄고 서가 앞에서 마주하는 온전한 나"
                          />
                        </div>

                        <div>
                          <label className="block text-stone-700 font-medium mb-1">카테고리</label>
                          <input
                            type="text"
                            value={editingEssay.category}
                            onChange={(e) => setEditingEssay({ ...editingEssay, category: e.target.value })}
                            className="w-full p-2.5 bg-[#FAF9F5] border border-[#EAE5D9] rounded-lg focus:outline-none focus:border-[#1A1918]"
                            placeholder="예: 밤의 사색, 공간의 여운"
                          />
                        </div>

                        <div>
                          <label className="block text-stone-700 font-medium mb-1">사색 소요시간 표기</label>
                          <input
                            type="text"
                            value={editingEssay.readingTime}
                            onChange={(e) => setEditingEssay({ ...editingEssay, readingTime: e.target.value })}
                            className="w-full p-2.5 bg-[#FAF9F5] border border-[#EAE5D9] rounded-lg focus:outline-none focus:border-[#1A1918]"
                            placeholder="예: 4분 사색"
                          />
                        </div>

                        <div className="md:col-span-2">
                          <label className="block text-stone-700 font-medium mb-1">대표 커버 이미지 URL</label>
                          <input
                            type="text"
                            value={editingEssay.coverImage}
                            onChange={(e) => setEditingEssay({ ...editingEssay, coverImage: e.target.value })}
                            className="w-full p-2.5 bg-[#FAF9F5] border border-[#EAE5D9] rounded-lg focus:outline-none focus:border-[#1A1918]"
                          />
                        </div>
                      </div>

                      <div className="text-xs">
                        <label className="block text-stone-700 font-medium mb-1">요약 및 한 줄 발췌 (Excerpt) *</label>
                        <textarea
                          rows={2}
                          required
                          value={editingEssay.excerpt}
                          onChange={(e) => setEditingEssay({ ...editingEssay, excerpt: e.target.value })}
                          className="w-full p-2.5 bg-[#FAF9F5] border border-[#EAE5D9] rounded-lg focus:outline-none focus:border-[#1A1918]"
                        />
                      </div>

                      <div className="text-xs">
                        <label className="block text-stone-700 font-medium mb-1">중간 강조 문구 (Highlight Quote)</label>
                        <input
                          type="text"
                          value={editingEssay.highlightQuote}
                          onChange={(e) => setEditingEssay({ ...editingEssay, highlightQuote: e.target.value })}
                          className="w-full p-2.5 bg-[#FAF9F5] border border-[#EAE5D9] rounded-lg focus:outline-none focus:border-[#1A1918]"
                        />
                      </div>

                      {/* Paragraphs */}
                      <div className="text-xs space-y-2">
                        <label className="block text-stone-700 font-medium">에세이 단락 작성 (줄바꿈으로 구별) *</label>
                        <textarea
                          rows={6}
                          required
                          value={editingEssay.paragraphs.join('\n\n')}
                          onChange={(e) => setEditingEssay({ ...editingEssay, paragraphs: e.target.value.split('\n\n') })}
                          className="w-full p-2.5 bg-[#FAF9F5] border border-[#EAE5D9] rounded-lg focus:outline-none focus:border-[#1A1918] font-serif-kr"
                          placeholder="단락과 단락 사이에 두 번의 엔터(줄바꿈)를 입력하면 개별 단락으로 분리됩니다."
                        />
                      </div>

                      <div className="flex items-center space-x-4 text-xs pt-2">
                        <label className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={editingEssay.isFeatured || false}
                            onChange={(e) => setEditingEssay({ ...editingEssay, isFeatured: e.target.checked })}
                            className="rounded text-[#8C6239] focus:ring-0"
                          />
                          <span className="font-medium text-[#1A1918]">메인 대표 에세이로 추천</span>
                        </label>
                      </div>

                      <div className="flex items-center justify-end space-x-2 pt-2">
                        <button
                          type="button"
                          onClick={() => setEditingEssay(null)}
                          className="px-4 py-2 border border-[#EAE5D9] rounded-lg text-xs font-medium hover:bg-stone-100"
                        >
                          취소
                        </button>
                        <button
                          type="submit"
                          className="px-5 py-2 bg-[#8C6239] text-white rounded-lg text-xs font-medium hover:bg-[#6D4C2B]"
                        >
                          에세이 저장
                        </button>
                      </div>
                    </form>
                  )}

                  {/* List of Essays */}
                  <div className="space-y-3">
                    {essays.map((item) => (
                      <div
                        key={item.id}
                        className="bg-white p-4 rounded-xl border border-[#EAE5D9] flex items-center justify-between gap-4 shadow-sm"
                      >
                        <div className="flex items-center space-x-4 overflow-hidden">
                          <img
                            src={item.coverImage}
                            alt={item.title}
                            className="w-16 h-12 object-cover rounded shrink-0"
                          />
                          <div className="truncate text-xs space-y-1">
                            <div className="flex items-center space-x-2">
                              {item.isFeatured && (
                                <span className="bg-[#8C6239] text-white text-[9px] px-2 py-0.5 rounded font-bold">
                                  추천
                                </span>
                              )}
                              <span className="font-bold text-[#1A1918] font-gowun text-sm truncate">
                                {item.title}
                              </span>
                            </div>
                            <p className="text-stone-500 font-sans-kr">
                              {item.category} · {item.readingTime}
                            </p>
                            <p className="text-stone-600 font-serif-kr italic truncate max-w-lg">
                              {item.excerpt}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2 shrink-0">
                          <button
                            onClick={() => setEditingEssay(item)}
                            className="p-2 text-stone-600 hover:text-[#1A1918] hover:bg-stone-100 rounded-lg"
                            title="수정"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteEssay(item.id)}
                            className="p-2 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                            title="삭제"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: Theme, Fonts, Colors Customizer */}
          {activeTab === 'theme' && (
            <div className="space-y-8 max-w-3xl">
              <div>
                <h3 className="text-lg font-bold font-gowun text-[#1A1918]">
                  디자인 & 테마 커스터마이징
                </h3>
                <p className="text-xs text-stone-500">
                  웹사이트 전체의 폰트 페어링, 팔레트 및 에버그린 날짜 표시 여부를 실시간 설정합니다.
                </p>
              </div>

              {/* Font Style Selection */}
              <div className="space-y-3">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#8C6239]">
                  폰트 페어링 스타일 (Typography Presets)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <button
                    type="button"
                    onClick={() => setLocalConfig({
                      ...localConfig,
                      theme: { ...localConfig.theme, fontStyle: 'gowun' }
                    })}
                    className={`p-4 rounded-xl border text-left transition-all ${
                      localConfig.theme.fontStyle === 'gowun'
                        ? 'border-[#1A1918] bg-white ring-2 ring-[#1A1918]'
                        : 'border-[#EAE5D9] bg-stone-50 hover:bg-white'
                    }`}
                  >
                    <span className="font-gowun text-base font-bold block text-[#1A1918]">
                      Gowun Batang
                    </span>
                    <span className="text-[11px] text-stone-500 font-sans-kr block mt-1">
                      고운바탕 (따뜻한 한국 문학 서점 감성)
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setLocalConfig({
                      ...localConfig,
                      theme: { ...localConfig.theme, fontStyle: 'serif' }
                    })}
                    className={`p-4 rounded-xl border text-left transition-all ${
                      localConfig.theme.fontStyle === 'serif'
                        ? 'border-[#1A1918] bg-white ring-2 ring-[#1A1918]'
                        : 'border-[#EAE5D9] bg-stone-50 hover:bg-white'
                    }`}
                  >
                    <span className="font-serif-kr text-base font-bold block text-[#1A1918]">
                      Noto Serif KR
                    </span>
                    <span className="text-[11px] text-stone-500 font-sans-kr block mt-1">
                      명조체 (정제된 클래식 잡지)
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setLocalConfig({
                      ...localConfig,
                      theme: { ...localConfig.theme, fontStyle: 'sans' }
                    })}
                    className={`p-4 rounded-xl border text-left transition-all ${
                      localConfig.theme.fontStyle === 'sans'
                        ? 'border-[#1A1918] bg-white ring-2 ring-[#1A1918]'
                        : 'border-[#EAE5D9] bg-stone-50 hover:bg-white'
                    }`}
                  >
                    <span className="font-sans-kr text-base font-bold block text-[#1A1918]">
                      Noto Sans KR
                    </span>
                    <span className="text-[11px] text-stone-500 font-sans-kr block mt-1">
                      고딕체 (모던하고 깔끔한 분위기)
                    </span>
                  </button>
                </div>
              </div>

              {/* Color Palette */}
              <div className="space-y-3">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#8C6239]">
                  색상 팔레트 테마 (Color Palette)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setLocalConfig({
                      ...localConfig,
                      theme: { ...localConfig.theme, palette: 'warm-cream' }
                    })}
                    className={`p-4 rounded-xl border text-left transition-all flex items-center space-x-3 ${
                      localConfig.theme.palette === 'warm-cream' ? 'border-[#1A1918] ring-2 ring-[#1A1918]' : 'border-[#EAE5D9]'
                    } bg-[#FAF9F5]`}
                  >
                    <div className="w-8 h-8 rounded-full bg-[#1A1918] border border-stone-300" />
                    <div>
                      <span className="text-xs font-bold block text-[#1A1918]">Warm Cream</span>
                      <span className="text-[11px] text-stone-500">따뜻한 오프화이트 & 딥 숯색 (기본 설정)</span>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setLocalConfig({
                      ...localConfig,
                      theme: { ...localConfig.theme, palette: 'cool-paper' }
                    })}
                    className={`p-4 rounded-xl border text-left transition-all flex items-center space-x-3 ${
                      localConfig.theme.palette === 'cool-paper' ? 'border-[#1A1918] ring-2 ring-[#1A1918]' : 'border-[#EAE5D9]'
                    } bg-[#F4F5F7]`}
                  >
                    <div className="w-8 h-8 rounded-full bg-[#24292E] border border-stone-300" />
                    <div>
                      <span className="text-xs font-bold block text-[#1A1918]">Cool Paper</span>
                      <span className="text-[11px] text-stone-500">차분한 인쇄지 페이퍼 그레이</span>
                    </div>
                  </button>
                </div>
              </div>

              {/* Hide Dates Option */}
              <div className="bg-white p-5 rounded-xl border border-[#EAE5D9] flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-[#1A1918]">에버그린 UI: 날짜 표기 숨기기</h4>
                  <p className="text-xs text-stone-500">
                    게시글 작성일(Date) 노출을 숨겨 언제 들어오든 최신의 세련된 서가로 느끼게 만듭니다.
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={localConfig.theme.hideDates}
                    onChange={(e) => setLocalConfig({
                      ...localConfig,
                      theme: { ...localConfig.theme, hideDates: e.target.checked }
                    })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-stone-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#8C6239]"></div>
                </label>
              </div>

              <div className="pt-4 border-t border-[#EAE5D9]">
                <button
                  type="button"
                  onClick={handleSaveConfig}
                  className="bg-[#1A1918] text-[#FAF9F5] px-6 py-2.5 rounded-lg text-xs font-medium hover:bg-[#3A3835]"
                >
                  디자인 설정 적용 및 저장
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: Hero & Brand Info */}
          {activeTab === 'hero' && (
            <div className="space-y-6 max-w-3xl">
              <div>
                <h3 className="text-lg font-bold font-gowun text-[#1A1918]">
                  메인 히어로 배너 & 브랜드 정보
                </h3>
                <p className="text-xs text-stone-500">
                  사이트 접속 시 첫눈에 시선을 압도하는 히어로 배너 문구와 대표 이미지를 변경합니다.
                </p>
              </div>

              <div className="space-y-4 text-xs bg-white p-6 rounded-xl border border-[#EAE5D9]">
                <div>
                  <label className="block text-stone-700 font-medium mb-1">사이트 명칭</label>
                  <input
                    type="text"
                    value={localConfig.siteName}
                    onChange={(e) => setLocalConfig({ ...localConfig, siteName: e.target.value })}
                    className="w-full p-2.5 bg-[#FAF9F5] border border-[#EAE5D9] rounded-lg focus:outline-none focus:border-[#1A1918]"
                  />
                </div>

                <div>
                  <label className="block text-stone-700 font-medium mb-1">핵심 슬로건</label>
                  <input
                    type="text"
                    value={localConfig.slogan}
                    onChange={(e) => setLocalConfig({ ...localConfig, slogan: e.target.value })}
                    className="w-full p-2.5 bg-[#FAF9F5] border border-[#EAE5D9] rounded-lg focus:outline-none focus:border-[#1A1918]"
                  />
                </div>

                <div>
                  <label className="block text-stone-700 font-medium mb-1">히어로 배너 제목</label>
                  <input
                    type="text"
                    value={localConfig.heroBanner.title}
                    onChange={(e) => setLocalConfig({
                      ...localConfig,
                      heroBanner: { ...localConfig.heroBanner, title: e.target.value }
                    })}
                    className="w-full p-2.5 bg-[#FAF9F5] border border-[#EAE5D9] rounded-lg focus:outline-none focus:border-[#1A1918]"
                  />
                </div>

                <div>
                  <label className="block text-stone-700 font-medium mb-1">히어로 핵심 문구 (Quote)</label>
                  <textarea
                    rows={2}
                    value={localConfig.heroBanner.quote}
                    onChange={(e) => setLocalConfig({
                      ...localConfig,
                      heroBanner: { ...localConfig.heroBanner, quote: e.target.value }
                    })}
                    className="w-full p-2.5 bg-[#FAF9F5] border border-[#EAE5D9] rounded-lg focus:outline-none focus:border-[#1A1918] font-serif-kr"
                  />
                </div>

                <div>
                  <label className="block text-stone-700 font-medium mb-1">히어로 배경 대표 이미지 URL</label>
                  <input
                    type="text"
                    value={localConfig.heroBanner.imageUrl}
                    onChange={(e) => setLocalConfig({
                      ...localConfig,
                      heroBanner: { ...localConfig.heroBanner, imageUrl: e.target.value }
                    })}
                    className="w-full p-2.5 bg-[#FAF9F5] border border-[#EAE5D9] rounded-lg focus:outline-none focus:border-[#1A1918]"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleSaveConfig}
                  className="bg-[#1A1918] text-[#FAF9F5] px-6 py-2.5 rounded-lg text-xs font-medium hover:bg-[#3A3835]"
                >
                  브랜드 & 히어로 설정 저장
                </button>
              </div>
            </div>
          )}

          {/* TAB 4: Gemini AI Assistant */}
          {activeTab === 'ai' && (
            <div className="space-y-6 max-w-3xl">
              <div className="bg-[#1A1918] text-[#FAF9F5] p-6 rounded-2xl space-y-2">
                <div className="flex items-center space-x-2 text-[#D2B48C]">
                  <Sparkles className="w-5 h-5" />
                  <h3 className="text-base font-bold font-gowun">Gemini AI 여운 문장 생성 보조기</h3>
                </div>
                <p className="text-xs text-stone-300 leading-relaxed font-serif-kr">
                  책방 지기를 위한 AI 어시스턴트입니다. 새로운 도서 큐레이션 노트, 감성 에세이 초안, 소셜 미디어 인스타그램용 홍보 문구를 감성적이고 정제된 어조로 자동 생성해줍니다.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl border border-[#EAE5D9] space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-stone-700 font-medium mb-1">생성 목적 선택</label>
                    <select
                      value={aiType}
                      onChange={(e) => setAiType(e.target.value as any)}
                      className="w-full p-2.5 bg-[#FAF9F5] border border-[#EAE5D9] rounded-lg focus:outline-none focus:border-[#1A1918]"
                    >
                      <option value="curation">도서 큐레이션 노트 작성</option>
                      <option value="essay">감성 에세이 초안 작성</option>
                      <option value="seo">SEO & 소셜 미디어 문구</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-stone-700 font-medium mb-1">문체 및 톤앤매너</label>
                    <input
                      type="text"
                      value={aiTone}
                      onChange={(e) => setAiTone(e.target.value)}
                      className="w-full p-2.5 bg-[#FAF9F5] border border-[#EAE5D9] rounded-lg focus:outline-none focus:border-[#1A1918]"
                      placeholder="예: 따뜻하고 깊이 있는 명조체 감성"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-stone-700 font-medium mb-1">책 제목 또는 글 주제</label>
                  <input
                    type="text"
                    value={aiTopic}
                    onChange={(e) => setAiTopic(e.target.value)}
                    className="w-full p-2.5 bg-[#FAF9F5] border border-[#EAE5D9] rounded-lg focus:outline-none focus:border-[#1A1918]"
                    placeholder="예: 최진영 소설 [구의 증명] or 밤의 고요함과 서가"
                  />
                </div>

                <div>
                  <label className="block text-stone-700 font-medium mb-1">포함할 아이디어 및 메모</label>
                  <textarea
                    rows={3}
                    value={aiPrompt}
                    onChange={(e) => setAiPrompt(e.target.value)}
                    className="w-full p-2.5 bg-[#FAF9F5] border border-[#EAE5D9] rounded-lg focus:outline-none focus:border-[#1A1918]"
                    placeholder="AI가 참조할 주요 생각이나 키워드를 자유롭게 적어주세요."
                  />
                </div>

                <button
                  type="button"
                  onClick={handleGenerateAI}
                  disabled={aiLoading}
                  className="bg-[#8C6239] text-white px-6 py-2.5 rounded-lg font-medium hover:bg-[#6D4C2B] transition-colors flex items-center space-x-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{aiLoading ? 'AI 문장 생성 중...' : 'AI 문장 작성 시작'}</span>
                </button>
              </div>

              {/* AI Result Box */}
              {aiResult && (
                <div className="bg-[#FAF9F5] border border-[#8C6239] p-6 rounded-xl space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#8C6239] uppercase tracking-wider">
                      AI 생성 결과
                    </span>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(aiResult);
                        alert('결과 문장이 클립보드에 복사되었습니다.');
                      }}
                      className="text-xs text-stone-600 hover:text-[#1A1918] underline"
                    >
                      문장 복사하기
                    </button>
                  </div>
                  <div className="whitespace-pre-wrap text-sm font-serif-kr text-[#2C2A29] leading-relaxed p-4 bg-white rounded-lg border border-[#EAE5D9]">
                    {aiResult}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 5: SEO Tools & Social Media Links */}
          {activeTab === 'seo' && (
            <div className="space-y-6 max-w-3xl">
              <div>
                <h3 className="text-lg font-bold font-gowun text-[#1A1918]">
                  SEO 도구 & 소셜 미디어 연동
                </h3>
                <p className="text-xs text-stone-500">
                  검색엔진 최적화 메타데이터와 인스타그램, 뉴스레터 링크를 관리합니다.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl border border-[#EAE5D9] space-y-4 text-xs">
                <div>
                  <label className="block text-stone-700 font-medium mb-1">SEO 메타 타이틀 (SEO Title)</label>
                  <input
                    type="text"
                    value={localConfig.seo.metaTitle}
                    onChange={(e) => setLocalConfig({
                      ...localConfig,
                      seo: { ...localConfig.seo, metaTitle: e.target.value }
                    })}
                    className="w-full p-2.5 bg-[#FAF9F5] border border-[#EAE5D9] rounded-lg focus:outline-none focus:border-[#1A1918]"
                  />
                </div>

                <div>
                  <label className="block text-stone-700 font-medium mb-1">SEO 메타 디스크립션 (Meta Description)</label>
                  <textarea
                    rows={2}
                    value={localConfig.seo.metaDescription}
                    onChange={(e) => setLocalConfig({
                      ...localConfig,
                      seo: { ...localConfig.seo, metaDescription: e.target.value }
                    })}
                    className="w-full p-2.5 bg-[#FAF9F5] border border-[#EAE5D9] rounded-lg focus:outline-none focus:border-[#1A1918]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-stone-700 font-medium mb-1">Instagram URL</label>
                    <input
                      type="text"
                      value={localConfig.socialLinks.instagram}
                      onChange={(e) => setLocalConfig({
                        ...localConfig,
                        socialLinks: { ...localConfig.socialLinks, instagram: e.target.value }
                      })}
                      className="w-full p-2.5 bg-[#FAF9F5] border border-[#EAE5D9] rounded-lg focus:outline-none focus:border-[#1A1918]"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-700 font-medium mb-1">이메일 문의처</label>
                    <input
                      type="text"
                      value={localConfig.socialLinks.email}
                      onChange={(e) => setLocalConfig({
                        ...localConfig,
                        socialLinks: { ...localConfig.socialLinks, email: e.target.value }
                      })}
                      className="w-full p-2.5 bg-[#FAF9F5] border border-[#EAE5D9] rounded-lg focus:outline-none focus:border-[#1A1918]"
                    />
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={handleSaveConfig}
                className="bg-[#1A1918] text-[#FAF9F5] px-6 py-2.5 rounded-lg text-xs font-medium hover:bg-[#3A3835]"
              >
                SEO & 소셜 설정 저장
              </button>
            </div>
          )}

          {/* TAB 6: Operational Perspective Solutions */}
          {activeTab === 'solution' && (
            <div className="space-y-6 max-w-3xl">
              <div>
                <h3 className="text-lg font-bold font-gowun text-[#1A1918]">
                  4단계: 여유로운 운영을 위한 다각적 운영 모델 설정
                </h3>
                <p className="text-xs text-stone-500">
                  운영자의 업데이트 부담을 줄이면서 방문자에게 세련된 브랜딩을 유지하는 3가지 운영 솔루션을 전환합니다.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {/* Model A */}
                <div
                  onClick={() => setLocalConfig({
                    ...localConfig,
                    operationalNotice: {
                      enabled: true,
                      bannerText: '매월 1일, 마음에 긴 여운을 남기는 새로운 문장과 엄선된 도서가 찾아옵니다.',
                      modelType: 'monthly'
                    }
                  })}
                  className={`p-5 rounded-xl border text-left cursor-pointer transition-all ${
                    localConfig.operationalNotice.modelType === 'monthly'
                      ? 'border-[#8C6239] bg-white ring-2 ring-[#8C6239]'
                      : 'border-[#EAE5D9] bg-stone-50 hover:bg-white'
                  }`}
                >
                  <span className="text-xs font-bold text-[#8C6239] uppercase tracking-wider block">
                    관점 A: 월간 테마 전시 모델 (희소성 브랜딩)
                  </span>
                  <h4 className="text-base font-bold font-gowun text-[#1A1918] mt-1">
                    “매월 1일, 새로운 여운이 찾아옵니다”
                  </h4>
                  <p className="text-xs text-stone-600 font-sans-kr mt-2 leading-relaxed">
                    한 달에 한 번만 업데이트하되 웹진 발행일처럼 브랜딩하여 독자가 그날을 기다리게 만드는 전략입니다.
                  </p>
                </div>

                {/* Model B */}
                <div
                  onClick={() => setLocalConfig({
                    ...localConfig,
                    operationalNotice: {
                      enabled: true,
                      bannerText: '여운책방은 시간에 구애받지 않는 고품질 타임리스 쇼룸입니다.',
                      modelType: 'portfolio'
                    }
                  })}
                  className={`p-5 rounded-xl border text-left cursor-pointer transition-all ${
                    localConfig.operationalNotice.modelType === 'portfolio'
                      ? 'border-[#8C6239] bg-white ring-2 ring-[#8C6239]'
                      : 'border-[#EAE5D9] bg-stone-50 hover:bg-white'
                  }`}
                >
                  <span className="text-xs font-bold text-[#8C6239] uppercase tracking-wider block">
                    관점 B: 포트폴리오형 쇼룸 모델
                  </span>
                  <h4 className="text-base font-bold font-gowun text-[#1A1918] mt-1">
                    고급스러운 브랜드 명함 및 서가 포트폴리오
                  </h4>
                  <p className="text-xs text-stone-600 font-sans-kr mt-2 leading-relaxed">
                    주기적 방문 매체가 아니라 정체성을 전달하는 쇼룸입니다. 소수의 대표글만 올려두고 브랜딩에 집중합니다.
                  </p>
                </div>

                {/* Model C */}
                <div
                  onClick={() => setLocalConfig({
                    ...localConfig,
                    operationalNotice: {
                      enabled: true,
                      bannerText: '인스타그램 @yeounbooks에서 수시로 소소한 단상을 전합니다.',
                      modelType: 'sns'
                    }
                  })}
                  className={`p-5 rounded-xl border text-left cursor-pointer transition-all ${
                    localConfig.operationalNotice.modelType === 'sns'
                      ? 'border-[#8C6239] bg-white ring-2 ring-[#8C6239]'
                      : 'border-[#EAE5D9] bg-stone-50 hover:bg-white'
                  }`}
                >
                  <span className="text-xs font-bold text-[#8C6239] uppercase tracking-wider block">
                    관점 C: SNS 본진 연동 모델
                  </span>
                  <h4 className="text-base font-bold font-gowun text-[#1A1918] mt-1">
                    인스타그램 (데일리 소통) + 홈페이지 (깊은 아카이브)
                  </h4>
                  <p className="text-xs text-stone-600 font-sans-kr mt-2 leading-relaxed">
                    가벼운 일상은 인스타그램에, 깊이 있는 이야기는 홈페이지 '본진'에만 한정하여 작성 부담을 줄입니다.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleSaveConfig}
                className="bg-[#1A1918] text-[#FAF9F5] px-6 py-2.5 rounded-lg text-xs font-medium hover:bg-[#3A3835]"
              >
                운영 모델 적용 및 저장
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
