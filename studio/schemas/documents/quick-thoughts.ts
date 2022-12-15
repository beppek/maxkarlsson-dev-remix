import { TfiThought } from 'react-icons/tfi';
import { RuleType } from '../../common/types';

export default {
  name: 'quickThought',
  title: 'Quick thoughts',
  type: 'document',
  icon: TfiThought,
  fields: [
    {
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
    },
    {
      name: 'content',
      title: 'Content',
      type: 'text',
      validation: (rule: RuleType) => rule.required().max(280),
    },
  ],
};
