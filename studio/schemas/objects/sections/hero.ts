import { FcFrame } from 'react-icons/fc';
import { sectionFields, sectionFieldsets } from '../../consts/sections';

export default {
  name: 'hero',
  type: 'object',
  title: 'Hero',
  icon: FcFrame,
  fieldsets: [
    ...sectionFieldsets,
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
    ...sectionFields,
    {
      name: 'titlePlacement',
      type: 'string',
      title: 'Title Placement',
      fieldset: 'settings',
      description:
        '(Optional) placement of the hero title. Allows placing the title at the bottom of the hero container.',
      options: {
        list: ['default', 'bottom'],
      },
      initialValue: () => 'default',
    },
    {
      name: 'heading',
      type: 'string',
      title: 'Heading',
      description: 'Optional',
    },
    {
      name: 'tagline',
      type: 'simpleBlockContent',
      title: 'Tagline',
    },
    {
      name: 'cta',
      title: 'Call to action',
      type: 'cta',
    },
  ],
  preview: {
    select: {
      title: 'heading',
      subtitle: 'label',
      disabled: 'disabled',
    },
    prepare({ title, disabled }) {
      return {
        title: `Hero: ${disabled ? 'DISABLED' : title}`,
      };
    },
  },
};
