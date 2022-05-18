import { FcGallery } from 'react-icons/fc';

export default {
  name: 'gallery',
  type: 'object',
  title: 'Gallery',
  icon: FcGallery,
  fields: [
    {
      name: 'images',
      type: 'array',
      title: 'Images',
      of: [
        {
          type: 'imageAlt',
        },
      ],
      options: {
        layout: 'grid',
      },
    },
  ],
};
