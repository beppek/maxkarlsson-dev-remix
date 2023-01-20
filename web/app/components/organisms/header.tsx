import { Fragment, useMemo } from "react";
import { Popover, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { NavLink, useLoaderData } from "@remix-run/react";
import { usePrefersDarkMode } from "~/hooks/use-prefers-dark-mode";
import { getUrlForImage } from "~/lib/sanity";
import { LightBulbIcon } from "../icons/light-bulb";

export function Header() {
  const {
    layout: { primaryNav, title, logo },
  } = useLoaderData();

  const { togglePrefersDarkMode } = usePrefersDarkMode();

  const logoUrl = useMemo(
    () => ({
      mobile: getUrlForImage(logo).size(80, 80).url(),
      desktop: getUrlForImage(logo).size(60, 60).url(),
    }),
    [logo]
  );

  return (
    <Popover className="top-0 z-10 bg-white dark:bg-black">
      <div className="flex justify-between items-center lg:px-4 py-6 md:py-0 px-6 md:justify-start md:space-x-10 overflow-hidden">
        <div>
          <NavLink to="/" className="flex">
            <span className="sr-only">{title}</span>
            <picture>
              <source
                srcSet={`${logoUrl.mobile}`}
                media="(max-width: 639px)"
                className="lg:h-8 w-auto h-10"
                width="32"
                height="32"
              />
              <img
                srcSet={`${logoUrl.mobile} 40w, ${logoUrl.desktop} 50w`}
                sizes="(max-width: 639px) 40px, 50px"
                className="lg:h-8 w-auto h-10 rounded-full"
                src={logoUrl.mobile}
                alt={title}
                width="32"
                height="32"
              />
            </picture>
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
          <nav className="flex space-x-2">
            {primaryNav?.items.map((item: any) => (
              <Fragment key={item._key}>
                <NavLink
                  className={({ isActive }) => {
                    return `
                    group
                    relative 
                    items-center 
                    transition-all 
                    py-2
                    lg:py-3 
                    text-sm
                    lg:text-md
                    font-heading
                    px-8
                    hover:text-pink-900 
                    dark:hover:text-pink-100
                    ${
                      isActive
                        ? "border-green-400 text-green-900 dark:text-green-100"
                        : "border-slate-100 dark:border-slate-900 text-black dark:text-white"
                    }
                    `;
                  }}
                  to={`/${item.link.href}`}
                >
                  {({ isActive }) => (
                    <>
                      <div
                        className={`
                          w-full 
                          transition-all 
                          absolute 
                          left-0 
                          right-0 
                          z-10 
                          top-0 
                          h-[2px]
                          group-hover:shadow-pink-400
                          group-hover:bg-pink-400
                          group-hover:shadow-glow
                          ${
                            isActive
                              ? "bg-green-400 shadow-green-400 shadow-glow"
                              : "dark:bg-slate-700 bg-slate-200"
                          }
                    `}
                      />
                      <span className="lg:pt-2 flex items-center gap-2">
                        {" "}
                        <img
                          className="w-6 h-6"
                          aria-hidden="true"
                          src={getUrlForImage(item.icon)
                            .width(50)
                            .height(50)
                            .url()}
                          alt={item.icon.alt}
                        />
                        {item.text}
                      </span>
                    </>
                  )}
                </NavLink>
              </Fragment>
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
                hover:bg-slate-900 
                dark:hover:bg-amber-200 
                focus:bg-slate-700
                dark:focus:bg-amber-100
                py-0
                lg:py-0 
                px-0
                rounded-full
                bg-black
                dark:bg-white
                text-sm
                lg:text-md
                text-black
                dark:text-white
                focus:scale-105 
                font-heading`}
              onClick={togglePrefersDarkMode}
            >
              <LightBulbIcon height={32} width={32} />
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
                <NavLink to="/" className="flex">
                  <span className="sr-only">{title}</span>
                  <picture>
                    <source
                      srcSet={`${logoUrl.mobile}`}
                      media="(max-width: 639px)"
                      className="lg:h-8 w-auto h-10"
                      width="32"
                      height="32"
                    />
                    <source
                      srcSet={`${logoUrl.desktop}`}
                      sizes="(min-width: 640px)"
                      className="lg:h-8 w-auto h-10"
                      width="50"
                      height="50"
                    />
                    <img
                      srcSet={`${logoUrl.mobile} 40w, ${logoUrl.desktop} 50w`}
                      sizes="(max-width: 639px) 40px, 50px"
                      className="lg:h-8 w-auto h-10 rounded-full"
                      src={logoUrl.desktop}
                      alt={title}
                      width="50"
                      height="50"
                    />
                  </picture>
                </NavLink>
                <div className="mt-1">
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
                      className="-m-3 p-3 flex items-center rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
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
                    flex-row 
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
                <LightBulbIcon className="dark:fill-white fill-black" />
                Toggle
              </button>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}
