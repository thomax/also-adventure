import {summarizeBonuses} from '../../src/previews/spaceship/utils'

export default {
  name: 'shipModule',
  title: 'Ship Module',
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
      type: 'number'
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
      return {
        title: name,
        subtitle: price || price === 0 ? `${price / 1000}k shirr` : 'price varies'
      }
    }
  }
}
