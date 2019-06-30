import createSchema from 'part:@sanity/base/schema-creator'
import schemaTypes from 'all:part:@sanity/base/schema-type'

import post from './post'
import blockContent from './blockContent'
import campaign from './campaign'
import siteSettings from './siteSettings'
import user from './user'

export default createSchema({
  name: 'default',
  types: schemaTypes.concat([post, blockContent, campaign, siteSettings, user])
})
