export default {
  widgets: [
    {name: 'structure-menu'},
    {
      name: 'project-info',
      options: {
        __experimental_before: [
          {
            name: 'netlify',
            options: {
              description:
                'NOTE: Because these sites are static builds, they need to be re-deployed to see the changes when documents are published.',
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
