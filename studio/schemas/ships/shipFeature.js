import {summarizeBonuses} from '../../src/previews/spaceship/utils'

export default {
  name: 'shipFeature',
  title: 'Ship Feature',
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
      type: 'text'
    },
    {
      title: 'Price',
      name: 'price',
      type: 'number',
      description: 'Percent increase from baseprice'
    },
    {
      title: 'Tech',
      name: 'tech',
      type: 'object',
      fields: [
        {
          title: 'Level',
          name: 'level',
          type: 'string',
          options: {
            list: [
              {title: 'Primitive', value: 'P'},
              {title: 'Ordinary', value: 'O'},
              {title: 'Advanced', value: 'A'},
              {title: 'Faction', value: 'F'},
              {title: 'Portal Builder', value: 'PB'}
            ],
            layout: 'radio'
          }
        },
        {
          title: 'Need license to purchase',
          name: 'isLicensed',
          type: 'boolean'
        }
      ]
    },
    {
      title: 'Need license to purchase',
      name: 'isLicensed',
      type: 'boolean'
    },
    {
      title: 'Bonuses',
      name: 'bonuses',
      type: 'array',
      of: [{type: 'bonus'}]
    }
  ],
  preview: {
    select: {
      name: 'name',
      price: 'price',
      bonuses: 'bonuses',
      tech: 'tech'
    },
    prepare({name, price, bonuses, tech = {}}) {
      let subtitle = null

      if (bonuses) {
        subtitle = `${summarizeBonuses(bonuses)} [${price > 0 ? '+' : ''}${price}% baseprice]`
      } else {
        subtitle = price ? `${price > 0 ? '+' : ''}${price}% baseprice` : '+0% baseprice'
      }

      return {
        title: `${name} [${tech.level}${tech.isLicensed ? '*' : ''}]`,
        subtitle: subtitle
      }
    }
  }
}
