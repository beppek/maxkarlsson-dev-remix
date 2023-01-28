export default {
  name: 'aiArtImage',
  title: 'AI Art Image',
  type: 'object',
  fields: [
    {
      name: 'prompt',
      title: 'Prompt',
      type: 'string',
    },
    {
      name: 'image',
      title: 'Image',
      type: 'imageAlt',
    },
    {
      name: 'seed',
      title: 'Seed',
      type: 'string',
    },
    {
      name: 'scale',
      title: 'Scale',
      type: 'string',
    },
    {
      name: 'steps',
      title: 'Steps',
      type: 'string',
    },
    {
      name: 'width',
      title: 'Width',
      type: 'string',
    },
    {
      name: 'height',
      title: 'Height',
      type: 'string',
    },
    {
      name: 'modelVersion',
      title: 'Model version',
      type: 'string',
    },
  ],
  preview: {
    select: {
      title: 'prompt',
      media: 'image',
    },
  },
};
