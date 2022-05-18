export default {
  name: 'header',
  type: 'object',
  title: 'Header',
  fields: [
    {
      name: 'logo',
      type: 'imageAlt',
      title: 'Logo',
    },
    {
      name: 'title',
      type: 'string',
      title: 'Title',
    },
    {
      name: 'showTitle',
      type: 'boolean',
      title: 'Show title?',
      initialValue: () => false,
    },
    {
      name: 'primaryNav',
      type: 'reference',
      to: { type: 'navigation' },
      title: 'Primary Site Navigation',
      description: 'Select primary site navigation',
    },
    {
      name: 'secondaryNav',
      type: 'reference',
      to: { type: 'navigation' },
      title: 'Secondary Site Navigation',
      description: 'Select secondary site navigation',
    },
  ],
};
