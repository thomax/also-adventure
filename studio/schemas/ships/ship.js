export default {
  name: 'ship',
  title: 'Ship',
  type: 'document',
  fields: [
    {
      title: 'Name',
      name: 'name',
      type: 'string'
    },
    {
      title: 'Problem',
      name: 'problem',
      type: 'string'
    },
    {
      title: 'Template',
      name: 'template',
      type: 'reference',
      to: [{type: 'shipTemplate'}]
    },
    {
      title: 'Constructed by',
      name: 'constructedBy',
      type: 'reference',
      to: [{type: 'shipyard'}]
    },
    {
      title: 'Modules',
      name: 'modules',
      type: 'array',
      of: [{type: 'reference', to: {type: 'shipModule'}}]
    },
    {
      title: 'Features',
      name: 'features',
      type: 'array',
      of: [{type: 'reference', to: {type: 'shipFeature'}}]
    }
  ]
}
