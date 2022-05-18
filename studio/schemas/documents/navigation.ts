import { FcMenu } from 'react-icons/fc';

export default {
  type: 'document',
  name: 'navigation',
  title: 'Navigation',
  icon: FcMenu,
  fields: [
    {
      type: 'string',
      name: 'title',
    },
    {
      type: 'array',
      name: 'items',
      of: [{ type: 'navItem' }, { type: 'navSection' }],
    },
  ],
};
