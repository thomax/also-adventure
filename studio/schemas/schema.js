import createSchema from 'part:@sanity/base/schema-creator'
import schemaTypes from 'all:part:@sanity/base/schema-type'

import blockContent from './blockContent'
import campaign from './campaign'
import category from './category'
import post from './post'
import user from './user'
import siteSettings from './siteSettings'

export default createSchema({
  name: 'default',
  types: schemaTypes.concat([post, blockContent, campaign, category, siteSettings, user])
})
