import { FcNews } from 'react-icons/fc';

export default {
  name: 'latestStories',
  type: 'object',
  title: 'Latest Stories',
  icon: FcNews,
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
    },
    {
      name: 'showAs',
      type: 'string',
      title: 'Show as',
      description: 'Select listing type',
      options: {
        list: ['grid', 'list'],
      },
    },
    {
      name: 'showExcerpt',
      type: 'boolean',
      title: 'Show excerpt',
    },
    {
      name: 'numberOfPosts',
      type: 'string',
      title: 'Number of posts',
      description: 'Select number of posts to show',
      options: {
        list: ['10', '25', '50'],
      },
    },
  ],
};
