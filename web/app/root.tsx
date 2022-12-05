import type { MetaFunction } from '@remix-run/cloudflare';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';
import { Layout } from '~/components/templates/layout';
import { fetchLayout } from '~/lib/sanity';
import styles from './tailwind.css';

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'New Remix App',
  viewport: 'width=device-width,initial-scale=1',
});

export function links() {
  return [
    { rel: 'stylesheet', href: styles },
    { rel: 'preconnect', href: 'https://cdn.sanity.io' },
    {
      rel: 'preconnect',
      // href: 'https://fonts.googleapis.com',
      href: 'https://fonts.gstatic.com',
      crossorigin: true,
    },
    {
      rel: 'preload',
      as: 'style',
      href: 'https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Fira+Sans&display=swap',
      onload: "this.rel='stylesheet'",
    },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Fira+Sans&display=swap',
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
