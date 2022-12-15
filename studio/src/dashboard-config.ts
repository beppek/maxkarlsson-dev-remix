export default {
  widgets: [
    {
      name: "plausible-analytics",
      layout: { width: "full" },
      // @ts-ignore
      options: { src: import.meta.env.SANITY_STUDIO_PLAUSIBLE_SRC },
    },
  ],
};
