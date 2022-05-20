import { useLoaderData } from '@remix-run/react';
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
    layout: { backgroundOptions },
  } = useLoaderData();

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
      className={`bg-slate-400 h-screen`}
    >
      <TopBar />
      {children}
    </div>
  );
}
