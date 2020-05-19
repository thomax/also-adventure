import {arabicToRoman} from '../../src/previews/spaceship/utils'

export default {
  name: 'shipTemplate',
  title: 'Ship Template',
  type: 'document',
  liveEdit: true,
  fields: [
    {
      title: 'Name',
      name: 'name',
      type: 'string'
    },
    {
      title: 'Size',
      name: 'size',
      type: 'number',
      validation: Rule => Rule.min(1).max(9)
    },
    {
      title: 'Maneuverability',
      name: 'maneuverability',
      type: 'number'
    },
    {
      title: 'Modules',
      name: 'modules',
      type: 'number'
    },
    {
      title: 'Bonus weapon modules',
      name: 'bonusWeaponModules',
      type: 'number',
      description: 'Some templates get extra modules solely for weapons'
    },
    {
      title: 'Energy Points',
      name: 'energyPoints',
      type: 'number'
    },
    {
      title: 'Hull Points',
      name: 'hullPoints',
      type: 'number'
    },
    {
      title: 'Signature',
      name: 'signature',
      type: 'number'
    },
    {
      title: 'Armor',
      name: 'armor',
      type: 'number'
    },
    {
      title: 'Speed',
      name: 'speed',
      type: 'number'
    },
    {
      title: 'Ammo Capacity',
      name: 'ammoCapacity',
      type: 'number'
    },
    {
      title: 'Baseprice',
      name: 'baseprice',
      type: 'number'
    }
  ],
  orderings: [
    {
      title: 'Baseprice Asc',
      name: 'basepriceAsc',
      by: [{field: 'baseprice', direction: 'asc'}]
    },
    {
      title: 'Baseprice Desc',
      name: 'basepriceDesc',
      by: [{field: 'baseprice', direction: 'desc'}]
    }
  ],
  preview: {
    select: {
      name: 'name',
      size: 'size',
      baseprice: 'baseprice'
    },
    prepare({name, size, baseprice}) {
      return {
        title: name,
        subtitle: `${arabicToRoman(size)} - ${baseprice / 1000}k shirr`
      }
    }
  }
}
