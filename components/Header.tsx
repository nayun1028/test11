
import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm border-b border-slate-200">
      <div className="container mx-auto px-4 py-4 md:px-6 lg:px-8">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
          SEO K-드라마 블로그 포스트 생성기
        </h1>
        <p className="mt-1 text-slate-600">
          전문가 수준의 구글 SEO 최적화 블로그 콘텐츠를 손쉽게 만들어보세요.
        </p>
      </div>
    </header>
  );
};
