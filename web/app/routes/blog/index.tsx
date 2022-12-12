import type { MetaFunction } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import { BlogListingTemplate } from "~/components/templates/blog-listing-template";
import { fetchAllBlogPosts } from "~/lib/sanity";
import { DEFAULT_PAGE_SIZE } from "~/utils/constants";

export const meta: MetaFunction = ({ parentsData }) => {
  const { title } = parentsData.root.layout;
  return {
    title: `Blog | ${title}`,
  };
};

export async function loader() {
  const posts = await fetchAllBlogPosts();
  const totalPages = Math.ceil(posts.length / DEFAULT_PAGE_SIZE);
  return {
    posts: posts.slice(0, DEFAULT_PAGE_SIZE),
    totalPages,
  };
}

export default function Blog() {
  const { posts, totalPages } = useLoaderData();
  return (
    <BlogListingTemplate
      posts={posts}
      totalPages={totalPages}
      currentPage={1}
    />
  );
}
