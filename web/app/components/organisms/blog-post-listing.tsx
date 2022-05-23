import { Link } from '@remix-run/react';
import type { Post } from '~/common/types';
import { getUrlForImage } from '~/lib/sanity';

interface Props {
  post: Post;
}

export function BlogPostListing({ post }: Props) {
  return (
    <Link
      style={{
        borderColor: post.mainImage.asset.metadata.palette.dominant.background,
      }}
      to={`/blog/${post.slug}`}
      className="w-[150px] lg:w-[200px] h-[300px] border-2 hover:border-teal-500"
    >
      <img
        src={getUrlForImage(post.mainImage).width(200).height(200).url()}
        alt={post.mainImage.alt}
      />
      <h3 className="p-1">{post.shortTitle || post.title}</h3>
    </Link>
  );
}
