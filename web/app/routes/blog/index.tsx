import type { MetaFunction } from '@remix-run/cloudflare';
import { useLoaderData } from '@remix-run/react';
import type { Post } from '~/common/types';
import { BlogPostListing } from '~/components/organisms/blog-post-listing';
import { fetchAllBlogPosts } from '~/lib/sanity';

export const meta: MetaFunction = () => ({
  title: 'Blog | Max Karlsson',
});

export async function loader() {
  const posts = await fetchAllBlogPosts();
  return {
    posts,
  };
}

export default function Blog() {
  const { posts } = useLoaderData();
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.4' }}>
      <div className="flex justify-center  px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 2xl:grid-cols-4 gap-3 lg:gap-6 my-2 lg:my-5">
          {posts.map((post: Post) => (
            <BlogPostListing key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}
