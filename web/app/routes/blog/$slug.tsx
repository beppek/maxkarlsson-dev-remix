import { Link, useLoaderData } from '@remix-run/react';
import format from 'date-fns/format';
import type { Post } from '~/common/types';
import { BlockContent } from '~/components/organisms/block-content';
import { Window } from '~/components/organisms/window';
import { fetchBlogPost, getUrlForImage } from '~/lib/sanity';
import { slugify } from '~/utils/string-utils';

export async function loader({ params }) {
  const { slug } = params;
  const post = await fetchBlogPost({ slug });
  return {
    post,
  };
}

export default function BlogPostPage() {
  const { post }: { post: Post } = useLoaderData();
  return (
    <Window title={post.title}>
      <div className="flex flex-col lg:flex-row-reverse w-full">
        <article className="w-full lg:w-5/6 px-4 lg:px-8 ">
          <div className="flex justify-center">
            <img
              className="h-[200px] lg:h-[400px] w-full"
              src={getUrlForImage(post.mainImage).width(1200).height(400).url()}
              alt={post.mainImage.alt}
            />
          </div>
          <div className="w-full py-2">
            <h1 className="font-heading">{post.title}</h1>
            <p className="font-heading text-xs">
              {format(new Date(post.publishedAt), 'MMMM d, y')}
            </p>
            <BlockContent
              palette={post.mainImage.asset.metadata.palette}
              blocks={post.body}
            />
          </div>
        </article>
        <aside className="w-full lg:w-1/6 bg-slate-300 py-2">
          <div className="py-2">
            <h3 className="px-2 font-heading text-xs">Categories</h3>
            {post.categories.map((category) => (
              <Link
                key={category.slug}
                className="block px-2 py-1 text-xs text-slate-600 hover:text-slate-700"
                to={`/blog/categories/${category.slug}`}
              >
                {category.title}
              </Link>
            ))}
          </div>
          <div className="py-2">
            <h3 className="px-2 font-heading text-xs">Tags</h3>
            {post.tags.map((tag) => (
              <Link
                key={tag}
                className="block px-2 py-1 text-xs text-slate-600 hover:text-slate-700"
                to={`/blog/tags/${slugify(tag)}`}
              >
                {tag}
              </Link>
            ))}
          </div>
          <div className="py-2">
            <h3 className="px-2 font-heading text-xs">Related Posts</h3>
            <div className="flex flex-col items-center">
              {post.relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.slug}
                  to={`/blog/${relatedPost.slug}`}
                  className="p-4"
                >
                  <img
                    src={getUrlForImage(relatedPost.mainImage).width(150).url()}
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
    </Window>
  );
}
