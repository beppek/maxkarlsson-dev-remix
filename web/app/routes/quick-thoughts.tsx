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
    <div className="flex flex-col gap-4 mx-8 lg:mx-12 my-4 lg:my-10 text-black dark:text-white">
      {quickThoughts.map(
        (item: { content: string; publishedAt: string; _id: string }) => (
          <div className="" key={item._id}>
            <div className="border-solid border-2 border-black dark:border-white rounded-2xl px-4 py-2 inline-block">
              <p>{item.content}</p>
              <p className="text-sm text-slate-500 dark:text-slate-200">
                {format(new Date(item.publishedAt), 'MMMM d, y, p')}
              </p>
            </div>
            <div className="w-4 h-4 border-solid border-2 border-black dark:border-white rounded-full mt-1 -ml-1" />
            <div className="w-2 h-2 border-solid border-2 border-black dark:border-white rounded-full mt-1 -ml-3" />
          </div>
        ),
      )}
    </div>
  );
}
