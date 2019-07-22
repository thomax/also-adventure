export default {
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    {
      title: 'Category',
      name: 'category',
      type: 'reference',
      to: [{type: 'category'}]
    },
    {
      title: 'Campaign',
      name: 'campaign',
      type: 'reference',
      to: [{type: 'campaign'}]
    },
    {
      title: 'Title',
      name: 'title',
      type: 'string'
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
      options: {
        source: 'title',
        maxLength: 96
      }
    },
    {
      title: 'Main Image',
      name: 'mainImage',
      type: 'image',
      options: {hotspot: true}
    },
    {
      title: 'Order',
      name: 'order',
      type: 'number',
      description: 'Use this field if article is a session'
    },
    {
      title: 'Authors',
      name: 'authors',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'user'}]}]
    },
    {
      title: 'Secret',
      name: 'isSecret',
      type: 'boolean',
      description: 'Secret posts are only readable by the GM'
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
    prepare({title, category, image, campaignSlug, order}) {
      return {
        title: title || 'untitled',
        subtitle: [campaignSlug, category, order].filter(Boolean).join('/'),
        media: image
      }
    }
  }
}
