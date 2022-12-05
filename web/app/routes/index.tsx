import type { MetaFunction } from '@remix-run/cloudflare';
import { Link, useLoaderData } from '@remix-run/react';
import { useMemo } from 'react';
import { fetchLayout, getUrlForImage } from '~/lib/sanity';

export const meta: MetaFunction = () => ({
  title: 'Home | Max Karlsson',
});

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
      desktop: getUrlForImage(logo).size(340, 340).url(),
    }),
    [logo],
  );
  return (
    <div
      className="flex items-center h-full"
      style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.4' }}
    >
      <div className="flex-col justify-center items-center w-full pt-20 lg:pt-24">
        <h1 className="font-heading uppercase text-center font-extrabold">
          <span className="text-transparent text-2xl lg:text-7xl bg-clip-text bg-gradient-to-r from-green-400 via-purple-500 to-blue-500">
            {title}
          </span>
        </h1>
        <div className="flex justify-center pt-2 lg:pt-10">
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
              className="h-20 lg:h-80"
              media="(min-width: 1024px)"
              height={320}
              width={320}
            />
            <img
              alt={title}
              src={logoUrl.desktop}
              className="h-20 lg:h-80"
              height={320}
              width={320}
            />
          </picture>
        </div>
        <div className="pt-10 px-2 lg:pt-10 grid grid-cols-1 lg:grid-flow-col lg:grid-cols-none gap-4 lg:gap-20 justify-center">
          <div className="flex items-center">
            <p className="text-center font-heading text-green-600 dark:text-green-400 text-xs lg:text-md">
              Hey there, what would you like to do?
            </p>
          </div>
          <div className="flex justify-center">
            <div className="flex flex-col gap-4 font-heading text-purple-700 dark:text-purple-400 text-xs border-2 border-dashed py-8 px-12 border-green-400 w-80">
              <Link
                to="/blog"
                className="group text-left p-2 border-b-2 border-dashed border-b-green-400 hover:bg-slate-100 dark:hover:bg-slate-900"
              >
                <span className="hidden group-hover:inline">{'-'}</span>
                {'>'} Read my blog
              </Link>
              <Link
                to="/about"
                className="group text-left p-2 border-b-2 border-dashed border-b-green-400 hover:bg-slate-100 dark:hover:bg-slate-900"
              >
                <span className="hidden group-hover:inline">{'-'}</span>
                {'>'} Learn about me
              </Link>
              <button className="group text-left p-2 border-b-2 border-dashed border-b-green-400 hover:bg-slate-100 dark:hover:bg-slate-900">
                <span className="hidden group-hover:inline">{'-'}</span>
                {'>'} Search
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
