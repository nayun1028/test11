
import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ImageGenerator } from './ImageGenerator';
import { ClipboardIcon } from './icons/ClipboardIcon';
import { useCopyToClipboard } from '../hooks/useCopyToClipboard';

interface GeneratedPostProps {
  content: string;
}

const getHeadingText = (node: any): string => {
    return node.children.map((child: any) => {
        if (child.type === 'text') {
            return child.value;
        }
        return '';
    }).join('');
};

export const GeneratedPost: React.FC<GeneratedPostProps> = ({ content }) => {
    const [isCopied, copy] = useCopyToClipboard();

    return (
        <div className="relative">
            <button
                onClick={() => copy(content)}
                className="absolute top-0 right-0 mt-2 mr-2 bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-semibold py-1 px-3 rounded-md flex items-center transition-colors"
            >
                <ClipboardIcon className="w-4 h-4 mr-1.5"/>
                {isCopied ? '복사 완료!' : '본문 복사'}
            </button>
            <article className="prose prose-slate max-w-none lg:prose-lg prose-h1:font-bold prose-h2:font-semibold prose-h2:border-b prose-h2:pb-2 prose-h2:border-slate-200">
                <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                        h2: ({ node, ...props }) => {
                            const textContent = getHeadingText(node);
                            return (
                                <>
                                    <h2 {...props} />
                                    {textContent && <ImageGenerator subtitle={textContent} />}
                                </>
                            );
                        },
                        h3: ({ node, ...props }) => {
                            const textContent = getHeadingText(node);
                            return (
                                <>
                                    <h3 {...props} />
                                    {textContent && <ImageGenerator subtitle={textContent} />}
                                </>
                            );
                        },
                    }}
                >
                    {content}
                </ReactMarkdown>
            </article>
        </div>
    );
};
