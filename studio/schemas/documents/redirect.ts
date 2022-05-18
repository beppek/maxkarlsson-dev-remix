import { FcRefresh } from 'react-icons/fc';

export default {
  name: 'redirect',
  title: 'Redirect',
  type: 'document',
  icon: FcRefresh,
  fields: [
    {
      name: 'source',
      title: 'From',
      type: 'string',
    },
    {
      name: 'destination',
      title: 'To',
      type: 'string',
    },
    {
      name: 'permanent',
      title: 'Permanent',
      type: 'boolean',
      initialValue: () => true,
    },
  ],
};
