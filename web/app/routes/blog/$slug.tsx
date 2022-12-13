import type { LoaderArgs, MetaFunction } from "@remix-run/cloudflare";
import { Link, useLoaderData } from "@remix-run/react";
import format from "date-fns/format";
import { useMemo } from "react";
import type { Post } from "~/common/types";
import { BlockContent } from "~/components/organisms/block-content";
import { fetchBlogPost, getUrlForImage } from "~/lib/sanity";
// import { slugify } from "~/utils/string-utils";

export const meta: MetaFunction = ({ data, parentsData }) => {
  const { title } = parentsData.root.layout;
  return {
    title: `${data.post.title} | ${title}`,
    description: data.post.plainTextExcerpt,
    "og:image": getUrlForImage(data.post.mainImage).size(1200, 627).url(),
  };
};

export async function loader({ params }: LoaderArgs) {
  const { slug } = params as { slug: string };
  const post = await fetchBlogPost({ slug });
  return {
    post,
  };
}

export function links() {
  return [{ rel: "stylesheet", href: "/assets/prism.css" }];
}

export default function BlogPostPage() {
  const { post }: { post: Post } = useLoaderData();
  const mainImageUrl = useMemo(
    () => ({
      mobile: getUrlForImage(post.mainImage).width(656).height(400).url(),
      desktop: getUrlForImage(post.mainImage).width(1200).height(400).url(),
    }),
    [post.mainImage]
  );
  return (
    <div className="flex flex-col lg:flex-row w-full text-black dark:text-white">
      <article className="w-full px-4 lg:px-8 ">
        <div className="flex justify-center">
          <div className="relative">
            <picture>
              <source
                srcSet={mainImageUrl.mobile}
                className="lg:h-[400px] lg:w-[1200px] relative"
                media="(max-width: 1023px)"
                height={200}
                width={328}
              />
              <source
                srcSet={mainImageUrl.desktop}
                className="h-[200px] w-full relative"
                media="(min-width: 1024px)"
                height={400}
                width={1200}
              />
              <img
                alt={post.mainImage.alt}
                src={mainImageUrl.desktop}
                className="h-[200px] lg:h-[400px] w-full lg:w-[1200px] relative"
                height={400}
                width={1200}
              />
            </picture>
            {/* <img
              className="h-[200px] lg:h-[400px] w-full lg:w-[1200px] relative"
              src={getUrlForImage(post.mainImage).width(1200).height(400).url()}
              alt={post.mainImage.alt}
            /> */}
            <div
              className="lg:absolute lg:bottom-6 lg:-left-6 px-2 py-2 lg:py-6 lg:px-8 text-white"
              style={{
                backgroundColor: (
                  post.mainImage.asset.metadata.palette.darkVibrant ||
                  post.mainImage.asset.metadata.palette.darkMuted
                ).background,
              }}
            >
              <h1 className="font-heading">{post.title}</h1>
              <p className="font-heading text-xs">
                {format(new Date(post.publishedAt), "MMMM d, y")}
              </p>
            </div>
          </div>
        </div>
        <div className="w-full py-2">
          <div className="flex justify-center">
            <div className="max-w-xs lg:max-w-3xl">
              <BlockContent
                palette={post.mainImage.asset.metadata.palette}
                blocks={post.body}
              />
            </div>
          </div>
        </div>
      </article>
      <aside className="w-full max-w-xs py-2 lg:border-l-2 border-green-400 border-none">
        {/* <div className="py-2">
          <h3 className="px-4 font-heading text-xs">Categories</h3>
          {post.categories.map((category) => (
            <Link
              key={category.slug}
              className="block px-6 py-2 text-xs text-slate-600 dark:text-slate-300 hover:text-slate-700"
              to={`/blog/categories/${category.slug}`}
            >
              {category.title}
            </Link>
          ))}
        </div>
        <div className="py-2">
          <h3 className="px-4 font-heading text-xs">Tags</h3>
          {post.tags.map((tag) => (
            <Link
              key={tag}
              className="block px-6 py-2 text-xs text-slate-600 dark:text-slate-300 hover:text-slate-700"
              to={`/blog/tags/${slugify(tag)}`}
            >
              {tag}
            </Link>
          ))}
        </div> */}
        <div className="py-2">
          <h3 className="px-4 font-heading text-xs">Related Posts</h3>
          <div className="flex flex-col items-start">
            {post.relatedPosts.map((relatedPost) => (
              <Link
                key={relatedPost.slug}
                to={`/blog/${relatedPost.slug}`}
                className="py-4 px-6"
              >
                <img
                  height={150}
                  width={150}
                  className="w-[150px] h-[150px]"
                  src={getUrlForImage(relatedPost.mainImage)
                    .width(150)
                    .height(150)
                    .url()}
                  alt={relatedPost.mainImage.alt}
                  loading="lazy"
                />
                <h4 className="font-inlineCode text-sm">
                  {relatedPost.shortTitle || relatedPost.title}
                </h4>
                <p className="font-inlineCode text-xs">
                  {format(new Date(relatedPost.publishedAt), "MMMM d, y")}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
}
