import { FcAbout } from 'react-icons/fc';

export default {
  name: 'hint',
  title: 'Hint',
  icon: FcAbout,
  type: 'object',
  fields: [
    {
      name: 'variant',
      title: 'Variant',
      type: 'string',
      defaultValue: () => 'tip',
      options: {
        layout: 'radio',
        list: [
          { value: 'tip', title: 'Tip' },
          { value: 'warning', title: 'Warning' },
        ],
      },
    },
    {
      name: 'content',
      title: 'Content',
      type: 'text',
    },
  ],
};
