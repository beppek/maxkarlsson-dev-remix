import { Link, useLoaderData } from '@remix-run/react';
import format from 'date-fns/format';
import { useEffect, useState } from 'react';
import { getUrlForImage } from '~/lib/sanity';

function Time() {
  const [time, setTime] = useState(format(new Date(), 'E do MMM kk:mm'));
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(format(new Date(), 'E do MMM kk:mm'));
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return <p className="text-xs">{time}</p>;
}

interface SettingsMenuProps {
  open: boolean;
  toggleMenu: (toggle?: boolean) => () => void;
}

function SettingsMenu({ open, toggleMenu }: SettingsMenuProps) {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      toggleMenu(false)();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown, false);

    return () => {
      document.removeEventListener('keydown', handleKeyDown, false);
    };
  }, []);

  return (
    <>
      <div
        className={`
        py-2 
        px-4 
        transition-opacity 
        text-white 
        backdrop-blur-md 
        bg-slate-600/25 
        fixed 
        ${open ? 'block' : 'hidden'}
        ${open ? 'opacity-100' : 'opacity-0'}
        left-2 
        top-8 
        lg:top-6 
        shadow-md 
        rounded-lg 
        border-[1px] 
        border-slate-600
        z-20
      `}
      >
        <ul>
          <li>
            <button>Dark mode</button>
          </li>
          <li>
            <Link onClick={toggleMenu(false)} to="/settings">
              Settings
            </Link>
          </li>
          <li>
            <button>About</button>
          </li>
        </ul>
      </div>
      {open ? (
        <div
          className="z-10 absolute top-0 left-0 bottom-0 right-0"
          onClick={toggleMenu(false)}
        />
      ) : null}
    </>
  );
}

export function TopBar() {
  const {
    layout: { logo, title },
  } = useLoaderData();
  const url = getUrlForImage(logo).url();

  const [openSettings, setOpenSettings] = useState(false);

  const toggleMenu = (toggle?: boolean) => () => {
    setOpenSettings(toggle ? toggle : (prevState) => !prevState);
  };

  return (
    <>
      <div className="w-full text-white flex justify-between items-center bg-slate-800 px-2 h-8 lg:h-6">
        <button onClick={toggleMenu()} className="flex gap-2 items-center">
          <img alt="Max Karlsson" src={url} className="h-6 lg:h-4" />
          <p className="text-sm">{title}</p>
        </button>
        <Time />
      </div>
      <SettingsMenu open={openSettings} toggleMenu={toggleMenu} />
    </>
  );
}
