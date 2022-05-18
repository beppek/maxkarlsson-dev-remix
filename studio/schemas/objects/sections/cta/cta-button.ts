import { FcSportsMode } from 'react-icons/fc';

export default {
  name: 'ctaButton',
  type: 'object',
  title: 'CTA Button',
  icon: FcSportsMode,
  fieldsets: [
    {
      title: 'Link',
      name: 'link',
      description: 'Only the first value of these will be used',
    },
  ],
  fields: [
    {
      title: 'Button label',
      name: 'label',
      type: 'string',
    },
    {
      title: 'Page',
      name: 'page',
      type: 'reference',
      fieldset: 'link',
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
      description:
        'Example: #my-anchor. Can be used together with page link above.',
      fieldset: 'link',
    },
    {
      title: 'External link',
      name: 'link',
      type: 'url',
      description: 'Example: https://www.sanity.io',
      fieldset: 'link',
    },
    {
      title: 'Kind',
      name: 'kind',
      type: 'string',
      options: {
        layout: 'radio',
        list: ['primary', 'secondary'],
      },
    },
    {
      title: 'Inverted?',
      name: 'inverted',
      type: 'boolean',
      options: {
        layout: 'checkbox',
      },
    },
  ],
};
