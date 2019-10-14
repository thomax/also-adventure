export default {
  title: 'Site Settings',
  name: 'siteSettings',
  type: 'document',
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string'
    },
    {
      title: 'Description',
      name: 'description',
      type: 'text',
      description: 'Description for search engines and social media'
    },
    {
      title: 'Keywords',
      name: 'keywords',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Add keywords that describes your blog.',
      options: {
        layout: 'tags'
      }
    }
  ]
}
