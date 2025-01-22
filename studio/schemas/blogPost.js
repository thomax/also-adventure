export default {
  name: 'blogPost',
  title: 'Blog Post',
  type: 'document',
  liveEdit: true,
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string',
    },
    {
      title: 'Main Image',
      name: 'mainImage',
      type: 'image',
      options: { hotspot: true },
    },
    {
      title: 'Publish At',
      name: 'publishAt',
      type: 'datetime',
      options: {
        timeStep: 15,
        calendarTodayLabel: 'Today',
      },
    },
    {
      title: 'Body',
      name: 'body',
      type: 'blockContent',
    },
    {
      title: 'Slug',
      name: 'slug',
      type: 'slug',
      validation: (Rule) => Rule.required(),
      options: {
        source: 'title',
        maxLength: 96,
      },
    },
    {
      title: 'Categories',
      name: 'categories',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'category' }] }],
    },
    {
      title: 'Authors',
      name: 'authors',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'user' }] }],
    },
    {
      title: 'Comments',
      name: 'comments',
      type: 'array',
      of: [{ type: 'comment' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      category: 'category.singular',
      image: 'mainImage',
    },
    prepare({ title, category, image }) {
      return {
        title: title || 'untitled',
        subtitle: category,
        media: image,
      }
    },
  },
}
