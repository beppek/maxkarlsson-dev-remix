import getYouTubeId from "get-youtube-id";
import YouTube from "react-youtube";
import SanityBlockContent from "@sanity/block-content-to-react";
import type { CMSImage, CMSPalette } from "~/common/types";
import { getUrlForImage } from "~/lib/sanity";
import { CodeBlock } from "~/components/molecules/code-block";
import { InlineCode } from "~/components/atoms/inline-code";
import { Hint } from "~/components/molecules/hint";
import { Link } from "@remix-run/react";
import { config } from "config";

type BlockNode = {
  language?: string;
  code?: string;
  asset?: CMSImage["asset"];
  alt?: string;
  url?: string;
  content?: string;
  variant?: string;
};

type Block = {
  node: BlockNode;
};

type Props = {
  blocks: Block[] | any[];
  foregroundColor?: string;
  palette?: CMSPalette;
};

const extensionToLanguageMapper = {
  tsx: "tsx",
  ts: "typescript",
  sh: "bash",
};

const serializers = (colors?: { main: string; secondary: string }) => ({
  types: {
    code: ({ node }: any) => {
      const extension = node.filename?.split(".")?.[1];
      const language = extension
        ? // @ts-ignore
          extensionToLanguageMapper[extension] || node.language
        : node.language;
      return (
        <CodeBlock
          filename={node.filename}
          colors={colors}
          language={language}
          value={node.code}
        />
      );
    },
    imageAlt: ({ node }: Block) => {
      const width = 250;
      const height =
        (node?.asset?.metadata?.dimensions?.aspectRatio || 1) * width;
      return (
        <img
          style={{
            width: `${width}px`,
            height: `${height}px`,
          }}
          className="py-2 inline-block"
          src={getUrlForImage(node)
            .width(Math.floor(width))
            .height(Math.floor(height))
            .url()}
          alt={node.alt}
        />
      );
    },
    youtube: ({ node }: Block) => {
      const { url } = node;
      const id = getYouTubeId(url as string);
      // @ts-ignore
      return <YouTube videoId={id} />;
    },
    hint: ({ node }: Block) => (
      <Hint
        variant={node.variant as "tip" | "warning"}
        colors={colors as any}
        content={node.content as string}
      />
    ),
  },
  marks: {
    link: ({ children, mark }: any) => {
      return (
        <a
          className="transition-colors dark:text-green-400 text-green-700 dark:hover:text-pink-400 hover:text-pink-600"
          href={mark.href}
        >
          {children}
        </a>
      );
    },
    internalLink: ({ children, mark }: any) => {
      const slug =
        mark.slug?.current === "index"
          ? "/"
          : mark.refType === "post"
          ? `/blog/${mark.slug?.current}`
          : `/${mark.slug?.current}`;
      const href = mark.anchor ? `${slug}${mark.anchor}` : slug;
      return (
        <Link
          // style={{ color: colors?.main }}
          className="text-green-400 hover:text-pink-400"
          to={href}
        >
          {children}
        </Link>
      );
    },
    code: ({ children }: any) => <InlineCode value={children.join(" ")} />,
  },
});

export function BlockContent({ foregroundColor, palette, blocks }: Props) {
  const mainColor = palette?.vibrant;
  const secondaryColor = palette?.darkVibrant;
  return (
    <div
      className={`
        w-full 
        prose 
        prose-slate 
        prose-headings:font-heading 
        prose-headings:prose-base 
        prose-headings:leading-10 
        prose-headings:mb-8 
        lg:prose-headings:inline-block
        prose-headings:border-b-2
        prose-headings:border-green-400
        leading-8
        dark:prose-invert 
        max-w-full 
        text-black 
        dark:text-white
      `}
    >
      <SanityBlockContent
        dataset={config.sanity.dataset}
        projectId={config.sanity.projectId}
        blocks={blocks}
        serializers={serializers({
          main: mainColor?.background as string,
          secondary: secondaryColor?.background as string,
        })}
      />
    </div>
  );
}
