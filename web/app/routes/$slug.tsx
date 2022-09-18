import type { LoaderArgs } from '@remix-run/cloudflare';
import { CatchAllPage } from '~/components/templates/catch-all-page';
import { fetchPage } from '~/lib/sanity';

export async function loader({ params }: LoaderArgs) {
  const { slug } = params;
  const page = await fetchPage({ slug: slug as string });
  return {
    page,
  };
}

export default function CatchAll() {
  return <CatchAllPage />;
}
