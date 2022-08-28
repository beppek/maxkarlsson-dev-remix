/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useMemo } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { NavLink, useLoaderData } from '@remix-run/react';
import { usePrefersDarkMode } from '~/hooks/use-prefers-dark-mode';
import { getUrlForImage } from '~/lib/sanity';
import { SVG } from '../atoms/svg';

export function Header() {
  const {
    layout: { primaryNav, title, logo },
  } = useLoaderData();

  const { prefersDarkMode, togglePrefersDarkMode } = usePrefersDarkMode();

  const logoUrl = useMemo(() => getUrlForImage(logo).url(), [logo]);

  return (
    <Popover className="sticky top-0 z-10 bg-white dark:bg-black border-b-2 border-green-400 border-dashed">
      <div className="flex justify-between items-center px-4 py-6 lg:py-0 sm:px-6 md:justify-start md:space-x-10">
        <div>
          <NavLink to="/" className="flex">
            <span className="sr-only">{title}</span>
            <img className="h-8 w-auto sm:h-10" src={logoUrl} alt={title} />
          </NavLink>
        </div>
        <div className="-mr-2 -my-2 md:hidden">
          <Popover.Button className="rounded-md p-2 inline-flex items-center justify-center text-black dark:text-white hover:text-gray-500 hover:bg-slate-100 dark:hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-400">
            <span className="sr-only">Open menu</span>
            <Bars3Icon
              className="h-6 w-6 bg-white dark:bg-black "
              aria-hidden="true"
            />
          </Popover.Button>
        </div>
        <div className="hidden md:flex-1 md:flex md:items-center md:justify-between">
          <nav className="flex space-x-4">
            {primaryNav?.items.map((item: any) => (
              <NavLink
                key={item._key}
                className={({ isActive }) => {
                  return `
                    flex 
                    flex-col 
                    items-center 
                    hover:scale-105 
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
                    border-dashed
                    border-green-400
                    ${
                      isActive
                        ? 'bg-slate-200/50 dark:bg-slate-700/50 border-r-2 border-l-2'
                        : ''
                    }
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
            ))}
          </nav>
          <div className="flex items-center md:ml-12">
            <button
              className={`
              flex 
              flex-col 
              items-center 
              hover:scale-105
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
          </div>
        </div>
      </div>

      <Transition
        as={Fragment}
        enter="duration-200 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="duration-100 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Popover.Panel
          focus
          className="absolute top-0 inset-x-0 transition transform origin-top-right md:hidden"
        >
          <div className="shadow-lg border-2 border-dashed border-green-400 ring-1 ring-black ring-opacity-5 bg-white dark:bg-black divide-y-2 divide-dashed divide-gray-200 dark:divide-gray-800">
            <div className="pt-5 pb-6 px-4">
              <div className="flex items-center justify-between">
                <div>
                  <img className="h-8 w-auto" src={logoUrl} alt={title} />
                </div>
                <div className="-mr-2">
                  <Popover.Button className="bg-white dark:bg-black rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover-bg-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-400">
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </Popover.Button>
                </div>
              </div>
              <div className="mt-6">
                <nav className="grid gap-6 font-heading">
                  {primaryNav.items.map((item: any) => (
                    <NavLink
                      key={item._key}
                      to={item.link.href}
                      className="-m-3 p-3 flex items-center rounded-lg hover:bg-gray-50"
                    >
                      <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-white dark:bg-black text-black dark:text-white">
                        <img
                          className="w-6 h-6 lg:w-8 lg:h-8"
                          aria-hidden="true"
                          src={getUrlForImage(item.icon)
                            .width(50)
                            .height(50)
                            .url()}
                          alt={item.icon.alt}
                        />
                      </div>
                      <div className="ml-4 text-base font-medium text-black dark:text-white">
                        {item.text}
                      </div>
                    </NavLink>
                  ))}
                </nav>
              </div>
            </div>
            <div className="py-6 px-5 flex justify-center">
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
                  font-heading
                `}
                onClick={togglePrefersDarkMode}
              >
                <SVG
                  fill={prefersDarkMode ? 'white' : 'black'}
                  className="w-6 h-6 lg:w-10 lg:h-10"
                  src={'/icons/toggle-theme.svg'}
                />
                Toggle
              </button>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}
