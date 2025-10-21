
import { GoogleGenAI } from "@google/genai";
import { SYSTEM_PROMPT, UPCOMING_DRAMA_PROMPT, ONGOING_DRAMA_PROMPT, IMAGE_PROMPT_TEMPLATE } from '../constants';
import type { PostType } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function generateBlogPost(dramaList: string, postType: PostType): Promise<string> {
    const postTypePrompt = postType === 'upcoming' ? UPCOMING_DRAMA_PROMPT : ONGOING_DRAMA_PROMPT;
    
    const userPrompt = `
드라마 목록:
${dramaList}

위 목록에 대해 블로그 게시물 초안을 작성해주세요.
`;

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-pro',
        contents: userPrompt,
        config: {
            systemInstruction: `${SYSTEM_PROMPT}\n${postTypePrompt}`,
        }
    });
    
    return response.text;
}

export async function generateImageForSubtitle(subtitle: string): Promise<string> {
    const prompt = IMAGE_PROMPT_TEMPLATE(subtitle);

    const response = await ai.models.generateImages({
        model: 'imagen-4.0-generate-001',
        prompt: prompt,
        config: {
          numberOfImages: 1,
          outputMimeType: 'image/jpeg',
          aspectRatio: '16:9',
        },
    });

    if (response.generatedImages && response.generatedImages.length > 0) {
        const base64ImageBytes = response.generatedImages[0].image.imageBytes;
        return `data:image/jpeg;base64,${base64ImageBytes}`;
    }
    
    throw new Error('이미지를 생성하지 못했습니다.');
}
