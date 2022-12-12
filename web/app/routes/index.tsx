import type { MetaFunction } from "@remix-run/cloudflare";
import { Link, useLoaderData } from "@remix-run/react";
import { useMemo } from "react";
import { fetchLayout, getUrlForImage } from "~/lib/sanity";

export const meta: MetaFunction = (data) => {
  const {
    data: {
      layout: { title },
    },
  } = data;
  return {
    title: `Home | ${title}`,
  };
};

export async function loader() {
  const layout = await fetchLayout();
  return {
    layout,
  };
}

export default function Index() {
  const {
    layout: { logo, title },
  } = useLoaderData();

  const logoUrl = useMemo(
    () => ({
      mobile: getUrlForImage(logo).size(120, 120).url(),
      desktop: getUrlForImage(logo).size(300, 300).url(),
    }),
    [logo]
  );
  return (
    <div className="flex items-center h-[calc(100vh-142px)] w-full">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-20 justify-center items-center w-full h-full">
        <div className="flex flex-col gap-8 justify-center items-center">
          <div className="flex justify-center">
            <picture>
              <source
                srcSet={logoUrl.mobile}
                className="h-20"
                media="(max-width: 1023px)"
                height={80}
                width={80}
              />
              <source
                srcSet={logoUrl.desktop}
                className="h-20 lg:h-60"
                media="(min-width: 1024px)"
                height={240}
                width={240}
              />
              <img
                alt={title}
                src={logoUrl.desktop}
                className="h-20 lg:h-60 rounded-full"
                height={240}
                width={240}
              />
            </picture>
          </div>
          <h1 className="font-heading uppercase text-center font-extrabold mt-4">
            <span className="text-transparent text-2xl lg:text-5xl bg-clip-text bg-gradient-to-r dark:from-green-400 dark:via-purple-500 dark:to-blue-500 from-green-700 via-purple-700 to-blue-700">
              {title}
            </span>
          </h1>
          <p className="text-center font-heading text-green-700 dark:text-green-400 text-xs lg:text-md">
            Hey there, nice to see you!
          </p>
        </div>
        <div className="px-2 justify-center">
          <div className="flex justify-center">
            <div className="flex flex-col gap-4 font-heading text-purple-700 dark:text-purple-400 text-xs border-2 border-dashed py-8 px-12 border-green-400 w-80">
              <Link
                to="/blog"
                className="group text-left p-2 border-b-2 border-dashed border-b-green-400 hover:bg-slate-100 dark:hover:bg-slate-900"
              >
                <span className="hidden group-hover:inline">{"-"}</span>
                {">"} Read my blog
              </Link>
              <Link
                to="/about"
                className="group text-left p-2 border-b-2 border-dashed border-b-green-400 hover:bg-slate-100 dark:hover:bg-slate-900"
              >
                <span className="hidden group-hover:inline">{"-"}</span>
                {">"} Learn about me
              </Link>
              {/* <button className="group text-left p-2 border-b-2 border-dashed border-b-green-400 hover:bg-slate-100 dark:hover:bg-slate-900">
                <span className="hidden group-hover:inline">{'-'}</span>
                {'>'} Search
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
