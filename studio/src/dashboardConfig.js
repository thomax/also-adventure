const {transformDocument} = require('./orbitalsTransformer')
export default {
  widgets: [
    {
      name: 'orbitals-2d',
      layout: {
        width: 'full',
        height: 'small'
      },
      options: {
        query:
          '*[!(_id in path("_.listeners.**")) && !(_id in path("drafts.**"))]|order(_createdAt desc)[0..5]',
        transformDocument: transformDocument,
        attractorColor: '#101010',
        attractorRadius: 20,
        attractorOpacity: null,
        attractorSides: 0
      }
    },
    {
      name: 'project-info',
      options: {
        __experimental_before: [
          {
            name: 'netlify',
            options: {
              sites: [
                {
                  buildHookId: '5d17ca16d90d5a0af32b71be',
                  title: 'Sanity Studio',
                  name: 'also-adventure-studio',
                  apiId: 'f0d942fa-dbf9-41c6-b272-5cc6e5e4cc34'
                },
                {
                  buildHookId: '5d17ca16e2c29e930e5ed720',
                  title: 'Blog Website',
                  name: 'also-adventure',
                  apiId: 'f92d34ac-db23-4e3e-a442-e61f1cc89c3a'
                }
              ]
            }
          }
        ],
        data: [
          {
            title: 'GitHub repo',
            value: 'https://github.com/thomax/also-adventure',
            category: 'Code'
          },
          {title: 'Frontend', value: 'https://also-adventure.netlify.com', category: 'apps'}
        ]
      }
    },
    {name: 'project-users', layout: {height: 'auto'}},
    {
      name: 'document-list',
      options: {title: 'Recent posts', order: '_createdAt desc', types: ['post']},
      layout: {width: 'medium'}
    }
  ]
}
