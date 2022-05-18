export default {
  type: 'object',
  name: 'teamMember',
  title: 'Team member',
  description: 'Team member with image and bio',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Name',
    },
    {
      name: 'position',
      type: 'string',
      title: 'Position',
    },
    {
      name: 'image',
      type: 'imageAlt',
      title: 'Image',
    },
    {
      name: 'bio',
      type: 'bodyContent',
      title: 'Bio',
    },
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image.image',
    },
  },
};
