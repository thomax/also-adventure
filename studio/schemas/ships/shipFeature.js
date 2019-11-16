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
      bonuses: 'bonuses'
    },
    prepare({name, price, bonuses}) {
      let subtitle = null

      if (bonuses) {
        subtitle = `${summarizeBonuses(bonuses)} [${price > 0 ? '+' : ''}${price}% baseprice]`
      } else {
        subtitle = price ? `${price > 0 ? '+' : ''}${price}% baseprice` : '+0% baseprice'
      }

      return {
        title: name,
        subtitle: subtitle
      }
    }
  }
}
