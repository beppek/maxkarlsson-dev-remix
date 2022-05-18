export default {
  name: 'cookieDetails',
  type: 'object',
  title: 'Cookie details',
  fields: [
    {
      name: 'provider',
      type: 'string',
      title: 'Provider',
    },
    {
      name: 'name',
      type: 'string',
      title: 'name',
    },
    {
      name: 'purpose',
      type: 'text',
    },
    {
      name: 'type',
      type: 'string',
      options: {
        list: ['http_cookie', 'server_cookie'],
      },
      initialValue: () => 'http_cookie',
    },
    {
      name: 'expiresIn',
      type: 'string',
    },
  ],
};
