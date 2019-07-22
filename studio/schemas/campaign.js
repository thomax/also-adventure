import shared from './shared'
const systems = shared.systems

export default {
  title: 'Campaign',
  name: 'campaign',
  type: 'document',
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
      options: {hotspot: true}
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
      title: 'GM',
      name: 'gm',
      type: 'reference',
      to: [{type: 'user'}]
    },
    {
      title: 'System',
      name: 'system',
      type: 'string',
      options: {
        list: systems
      }
    }
  ],
  preview: {
    select: {
      title: 'title',
      gm: 'gm.name',
      system: 'system',
      media: 'mainImage'
    },
    prepare({title, gm, system, media}) {
      const systemTitle = system ? systems.find(sys => sys.value === system).title : null
      return {
        title,
        media,
        subtitle: [gm, systemTitle].filter(Boolean).join(' - ')
      }
    }
  }
}
