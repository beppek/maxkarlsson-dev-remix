import { Link } from "@remix-run/react";
import type { ComponentProps, ReactNode } from "react";
import type { Post } from "~/common/types";
import { BlogPostListing } from "~/components/organisms/blog-post-listing";

interface Props {
  posts: Post[];
  totalPages: number;
  currentPage: number;
}

interface PaginationLinkProps {
  to: ComponentProps<typeof Link>["to"];
  children: ReactNode;
  disabled: boolean;
}

function PaginationLink({ to, children, disabled }: PaginationLinkProps) {
  return disabled ? (
    <span className="text-slate-500 dark:text-slate-400 cursor-not-allowed">
      {children}
    </span>
  ) : (
    <Link aria-disabled={disabled} to={to}>
      {children}
    </Link>
  );
}

export function BlogListingTemplate({ posts, totalPages, currentPage }: Props) {
  const disablePrevious = currentPage === 1;
  const disableNext = currentPage === totalPages;
  return (
    <div className="lg:mt-20">
      <div className="flex justify-center px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 2xl:grid-cols-4 gap-3 lg:gap-6 my-2 lg:my-5">
          {posts.map((post: Post) => (
            <BlogPostListing key={post.id} post={post} />
          ))}
        </div>
      </div>
      <div className="flex justify-center my-10 lg:my-20 gap-4 lg:gap-10 font-heading text-black dark:text-white">
        <PaginationLink
          disabled={disablePrevious}
          to={disablePrevious ? "/blog" : `/blog/page/${currentPage - 1}`}
        >
          &lt; Previous
        </PaginationLink>{" "}
        ...{" "}
        <PaginationLink
          disabled={disableNext}
          to={disableNext ? "" : `/blog/page/${currentPage + 1}`}
        >
          Next &gt;
        </PaginationLink>
      </div>
    </div>
  );
}
