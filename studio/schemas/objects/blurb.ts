import { FcAbout } from 'react-icons/fc';

export default {
  title: 'Blurb',
  name: 'blurb',
  type: 'object',
  icon: FcAbout,
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string',
    },
    {
      title: 'Text',
      name: 'text',
      type: 'bodyContent',
    },
    {
      title: 'Image',
      name: 'image',
      type: 'imageAlt',
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'text.content[0].children[0].text',
      media: 'image.asset',
    },
  },
};
