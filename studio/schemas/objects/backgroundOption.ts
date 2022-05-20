export default {
  name: 'backgroundOption',
  title: 'Background option',
  type: 'object',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    {
      name: 'options',
      title: 'Options',
      type: 'array',
      of: [{ type: 'image' }],
    },
  ],
};
