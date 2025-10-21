
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { SeoForm } from './components/SeoForm';
import { GeneratedPost } from './components/GeneratedPost';
import { Spinner } from './components/Spinner';
import { Alert } from './components/Alert';
import { generateBlogPost } from './services/geminiService';
import type { PostType } from './types';

const App: React.FC = () => {
  const [postType, setPostType] = useState<PostType>('upcoming');
  const [dramaList, setDramaList] = useState<string>('');
  const [generatedContent, setGeneratedContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = useCallback(async () => {
    if (!dramaList.trim()) {
      setError('드라마 목록을 입력해주세요.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setGeneratedContent('');
    try {
      const content = await generateBlogPost(dramaList, postType);
      setGeneratedContent(content);
    } catch (e) {
      const error = e as Error;
      console.error(e);
      setError(`콘텐츠 생성 중 오류가 발생했습니다: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  }, [dramaList, postType]);

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <Header />
      <main className="container mx-auto p-4 md:p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4 xl:col-span-3">
            <SeoForm
              postType={postType}
              setPostType={setPostType}
              dramaList={dramaList}
              setDramaList={setDramaList}
              onGenerate={handleGenerate}
              isLoading={isLoading}
            />
          </div>
          <div className="lg:col-span-8 xl:col-span-9">
            <div className="bg-white rounded-xl shadow-md p-6 min-h-[60vh] border border-slate-200">
              {isLoading && (
                <div className="flex flex-col items-center justify-center h-full">
                  <Spinner />
                  <p className="mt-4 text-lg text-slate-600">블로그 포스트를 생성하고 있습니다...</p>
                  <p className="text-sm text-slate-500">잠시만 기다려주세요.</p>
                </div>
              )}
              {error && <Alert message={error} />}
              {generatedContent && !isLoading && (
                 <GeneratedPost content={generatedContent} />
              )}
              {!generatedContent && !isLoading && !error && (
                <div className="flex flex-col items-center justify-center h-full text-center text-slate-500">
                    <p className="text-xl font-semibold">콘텐츠가 여기에 표시됩니다.</p>
                    <p className="mt-2">왼쪽 양식을 작성하고 '콘텐츠 생성' 버튼을 클릭하여 시작하세요.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
