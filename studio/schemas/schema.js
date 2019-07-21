import createSchema from 'part:@sanity/base/schema-creator'
import schemaTypes from 'all:part:@sanity/base/schema-type'

import blockContent from './blockContent'
import campaign from './campaign'
import category from './category'
import post from './post'
import siteSettings from './siteSettings'
import user from './user'

export default createSchema({
  name: 'default',
  types: schemaTypes.concat([post, blockContent, campaign, category, siteSettings, user])
})
