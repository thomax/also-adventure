import {summarizeBonuses} from '../../src/previews/spaceship/utils'

export default {
  name: 'shipyard',
  title: 'Shipyard',
  type: 'document',
  fields: [
    {
      title: 'Name',
      name: 'name',
      type: 'string'
    },
    {
      title: 'System',
      name: 'system',
      type: 'string',
      description: 'The system where the shipyard is located'
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
      let subtitle

      if (bonuses) {
        subtitle = `${summarizeBonuses(bonuses)} [${price > 0 ? '+' : ''}${price}% baseprice]`
      } else {
        subtitle = price ? `${price > 0 ? '+' : ''}${price}% baseprice` : '[+0% baseprice]'
      }

      return {
        title: name,
        subtitle: subtitle
      }
    }
  }
}
