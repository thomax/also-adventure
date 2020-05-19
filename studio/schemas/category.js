export default {
  title: 'Category',
  name: 'category',
  type: 'document',
  liveEdit: true,
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string'
    },
    {
      title: 'Singular',
      name: 'singular',
      type: 'string'
    },
    {
      title: 'Plural',
      name: 'plural',
      type: 'string'
    }
  ],
  preview: {
    select: {
      title: 'title'
    }
  }
}
