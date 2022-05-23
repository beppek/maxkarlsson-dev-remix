export default {
  name: 'groqQueries',
  title: 'Groq Queries',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    {
      name: 'query',
      title: 'Query',
      type: 'blockContent',
    },
  ],
};
