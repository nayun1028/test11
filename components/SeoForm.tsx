
import React from 'react';
import type { PostType } from '../types';
import { SparklesIcon } from './icons/SparklesIcon';

interface SeoFormProps {
  postType: PostType;
  setPostType: (type: PostType) => void;
  dramaList: string;
  setDramaList: (list: string) => void;
  onGenerate: () => void;
  isLoading: boolean;
}

export const SeoForm: React.FC<SeoFormProps> = ({
  postType,
  setPostType,
  dramaList,
  setDramaList,
  onGenerate,
  isLoading,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 border border-slate-200 sticky top-8">
      <h2 className="text-xl font-semibold text-slate-700 mb-4">콘텐츠 생성 설정</h2>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-2">1. 게시글 유형 선택</label>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setPostType('upcoming')}
              className={`px-4 py-2 text-sm rounded-md transition-colors duration-200 ${
                postType === 'upcoming'
                  ? 'bg-blue-600 text-white font-semibold shadow'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              방영 예정 드라마
            </button>
            <button
              onClick={() => setPostType('ongoing')}
              className={`px-4 py-2 text-sm rounded-md transition-colors duration-200 ${
                postType === 'ongoing'
                  ? 'bg-blue-600 text-white font-semibold shadow'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              방영 중인 드라마
            </button>
          </div>
        </div>

        <div>
          <label htmlFor="drama-list" className="block text-sm font-medium text-slate-600 mb-2">
            2. 드라마 목록 입력
          </label>
          <textarea
            id="drama-list"
            rows={8}
            value={dramaList}
            onChange={(e) => setDramaList(e.target.value)}
            placeholder="예: 눈물의 여왕&#10;선재 업고 튀어&#10;히어로는 아닙니다만&#10;&#10;한 줄에 한 드라마씩 입력해주세요."
            className="w-full p-3 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-sm shadow-sm"
          />
        </div>

        <button
          onClick={onGenerate}
          disabled={isLoading}
          className="w-full flex items-center justify-center bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 disabled:bg-blue-300 transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          <SparklesIcon className="w-5 h-5 mr-2" />
          {isLoading ? '생성 중...' : '콘텐츠 생성'}
        </button>
      </div>
    </div>
  );
};
