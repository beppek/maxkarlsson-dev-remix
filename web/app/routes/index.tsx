import type { MetaFunction } from "@remix-run/cloudflare";
import { Link, useLoaderData } from "@remix-run/react";
import { useMemo } from "react";
import {
  fetchLatestQuickThought,
  fetchLayout,
  getUrlForImage,
} from "~/lib/sanity";

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
  const [layout, latestQuickThought] = await Promise.all([
    fetchLayout(),
    fetchLatestQuickThought(),
  ]);
  return {
    layout,
    latestQuickThought,
  };
}

export default function Index() {
  const {
    layout: { logo, title },
    latestQuickThought,
  } = useLoaderData();

  const logoUrl = useMemo(
    () => ({
      mobile: getUrlForImage(logo).size(120, 120).url(),
      desktop: getUrlForImage(logo).size(300, 300).url(),
    }),
    [logo]
  );
  return (
    <div className="flex flex-col items-center h-[calc(100vh-142px)] w-full">
      <div className="flex flex-col mt-8 lg:ml-16 lg:flex-row justify-start items-center gap-2 lg:gap-4 w-full">
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
            className="h-20 lg:h-28"
            media="(min-width: 1024px)"
            height={112}
            width={112}
          />
          <img
            alt={title}
            src={logoUrl.desktop}
            className="h-20 lg:h-28 rounded-full"
            height={112}
            width={112}
          />
        </picture>
        <div>
          <h1 className="font-heading uppercase text-center lg:text-left font-extrabold">
            <span className="text-transparent text-2xl lg:text-3xl bg-clip-text bg-gradient-to-r dark:from-green-400 dark:via-purple-500 dark:to-blue-500 from-green-700 via-purple-700 to-blue-700">
              {title}
            </span>
          </h1>
          <div className="">
            <p className="lg:relative lg:max-w-2xl text-center font-heading text-green-700 dark:text-green-400 text-xs lg:text-md lg:ml-10">
              <span className="lg:absolute -top-3 lg:-left-10 text-3xl">
                💭
              </span>
              <br className="lg:hidden" /> {latestQuickThought.content}
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2 justify-center items-center w-full h-full">
        <div className="px-2 justify-center">
          <p className="font-heading mb-0 text-green-700 dark:text-green-400 text-center">
            Choose your adventure
          </p>
          <div className="flex justify-center">
            <div className="flex flex-col md:flex-row gap-4 lg:gap-8 font-heading text-purple-800 dark:text-purple-300 text-xs py-2 lg:py-6 px-12">
              <div className="relative group">
                <Link
                  to="/blog"
                  // className="group text-left p-2 border-b-2 border-dashed border-b-green-400 hover:bg-slate-100 dark:hover:bg-slate-900"
                  className="relative flex group justify-center items-center text-left p-6 border-2 border-green-400 rounded-xl hover:bg-slate-100/75 bg-white-alpha-70 dark:bg-black-alpha-70 dark:hover:bg-slate-900/75 lg:h-80 w-64 z-10 h-16 group-hover:scale-105 transition-all hover:shadow-card"
                >
                  Read my blog
                  <span className="hidden group-hover:inline">{"-"}</span>
                  {">"}
                </Link>
                <img
                  className="absolute top-0 z-0 h-16 lg:h-80 w-64 object-cover rounded-xl group-hover:scale-105 transition-all"
                  src="/images/stability-diffusion-preikestolen.png"
                  alt="blog"
                />
              </div>
              <div className="relative group">
                <Link
                  to="/about"
                  className="relative flex group justify-center items-center text-left p-6 border-2 border-green-400 rounded-xl hover:bg-slate-100/75 bg-white-alpha-70 dark:bg-black-alpha-70 dark:hover:bg-slate-900/75 lg:h-80 w-64 z-10 h-16 group-hover:scale-105 transition-all hover:shadow-card"
                >
                  Learn about me
                  <span className="hidden group-hover:inline">{"-"}</span>
                  {">"}
                </Link>
                <img
                  className="absolute top-0 z-0 h-16 lg:h-80 w-64 object-cover rounded-xl group-hover:scale-105 transition-all"
                  src="/images/stability-diffusion-grand-canyon.png"
                  alt="blog"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
