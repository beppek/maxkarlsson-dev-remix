import { Link } from "@remix-run/react";
import format from "date-fns/format";
import type { Post } from "~/common/types";
import { getUrlForImage } from "~/lib/sanity";

interface Props {
  post: Post;
}

export function BlogPostListing({ post }: Props) {
  return (
    <Link
      style={{
        borderColor: (
          post.mainImage.asset.metadata.palette.darkVibrant ||
          post.mainImage.asset.metadata.palette.darkMuted
        ).background,
        color: (
          post.mainImage.asset.metadata.palette.darkVibrant ||
          post.mainImage.asset.metadata.palette.darkMuted
        ).foreground,
      }}
      to={`/blog/${post.slug}`}
      className={`
          w-[300px] 
          lg:w-[350px] 
          border-2 
          hover:border-teal-500 
          hover:scale-105 
          transition-all 
          border-dashed
          text-black
          dark:text-white
        `}
    >
      <span
        style={{
          backgroundColor: (
            post.mainImage.asset.metadata.palette.darkVibrant ||
            post.mainImage.asset.metadata.palette.darkMuted
          ).background,
        }}
        className="inline-block w-full h-full"
      >
        <img
          className="w-[300px] lg:w-[350px] h-[300px] lg:h-[350px]"
          src={getUrlForImage(post.mainImage).width(350).height(350).url()}
          alt={post.mainImage.alt}
        />
        <span className="inline-block p-2 lg:p-4 font-heading">
          <h3 className="text-sm">{post.shortTitle || post.title}</h3>
          <p className="text-xs pt-4 px-2">
            {format(new Date(post.publishedAt), "MMMM d, y")}
          </p>
        </span>
      </span>
    </Link>
  );
}
