export default {
  name: 'desktopSettings',
  title: 'Desktop Settings',
  type: 'object',
  fields: [
    {
      name: 'backgroundOptions',
      title: 'Background options',
      type: 'array',
      of: [{ type: 'backgroundOption' }],
    },
  ],
};
