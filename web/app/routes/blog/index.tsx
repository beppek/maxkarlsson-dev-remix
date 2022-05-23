import type { MetaFunction } from '@remix-run/cloudflare';
import { useLoaderData } from '@remix-run/react';
import type { Post } from '~/common/types';
import { BlogPostListing } from '~/components/organisms/blog-post-listing';
import { Window } from '~/components/organisms/window';
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
  console.log('posts :>> ', posts);
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.4' }}>
      <Window title="Blog posts">
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-6">
          {posts.map((post: Post) => (
            <BlogPostListing key={post.id} post={post} />
          ))}
        </div>
      </Window>
    </div>
  );
}
