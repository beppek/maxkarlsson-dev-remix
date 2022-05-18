import { FcSportsMode } from 'react-icons/fc';
import { sectionFields, sectionFieldsets } from '../../../consts/sections';

export default {
  title: 'Call to action',
  name: 'cta',
  type: 'object',
  icon: FcSportsMode,
  fieldsets: [...sectionFieldsets],
  fields: [
    ...sectionFields,
    {
      name: 'titleIcon',
      type: 'icon',
      description: 'optional',
      options: {
        collapsible: true,
        collapsed: true,
      },
    },
    {
      title: 'Title',
      name: 'title',
      type: 'string',
      description: 'Optional',
    },
    {
      title: 'Show title as',
      name: 'titleLevel',
      type: 'string',
      description: 'Optional',
      options: {
        list: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
      },
    },
    {
      name: 'body',
      title: 'Features',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      title: 'CTA Buttons',
      name: 'ctaButtons',
      type: 'array',
      of: [{ type: 'ctaButton' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      route: 'landingPageRoute.slug.current',
      staticRoute: 'landingPageRoute.page.title',
    },
    prepare({ title }) {
      return {
        title: `CTA: ${title}`,
      };
    },
  },
};
