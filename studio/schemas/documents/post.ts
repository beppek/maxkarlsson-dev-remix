import { FcNews } from 'react-icons/fc';

export default {
  name: 'post',
  title: 'Post',
  type: 'document',
  icon: FcNews,
  fieldsets: [
    { name: 'content', title: 'Content', options: { sortOrder: 10 } },
    {
      name: 'seo',
      title: 'SEO',
      options: { sortOrder: 20, collapsible: true, collapsed: true },
    },
  ],
  fields: [
    {
      name: 'openGraph',
      type: 'openGraph',
      fieldset: 'seo',
    },
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      // fieldset: 'content',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      // fieldset: 'content',
    },
    {
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: { type: 'author' },
      // fieldset: 'content',
    },
    {
      name: 'mainImage',
      title: 'Main image',
      type: 'imageAlt',
      // fieldset: 'content',
    },
    {
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'category' } }],
      // fieldset: 'content',
    },
    {
      name: 'tags',
      type: 'array',
      title: 'Tags',
      description: 'Add tags for the post.',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    },
    {
      title: 'Level',
      type: 'string',
      name: 'level',
      options: {
        list: ['beginner', 'intermediate', 'advanced'],
      },
      initialValue: () => 'beginner',
    },
    {
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      // fieldset: 'content',
    },
    {
      name: 'excerpt',
      title: 'Excerpt',
      type: 'blockContent',
      // fieldset: 'content',
    },
    {
      name: 'body',
      title: 'Body',
      type: 'blockContent',
      // fieldset: 'content',
    },
  ],
  orderings: [
    {
      title: 'Published at, New',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
    {
      title: 'Published at, Old',
      name: 'publishedAtAsc',
      by: [{ field: 'publishedAt', direction: 'asc' }],
    },
    {
      title: 'Title, Desc',
      name: 'titleDesc',
      by: [{ field: 'title', direction: 'desc' }],
    },
    {
      title: 'Title, Asc',
      name: 'titleAsc',
      by: [{ field: 'title', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage',
    },
    prepare(selection: {
      author: string;
      title: string;
    }): { author: string } & { subtitle: string } {
      const { author } = selection;
      return {
        ...selection,
        subtitle: author && `by ${author}`,
      };
    },
  },
};
