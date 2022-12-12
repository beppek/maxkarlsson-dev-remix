import Refractor from "react-refractor";
// import js from 'refractor/lang/javascript';
import ts from "refractor/lang/typescript";
// import jsx from 'refractor/lang/jsx';
import tsx from "refractor/lang/tsx";
import sh from "refractor/lang/bash";
import md from "refractor/lang/markdown";
import graphql from "refractor/lang/graphql";
import json from "refractor/lang/json";

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
  filename?: string;
};

const languageMapper = {
  sh: "bash",
  text: "md",
  js: "ts",
  jsx: "tsx",
};

export function CodeBlock({
  language,
  value,
  inline,
  markers,
  filename,
  colors,
}: CodeBlockProps) {
  // @ts-ignore
  const lang = languageMapper[language] || language;
  return (
    <div
      className={`
        prose 
        prose-pre:!rounded-t-none 
        prose-pre:border-2 
        prose-pre:border-green-400 
        prose-pre:!bg-slate-900
        max-w-full
        prose-pre:!mt-0
        my-10
        prose-pre:!rounded-b-md
      `}
    >
      <div className="bg-green-400 my-0 text-black px-4 border-2 border-b-0 border-green-400 rounded-t-md">
        {filename || lang}
      </div>
      <Refractor
        language={lang}
        value={value}
        inline={inline}
        markers={markers}
      />
    </div>
  );
}
