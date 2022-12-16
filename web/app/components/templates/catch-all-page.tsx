import { useLoaderData } from '@remix-run/react';
import type { Page, PageSection, TextSection } from '~/common/types';
import { BlockContent } from '../organisms/block-content';

function DefaultComponent() {
  return <>Not yet implemented</>;
}

const sections: Record<PageSection['_type'], any> = {
  textSection: (props: TextSection) => (
    <BlockContent blocks={props.text.content} />
  ),
  hero: DefaultComponent,
};

export function CatchAllPage() {
  const { page }: { page: Page } = useLoaderData() as { page: Page };

  return (
    <main className="px-4 lg:px-8 py-2 lg:py-20 w-full">
      <div className="flex justify-center content-center">
        <div className="w-full lg:max-w-4xl">
          <h1 className="font-heading text-2xl dark:text-white">
            {page.title}
          </h1>
          {page.sections.map((section) => {
            const Component = sections[section._type];
            return <Component key={section._key} {...section} />;
          })}
        </div>
      </div>
    </main>
  );
}
