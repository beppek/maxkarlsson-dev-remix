import getYouTubeId from 'get-youtube-id';
import YouTube from 'react-youtube';
import SanityBlockContent from '@sanity/block-content-to-react';
import type { CMSImage, CMSPalette } from '~/common/types';
import { getUrlForImage } from '~/lib/sanity';
import { CodeBlock } from '~/components/molecules/code-block';
import { InlineCode } from '~/components/atoms/inline-code';
import { Hint } from '~/components/molecules/hint';
import { Link } from '@remix-run/react';
import { config } from 'config';

type BlockNode = {
  language?: string;
  code?: string;
  asset?: CMSImage['asset'];
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
  tsx: 'tsx',
  ts: 'typescript',
  sh: 'bash',
};

const serializers = (colors?: { main: string; secondary: string }) => ({
  types: {
    code: ({ node }: any) => {
      const extension = node.filename?.split('.')?.[1];
      // @ts-ignore
      const language = extensionToLanguageMapper[extension] || node.language;
      return (
        <CodeBlock colors={colors} language={language} value={node.code} />
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
        variant={node.variant as 'tip' | 'warning'}
        colors={colors as any}
        content={node.content as string}
      />
    ),
  },
  marks: {
    link: ({ children, mark }: any) => <Link to={mark.href}>{children}</Link>,
    internalLink: ({ children, mark }: any) => {
      const slug =
        mark.slug?.current === 'index'
          ? '/'
          : mark.refType === 'post'
          ? `/blog/${mark.slug?.current}`
          : `/${mark.slug?.current}`;
      const href = mark.anchor ? `${slug}${mark.anchor}` : slug;
      return <Link to={href}>{children}</Link>;
    },
    code: ({ children }: any) => <InlineCode value={children.join(' ')} />,
  },
});

export function BlockContent({ foregroundColor, palette, blocks }: Props) {
  const mainColor = palette?.vibrant;
  const secondaryColor = palette?.darkVibrant;
  return (
    <div
      className="w-full prose max-w-full"
      // sx={{
      //   p: {
      //     marginY: 4,
      //     lineHeight: 1.8,
      //   },
      //   ul: {
      //     marginY: 8,
      //     lineHeight: 1.8,
      //     paddingInlineStart: '40px',
      //   },
      //   ol: {
      //     marginY: 8,
      //     lineHeight: 1.8,
      //     paddingInlineStart: '40px',
      //   },
      //   a: {
      //     _hover: {
      //       textColor: 'brand.200',
      //     },
      //     textColor: foregroundColor || 'link',
      //   },
      //   h1: {
      //     mt: '8',
      //     fontFamily: fonts.heading,
      //     fontSize: '3xl',
      //   },
      //   h2: {
      //     mt: '8',
      //     fontFamily: fonts.heading,
      //     fontSize: { base: 'lg', md: 'xl', lg: '2xl' },
      //   },
      //   h3: {
      //     mt: '8',
      //     fontFamily: fonts.heading,
      //     fontSize: { base: 'md', md: 'lg' },
      //   },
      //   h4: {
      //     mt: '8',
      //     fontFamily: fonts.heading,
      //     fontSize: { base: 'md', md: 'lg' },
      //   },
      //   h5: {
      //     mt: '8',
      //     fontFamily: fonts.heading,
      //     fontSize: 'md',
      //   },
      //   h6: {
      //     mt: '8',
      //     fontFamily: fonts.heading,
      //     fontSize: 'md',
      //   },
      // }}
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
