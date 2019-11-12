export default {
  name: 'shipTemplate',
  title: 'Ship Template',
  type: 'document',
  fields: [
    {
      title: 'Name',
      name: 'name',
      type: 'string'
    },
    {
      title: 'Size',
      name: 'size',
      type: 'string',
      options: {
        list: ['I', 'II', 'III', 'IV', 'V']
      }
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
      title: 'Baseprice',
      name: 'baseprice',
      type: 'number'
    }
  ],
  orderings: [
    {
      title: 'Size Asc',
      name: 'sizeAsc',
      by: [{field: 'size', direction: 'asc'}]
    },
    {
      title: 'Size Desc',
      name: 'sizeDesc',
      by: [{field: 'size', direction: 'desc'}]
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
        subtitle: `${size} - ${baseprice / 1000}k birr`
      }
    }
  }
}
