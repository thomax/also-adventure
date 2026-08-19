export default {
  title: 'Random table',
  name: 'randomTable',
  type: 'document',
  liveEdit: true,
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string'
    },
    {
      title: 'Description',
      name: 'description',
      type: 'string'
    },
    {
      title: 'Table Key',
      name: 'tableKey',
      type: 'slug'
    },
    {
      title: 'Die Type',
      name: 'dieType',
      type: 'string'
    },
    {
      title: 'Table Rows',
      name: 'tableRows',
      type: 'array',
      of: [
        {
          title: 'Table Row',
          name: 'tableRow',
          type: 'object',
          fields: [
            {
              title: 'Index',
              name: 'index',
              type: 'string'
            },
            {
              title: 'Description',
              name: 'description',
              type: 'string',
            },
          ],
          preview: {
            select: {
              title: 'index',
              subtitle: 'description',
            },
          },
        },
      ],
    }
  ],
  preview: {
    select: {
      title: 'title'
    }
  }
}
