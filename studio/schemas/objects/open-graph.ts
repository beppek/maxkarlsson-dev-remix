import { RuleType } from '../../common/types';

export default {
  title: 'Open Graph',
  name: 'openGraph',
  type: 'object',
  fields: [
    {
      title: 'Enable Open Graph for this page?',
      name: 'enableOpenGraph',
      type: 'boolean',
      initialValue: () => false,
    },
    {
      title: 'Title',
      name: 'title',
      type: 'string',
      description: 'Heads up! This will override the page title.',
      validation: (Rule: RuleType) =>
        Rule.max(60).warning('Should be under 60 characters'),
    },
    {
      title: 'Description',
      name: 'description',
      type: 'text',
      validation: (Rule: RuleType) =>
        Rule.max(155).warning('Should be under 155 characters'),
    },
    {
      title: 'Image',
      description: 'Facebook recommends 1200x630 (will be auto resized)',
      name: 'image',
      type: 'imageAlt',
    },
    {
      title: 'Locale',
      name: 'locale',
      type: 'string',
      initialValue: () => 'en_AU',
    },
    /*
    // You can add videos to Open Graph tags too
    {
      name: 'video',
      title: 'Video',
      type: 'mux.video'
    }
    */
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        title,
      };
    },
  },
};
