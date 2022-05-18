export default {
  title: 'Link',
  name: 'link',
  type: 'object',
  fields: [
    {
      title: 'Select the type of link',
      description:
        'External links go to other websites using the format `https://www.google.com`. Internal links are restricted to other pages in the SANITY database. ☝️ If you change this type remember to remove the old value to remove bugs ☝️',
      name: 'linkType',
      type: 'string',
      options: {
        list: [
          { title: 'External', value: 'external' },
          { title: 'Internal', value: 'internal' },
        ],
        layout: 'radio',
      },
    },
    {
      title: 'Page',
      name: 'page',
      hidden: ({ parent }) => parent?.linkType !== 'internal',
      type: 'reference',
      to: [
        {
          type: 'page',
        },
        {
          type: 'post',
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
      name: 'href',
      type: 'url',
      hidden: ({ parent }) => parent?.linkType !== 'external',
      description: 'Example: https://www.sanity.io',
    },
  ],
  preview: {
    select: {
      title: 'title',
      pageUrl: 'page.slug.current',
      link: 'link',
    },
    prepare({ title, pageUrl, link }) {
      let subtitle = 'Not set';
      if (pageUrl) {
        subtitle = `Slug: /${pageUrl}`;
      }
      if (link) {
        subtitle = `External: ${link}`;
      }
      return {
        title,
        subtitle,
      };
    },
  },
};
