export default {
  name: 'sectionHeading',
  title: 'Section Heading',
  type: 'object',
  options: {
    collapsible: true,
    collapsed: true,
  },
  fields: [
    {
      name: 'text',
      title: 'Heading',
      type: 'string',
    },
    {
      name: 'headingType',
      title: 'Display heading as',
      type: 'string',
      options: {
        list: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
      },
    },
  ],
  preview: {
    select: {
      title: 'text',
      media: 'content[0].asset',
    },
  },
};
