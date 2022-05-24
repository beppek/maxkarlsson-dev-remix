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
      className="w-[200px] lg:w-[250px] h-[350px] border-2 hover:border-teal-500 hover:scale-105 transition-all hover:shadow-retro"
    >
      <img
        src={getUrlForImage(post.mainImage).width(250).height(250).url()}
        alt={post.mainImage.alt}
      />
      <h3 className="p-1 font-heading text-xs">
        {post.shortTitle || post.title}
      </h3>
    </Link>
  );
}
