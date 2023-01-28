import { FcCommandLine } from 'react-icons/fc';

export default {
  name: 'aiArtGallery',
  title: 'AI Art Gallery',
  type: 'document',
  icon: FcCommandLine,
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'aiArtImage',
      title: 'Ai art image',
      type: 'array',
      of: [{ type: 'aiArtImage' }],
    },
  ],
};
