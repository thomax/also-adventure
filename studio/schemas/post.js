export default {
  name: 'post',
  title: 'Post',
  type: 'document',
  liveEdit: true,
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string'
    },
    {
      title: 'Main Image',
      name: 'mainImage',
      type: 'image',
      options: { hotspot: true }
    },
    {
      title: 'Body',
      name: 'body',
      type: 'blockContent'
    },
    {
      title: 'Slug',
      name: 'slug',
      type: 'slug',
      validation: (Rule) => Rule.required(),
      options: {
        source: 'title',
        maxLength: 96
      }
    },
    {
      title: 'Category',
      name: 'category',
      type: 'reference',
      to: [{ type: 'category' }]
    },
    {
      title: 'Campaign',
      name: 'campaign',
      type: 'reference',
      to: [{ type: 'campaign' }]
    },
    {
      title: 'Order',
      name: 'order',
      type: 'number',
      description: 'A number. Use this if document is a session'
    },
    {
      title: 'Authors',
      name: 'authors',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'user' }] }]
    },
    {
      title: 'Secret',
      name: 'isSecret',
      type: 'boolean',
      description: 'Not in use. The idea was that secret documents are only readable by the GM'
    },
    {
      title: 'Comments',
      name: 'comments',
      type: 'array',
      of: [{ type: 'comment' }]
    }
  ],
  preview: {
    select: {
      title: 'title',
      category: 'category.singular',
      image: 'mainImage',
      order: 'order',
      campaignSlug: 'campaign.slug.current'
    },
    prepare({ title, category, image, campaignSlug, order }) {
      return {
        title: title || 'untitled',
        subtitle: [campaignSlug, category, order].filter(Boolean).join('/'),
        media: image
      }
    }
  }
}
