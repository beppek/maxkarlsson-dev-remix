import { Link, useLoaderData } from '@remix-run/react';
import format from 'date-fns/format';
import type { Post } from '~/common/types';
import { BlockContent } from '~/components/organisms/block-content';
import { fetchBlogPost, getUrlForImage } from '~/lib/sanity';
import { slugify } from '~/utils/string-utils';

export async function loader({ params }) {
  const { slug } = params;
  const post = await fetchBlogPost({ slug });
  return {
    post,
  };
}

export function links() {
  return [{ rel: 'stylesheet', href: '/assets/prism.css' }];
}

export default function BlogPostPage() {
  const { post }: { post: Post } = useLoaderData();
  return (
    <div className="flex flex-col lg:flex-row w-full text-black dark:text-white">
      <article className="w-full lg:w-5/6 px-4 lg:px-8 ">
        <div className="flex justify-center">
          <img
            className="h-[200px] lg:h-[400px] w-full"
            src={getUrlForImage(post.mainImage).width(1200).height(400).url()}
            alt={post.mainImage.alt}
          />
        </div>
        <div className="w-full py-2">
          <div className="flex justify-center">
            <div className="max-w-xs lg:max-w-3xl">
              <h1 className="font-heading pt-8">{post.title}</h1>
              <p className="font-heading text-xs pb-3">
                {format(new Date(post.publishedAt), 'MMMM d, y')}
              </p>
              <BlockContent
                palette={post.mainImage.asset.metadata.palette}
                blocks={post.body}
              />
            </div>
          </div>
        </div>
      </article>
      <aside className="w-full lg:w-1/6 py-2 lg:border-l-2 border-green-400 border-dashed">
        <div className="py-2">
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
        </div>
        <div className="py-2">
          <h3 className="px-4 font-heading text-xs">Related Posts</h3>
          <div className="flex flex-col items-center">
            {post.relatedPosts.map((relatedPost) => (
              <Link
                key={relatedPost.slug}
                to={`/blog/${relatedPost.slug}`}
                className="py-4 px-6"
              >
                <img
                  className="w-[150px] h-[150px]"
                  src={getUrlForImage(relatedPost.mainImage)
                    .width(150)
                    .height(150)
                    .url()}
                  alt={relatedPost.mainImage.alt}
                />
                <h4 className="font-inlineCode text-sm">
                  {relatedPost.shortTitle || relatedPost.title}
                </h4>
                <p className="font-inlineCode text-xs">
                  {format(new Date(relatedPost.publishedAt), 'MMMM d, y')}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
}
