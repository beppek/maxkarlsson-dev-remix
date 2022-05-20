import { useLoaderData } from '@remix-run/react';
import format from 'date-fns/format';
import type { ReactElement } from 'react';
import { useMemo } from 'react';
import { useContext } from 'react';
import { createContext, useCallback, useEffect, useState } from 'react';
import { withContext } from '~/hoc/with-context';
import { getUrlForImage } from '~/lib/sanity';
import { Window } from './window';

interface TopBarState {
  openSettingsMenu: boolean;
  openSettingsWindow: boolean;
}

const initialState: TopBarState = {
  openSettingsMenu: false,
  openSettingsWindow: false,
};

interface TopBarActions {
  toggleMenu: (open?: boolean) => () => void;
  toggleSettingsWindow: (open?: boolean) => () => void;
}

const TopBarContext = createContext<{
  state: TopBarState;
  actions: TopBarActions;
}>({ state: initialState, actions: {} as TopBarActions });

interface TopBarProviderProps {
  children: ReactElement | ReactElement[];
}

function TopBarProvider({ children }: TopBarProviderProps) {
  const [openSettingsMenu, setOpenSettingsMenu] = useState(false);
  const [openSettingsWindow, setOpenSettingsWindow] = useState(false);

  const toggleMenu = useCallback(
    (toggle?: boolean) => () => {
      setOpenSettingsMenu(toggle ? toggle : (prevState) => !prevState);
    },
    [],
  );

  const toggleSettingsWindow = useCallback(
    (toggle?: boolean) => () => {
      setOpenSettingsWindow(toggle ? toggle : (prevState) => !prevState);
    },
    [],
  );

  return (
    <TopBarContext.Provider
      value={{
        state: {
          openSettingsMenu,
          openSettingsWindow,
        },
        actions: {
          toggleMenu,
          toggleSettingsWindow,
        },
      }}
    >
      {children}
    </TopBarContext.Provider>
  );
}

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

function SettingsMenu() {
  const {
    state: { openSettingsMenu: open },
    actions: { toggleMenu, toggleSettingsWindow },
  } = useContext(TopBarContext);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        toggleMenu(false)();
      }
    },
    [toggleMenu],
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown, false);

    return () => {
      document.removeEventListener('keydown', handleKeyDown, false);
    };
  }, [handleKeyDown]);

  const handleToggleSettingsWindow = useCallback(() => {
    toggleMenu(false)();
    toggleSettingsWindow(true)();
  }, [toggleSettingsWindow, toggleMenu]);

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
            <button onClick={handleToggleSettingsWindow}>Settings</button>
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

function SettingsWindow() {
  const {
    state: { openSettingsWindow: open },
    actions: { toggleSettingsWindow },
  } = useContext(TopBarContext);
  const {
    layout: { backgroundOptions },
  } = useLoaderData();

  const [isDirty, setIsDirty] = useState(false);
  const [selectedBackground, setSelectedBackground] = useState({} as any);

  useEffect(() => {
    const lsImage = localStorage.getItem('backgroundImage');
    if (lsImage) {
      setSelectedBackground(JSON.parse(lsImage));
    }
  }, []);

  const handleSelectImage = (option: any) => {
    setIsDirty(true);
    setSelectedBackground(option);
  };

  const handleSave = (e: any) => {
    e.preventDefault();
    localStorage.setItem('backgroundImage', JSON.stringify(selectedBackground));
    window.dispatchEvent(new Event('storage'));
    setIsDirty(false);
  };

  return open ? (
    <Window onClose={toggleSettingsWindow(false)} title="Preferences">
      <h2 className="text-lg">Change background image</h2>
      <form className="relative my-4" onSubmit={handleSave}>
        <div className="sticky top-2 flex justify-end">
          <button
            type="submit"
            className="py-1 px-6 bg-green-500 text-white cursor-pointer rounded-full disabled:bg-gray-600 shadow-md"
            disabled={!isDirty}
          >
            Save
          </button>
        </div>
        {backgroundOptions.map((backgroundOption: any) => (
          <div className="" key={backgroundOption._key}>
            <h3>{backgroundOption.name}</h3>
            <div className="grid grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-1 lg:gap-1">
              {backgroundOption.options.map((option: any) => (
                <div
                  onClick={() => handleSelectImage(option)}
                  key={option._key}
                >
                  <img
                    className={`${
                      selectedBackground._key === option._key
                        ? ' border-green-500 shadow-sm shadow-green-500/75 scale-105'
                        : 'border-transparent'
                    } border-2 transition-all`}
                    src={getUrlForImage(option).height(100).width(100).url()}
                    alt={option.asset.description}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </form>
    </Window>
  ) : null;
}

export const TopBar = withContext(function TopBar() {
  const {
    layout: { logo, title },
  } = useLoaderData();

  const {
    actions: { toggleMenu },
  } = useContext(TopBarContext);

  const logoUrl = useMemo(() => getUrlForImage(logo).url(), [logo]);

  return (
    <>
      <div className="w-full text-white flex justify-between items-center bg-slate-800 px-2 h-8 lg:h-6">
        <button onClick={toggleMenu()} className="flex gap-2 items-center">
          <img alt="Max Karlsson" src={logoUrl} className="h-6 lg:h-4" />
          <p className="text-sm">{title}</p>
        </button>
        <Time />
      </div>
      <SettingsMenu />
      <SettingsWindow />
    </>
  );
}, TopBarProvider);
