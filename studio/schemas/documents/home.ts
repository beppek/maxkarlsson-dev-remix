export default {
  name: "home",
  title: "Home",
  type: "document",
  fields: [
    {
      name: "links",
      title: "Links",
      type: "array",
      of: [
        {
          type: "object",
          name: "links",
          title: "Links",
          fields: [
            {
              name: "link",
              title: "Link",
              type: "link",
            },
            {
              name: "image",
              title: "Image",
              type: "imageAlt",
            },
            {
              name: "text",
              title: "Text",
              type: "string",
            },
          ],
        },
      ],
    },
  ],
};
