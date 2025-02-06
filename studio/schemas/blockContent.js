//import linkIcon from 'react-icons/lib/fa/paperclip'
import { HiExternalLink } from "react-icons/hi"
import { HiLink } from "react-icons/hi"

export default {
  title: 'Block Content',
  name: 'blockContent',
  type: 'array',
  of: [
    {
      type: 'image',
      options: { hotspot: true }
    },
    {
      title: 'Block',
      type: 'block',
      of: [{ type: 'image' }],
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'H1', value: 'h1' },
        { title: 'H2', value: 'h2' },
        { title: 'H3', value: 'h3' },
        { title: 'Quote', value: 'blockquote' }
      ],
      lists: [{ title: 'Bullet', value: 'bullet' }],
      marks: {
        decorators: [
          { title: 'Strong', value: 'strong' },
          { title: 'Emphasis', value: 'em' }
        ],
        annotations: [
          {
            title: 'URL',
            name: 'link',
            type: 'object',
            icon: HiExternalLink,
            fields: [
              {
                title: 'URL',
                name: 'href',
                type: 'url',
                validation: Rule => Rule.uri({ allowRelative: true, scheme: ['https', 'http'] })
              }
            ]
          },
          {
            title: 'Internal link',
            name: 'internalLink',
            type: 'object',
            icon: HiLink,
            fields: [
              {
                name: 'reference',
                type: 'reference',
                title: 'Reference',
                to: [{ type: 'post' }],
                weak: true,
                options: {
                  filter: ({ document }) => {
                    const { campaign } = document
                    if (!campaign) {
                      return {
                        filter: 'true'
                      }
                    }
                    return {
                      filter: 'campaign._ref == $campaignId',
                      params: {
                        campaignId: campaign._ref
                      }
                    }
                  }
                }
              }
            ]
          }
        ]
      }
    }
  ]
}
