import { FcOpenedFolder } from 'react-icons/fc';

export default {
  name: 'category',
  title: 'Category',
  type: 'document',
  icon: FcOpenedFolder,
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      // fieldset: 'content',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
};
