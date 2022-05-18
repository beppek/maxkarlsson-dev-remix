import { FcDocument } from 'react-icons/fc';
// import SlugInput from 'sanity-plugin-better-slug';
import { RuleType } from '../../common/types';
import { sections } from '../consts/sections';
import { getClient } from '../../src/utils';

async function asyncSlugifier(input: {
  doc: {
    title: string;
    parentPage: { _ref: string };
    [key: string]: any;
  };
  options: { [key: string]: any };
}) {
  const client = getClient();
  const parentQuery = '*[_id == $id][0]';
  const parentQueryParams = {
    id: input.doc.parentPage?._ref || '',
  };
  const parent: { slug: { current: string } } = await client.fetch(
    parentQuery,
    parentQueryParams,
  );
  const parentSlug = parent?.slug?.current ? `${parent.slug.current}/` : '';
  const pageSlug = input.doc.title
    .toLowerCase()
    .replace(/\s+/g, '-')
    .slice(0, 200);
  return `${parentSlug}${pageSlug}`;
}

export default {
  name: 'page',
  type: 'document',
  title: 'Page',
  icon: FcDocument,
  fieldsets: [
    {
      name: 'settings',
      title: 'Page Settings',
      options: {
        collapsible: true,
        collapsed: true,
      },
    },
  ],
  fields: [
    {
      name: 'settings',
      title: ' ',
      fieldset: 'settings',
      type: 'pageSettings',
    },
    {
      name: 'title',
      type: 'string',
      title: 'Title',
    },
    {
      name: 'parentPage',
      type: 'reference',
      description: 'Parent page (Optional)',
      to: [
        {
          type: 'page',
        },
      ],
    },
    {
      name: 'slug',
      type: 'slug',
      // inputComponent: SlugInput, // <- doesn't work with async slugifier and doesn't have document context
      description:
        'This is the website path the page will be accessible on. "index" will set this page as the homepage for your site.',
      title: 'Path',
      validation: (Rule: RuleType) =>
        Rule.required().custom((slug: { current: string }) => {
          if (slug && slug.current && slug.current === '/') {
            return 'Cannot be /';
          }
          return true;
        }),
      options: {
        basePath: process.env.SANITY_STUDIO_PROJECT_URL,
        source: (doc, options) => ({ doc, options }),
        slugify: asyncSlugifier,
      },
    },
    {
      name: 'sections',
      type: 'array',
      title: 'Sections',
      of: sections,
    },
  ],
  preview: {
    select: {
      subtitle: 'slug.current',
      title: 'title',
    },
    prepare({ title, subtitle }) {
      return {
        title,
        subtitle: ['/', subtitle].join(''),
      };
    },
  },
};
