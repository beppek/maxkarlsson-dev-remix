import { GiCompass } from 'react-icons/gi';

export default {
  type: 'object',
  name: 'navSection',
  title: 'Nav Section',
  icon: GiCompass,
  fieldsets: [
    {
      title: 'Icon',
      name: 'icon',
      description: '(Optional) Nav item icon',
      options: {
        collapsible: true, // Makes the whole fieldset collapsible
        collapsed: true, // Defines if the fieldset should be collapsed by default or not
      },
    },
  ],
  fields: [
    {
      type: 'string',
      name: 'title',
    },
    {
      name: 'icon',
      fieldset: 'icon',
      type: 'imageAlt',
      title: 'Icon',
    },
    {
      name: 'style',
      type: 'string',
      fieldset: 'icon',
      title: 'Style',
      options: {
        list: [
          { value: 'icon', title: 'Icon only' },
          { value: 'text', title: 'Text only' },
          { value: 'both', title: 'Icon and Text' },
        ],
      },
      initialValue: () => 'text',
    },
    {
      type: 'array',
      name: 'items',
      of: [{ type: 'navItem' }],
    },
  ],
};
