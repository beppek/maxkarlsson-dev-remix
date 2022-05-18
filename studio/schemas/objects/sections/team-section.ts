import { FcBusinesswoman } from 'react-icons/fc';
import { sectionFields, sectionFieldsets } from '../../consts/sections';

export default {
  name: 'teamSection',
  title: 'Team section',
  type: 'object',
  icon: FcBusinesswoman,
  fieldsets: [...sectionFieldsets],
  fields: [
    ...sectionFields,
    {
      title: 'Heading',
      type: 'string',
      name: 'heading',
      description: 'Optional',
    },
    {
      title: 'Team members',
      type: 'array',
      name: 'teamMembers',
      of: [
        {
          type: 'teamMember',
        },
      ],
    },
  ],
};
