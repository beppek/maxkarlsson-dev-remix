import { FcVideoProjector } from 'react-icons/fc';

export default {
  name: 'video',
  type: 'object',
  title: 'Video',
  icon: FcVideoProjector,
  fields: [
    {
      name: 'videoLabel',
      type: 'string',
      title: 'Video Label',
    },
    {
      name: 'url',
      type: 'string',
      title: 'URL',
    },
  ],
};
