
import React, { useState, useCallback } from 'react';
import { generateImageForSubtitle } from '../services/geminiService';
import { ImageIcon } from './icons/ImageIcon';
import { Spinner } from './Spinner';

interface ImageGeneratorProps {
  subtitle: string;
}

export const ImageGenerator: React.FC<ImageGeneratorProps> = ({ subtitle }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateImage = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setImageUrl(null);
    try {
      const url = await generateImageForSubtitle(subtitle);
      setImageUrl(url);
    } catch (e) {
      const error = e as Error;
      console.error(e);
      setError(`이미지 생성 실패: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  }, [subtitle]);

  return (
    <div className="my-6 p-4 border-l-4 border-blue-200 bg-blue-50/50 rounded-r-lg not-prose">
      {!imageUrl && !isLoading && (
         <button
            onClick={handleGenerateImage}
            className="inline-flex items-center px-4 py-2 bg-white border border-slate-300 rounded-md shadow-sm text-sm font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition"
         >
            <ImageIcon className="w-5 h-5 mr-2 text-blue-500" />
            이 소제목에 맞는 이미지 생성하기
        </button>
      )}
     
      {isLoading && (
        <div className="flex items-center text-slate-600">
            <Spinner />
            <span className="ml-3">이미지를 생성하고 있습니다...</span>
        </div>
      )}

      {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
      
      {imageUrl && (
        <div>
            <img 
                src={imageUrl} 
                alt={`Generated image for: ${subtitle}`} 
                className="rounded-lg shadow-lg w-full h-auto object-cover"
            />
             <button
                onClick={handleGenerateImage}
                className="mt-4 inline-flex items-center px-3 py-1.5 bg-white border border-slate-300 rounded-md shadow-sm text-xs font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition"
            >
                이미지 재생성
            </button>
        </div>
      )}
    </div>
  );
};
