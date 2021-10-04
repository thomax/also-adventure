import T from '@sanity/base/initial-value-template-builder'

export default [
  //  ...T.defaults(),

  T.template({
    id: 'campaign',
    title: 'Campaign',
    schemaType: 'campaign',
    value: {}
  }),

  T.template({
    id: 'category',
    title: 'Category',
    schemaType: 'category',
    value: {}
  }),

  T.template({
    id: 'talent',
    title: 'Talent',
    schemaType: 'talent',
    value: {}
  }),

  T.template({
    id: 'shipTemplate',
    title: 'Ship Template',
    schemaType: 'shipTemplate',
    value: {}
  }),

  T.template({
    id: 'shipModule',
    title: 'Ship Module',
    schemaType: 'shipModule',
    value: {}
  }),

  T.template({
    id: 'shipFeature',
    title: 'Ship Feature',
    schemaType: 'shipFeature',
    value: {}
  }),

  T.template({
    id: 'ship',
    title: 'Ship',
    schemaType: 'ship',
    value: {}
  }),

  T.template({
    id: 'shipyard',
    title: 'Shipyard',
    schemaType: 'shipyard',
    value: {}
  }),

  T.template({
    id: 'shipWeapon',
    title: 'Ship Weapon',
    schemaType: 'shipWeapon',
    value: {}
  }),

  T.template({
    id: 'post-by-campaign',
    title: 'Post by campaign',
    schemaType: 'post',
    description: 'Post in a specific campaign',
    parameters: [{name: 'campaignId', type: 'string'}],
    value: params => ({
      campaign: {_type: 'reference', _ref: params.campaignId}
    })
  }),

  T.template({
    id: 'post-by-campaign-and-category',
    title: 'Post by campaign and category',
    schemaType: 'post',
    description: 'Post!',
    parameters: [
      {name: 'campaignId', type: 'string'},
      {name: 'categoryId', type: 'string'}
    ],
    value: params => ({
      campaign: {_type: 'reference', _ref: params.campaignId},
      category: {_type: 'reference', _ref: params.categoryId}
    })
  })
]
