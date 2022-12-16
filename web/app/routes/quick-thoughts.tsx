import { useLoaderData } from '@remix-run/react';
import format from 'date-fns/format';
import { fetchAllQuickThoughts } from '~/lib/sanity';

export async function loader() {
  const quickThoughts = await fetchAllQuickThoughts();
  return {
    quickThoughts,
  };
}

export default function QuickThoughts() {
  const { quickThoughts } = useLoaderData();
  return (
    <div className="flex flex-col gap-4 mx-4 lg:mx-8 my-4 lg:my-10 text-black dark:text-white">
      {quickThoughts.map(
        (item: { content: string; publishedAt: string; _id: string }) => (
          <div key={item._id}>
            <h2>{format(new Date(item.publishedAt), 'MMMM d, y, p')}</h2>
            <p>{item.content}</p>
          </div>
        ),
      )}
    </div>
  );
}
