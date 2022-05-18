import { RuleType } from '../../common/types';

export default {
  name: 'variation',
  type: 'object',
  title: 'Variation',
  fields: [
    {
      name: 'variationId',
      type: 'string',
      validation: (Rule: RuleType) => Rule.required(),
    },
    {
      name: 'percentage',
      type: 'number',
      title: 'Traffic percentange',
      validation: (Rule: RuleType) => Rule.required(),
    },
    {
      name: 'page',
      type: 'reference',
      to: [
        {
          type: 'page',
        },
      ],
    },
  ],
  preview: {
    select: {
      variationId: 'variationId',
      percentage: 'percentage',
      page: 'page.title',
    },
    prepare({ percentage, page, variationId }) {
      return {
        title: `${variationId || 'Missing id'} / ${percentage}%`,
        subtitle: page,
      };
    },
  },
};
