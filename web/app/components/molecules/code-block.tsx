import Refractor from 'react-refractor';
// import js from 'refractor/lang/javascript';
import ts from 'refractor/lang/typescript';
// import jsx from 'refractor/lang/jsx';
import tsx from 'refractor/lang/tsx';
import sh from 'refractor/lang/bash';
import md from 'refractor/lang/markdown';
import graphql from 'refractor/lang/graphql';
import json from 'refractor/lang/json';

// Refractor.registerLanguage(js);
Refractor.registerLanguage(ts);
Refractor.registerLanguage(tsx);
// Refractor.registerLanguage(jsx);
Refractor.registerLanguage(sh);
Refractor.registerLanguage(md);
Refractor.registerLanguage(graphql);
Refractor.registerLanguage(json);

type CodeBlockProps = {
  value: string;
  language?: string;
  inline?: boolean;
  markers?: number[];
  colors?: {
    main: string;
    secondary: string;
  };
};

const languageMapper = {
  sh: 'bash',
  text: 'md',
  js: 'ts',
  jsx: 'tsx',
};

export function CodeBlock({
  language,
  value,
  inline,
  markers,
  colors,
}: CodeBlockProps) {
  // @ts-ignore
  const lang = languageMapper[language] || language;
  return (
    <div
      className={`
        overflow-x-scroll 
        prose 
        prose-pre:!rounded-none 
        prose-pre:border-4 
        prose-pre:border-green-400 
        prose-pre:!bg-slate-900
        max-w-full
      `}
    >
      <Refractor
        language={lang}
        value={value}
        inline={inline}
        markers={markers}
      />
    </div>
  );
}
