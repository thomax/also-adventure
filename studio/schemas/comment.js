export default {
  title: 'Comment',
  name: 'comment',
  type: 'object',
  fields: [
    {
      title: 'Content',
      name: 'content',
      type: 'text'
    },
    {
      title: 'Author Name',
      name: 'authorName',
      type: 'string'
    },
    {
      title: 'Submitted At',
      name: 'submittedAt',
      type: 'datetime'
    }
  ],
  preview: {
    select: {
      content: 'content',
      authorName: 'authorName'
    },
    prepare({content, authorName}) {
      return {
        title: `${content.substring(0, 25)}...`,
        subtitle: authorName
      }
    }
  }
}
