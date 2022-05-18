import { RiLayoutRowLine } from 'react-icons/ri';

import { sections } from '../consts/sections';

export default {
  title: 'Section',
  name: 'section',
  type: 'object',
  icon: RiLayoutRowLine,
  fieldsets: [
    {
      title: 'Settings',
      name: 'settings',
      description: 'Section settings',
      options: {
        collapsible: true,
        collapsed: true,
      },
    },
    {
      title: 'Components',
      name: 'components',
      description: 'Select section component',
    },
  ],
  fields: [
    {
      title: 'Section label',
      name: 'label',
      type: 'string',
      description: 'Used for display purposes in this interface',
    },
    {
      title: 'Section Heading',
      name: 'heading',
      type: 'sectionHeading',
      description: '(Optional) section heading',
    },
    {
      title: 'Anchor',
      name: 'anchor',
      type: 'string',
      description: 'Section anchor. Excluding #',
      fieldset: 'settings',
    },
    {
      name: 'textColor',
      type: 'color',
      fieldset: 'settings',
    },
    {
      name: 'background',
      type: 'background',
      fieldset: 'settings',
    },
    {
      title: 'Component',
      name: 'component',
      type: 'array',
      of: sections,
      options: {
        editModal: 'fullscreen',
      },
    },
  ],
  preview: {
    select: {
      title: 'label',
    },
  },
};
