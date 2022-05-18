export default {
  type: 'object',
  name: 'textWithIllustration',
  title: 'Big CTA with illustration',
  description:
    'Big call-to-action with headline, subtitle, clickable cta text and illustration',
  fields: [
    {
      name: 'label',
      type: 'string',
      title: 'Label',
    },
    {
      name: 'title',
      type: 'string',
      title: 'Title',
    },
    {
      name: 'subtitle',
      type: 'text',
      title: 'Subtitle',
    },
    {
      name: 'body',
      type: 'blockContent',
      title: 'Body',
    },
    {
      name: 'cta',
      type: 'cta',
      title: 'Call-to-action',
    },
    {
      name: 'image',
      type: 'imageAlt',
    },
    {
      name: 'reversed',
      type: 'boolean',
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
      media: 'image.image',
    },
    prepare: (fields: { title: string }) => ({
      ...fields,
      title: `Big Cta: ${fields.title}`,
    }),
  },
};
