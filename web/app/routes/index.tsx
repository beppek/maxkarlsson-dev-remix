import type { MetaFunction } from '@remix-run/cloudflare';
import { useLoaderData } from '@remix-run/react';
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

  const logoUrl = useMemo(() => getUrlForImage(logo).url(), [logo]);
  return (
    <div
      className="flex items-center h-full"
      style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.4' }}
    >
      <div className="flex-col items-center w-full -pt-20 lg:-pt-24 -mt-20 lg:mt-0">
        <h1 className="font-heading uppercase text-center font-extrabold">
          <span className="text-transparent text-2xl lg:text-8xl bg-clip-text bg-gradient-to-r from-green-400 via-purple-500 to-blue-500">
            {title}
          </span>
        </h1>
        <div className="flex justify-center pt-2 lg:pt-16">
          <img alt={title} src={logoUrl} className="h-20 lg:h-80" />
        </div>
        <div className="pt-2 lg:pt-20">
          <p className="text-center font-heading text-green-400 text-xs lg:text-lg">
            Hey there, have you come to read my musings?
          </p>
        </div>
      </div>
    </div>
  );
}
