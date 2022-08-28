import { NavLink, useLoaderData } from '@remix-run/react';
import { getUrlForImage } from '~/lib/sanity';

import type { ReactElement } from 'react';
import { SVG } from '../atoms/svg';
import { usePrefersDarkMode } from '~/hooks/use-prefers-dark-mode';
import { Header } from '../organisms/header';

interface LayoutProps {
  children: ReactElement | ReactElement[];
}

export function Layout({ children }: LayoutProps) {
  const {
    layout: { primaryNav },
  } = useLoaderData();

  const { prefersDarkMode, togglePrefersDarkMode } = usePrefersDarkMode();

  return (
    <div
      className={`bg-white dark:bg-black h-screen flex flex-col min-h-screen`}
    >
      <Header />
      {/* <nav className="fixed z-10 top-0 lg:top-2 flex justify-center w-full">
        <ul className="flex justify-center py-1 border-green-500 border-2 border-dashed bg-white dark:bg-black">
          {primaryNav?.items.map((item: any) => (
            <li key={item._key}>
              <NavLink
                className={({ isActive }) => {
                  return `
                    flex 
                    flex-col 
                    items-center 
                    hover:scale-110 
                    transition-all 
                    hover:bg-slate-200/75 
                    dark:hover:bg-slate-900/75 
                    py-0
                    lg:py-2 
                    px-6
                    text-sm
                    lg:text-md
                    text-black
                    dark:text-white
                    font-heading
                    ${isActive ? 'bg-slate-200/50 dark:bg-slate-700/50' : ''}
                  `;
                }}
                to={`/${item.link.href}`}
              >
                <img
                  className="w-6 h-6 lg:w-8 lg:h-8"
                  src={getUrlForImage(item.icon).width(50).height(50).url()}
                  alt={item.icon.alt}
                />
                <span className="lg:pt-2">{item.text}</span>
              </NavLink>
            </li>
          ))}
          <li>
            <button
              className={`
              flex 
              flex-col 
              items-center 
              hover:scale-110 
              transition-all 
              hover:bg-slate-200/75 
              dark:hover:bg-slate-900/75 
              py-0
              lg:py-2 
              px-6
              text-sm
              lg:text-md
              text-black
              dark:text-white
              font-heading`}
              onClick={togglePrefersDarkMode}
            >
              <SVG
                fill={prefersDarkMode ? 'white' : 'black'}
                className="w-6 h-6 lg:w-10 lg:h-10"
                src={'/icons/toggle-theme.svg'}
              />
              Toggle
            </button>
          </li>
        </ul>
      </nav> */}
      <main className="overflow-y-auto h-full pt-20 lg:pt-24">{children}</main>
      <footer className="mt-auto py-2 lg:py-10">
        <p className="text-slate-600 dark:text-slate-400 text-center font-heading text-xs">
          <>© Copyright {new Date().getFullYear()} Max Karlsson</>
        </p>
      </footer>
    </div>
  );
}
