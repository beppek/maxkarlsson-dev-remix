export default {
  name: 'footer',
  type: 'object',
  title: 'Footer',
  fields: [
    {
      name: 'copyright',
      type: 'string',
      title: 'Copyright',
    },
    {
      name: 'nav',
      type: 'reference',
      to: { type: 'navigation' },
      title: 'Footer Navigation',
      description: 'Select footer navigation',
    },
    {
      name: 'logo',
      type: 'imageAlt',
      title: 'Footer Logo',
    },
  ],
};
