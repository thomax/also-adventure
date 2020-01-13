import createSchema from 'part:@sanity/base/schema-creator'
import schemaTypes from 'all:part:@sanity/base/schema-type'

import blockContent from './blockContent'
import campaign from './campaign'
import category from './category'
import post from './post'
import user from './user'
import comment from './comment'
import siteSettings from './siteSettings'

import ship from './ships/ship'
import shipFeature from './ships/shipFeature'
import shipModule from './ships/shipModule'
import shipTemplate from './ships/shipTemplate'
import shipWeapon from './ships/shipWeapon'
import shipAmmo from './ships/shipAmmo'
import ammoElement from './ships/ammoElement'
import bonus from './ships/bonus'
import shipyard from './ships/shipyard'

export default createSchema({
  name: 'default',
  types: schemaTypes.concat([
    post,
    blockContent,
    campaign,
    category,
    comment,
    siteSettings,
    user,
    ship,
    shipFeature,
    shipModule,
    shipTemplate,
    shipyard,
    shipWeapon,
    shipAmmo,
    ammoElement,
    bonus
  ])
})
