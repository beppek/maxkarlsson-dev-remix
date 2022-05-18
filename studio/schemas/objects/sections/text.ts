import { FcList } from 'react-icons/fc';
import { sectionFields, sectionFieldsets } from '../../consts/sections';

export default {
  name: 'textSection',
  title: 'Text Block',
  type: 'object',
  icon: FcList,
  fieldsets: [...sectionFieldsets],
  fields: [
    ...sectionFields,
    {
      title: 'Text',
      type: 'bodyContent',
      name: 'text',
    },
  ],
};
