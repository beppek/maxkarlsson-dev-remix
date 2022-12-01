/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useMemo } from "react";
import { Popover, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { NavLink, useLoaderData } from "@remix-run/react";
import { usePrefersDarkMode } from "~/hooks/use-prefers-dark-mode";
import { getUrlForImage } from "~/lib/sanity";
import { SVG } from "../atoms/svg";

export function Header() {
  const {
    layout: { primaryNav, title, logo },
  } = useLoaderData();

  const { prefersDarkMode, togglePrefersDarkMode } = usePrefersDarkMode();

  const logoUrl = useMemo(
    () => getUrlForImage(logo).size(50, 50).url(),
    [logo]
  );

  return (
    <Popover className="sticky top-0 z-10 bg-white dark:bg-black border-b-2 border-green-400 border-dashed">
      <div className="flex justify-between items-center px-4 py-6 lg:py-0 sm:px-6 md:justify-start md:space-x-10 overflow-hidden">
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
                    focus:scale-105 
                    transition-all 
                    hover:bg-slate-300/75 
                    dark:hover:bg-slate-700/75 
                    focus:bg-slate-300/75 
                    dark:focus:bg-slate-700/75 
                    py-0
                    lg:py-2 
                    text-sm
                    lg:text-md
                    text-black
                    dark:text-white
                    font-heading
                    px-6
                    border-dashed
                    border-r-2 
                    border-l-2
                    ${
                      isActive
                        ? "bg-slate-200/50 dark:bg-slate-800/50 border-green-400"
                        : "border-transparent"
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
              hover:bg-slate-300/75 
              dark:hover:bg-slate-700/75 
              focus:bg-slate-300/75 
              dark:focus:bg-slate-700/75 
              py-0
              lg:py-2 
              px-6
              text-sm
              lg:text-md
              text-black
              dark:text-white
              focus:scale-105 
              font-heading`}
              onClick={togglePrefersDarkMode}
            >
              <svg
                viewBox="0 0 100 100"
                y="0px"
                x="0px"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                className="fill-black dark:fill-white"
                width="40px"
                height="40px"
              >
                <rect
                  height="2"
                  width="6"
                  transform="matrix(-1.836970e-16 1 -1 -1.836970e-16 70 -28)"
                  y="20"
                  x="46"
                ></rect>
                <rect
                  height="2"
                  width="6"
                  transform="matrix(-1 -1.224647e-16 1.224647e-16 -1 50 90)"
                  y="44"
                  x="22"
                ></rect>
                <rect
                  height="2"
                  width="6"
                  transform="matrix(-1 -1.224647e-16 1.224647e-16 -1 146 90)"
                  y="44"
                  x="70"
                ></rect>
                <polygon points="72,32 68,32 68,34 66,34 66,36 68,36 68,34 72,34"></polygon>
                <polygon points="68,56 68,54 66,54 66,56 68,56 68,58 72,58 72,56"></polygon>
                <polygon points="32,54 30,54 30,56 26,56 26,58 30,58 30,56 32,56"></polygon>
                <polygon points="62,22 60,22 60,26 58,26 58,28 60,28 60,26 62,26"></polygon>
                <polygon points="38,26 38,22 36,22 36,26 38,26 38,28 40,28 40,26"></polygon>
                <polygon points="30,34 30,32 26,32 26,34 30,34 30,36 32,36 32,34"></polygon>
                <path d="M64,40l0-4h-2l0-2h-2l0-1.999L58,32l0-2h-4l0-2H44v2h-4v2l-2,0.001V34h-2v2h-2v4h-2v10l2,0v4l2,0v2h2v1.999  L40,58l0,4h2v4h-2v2h2v2h-2v2h2v2h-2v2h2v2h2v2l2,0l0,2h6v-2h2v-2h2l0-2h2v-2h-2l0-2h2l0-2h-2l0-2h2v-2h-2l0-4h2v-4l2-0.001h0L60,56  h2l0-2l2,0l0-4l2,0V40H64z M52,80h-6l0-2h6L52,80z M56,76H42v-2h14L56,76z M44,44h2v2h2v-2h2v2h2v-2h2l0,6h-2v4l-2,0l0,10h-2l0-10  l-2,0v-4h-2V44z M56,66l0,2H42v-2H56z M56,70l0,2H42v-2H56z M64,50l-2,0l0,4h-2l0,2l-2-0.001L58,58h-2l0,4l-2,0.001V64h-2l0-10h2v-4  l2,0v-6l-2,0l0-2h-2v2h-2v-2h-2v2h-2v-2h-2v2l-2,0v6l2,0v4h2l0,10h-2v-2h-2v-4h-2v-2.001L38,56v-2h-2v-4l-2,0V40h2v-4h2v-2l2,0.001  V32h4v-2h10l0,2h4l0,2.001L60,34l0,2h2l0,4h2V50z"></path>
              </svg>
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
                      <div className="ml-4 text-base font-normal text-black dark:text-white">
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
                  fill={prefersDarkMode ? "white" : "black"}
                  className="w-6 h-6 lg:w-10 lg:h-10"
                  src={"/icons/toggle-theme.svg"}
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
