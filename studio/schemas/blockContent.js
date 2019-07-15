import linkIcon from 'react-icons/lib/fa/paperclip'
export default {
  title: 'Block Content',
  name: 'blockContent',
  type: 'array',
  of: [
    {
      type: 'image',
      options: {hotspot: true}
    },
    {
      title: 'Block',
      type: 'block',
      of: [{type: 'image'}],
      styles: [
        {title: 'Normal', value: 'normal'},
        {title: 'H1', value: 'h1'},
        {title: 'H2', value: 'h2'},
        {title: 'H3', value: 'h3'},
        {title: 'Quote', value: 'blockquote'}
      ],
      lists: [{title: 'Bullet', value: 'bullet'}],
      marks: {
        decorators: [{title: 'Strong', value: 'strong'}, {title: 'Emphasis', value: 'em'}],
        annotations: [
          {
            title: 'URL',
            name: 'link',
            type: 'object',
            fields: [
              {
                title: 'URL',
                name: 'href',
                type: 'url',
                validation: Rule => Rule.uri({allowRelative: true, scheme: ['https', 'http']})
              }
            ]
          },
          {
            name: 'internalLink',
            type: 'object',
            title: 'Internal link',
            blockEditor: {
              icon: linkIcon
            },
            fields: [
              {
                name: 'reference',
                type: 'reference',
                title: 'Reference',
                to: [{type: 'post'}],
                weak: true
              }
            ]
          }
        ]
      }
    }
  ]
}
