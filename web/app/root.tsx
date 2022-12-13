import type { MetaFunction } from "@remix-run/cloudflare";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
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

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
        <script
          defer
          data-domain="maxkarlsson.dev"
          data-api="https://floral-smoke-a5ad.hyperlane.workers.dev/maxk/event"
          src="https://floral-smoke-a5ad.hyperlane.workers.dev/maxk/script.js"
        ></script>
      </head>
      <body>
        <Layout>
          <Outlet />
        </Layout>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
