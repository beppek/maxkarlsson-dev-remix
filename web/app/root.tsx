import type { MetaFunction } from "@remix-run/cloudflare";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import type { ReactElement } from "react";
import { DynamicLinks } from "remix-utils";
import { Layout } from "~/components/templates/layout";
import { fetchLayout, getUrlForImage } from "~/lib/sanity";
import styles from "./tailwind.css";

export const meta: MetaFunction = ({
  data: {
    layout: { logo, title },
  },
}) => {
  return {
    charset: "utf-8",
    title: title,
    description:
      "Max Karlsson, a web developer, shares his insights and expertise on web development topics. From coding tips to industry trends, check out this blog for valuable insights and advice.",
    "og:image": getUrlForImage(logo).size(1200, 627).url(),
    viewport: "width=device-width,initial-scale=1",
  };
};

export function links() {
  return [
    { rel: "stylesheet", href: styles },
    { rel: "preconnect", href: "https://cdn.sanity.io" },
    {
      rel: "preconnect",
      // href: 'https://fonts.googleapis.com',
      href: "https://fonts.gstatic.com",
      crossOrigin: "true",
    },
    {
      rel: "preload",
      as: "style",
      href: "https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Fira+Sans&display=swap",
      onLoad: "this.rel='stylesheet'",
    },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Fira+Sans&display=swap",
    },
  ];
}

export async function loader() {
  const layout = await fetchLayout();
  return {
    layout,
  };
}

function Document({ children }: { children: ReactElement | ReactElement[] }) {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
        <DynamicLinks />
        <script
          defer
          data-domain="maxkarlsson.dev"
          data-api="https://floral-smoke-a5ad.hyperlane.workers.dev/maxk/event"
          src="https://floral-smoke-a5ad.hyperlane.workers.dev/maxk/script.js"
        ></script>
      </head>
      <body>
        <Layout>{children}</Layout>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export function CatchBoundary() {
  return (
    <Document>
      <main className="px-4 lg:px-8 py-2 lg:py-20 w-full">
        <div className="flex justify-center content-center">
          <div className="text-black dark:text-white">
            <div className="w-full lg:max-w-4xl">
              <h2 className="font-heading text-2xl">
                Hey mate, looks like you got lost!
              </h2>
              <p className="mt-4">
                This page is out in woop woop, try something else.
              </p>
            </div>
          </div>
        </div>
      </main>
    </Document>
  );
}

export function ErrorBoundary({ error }: any) {
  console.error(error);
  return (
    <html>
      <head>
        <title>Oh no!</title>
      </head>
      <body>
        {/* add the UI you want your users to see */}
        <p>Something went wrong</p>
      </body>
    </html>
  );
}

export default function App() {
  return (
    <Document>
      <Outlet />
    </Document>
  );
}
