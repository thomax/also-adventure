import T from '@sanity/base/initial-value-template-builder'

export default [
  ...T.defaults(),

  T.template({
    id: 'post-cooks',
    title: 'Cooks',
    schemaType: 'post',
    value: {
      title: 'Waffles are good'
    }
  })
]
