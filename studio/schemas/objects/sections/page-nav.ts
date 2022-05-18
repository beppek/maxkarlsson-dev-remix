import { FcFlowChart } from 'react-icons/fc';

export default {
  title: 'Page Menu',
  name: 'pageNav',
  type: 'object',
  icon: FcFlowChart,
  description: 'In page menu',
  fields: [
    {
      title: 'Menu',
      name: 'menu',
      type: 'reference',
      to: [
        {
          type: 'navigation',
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'menu.title',
    },
  },
};
