import type { LoaderArgs, MetaFunction } from "@remix-run/cloudflare";
import { redirect } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import { BlogListingTemplate } from "~/components/templates/blog-listing-template";
import { fetchAllBlogPosts } from "~/lib/sanity";
import { DEFAULT_PAGE_SIZE } from "~/utils/constants";

export const meta: MetaFunction = ({ parentsData, params }) => {
  const { title } = parentsData.root.layout;
  const { page } = params as { page: string };
  return {
    title: `Blog page ${page} | ${title}`,
  };
};

export async function loader({ params }: LoaderArgs) {
  const { page } = params as { page: string };
  const pageNumber = parseInt(page);
  if (pageNumber < 2 || isNaN(pageNumber)) return redirect("/blog");
  const allPosts = await fetchAllBlogPosts();
  const totalPages = Math.ceil(allPosts.length / DEFAULT_PAGE_SIZE);
  const posts = allPosts.slice(
    (pageNumber - 1) * DEFAULT_PAGE_SIZE,
    pageNumber * DEFAULT_PAGE_SIZE
  );
  return {
    posts,
    totalPages,
    currentPage: pageNumber,
  };
}

export default function Blog() {
  const { posts, totalPages, currentPage } = useLoaderData();
  return (
    <BlogListingTemplate
      posts={posts}
      totalPages={totalPages}
      currentPage={currentPage}
    />
  );
}
