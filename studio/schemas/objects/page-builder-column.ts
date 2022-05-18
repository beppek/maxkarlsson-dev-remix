import { FiColumns } from 'react-icons/fi';

export default {
  name: 'column',
  title: 'Column',
  type: 'object',
  icon: FiColumns,
  fields: [
    {
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        { type: 'cta' },
        { type: 'form' },
        { type: 'textWithIllustration' },
        { type: 'bodyContent' },
        { type: 'imageAlt' },
        { type: 'blurb' },
      ],
    },
  ],
  preview: {
    select: {
      content: 'content',
      media: 'content[0].asset',
    },
    prepare({ content: [content], media }) {
      return content._type === 'imageAlt'
        ? {
            media,
            title: 'Image',
          }
        : content._type === 'bodyContent'
        ? {
            title: 'Text Block',
            subtitle: content.content[0].children[0].text,
          }
        : content._type === 'blurb'
        ? {
            title: content.title,
            subtitle: content.text.content[0].children[0].text,
            media: content.image.asset,
          }
        : {
            title: content.title || content.label,
          };
    },
  },
};
