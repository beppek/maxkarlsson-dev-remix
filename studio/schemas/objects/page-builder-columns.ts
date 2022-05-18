import { FcTemplate } from 'react-icons/fc';

export default {
  name: 'pageBuilderColumns',
  title: 'Columns',
  type: 'object',
  icon: FcTemplate,
  fields: [
    {
      name: 'columns',
      title: 'Columns',
      type: 'array',
      of: [{ name: 'column', title: 'Column', type: 'column' }],
    },
  ],
  preview: {
    select: {
      columns: 'columns',
    },
    prepare({ columns }) {
      return {
        title: `${columns.length} Column${columns.length > 1 ? 's' : ''}`,
        subtitle: columns
          .map(
            (column: {
              content: {
                _type: string;
                title?: string;
                caption?: string;
                label?: string;
              }[];
            }) =>
              column.content[0].title ||
              column.content[0].label ||
              column.content[0].caption ||
              (column.content[0]._type === 'bodyContent' && 'Text Block') ||
              column.content[0]._type ||
              'Unkown',
          )
          .join(', '),
      };
    },
  },
};
