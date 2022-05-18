import { FcList } from 'react-icons/fc';

export default {
  name: 'bodyContent',
  title: 'Text Block',
  type: 'object',
  icon: FcList,
  fieldsets: [
    {
      title: 'Settings',
      name: 'settings',
      options: {
        collapsible: true,
        collapsed: true,
      },
    },
  ],
  fields: [
    {
      title: 'Vertical alignment',
      name: 'verticalAlignment',
      type: 'string',
      description: '(Optional). Defaults to Top.',
      options: {
        list: ['top', 'bottom', 'middle'],
      },
      initialValue: () => 'top',
      fieldset: 'settings',
    },
    {
      title: 'Horizontal alignment',
      name: 'horizontalAlignment',
      type: 'string',
      description: '(Optional). Defaults to Left.',
      options: {
        list: ['left', 'right', 'center'],
      },
      initialValue: () => 'left',
      fieldset: 'settings',
    },
    {
      name: 'content',
      title: 'Content',
      type: 'blockContent',
    },
  ],
  preview: {
    select: {
      content: 'content',
    },
    prepare({ content }) {
      return {
        title: 'Text Block',
        subtitle: content[0].children[0].text,
      };
    },
  },
};
