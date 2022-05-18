import { FcTodoList } from 'react-icons/fc';
import { sectionFields, sectionFieldsets } from '../../consts/sections';

export default {
  name: 'listing',
  type: 'object',
  title: 'Listing',
  icon: FcTodoList,
  fieldsets: [...sectionFieldsets],
  fields: [
    ...sectionFields,
    {
      title: 'Listing type',
      name: 'listingType',
      type: 'string',
      description: 'Select listing type to display',
      options: {
        list: [
          {
            title: 'Products',
            value: 'products',
          },
          {
            title: 'Product Categories',
            value: 'productCategories',
          },
          {
            title: 'News Articles',
            value: 'newsArticles',
          },
          {
            title: 'Support Articles',
            value: 'supportArticles',
          },
        ],
      },
    },
  ],
};
