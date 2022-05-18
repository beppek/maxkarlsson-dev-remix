export default {
  name: 'banner',
  title: 'Banner',
  type: 'object',
  fields: [
    {
      name: 'showBanner',
      title: 'Show banner',
      type: 'boolean',
    },
    {
      name: 'content',
      title: 'Content',
      type: 'bodyContent',
    },
  ],
};
