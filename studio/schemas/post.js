import shared from './shared'
const postCategories = shared.postCategories

export default {
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    {
      title: 'Category',
      name: 'category',
      type: 'string',
      options: {
        list: postCategories
      }
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
    }
  ],
  preview: {
    select: {
      title: 'title',
      category: 'category',
      image: 'mainImage',
      order: 'order',
      campaignSlug: 'campaign.slug.current'
    },
    prepare(selection) {
      const {title, category, image, campaignSlug, order} = selection
      return {
        title: title,
        subtitle: [campaignSlug, category, order].filter(Boolean).join('/'),
        media: image
      }
    }
  }
}
