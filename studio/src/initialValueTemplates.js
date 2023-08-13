export default [
  {
    id: 'campaign',
    title: 'Campaign',
    schemaType: 'campaign',
    value: {}
  },
  {
    id: 'category',
    title: 'Category',
    schemaType: 'category',
    value: {}
  },
  {
    id: 'talent',
    title: 'Talent',
    schemaType: 'talent',
    value: {}
  },
  {
    id: 'shipTemplate',
    title: 'Ship Template',
    schemaType: 'shipTemplate',
    value: {}
  },
  {
    id: 'shipModule',
    title: 'Ship Module',
    schemaType: 'shipModule',
    value: {}
  },
  {
    id: 'shipFeature',
    title: 'Ship Feature',
    schemaType: 'shipFeature',
    value: {}
  },
  {
    id: 'ship',
    title: 'Ship',
    schemaType: 'ship',
    value: {}
  },
  {
    id: 'shipyard',
    title: 'Shipyard',
    schemaType: 'shipyard',
    value: {}
  },
  {
    id: 'shipWeapon',
    title: 'Ship Weapon',
    schemaType: 'shipWeapon',
    value: {}
  },
  {
    id: 'post-by-campaign',
    title: 'Post by campaign',
    schemaType: 'post',
    description: 'Post in a specific campaign',
    parameters: [{name: 'campaignId', type: 'string'}],
    value: params => ({
      campaign: {_type: 'reference', _ref: params.campaignId}
    })
  },
  {
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
  }
]
