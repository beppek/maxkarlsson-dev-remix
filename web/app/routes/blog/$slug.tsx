import { useLoaderData } from '@remix-run/react';
import { Window } from '~/components/organisms/window';
import { fetchBlogPost } from '~/lib/sanity';

export async function loader({ params }) {
  const { slug } = params;
  const post = await fetchBlogPost({ slug });
  return {
    post,
  };
}

export default function BlogPostPage() {
  const { post } = useLoaderData();
  return (
    <Window title={post.title}>
      <div>
        <h1>{post.title}</h1>
      </div>
    </Window>
  );
}
