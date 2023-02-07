import type { ComponentProps } from 'react';
import { useMemo } from 'react';
import { getUrlForImage } from '~/lib/sanity';
import type { SanityAsset } from '@sanity/image-url/lib/types/types';

interface SrcSet {
  media: string;
  height: number;
  width: number;
  src: SanityAsset;
  className?: string;
}

interface Props extends ComponentProps<'picture'> {
  srcSets: SrcSet[];
  alt: string;
  imgClassName?: string;
}

export function Image({ srcSets, className, alt, imgClassName }: Props) {
  const imageUrls = useMemo(
    () =>
      srcSets.map((srcSet) =>
        getUrlForImage(srcSet.src)
          .height(srcSet.height * 2)
          .width(srcSet.width * 2)
          .url(),
      ),
    [srcSets],
  );
  return (
    <picture className={className}>
      {srcSets.map((srcSet, i) => (
        <source
          key={srcSet.media}
          srcSet={imageUrls[i]}
          media={srcSet.media}
          height={srcSet.height}
          width={srcSet.width}
          className={srcSet.className}
        />
      ))}
      <img
        alt={alt}
        src={imageUrls[0]}
        height={srcSets[0].height}
        width={srcSets[0].width}
        className={imgClassName}
      />
    </picture>
  );
}
