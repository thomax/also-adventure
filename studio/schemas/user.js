export default {
  title: 'User',
  name: 'user',
  type: 'document',
  fields: [
    {
      title: 'Name',
      name: 'name',
      type: 'string'
    },
    {
      title: 'Handle',
      name: 'handle',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96
      }
    },
    {
      title: 'Avatar',
      name: 'avatar',
      type: 'image',
      options: {hotspot: true}
    }
  ],
  preview: {
    select: {
      name: 'name',
      image: 'avatar'
    },
    prepare(selection) {
      const {name, image} = selection
      return {
        title: name,
        media: image
      }
    }
  }
}
