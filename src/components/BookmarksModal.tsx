import React from 'react';
import { BookCuration, StoryEssay } from '../types';
import { X, Bookmark, Trash2, ArrowRight } from 'lucide-react';

interface BookmarksModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookmarks: string[];
  curations: BookCuration[];
  essays: StoryEssay[];
  onSelectCuration: (id: string) => void;
  onSelectEssay: (id: string) => void;
  onToggleBookmark: (id: string) => void;
}

export const BookmarksModal: React.FC<BookmarksModalProps> = ({
  isOpen,
  onClose,
  bookmarks,
  curations,
  essays,
  onSelectCuration,
  onSelectEssay,
  onToggleBookmark,
}) => {
  if (!isOpen) return null;

  const bookmarkedCurations = curations.filter(c => bookmarks.includes(c.id));
  const bookmarkedEssays = essays.filter(e => bookmarks.includes(e.id));

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white border border-gray-100 max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-white">
          <div className="flex items-center space-x-2">
            <Bookmark className="w-4 h-4 text-black" />
            <h2 className="text-sm font-mono uppercase tracking-widest text-[#1A1A1A] font-bold">
              Bookmarks ({bookmarks.length})
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-black transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 font-serif">
          {bookmarks.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <Bookmark className="w-8 h-8 text-gray-300 mx-auto" />
              <p className="text-gray-500 font-serif text-sm">
                보관함이 비어 있습니다.<br />마음에 남는 에세이의 북마크 아이콘을 눌러 담아보세요.
              </p>
            </div>
          ) : (
            <>
              {/* Curations */}
              {bookmarkedCurations.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#8E8373] font-bold">
                    Books ({bookmarkedCurations.length})
                  </h3>
                  <div className="space-y-3">
                    {bookmarkedCurations.map((item) => (
                      <div
                        key={item.id}
                        className="bg-white p-4 border border-gray-100 flex items-center justify-between gap-4 hover:border-black transition-all"
                      >
                        <div className="flex items-center space-x-3 overflow-hidden">
                          <img
                            src={item.coverImage}
                            alt={item.title}
                            className="w-12 h-16 object-cover border border-gray-100 shrink-0"
                          />
                          <div className="truncate">
                            <p className="font-serif font-bold text-sm text-[#1A1A1A] truncate">
                              {item.title}
                            </p>
                            <p className="text-xs text-gray-400 italic truncate">
                              "{item.quote}"
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2 shrink-0 font-mono text-xs uppercase tracking-wider">
                          <button
                            onClick={() => {
                              onSelectCuration(item.id);
                              onClose();
                            }}
                            className="p-2 text-black hover:underline flex items-center space-x-1"
                          >
                            <span>View</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => onToggleBookmark(item.id)}
                            className="p-2 text-gray-400 hover:text-black"
                            title="Remove"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Essays */}
              {bookmarkedEssays.length > 0 && (
                <div className="space-y-3 pt-4">
                  <h3 className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#8E8373] font-bold">
                    Stories ({bookmarkedEssays.length})
                  </h3>
                  <div className="space-y-3">
                    {bookmarkedEssays.map((item) => (
                      <div
                        key={item.id}
                        className="bg-white p-4 border border-gray-100 flex items-center justify-between gap-4 hover:border-black transition-all"
                      >
                        <div className="flex items-center space-x-3 overflow-hidden">
                          <img
                            src={item.coverImage}
                            alt={item.title}
                            className="w-16 h-12 object-cover border border-gray-100 shrink-0"
                          />
                          <div className="truncate">
                            <p className="font-serif font-bold text-sm text-[#1A1A1A] truncate">
                              {item.title}
                            </p>
                            <p className="text-xs text-gray-400 italic truncate">
                              {item.excerpt}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2 shrink-0 font-mono text-xs uppercase tracking-wider">
                          <button
                            onClick={() => {
                              onSelectEssay(item.id);
                              onClose();
                            }}
                            className="p-2 text-black hover:underline flex items-center space-x-1"
                          >
                            <span>Read</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => onToggleBookmark(item.id)}
                            className="p-2 text-gray-400 hover:text-black"
                            title="Remove"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
