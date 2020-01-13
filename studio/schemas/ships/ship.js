import {number} from 'prop-types'

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
      title: 'Description',
      name: 'description',
      type: 'text',
      rows: 3
    },
    {
      title: 'Image',
      name: 'image',
      type: 'image',
      options: {
        hotspot: true
      }
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
      title: 'Constructed by shipyard',
      name: 'shipyard',
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
      title: 'Weapons',
      name: 'weapons',
      type: 'array',
      of: [{type: 'reference', to: {type: 'shipWeapon'}}],
      description: 'Weapons counts as modules'
    },
    {
      title: 'Ammo',
      name: 'ammo',
      type: 'array',
      of: [{type: 'ammoElement'}],
      description:
        'One torpedo/mine module can hold 4 torpedoes or 8 mines or any combination of those'
    },
    {
      title: 'Features',
      name: 'features',
      type: 'array',
      of: [{type: 'reference', to: {type: 'shipFeature'}}]
    }
  ]
}
