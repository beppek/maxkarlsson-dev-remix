import { FcUpRight } from 'react-icons/fc';

export default {
  name: 'navItem',
  type: 'object',
  title: 'NavItem',
  icon: FcUpRight,
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
      name: 'text',
      type: 'string',
      title: 'Text',
    },
    {
      name: 'icon',
      fieldset: 'icon',
      type: 'icon',
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
      name: 'navItemAction',
      type: 'navItemAction', // references link object
      title: 'Nav Item action',
    },
    {
      name: 'subItems',
      type: 'array',
      title: 'Subnavigation',
      of: [{ type: 'navItem' }],
    },
  ],
};
