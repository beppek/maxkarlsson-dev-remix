export default {
  widgets: [
    {
      name: 'vercel',
      layout: {
        width: 'full',
      },
    },
    {
      name: 'plausible-analytics',
      layout: { width: 'full' },
      options: { src: process.env.SANITY_STUDIO_PLAUSIBLE_SRC },
    },
  ],
};
