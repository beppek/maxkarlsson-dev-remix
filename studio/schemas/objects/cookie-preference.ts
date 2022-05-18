export default {
  name: 'cookiePreference',
  type: 'object',
  title: 'Cookie preference',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
    },
    {
      name: 'required',
      type: 'boolean',
      title: 'Required?',
      initialValue: () => false,
    },
    {
      name: 'description',
      type: 'blockContent',
    },
    {
      name: 'cookieDetails',
      type: 'array',
      of: [
        {
          type: 'cookieDetails',
        },
      ],
    },
  ],
};
