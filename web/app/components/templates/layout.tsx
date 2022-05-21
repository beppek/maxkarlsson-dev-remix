import { Link, NavLink, useLoaderData } from '@remix-run/react';
import { useCallback, useEffect, useState } from 'react';
import { getUrlForImage } from '~/lib/sanity';
import { TopBar } from '../organisms/top-bar';

import type { ReactElement } from 'react';

interface LayoutProps {
  children: ReactElement | ReactElement[];
}

export function Layout({ children }: LayoutProps) {
  const [backgroundImage, setBackgroundImage] = useState('');
  const {
    layout: { backgroundOptions, primaryNav },
  } = useLoaderData();

  console.log('primaryNav :>> ', primaryNav);

  useEffect(() => {
    const lsImage = localStorage.getItem('backgroundImage');

    const bgImage = lsImage
      ? getUrlForImage(JSON.parse(lsImage))
          .height(window.innerHeight)
          .width(window.innerWidth)
          .url()
      : getUrlForImage(backgroundOptions[0].options[0])
          .height(window.innerHeight)
          .width(window.innerWidth)
          .url();
    setBackgroundImage(bgImage);
  }, [backgroundOptions]);

  const handleLocalStorageChanges = useCallback(() => {
    const lsImage = localStorage.getItem('backgroundImage');
    const bgImage = lsImage
      ? getUrlForImage(JSON.parse(lsImage))
          .height(window.innerHeight)
          .width(window.innerWidth)
          .url()
      : backgroundImage;
    setBackgroundImage(bgImage);
  }, [backgroundImage]);

  useEffect(() => {
    window.addEventListener('storage', handleLocalStorageChanges, false);
    return () => {
      window.removeEventListener('storage', handleLocalStorageChanges, false);
    };
  }, [handleLocalStorageChanges]);

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
      className={`bg-slate-400 h-screen bg-no-repeat bg-fit bg-center`}
    >
      <TopBar />
      <main className="overflow-y-auto">{children}</main>
      <nav className="fixed z-0 bottom-0 lg:bottom-2 flex justify-center w-full">
        <ul className="flex justify-center px-4 lg:px-6 py-1 bg-slate-100/75 backdrop-blur-lg shadow-md lg:shadow-retro">
          {primaryNav?.items.map((item: any) => (
            <li key={item._key}>
              <NavLink
                className={({ isActive }) => {
                  console.log('item.text :>> ', item.text);
                  console.log('isActive :>> ', isActive);
                  return `
                    flex 
                    flex-col 
                    items-center 
                    hover:scale-110 
                    transition-all 
                    hover:bg-slate-300/75 
                    py-0
                    lg:py-2 
                    px-6
                    text-sm
                    lg:text-md
                    ${isActive ? 'bg-slate-200/50' : ''}
                  `;
                }}
                to={`/${item.link.href}`}
              >
                <img
                  className="w-6 h-6 lg:w-8 lg:h-8"
                  src={getUrlForImage(item.icon).width(50).height(50).url()}
                  alt={item.icon.alt}
                />
                {item.text}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
