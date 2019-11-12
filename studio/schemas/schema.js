import createSchema from 'part:@sanity/base/schema-creator'
import schemaTypes from 'all:part:@sanity/base/schema-type'

import blockContent from './blockContent'
import campaign from './campaign'
import category from './category'
import post from './post'
import user from './user'
import siteSettings from './siteSettings'

import ship from './ships/ship'
import shipFeature from './ships/shipFeature'
import shipModule from './ships/shipModule'
import shipTemplate from './ships/shipTemplate'
import bonus from './ships/bonus'
import shipyard from './ships/shipyard'

export default createSchema({
  name: 'default',
  types: schemaTypes.concat([
    post,
    blockContent,
    campaign,
    category,
    siteSettings,
    user,
    ship,
    shipFeature,
    shipModule,
    shipTemplate,
    shipyard,
    bonus
  ])
})
