import { useLoaderData } from '@remix-run/react';
import { fetchBackgroundOptions } from '~/lib/sanity';

export async function loader() {
  const { backgroundOptions } = await fetchBackgroundOptions();
  return {
    backgroundOptions,
  };
}

export default function SettingsPage() {
  const { backgroundOptions } = useLoaderData();
  return (
    <div>
      <h1>Settings</h1>
    </div>
  );
}
