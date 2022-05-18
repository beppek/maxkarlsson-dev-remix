import { navItemFeatures } from '../../src/consts/nav-item-features';

export default {
  title: 'Nav item action',
  name: 'navItemAction',
  type: 'object',
  description:
    'Select action when user clicks nav item. Only the first option will be used.',
  fields: [
    {
      title: 'Select the type of link',
      description:
        'ℹ️ External links go to other websites using the format `https://www.google.com`. Internal links are restricted to other pages in the SANITY database. Features are non-nav related functions. ☝️ If you change this type remember to remove the old value to remove bugs ☝️',
      name: 'linkType',
      type: 'string',
      options: {
        list: [
          { title: 'Internal', value: 'internal' },
          { title: 'External', value: 'external' },
          { title: 'Feature', value: 'feature' },
        ],
        layout: 'radio',
      },
      initialValue: () => 'internal',
    },
    {
      title: 'Page',
      name: 'page',
      type: 'reference',
      hidden: ({ parent }) => parent?.linkType !== 'internal',
      to: [
        {
          type: 'page',
        },
      ],
    },
    {
      title: 'Internal anchor link',
      name: 'anchorLink',
      type: 'string',
      hidden: ({ parent }) => parent?.linkType !== 'internal',
      description:
        'Example: #my-anchor. Can be used together with page link above.',
    },
    {
      title: 'External link',
      name: 'link',
      type: 'url',
      hidden: ({ parent }) => parent?.linkType !== 'external',
      description: 'Example: https://www.sanity.io',
    },
    {
      title: 'Feature',
      name: 'triggerFunction',
      hidden: ({ parent }) => parent?.linkType !== 'feature',
      type: 'string',
      options: {
        list: navItemFeatures,
      },
    },
    {
      title: 'Kind',
      name: 'kind',
      type: 'string',
      options: {
        layout: 'radio',
        list: ['button', 'link'],
      },
      initialValue: () => 'link',
    },
  ],
  preview: {
    select: {
      title: 'title',
      pageUrl: 'page.slug.current',
      link: 'link',
    },
    prepare({ title, pageUrl, link }) {
      return {
        title,
        subtitle: pageUrl
          ? `Slug: /${pageUrl}`
          : link
          ? `External: ${link}`
          : 'Not set',
      };
    },
  },
};
